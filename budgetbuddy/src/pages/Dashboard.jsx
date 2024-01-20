// rrd imports
import { useLoaderData } from "react-router-dom";

// components
import AddBudgetForm from "../components/AddBudgetForm";
import BudgetItem from "../components/BudgetItem";

// helper functions
import {fetchData} from "../helpers"

// loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets")
    return { userName, budgets }
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