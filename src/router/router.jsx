import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import EmployeeRegister from "../components/forms/Employee/EmployeeRegister";
import Login from "../components/forms/Login";
import HRRegister from "../components/forms/HR/HRRegister";
import Home from "../pages/Home";
import AssetList from "../pages/AssetList";
import HRRoutes from "./HRRoutes";
import AddAsset from "../pages/AddAsset";

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
      },
      {
        path: 'assets-list',
        element: <HRRoutes>
          <AssetList />
        </HRRoutes>
      },
      {
        path: "add-asset",
        element: <HRRoutes>
          <AddAsset />
        </HRRoutes>
      }
    ]
  }
]);

export default router;
