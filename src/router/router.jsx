import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import EmployeeRegister from "../components/forms/Employee/EmployeeRegister";
import Login from "../components/forms/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: 'join-as-employee',
        Component: EmployeeRegister
      },
      {
        path: 'login',
        Component: Login
      }
    ]
  }
]);

export default router;
