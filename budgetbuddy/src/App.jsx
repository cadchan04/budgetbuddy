import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Actions
import { logoutAction  } from "./actions/logout";

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import BudgetPage, { budgetLoader } from "./pages/BudgetPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      // Make Dashboard the first child
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        errorElement: <Error />, // TODO: need to add errorElement in expense
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },
]);

function App() {

  return <div className="App">
    <RouterProvider router={router} />
    <ToastContainer />
  </div>;
}

export default App;
