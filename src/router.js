import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Crud from "./components/Crud";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Aboutus from "./components/Aboutus";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'crud', element: <Crud/> },
    { path : 'register', element: <Register/>},
    { path : 'login', element: <Login/>},
    { path : 'aboutus' , element: <Aboutus />}

]);

export default router;