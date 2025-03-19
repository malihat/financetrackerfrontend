// import { useUser } from "@clerk/clerk-react"
import { FinancialRecordForm } from "./financial-record-form";
import TotalMonthlyIncome from './total-monthly-income';

export const Dahsboard = () => {
    // const {user} = useUser();

    return <div className="dashboard-container">
        <div className="bg-[#f2ccff] text-center pt-2 pb-2 mb-[50px]">
            {/* <h1 className="text-2xl font-bold font-arvo text-slate-700">Welcome {user?.firstName}! </h1> */}
            <h2 className="text-md">Track Your Monthly Finances</h2>
        </div>

        <div className="mx-8">
            <TotalMonthlyIncome />
            <FinancialRecordForm/>
        </div>
    </div>
}