import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

const PieChartComponent = () => {
  const [chartData, setChartData] = useState([]);  

  useEffect(() => {
    const getItems = async (req, res) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}`);
        if (response) {
          setChartData((prevData) => [
            ...response.data.map((item) => ({
              name: item.description,
              value: item.amount,
            })),
          ].reduce((acc, curr) => {
            const existingItem = acc.find(item => item.name === curr.name);
            if (existingItem) {
              existingItem.value += curr.value; // Combine the value for duplicates
            } else {
              acc.push(curr); // Add new unique item
            }
            return acc;
          }, []));
        }
      } catch (error) {
          console.log('There was an error: ', error);
      }
    }
    getItems();
  }, [])



  return (
    <PieChart width={300} height={300}>
      
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="amount"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      {/* <Tooltip /> */}
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;



