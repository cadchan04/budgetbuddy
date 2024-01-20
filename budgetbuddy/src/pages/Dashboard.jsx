// rrd imports
import { useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// components
import Intro from "../components/intro";

// helper functions

import {fetchData} from "../helpers"

// loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    return { userName }
}

// action
export async function dashboardAction({request}){
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

const Dashboard = () => {
    const { userName } = useLoaderData()

    return (
        <>
            {userName ? (<p>{userName}</p>) : <Intro/>}
        </>
    )
}
export default Dashboard