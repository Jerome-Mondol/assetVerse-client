import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import EmployeeRegister from "../components/forms/Employee/EmployeeRegister";
import Login from "../components/forms/Login";
import HRRegister from "../components/forms/HR/HRRegister";
import Home from "../pages/publicPages/Home";
import AssetList from "../pages/hrPages/AssetList";
import HRRoutes from "./HRRoutes";
import AddAsset from "../pages/hrPages/AddAsset";
import EmployeeRoutes from "./EmployeeRoutes";
import MyAssets from "../pages/employeePages/MyAssets";
import RequestAsset from "../pages/employeePages/RequestAsset";
import AssetDetails from "../pages/commonPages/AssetDetails";
import AllRequests from "../pages/hrPages/AllRequests";
import AllEmployees from "../pages/hrPages/AllEmployees";
import EditAsset from "../pages/hrPages/EditAsset";

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
      },
      {
        path: "edit-asset/:id",
        element: <HRRoutes>
          <EditAsset />
        </HRRoutes>
      },
      {
        path: "my-assets",
        element: <EmployeeRoutes>
          <MyAssets />
        </EmployeeRoutes>
      },
      {
        path: 'request-asset',
        element: <EmployeeRoutes>
          <RequestAsset />
        </EmployeeRoutes>
      },
      {
        path: 'asset-details/:id',
        element: <EmployeeRoutes>
            <AssetDetails />
        </EmployeeRoutes>
      },
      {
        path: "all-requests",
        element: <HRRoutes>
          <AllRequests />
        </HRRoutes>
      },
      {
        path: 'employees',
        element: <HRRoutes>
          <AllEmployees />
        </HRRoutes>
      }
    ]
  }
]);

export default router;
