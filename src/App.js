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

import SallerDashboard from "./saller/Pages/Dashoard/Dashboard";
import SallerLogin from "./saller/Pages/Auth/SallerLogin";
import SallerSignUpPage from "./saller/Pages/Auth/SallerSingup";
import SallerChangePassword from "./saller/components/ChangePassword";
import SallerUpdateProfile from "./saller/components/UpdateProfile";
import AddProperty from "./saller/Pages/Properties/AddProperty";
import QueriesManagement from "./saller/Pages/Queries/ManageQueries";
import AllSallerProperties from "./saller/Pages/Properties/AllProperty";

import ROUTES_NAME from "./constants/routes";
import './Assets/Global.css';
import { ToastContainer } from "react-toastify";
import SearchPage from "./pages/SearchPage/SearchPage";
import SearchResults from "./pages/Search_Results/SearchResults";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES_NAME.HOME} element={<WithNavbarAndFooter WrappedComponent={HomePage} />} />
          <Route path={ROUTES_NAME.PROPERTIES} element={<WithNavbarAndFooter WrappedComponent={PropertiesPage} />} />
          <Route path={ROUTES_NAME.SEARCH_RESULTS} element={<SearchResults/>}/>
          <Route path={ROUTES_NAME.SEARCH} element={<SearchPage/>} />
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

          <Route path={ROUTES_NAME.SALLER_HOME} element={<SallerDashboard />} />
          <Route path={ROUTES_NAME.SALLER_LOGIN} element={<SallerLogin />} />
          <Route path={ROUTES_NAME.SALLER_SIGNUP} element={<SallerSignUpPage />} />
          <Route path={ROUTES_NAME.SALLER_UPDATE_PROFILE} element={<SallerUpdateProfile />} />
          <Route path={ROUTES_NAME.SALLER_CHANGE_PASSWORD} element={<SallerChangePassword />} />
          <Route path={ROUTES_NAME.SALLER_PROPERTY_ADD} element={<AddProperty />} />
          <Route path={ROUTES_NAME.SALLER_MANAGE_QUERIES} element={<QueriesManagement />} />
          <Route path={ROUTES_NAME.SALLER_ALLPROPERTIES} element={<AllSallerProperties />} />
        </Routes>
        <ToastContainer position="bottom-right" />
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
