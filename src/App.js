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
import SallerRoute from "./saller/SallerRoute";
import ROUTES_NAME from "./constants/routes";
import './Assets/Global.css';
import { ToastContainer } from "react-toastify";
import SearchPage from "./pages/SearchPage/SearchPage";
import SearchResults from "./pages/Search_Results/SearchResults";
import NotFound from "./pages/NotFound/NotFound";
import AdminRoute from "./admin/AdminRoute";

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

          <Route path="/admin/*" element={<AdminRoute />} />
          <Route path="/saller/*" element={<SallerRoute />} />
          <Route path="*" element={<WithNavbarAndFooter WrappedComponent={NotFound} />} />
        </Routes>
        <ToastContainer position="bottom-right" />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
