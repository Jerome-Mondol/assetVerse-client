import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import EmployeeRegister from "../components/forms/Employee/EmployeeRegister";
import Login from "../components/forms/Login";
import HRRegister from "../components/forms/HR/HRRegister";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'join-as-employee',
        Component: EmployeeRegister
      },
      {
        path: 'join-as-hr-manager',
        Component: HRRegister
      },
      {
        path: 'login',
        Component: Login
      }
    ]
  }
]);

export default router;
