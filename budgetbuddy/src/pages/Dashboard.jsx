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

import {createBudget, createExpense, fetchData, waait} from "../helpers"

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
    const {_action, ...values } = Object.fromEntries(data);
    console.log(_action)
    // new user submission
    if (_action == "newUser") {
        try {
            // save userName to session storage
            localStorage.setItem("userName", JSON.stringify(values.userName));
            // return toast success message
            return toast.success('Welcome to Budget Buddy, ' + values.userName + '! ヽ(´▽`)/');
        } 
        catch (error) {
            throw new Error("There was a problem creating your account. Please try again later. щ（ﾟДﾟщ）");  
        }
    }
    if (_action == "createBudget") {
        try {
            // create budget
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount
            })
            return toast.success("Budget created!");
        } 
        catch (error) {
            throw new Error("There was a problem creating your budget. Please try again. щ（ﾟДﾟщ）");  
        }
    }

    if (_action === "createExpense") {
        try {
        //create expense 
        createExpense({
            name: values.newExpense,
            amount: values.newExpenseAmount,
            budgetId: values.newExpenseBudget
        })
        return toast.success(`"Expense 
            ${values.newExpense} created!"`)
        } catch (e) {
            throw new Error("There was a problem creating your expense.")
        }
    }
}

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
                                            return (<BudgetItem key={budget.id} budget={budget} />)
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