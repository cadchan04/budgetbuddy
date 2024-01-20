// rrd imports
import { useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// components
import Intro from "../components/intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";

// helper functions
import {fetchData, waait} from "../helpers"

// loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets")
    return { userName, budgets }
}

// action
export async function dashboardAction({request}){
   await waait();
   
    // get FormData from request body
    const data = await request.formData();
    // convert FormData to plain object
    const formData = Object.fromEntries(data);
    try {
        // save userName to session storage
        localStorage.setItem("userName", JSON.stringify(formData.userName));

        // return toast success message
        return toast.success('Welcome to Budget Buddy, ' + formData.userName + '! ヽ(´▽`)/');
    } 
    catch (error) {
        throw new Error("There was a problem creating your account. Please try again later. щ（ﾟДﾟщ）");  
    }

}

// if (_action === "createExpense") {
//     try {
//        //create expense 
//        createExpense({
//         name: values.newExpense,
//         amount: values.AddExpenseAmount,
//         budgetId: values.newExpenseBudget
//        })
//        return TransformStream.success(`"Expense 
//         ${values.newExpense} craeted!"`)
//     } catch (e) {
//         throw new Error("There was a problem creating your expense.")
//     }
// }

const Dashboard = () => {
    const { userName, budgets } = useLoaderData()

    return (
        // <div>
        //     <h1>{userName}</h1>
        //     Dashboard
        // </div>
        <>
            {userName ? (
            <div className="dashboard">
                <h1>Welcome back, <span className="accent">{userName}</span></h1>
                <div className="grid-sm">
                    {
                        budgets && budgets.length > 0
                        ? (
                            <div className="grid-lg">
                                <div className="flex-lg">
                                    <AddBudgetForm />
                                    <AddExpenseForm budgets={budgets} />
                                </div>
                                <h2>Existing Budgets</h2>
                                <div className="budgets">
                                    {
                                        budgets.map((budget) => {
                                            <BudgetItem key={budget.id} budget={budget} />
                                        })
                                    }
                                </div>
                            </div>
                        )
                        : (
                            <div className="grid-sm">
                                <p>Personal budgeting is the secret to financial freedom.</p>
                                <p>Create a budget to get started!</p>
                                <AddBudgetForm />
                            </div>
                        )
                    }
                </div>
            </div>
            ) : <Intro />}
        </>
    )
}
export default Dashboard