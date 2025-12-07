import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import EmployeeRegister from "../components/forms/Employee/EmployeeRegister";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: 'join-as-employee',
        Component: EmployeeRegister
      }
    ]
  }
]);

export default router;
