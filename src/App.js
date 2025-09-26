import React, { Suspense, lazy, useEffect } from 'react';
// Using custom hooks instead of direct store access
import { useUI } from "./Hooks/index.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Assets/Global.css';
import { ToastContainer } from "react-toastify";
import ROUTES_NAME from "./constants/routes";
import WithNavbarAndFooter from "./HOCS/NavFotHoc";
import PageLoader from "./components/loaders/PageLoader";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load all components
const HomePage = lazy(() => import("./pages/homePage/HomePage"));
const PropertiesPage = lazy(() => import("./pages/propertiesPages/PropertiesPage"));
const AboutPage = lazy(() => import("./pages/aboutPage/AboutPage"));
const ContactPage = lazy(() => import("./pages/contactPage/ContactPage"));
const PropertyProfile = lazy(() => import('./pages/propertiesPages/PropertyProfile'));
const SearchResults = lazy(() => import("./pages/Search_Results/SearchResults"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const AdminRoute = lazy(() => import("./admin/AdminRoute"));
const SallerRoute = lazy(() => import("./saller/SallerRoute"));
const ProjectProfile = lazy(() => import("./pages/ProjectProfile/ProjectProfile"));
const Privacy_policy = lazy(() => import("./saller/Pages/Privacy_policy/Privacy_policy"));
const RealEstateAdvice = lazy(() => import("./pages/RealEstateAdvice/RealEstateAdvice"));
const HomeInspectionPage = lazy(() => import("./pages/servicesPages/HomeInspection"));
const InvestmentAdvisoryPage = lazy(() => import("./pages/servicesPages/InvestmentAdvisory"));
const LegalAssistancePage = lazy(() => import("./pages/servicesPages/LegalAssistance"));
const MortgageServicesPage = lazy(() => import("./pages/servicesPages/MortgageServices"));
const PropertyManagementPage = lazy(() => import("./pages/servicesPages/PropertyManagement"));
const PropertyValuationPage = lazy(() => import("./pages/servicesPages/PropertyValuation"));
const AgentsServicePage = lazy(() => import("./pages/servicesPages/AgentsService"));
const BuildersServicePage = lazy(() => import("./pages/servicesPages/BuildersService"));
const ArchitectsServicePage = lazy(() => import("./pages/servicesPages/ArchitectsService"));
const InteriorDecoratorsServicePage = lazy(() => import("./pages/servicesPages/InteriorDecoratorsService"));
const VaastuServicePage = lazy(() => import("./pages/servicesPages/VaastuService"));
const ContractorsServicePage = lazy(() => import("./pages/servicesPages/ContractorsService"));
const ConsultantsServicePage = lazy(() => import("./pages/servicesPages/ConsultantsService"));
const ProfilePage = lazy(() => import("./pages/profilepage/ProfilePage"));

// Protected route component that checks if user is logged in
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  
  if (!user) {
    // Redirect to home if user is not logged in
    return <Navigate to={ROUTES_NAME.HOME} replace />;
  }
  
  return children;
};

function App() {
  const { initUI } = useUI();
  
  // Initialize UI store on app start
  useEffect(() => {
    const cleanup = initUI();
    return cleanup;
  }, [initUI]);
  
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path={ROUTES_NAME.HOME} element={<WithNavbarAndFooter WrappedComponent={HomePage} />} />
            <Route path={ROUTES_NAME.PROPERTIES} element={<WithNavbarAndFooter WrappedComponent={PropertiesPage} />} />
            <Route path={ROUTES_NAME.SEARCH_RESULTS} element={<SearchResults/>}/>
            <Route path={ROUTES_NAME.ABOUT} element={<WithNavbarAndFooter WrappedComponent={AboutPage} />} />
            <Route path={ROUTES_NAME.CONTACT} element={<WithNavbarAndFooter WrappedComponent={ContactPage} />} />
            <Route path={ROUTES_NAME.VIEW_PROPERTY} element={<WithNavbarAndFooter WrappedComponent={PropertyProfile} />} />
            <Route path={ROUTES_NAME.VIEW_PROJECT} element={<WithNavbarAndFooter WrappedComponent={ProjectProfile} />} />
            <Route path={ROUTES_NAME.PRIVACY_POLICY} element={<WithNavbarAndFooter WrappedComponent={Privacy_policy} />} />
            <Route path={ROUTES_NAME.REAL_ESTATE_ADVICE} element={<WithNavbarAndFooter WrappedComponent={RealEstateAdvice} />} />
            <Route path={ROUTES_NAME.HOME_INSPACTION} element={<WithNavbarAndFooter WrappedComponent={HomeInspectionPage} />} />
            <Route path={ROUTES_NAME.SERVICE_INVESTMENT} element={<WithNavbarAndFooter WrappedComponent={InvestmentAdvisoryPage} />} />
            <Route path={ROUTES_NAME.LEGEL_ASSISTANCE} element={<WithNavbarAndFooter WrappedComponent={LegalAssistancePage} />} />
            <Route path={ROUTES_NAME.MORTGAGE_SERVICE} element={<WithNavbarAndFooter WrappedComponent={MortgageServicesPage} />} />
            <Route path={ROUTES_NAME.PROPERTY_MANAGEMENT} element={<WithNavbarAndFooter WrappedComponent={PropertyManagementPage} />} />
            <Route path={ROUTES_NAME.PROPERTY_VALUATION} element={<WithNavbarAndFooter WrappedComponent={PropertyValuationPage} />} />
            <Route path={ROUTES_NAME.AGENTS_SERVICE} element={<WithNavbarAndFooter WrappedComponent={AgentsServicePage} />} />
            <Route path={ROUTES_NAME.BUILDERS_SERVICE} element={<WithNavbarAndFooter WrappedComponent={BuildersServicePage} />} />
            <Route path={ROUTES_NAME.ARCHITECTS_SERVICE} element={<WithNavbarAndFooter WrappedComponent={ArchitectsServicePage} />} />
            <Route path={ROUTES_NAME.INTERIOR_DECORATORS_SERVICE} element={<WithNavbarAndFooter WrappedComponent={InteriorDecoratorsServicePage} />} />
            <Route path={ROUTES_NAME.VAASTU_SERVICE} element={<WithNavbarAndFooter WrappedComponent={VaastuServicePage} />} />
            <Route path={ROUTES_NAME.CONTRACTORS_SERVICE} element={<WithNavbarAndFooter WrappedComponent={ContractorsServicePage} />} />
            <Route path={ROUTES_NAME.CONSULTANTS_SERVICE} element={<WithNavbarAndFooter WrappedComponent={ConsultantsServicePage} />} />
            <Route path={ROUTES_NAME.PROFILE} element={
              <ProtectedRoute>
                <WithNavbarAndFooter WrappedComponent={ProfilePage} />
              </ProtectedRoute>
            } />

            <Route path="/admin/*" element={<AdminRoute />} />
            <Route path="/saller/*" element={<SallerRoute />} />
            <Route path="*" element={<WithNavbarAndFooter WrappedComponent={NotFound} />} />
          </Routes>
        </Suspense>
        <ToastContainer position="bottom-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
