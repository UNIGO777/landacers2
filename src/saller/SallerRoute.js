import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ROUTES_NAME from '../constants/routes';
import sellerDetailsPromise from './Requests/FatchSellerData';
import Layout from './Layout';
import PageLoader from '../components/loaders/PageLoader';

// Lazy load all components
const SallerDashboard = lazy(() => import('./Pages/Dashoard/Dashboard'));
const SallerLogin = lazy(() => import('./Pages/Auth/SallerLogin'));
const SallerSignUpPage = lazy(() => import('./Pages/Auth/SallerSingup'));
const SallerChangePassword = lazy(() => import('./Pages/Profile/ChangePassword'));
const SallerUpdateProfile = lazy(() => import('./Pages/Profile/UpdateProfile'));
const AddProperty = lazy(() => import('./Pages/Properties/AddProperty'));
const QueriesManagement = lazy(() => import('./Pages/Queries/ManageQueries'));
const AllSallerProperties = lazy(() => import('./Pages/Properties/AllProperty'));
const AllSallerProjects = lazy(() => import('./Pages/Projects/AllProjects'));
const AddProject = lazy(() => import('./Pages/Projects/AddProject'));
const NotABuilder = lazy(() => import('./components/NotABuilder'));
const SellerConfirmation = lazy(() => import('./components/SellerConfirmation'));
const SubscriptionComingSoon = lazy(() => import('./components/SubscriptionComingSoon'));
const SellerNotification = lazy(() => import('./Pages/SellerNotification.js/Notification'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

// Route components moved outside to prevent recreation
const ProtectedRoute = ({ children }) => {
    const sellerToken = localStorage.getItem('sellerToken');
    if (!sellerToken) {
        return <Navigate to="/saller/login" replace />;
    }
    return children;
};

const PublicRoute = ({ children }) => {
    const sellerToken = localStorage.getItem('sellerToken');

    if (sellerToken) {
        window.location.href = '/saller/dashboard';
        return null;
    }

    return children;
};

const Isnotbuilder = ({ children, builderConfirmation, isBuilder }) => {
    if (!builderConfirmation) {
        return <SellerConfirmation />
    }
    if (!isBuilder && builderConfirmation) {
        return <NotABuilder />
    }
    return children
};

const LayoutInclude = ({ children, sallerDetails, isBuilder }) => {
    return (
        <Layout sellerDetails={sallerDetails} isbuilder={isBuilder}>
            {children}
        </Layout>
    )
};


const SallerRoute = () => {
    const [sallerDetails, setSallerDetails] = useState(null)
    const [isBuilder, setIsBuilder] = useState(false)
    const [builderConfirmation, setBuilderConfirmation] = useState(false)


    useEffect(() => {
        const fetchSallerDetails = async () => {
            const seller = await sellerDetailsPromise;
            setSallerDetails(seller)
            if (seller?.sellerType === 'Builder') {
                setIsBuilder(true)
            }
            setBuilderConfirmation(true)
        }
        fetchSallerDetails()
    }, [])





    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path="login" element={<PublicRoute><SallerLogin /></PublicRoute>} />
                <Route path="signup" element={<PublicRoute><SallerSignUpPage /></PublicRoute>} />
                <Route path="dashboard" element={
                    <ProtectedRoute>
                        <LayoutInclude sallerDetails={sallerDetails} isBuilder={isBuilder}><SallerDashboard /></LayoutInclude>
                    </ProtectedRoute>
                } />
                <Route path="update-profile" element={
                    <ProtectedRoute>
                        <LayoutInclude sallerDetails={sallerDetails} isBuilder={isBuilder}><SallerUpdateProfile sellerDetails={sellerDetailsPromise} /></LayoutInclude>
                    </ProtectedRoute>
                } />
                <Route path="change-password" element={
                    <ProtectedRoute>
                        <LayoutInclude sallerDetails={sallerDetails} isBuilder={isBuilder}><SallerChangePassword /></LayoutInclude>
                    </ProtectedRoute>
                } />
                <Route path="property/add" element={
                    <ProtectedRoute>
                        <LayoutInclude sallerDetails={sallerDetails} isBuilder={isBuilder}><AddProperty /></LayoutInclude>
                    </ProtectedRoute>
                } />
                <Route path="project/add" element={
                    <ProtectedRoute>
                        <Isnotbuilder builderConfirmation={builderConfirmation} isBuilder={isBuilder}><LayoutInclude sallerDetails={sallerDetails} isBuilder={isBuilder}><AddProject /></LayoutInclude></Isnotbuilder>
                    </ProtectedRoute>
                } />
                <Route path="queries/manage" element={
                    <ProtectedRoute>
                        <LayoutInclude sallerDetails={sallerDetails} isBuilder={isBuilder}><QueriesManagement isBuilder={isBuilder} /></LayoutInclude>
                    </ProtectedRoute>
                } />
                <Route path="properties" element={
                    <ProtectedRoute>
                        <LayoutInclude sallerDetails={sallerDetails} isBuilder={isBuilder}><AllSallerProperties /></LayoutInclude>
                    </ProtectedRoute>
                } />
                <Route path="projects" element={
                    <ProtectedRoute>
                        <Isnotbuilder builderConfirmation={builderConfirmation} isBuilder={isBuilder}><LayoutInclude sallerDetails={sallerDetails} isBuilder={isBuilder}><AllSallerProjects /></LayoutInclude></Isnotbuilder>
                    </ProtectedRoute>
                } />
                <Route path="subscription" element={
                    <ProtectedRoute>
                        <LayoutInclude sallerDetails={sallerDetails} isBuilder={isBuilder}><SubscriptionComingSoon /></LayoutInclude>
                    </ProtectedRoute>
                } />
                <Route path="notifications" element={
                    <ProtectedRoute>
                        <LayoutInclude sallerDetails={sallerDetails} isBuilder={isBuilder}><SellerNotification /></LayoutInclude>
                    </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default SallerRoute;