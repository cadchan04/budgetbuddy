// rrd imports
import { useLoaderData } from "react-router-dom";

// components
import AddBudgetForm from "../components/AddBudgetForm";

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
                    {/* {budgets ? () : ()} */}
                    <div className="grid-lg">
                        <div className="flex-lg">
                            <AddBudgetForm />
                        </div>
                    </div>
                </div>
            </div>
            ) : <Intro />}
        </>
    )
}
export default Dashboard