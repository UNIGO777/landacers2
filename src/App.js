import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomePage from "./pages/homePage/HomePage";
import PropertiesPage from "./pages/propertiesPages/PropertiesPage";
import AboutPage from "./pages/aboutPage/AboutPage";
import ContactPage from "./pages/contactPage/ContactPage";
import PropertyProfile from './pages/propertiesPages/PropertyProfile';
import WithNavbarAndFooter from "./HOCS/NavFotHoc";

import AdminLogin from './admin/Pages/AdminLogin/AdminLogin';
import AdminDashboard from './admin/Pages/Dashboard/Dashboard';
import AdminProperties from "./admin/Pages/Properties/components/AllProperties/AdminProperties";
import BrokerProperties from "./admin/Pages/Properties/components/AllProperties/BrokerProperties";
import UserProperties from "./admin/Pages/Properties/components/AllProperties/UserProperties";
import ManageUsers from "./admin/Pages/Users/ManageUsers"
import BrokerManagement from "./admin/Pages/Brokers/BrokerManagement";
import BrokerRequests from "./admin/Pages/Brokers/BrokerReqest";
import PaymentPage from "./admin/Pages/Payments/PaymentsPage";
import ManageSubscription from "./admin/Pages/Subscription/ManageSubs";
import EditSubscriptionForm from "./admin/Pages/Subscription/EditSubs";
import ChangePassword from "./admin/Pages/ChangePassword";

import BrokerDashboard from "./broker/Pages/Dashoard/Dashboard";
import BrokerLogin from "./broker/Pages/Auth/BrokerLogin";
import BrokerSignUpPage from "./broker/Pages/Auth/BrokerSingup";
import AddProperty from "./broker/Pages/Properties/AddProperty";
import QueriesManagement from "./broker/Pages/Queries/ManageQueries";
import AllBrokerProperties from "./broker/Pages/Properties/AllProperty";

import ROUTES_NAME from "./constants/routes";
import './Assets/Global.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES_NAME.HOME} element={<WithNavbarAndFooter WrappedComponent={HomePage} />} />
          <Route path={ROUTES_NAME.PROPERTIES} element={<WithNavbarAndFooter WrappedComponent={PropertiesPage} />} />
          <Route path={ROUTES_NAME.ABOUT} element={<WithNavbarAndFooter WrappedComponent={AboutPage} />} />
          <Route path={ROUTES_NAME.CONTACT} element={<WithNavbarAndFooter WrappedComponent={ContactPage} />} />
          <Route path={ROUTES_NAME.VIEW_PROPERTY} element={<WithNavbarAndFooter WrappedComponent={PropertyProfile} />} />
          <Route path={ROUTES_NAME.ADMIN_LOGIN} element={<AdminLogin />} />
          <Route path={ROUTES_NAME.ADMIN_HOME} element={<AdminDashboard />} />
          <Route path={ROUTES_NAME.ADMIN_ALL_PROPERTIES} element={<AdminProperties />} />
          <Route path={ROUTES_NAME.BROKER_ALL_PROPERTIES} element={<BrokerProperties />} />
          <Route path={ROUTES_NAME.USER_ALL_PROPERTIES} element={<UserProperties />} />
          <Route path={ROUTES_NAME.ADMIN_MANAGE_USERS} element={<ManageUsers />} />
          <Route path={ROUTES_NAME.ADMIN_MANAGE_BROKERS} element={<BrokerManagement />} />
          <Route path={ROUTES_NAME.ADMIN_BROKERS_REQUESTS} element={<BrokerRequests />} />
          <Route path={ROUTES_NAME.ADMIN_ALL_PAYMENTS} element={<PaymentPage />} />
          <Route path={ROUTES_NAME.ADMIN_EDIT_SUBSCRIPTION} element={<EditSubscriptionForm />} />
          <Route path={ROUTES_NAME.ADMIN_MANAGE_SUBSCRIPTION} element={<ManageSubscription />} />
          <Route path={ROUTES_NAME.ADMIN_CHANGE_PASSWORD} element={<ChangePassword />} />

          <Route path={ROUTES_NAME.BROKER_HOME} element={<BrokerDashboard />} />
          <Route path={ROUTES_NAME.BROKER_LOGIN} element={<BrokerLogin />} />
          <Route path={ROUTES_NAME.BROKER_SIGNUP} element={<BrokerSignUpPage />} />
          <Route path={ROUTES_NAME.BROKER_PROPERTY_ADD} element={<AddProperty />} />
          <Route path={ROUTES_NAME.BROKER_MANAGE_QUERIES} element={<QueriesManagement />} />
          <Route path={ROUTES_NAME.BROKER_ALLPROPERTIES} element={<AllBrokerProperties />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
