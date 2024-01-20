// rrd imports
import { useLoaderData } from "react-router-dom";

//components
import AddExpenseForm from "../components/AddExpenseForm";

// helper functions

import {createExpense, fetchData} from "../helpers"

// loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    return { userName }
}

if (_action === "createExpense") {
    try {
       //create expense 
       createExpense({
        name: values.newExpense,
        amount: values.AddExpenseAmount,
        budgetId: values.newExpenseBudget
       })
       return TransformStream.success(`"Expense 
        ${values.newExpense} craeted!"`)
    } catch (e) {
        throw new Error("There was a problem creating your expense.")
    }
}

const Dashboard = () => {
    const { userName } = useLoaderData()

    return (
        <div>
            <h1>{userName}</h1>
            Dashboard
        </div>
    )
}
export default Dashboard