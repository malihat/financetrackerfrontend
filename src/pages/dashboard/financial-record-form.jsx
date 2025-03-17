import { useEffect, useState, useContext, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { FinancialRecordList } from './financial-record-list';
import { TotalMoneyContext } from "../../TotalMoneyContext";
import PieChart from "../../Pichart";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BASE_URL} from './helper.js';


export const FinancialRecordForm = () => {
  const { addTotal, submittedIncome } = useContext(TotalMoneyContext);
  const [record, setRecord] = useState([]);
  const fileInputRef = useRef();
  const notifyError = () => toast.error("Not enough balance");
  const notifyAdded = () => toast("New item has been added");

  const [formData, setFormData] = useState({
    date: '',
    description: '',
    amount: '',
    category: '',
    paymentMethod: '',
    receipt: null,
  });

  const fetchRecords = () => {
    axios.get(`${BASE_URL}`).
      then((res) => {
        setRecord(res.data);
      }).catch((error) => {
        console.error(error);
      })
  }

  useEffect(() => {
    fetchRecords();
  }, []);

  const { user } = useUser();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      // Handle file input (i.e., image upload)
      setFormData({
        ...formData,
        [name]: files[0], // Storing the first file from the file input          
      });
    } else {
      // Handle all other inputs (text, number, select, date)
      setFormData({
        ...formData,
        [name]: type === 'number' ? parseInt(value, 10) : value, // Parse to integer for 'number' type inputs
      });
    }
  };

  const handleDelete = (id) => {
    try {
      axios.delete(`${BASE_URL}/${id}`)
        .then(() => {
          const updateDate = record.filter(item => item._id !== id);
          setRecord(updateDate);
        })
    } catch (error) {
      console.error('There was an error deleting the record!', error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newRecord = { ...formData, date: formData.date.slice(0, 10) };

    try {
      // First, post the total amount to the backend
      const response = await axios.post(`${BASE_URL}/api/total`, {
        total: submittedIncome - newRecord.amount,
      });
      addTotal(response.data.total);
    } catch (error) {
      console.error(error);
    }

    try {
      // Create FormData to send data including the file
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('date', newRecord.date);
      formDataToSubmit.append('description', newRecord.description);
      formDataToSubmit.append('amount', newRecord.amount);
      formDataToSubmit.append('category', newRecord.category);
      formDataToSubmit.append('paymentMethod', newRecord.paymentMethod);

      // Append the image file (if available)
      if (newRecord.receipt) {
        formDataToSubmit.append('receipt', newRecord.receipt.name);
      }

      if (submittedIncome > 0) {
        // Send POST request with FormData
        const response = await axios.post(`${BASE_URL}`, formDataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data', // Specify the content type for file uploads
          },
        });

        fetchRecords();

        // Clear the form after successful submission
        setFormData({
          date: '',
          description: '',
          amount: '',
          category: '',
          paymentMethod: '',
          receipt: '', 
        });

        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear the file input value
        }

        // Add the new record to the displayed list
        setRecord((prevRecords) => [...prevRecords, response.data]);

        notifyAdded();
      } else {
        notifyError();
      }


    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <div className="form-container mt-8 max-w-screen-lg	mx-auto p-6 bg-white shadow-lg rounded-md">
        <form onSubmit={handleSubmit} >
          <h2 className="text-2xl font-bold mb-5 text-gray-800 mt-5">Enter your items here: </h2>
          <div className="form-field font-md">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
            <input
              type="date"
              name='date'
              required
              className="input p-1 w-full border-gray-300 rounded-md focus:outline-none focus:shadow-md focus:shadow-gray-300 "
              value={formData.date}
              onChange={handleChange}

            />

          </div>

          <div className="form-field">
            <label className="block text-sm font-medium text-gray-700 mt-2">Description:</label>
            <input
              type="text"
              name='description'
              placeholder="Description"
              required
              className="input p-1 w-full border-gray-300 placeholder-slate-400 rounded-md border-gray-300 focus:outline-none focus:shadow-md focus:shadow-gray-300"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label className="block text-sm font-medium text-gray-700 mt-2">Amount:</label>
            <input
              type="number"
              name='amount'
              placeholder="Amount"
              required
              className="input p-1 w-full border-gray-300 placeholder-slate-400 rounded-md roundes-sm focus:outline-none focus:shadow-md focus:shadow-gray-300"
              value={(formData.amount)}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label className="block text-sm font-medium text-gray-700 mt-2">Category:</label>
            <select
              name='category'
              required
              className="input"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a Category</option>
              <option value="Food">Food</option>
              <option value="Rent">Rent</option>
              <option value="Salary">Salary</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-field">
            <label className="block text-sm font-medium text-gray-700 mt-2">Payment Method:</label>
            <select
              name='paymentMethod'
              required
              className="input"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="">Select a Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>

            <div className="form-field">
              <label className="block text-sm font-medium text-gray-700 mt-2">Upload Receipt:</label>
              <input
                name='receipt'
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full"
                ref={fileInputRef}
              />
            </div>

          </div>
          <div className="flex justify-center">
            <button type="submit" className="w-full md:w-auto mt-5 px-8 py-2 bg-[#ab60c4] hover:bg-[#9754ad] text-white font-bold rounded">
              Add Record
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col md:flex-row mt-8 items-center max-w-screen-lg mx-auto">
        <div className="w-full md:w-[35%] flex justify-center md:justify-start mb-4 md:mb-0">
          <PieChart record={record} />
        </div>
        <div className="w-full md:w-[75%] flex justify-center md:justify-end">
          <div className="w-full">
            <FinancialRecordList record={record} onDelete={handleDelete} />
          </div>
        </div>
      </div>



    </>
  )
}


