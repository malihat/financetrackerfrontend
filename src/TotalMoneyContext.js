import { createContext, useState } from "react";

export const TotalMoneyContext = createContext();

export const TotalMoneyProvider = ({children}) => {
    const [submittedIncome, setSubmittedIncome] = useState(""); // State for displaying submitted income

    const addTotal = async (total) => {
        setSubmittedIncome(total);
    }

    return (
        <TotalMoneyContext.Provider value={{submittedIncome, addTotal}}>
            {children}
        </TotalMoneyContext.Provider>
    )

}