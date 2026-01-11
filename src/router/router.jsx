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
import UpgradePackage from "../pages/hrPages/UpgradePackage";
import PaymentSuccess from "../pages/hrPages/StripeSucess";
import MyTeam from "../pages/employeePages/MyTeam";
import AssignAssets from "../pages/hrPages/AssignAssets";
import NotFound from "../pages/publicPages/Error";
import About from '../pages/publicPages/About';
import Contact from '../pages/publicPages/Contact';
import Privacy from '../pages/publicPages/Privacy';
import Terms from '../pages/publicPages/Terms';
import Cookies from '../pages/publicPages/Cookies';
import Careers from '../pages/publicPages/Careers';
import Security from '../pages/publicPages/Security';
import FeaturesPage from '../pages/publicPages/Features';
import PricingPage from '../pages/publicPages/Pricing';
import Profile from '../pages/commonPages/Profile';
import Dashboard from "../pages/hrPages/Dashboard";

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
        path: 'dashboard',
        element: <HRRoutes>
          <Dashboard />
        </HRRoutes>
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
      },
      {
        path: 'upgrade-package',
        element: <HRRoutes>
          <UpgradePackage />
        </HRRoutes>
      },
      {
        path: "payment-success",
        Component: PaymentSuccess
      },
      {
        path: 'my-team',
        element: <EmployeeRoutes>
          <MyTeam />
        </EmployeeRoutes>
      },
      {
        path: 'assign-assets/:employeeEmail',
        element: <HRRoutes>
          <AssignAssets />
        </HRRoutes>
      },
      {
        path: 'about',
        Component: About
      },
      {
        path: 'contact',
        Component: Contact
      },
      {
        path: 'privacy',
        Component: Privacy
      },
      {
        path: 'terms',
        Component: Terms
      },
      {
        path: 'cookies',
        Component: Cookies
      },
      {
        path: 'careers',
        Component: Careers
      },
      {
        path: 'security',
        Component: Security
      },
      {
        path: 'features',
        Component: FeaturesPage
      },
      {
        path: 'pricing',
        Component: PricingPage
      },
      {
        path: 'dashboard/profile',
        element: <HRRoutes>
          <Profile />
        </HRRoutes>
      },
      {
        path: 'profile',
        Component: Profile
      },
      {
        path: "*",
        Component: NotFound
      }
    ]
  }
]);

export default router;
