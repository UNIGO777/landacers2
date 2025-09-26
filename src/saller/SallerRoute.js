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

    const Isnotbuilder = ({ children }) => {
        if (!builderConfirmation) {
            return <SellerConfirmation />
        }
        if (!isBuilder && builderConfirmation) {
            return <NotABuilder />
        }
        return children
    }

    const LayoutInclude = ({ children }) => {
        return (
            <Layout sellerDetails={sallerDetails} isbuilder={isBuilder}>
                {children}
            </Layout>
        )
    }



    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path="login" element={<PublicRoute><SallerLogin /></PublicRoute>} />
                <Route path="signup" element={<PublicRoute><SallerSignUpPage /></PublicRoute>} />
                <Route path="dashboard" element={
                    <ProtectedRoute>
                        <LayoutInclude><SallerDashboard /></LayoutInclude>
                    </ProtectedRoute>
                } />
                <Route path="update-profile" element={
                    <ProtectedRoute>
                        <LayoutInclude><SallerUpdateProfile sellerDetails={sellerDetailsPromise} /></LayoutInclude>
                    </ProtectedRoute>
                } />
                <Route path="change-password" element={
                    <ProtectedRoute>
                        <LayoutInclude><SallerChangePassword /></LayoutInclude>
                    </ProtectedRoute>
                } />
                <Route path="property/add" element={
                    <ProtectedRoute>
                        <LayoutInclude><AddProperty /></LayoutInclude>
                    </ProtectedRoute>
                } />
                <Route path="project/add" element={
                    <ProtectedRoute>
                        <Isnotbuilder><LayoutInclude><AddProject /></LayoutInclude></Isnotbuilder>
                    </ProtectedRoute>
                } />
                <Route path="queries/manage" element={
                    <ProtectedRoute>
                        <LayoutInclude><QueriesManagement isBuilder={isBuilder} /></LayoutInclude>
                    </ProtectedRoute>
                } />
                <Route path="properties" element={
                    <ProtectedRoute>
                        <LayoutInclude><AllSallerProperties /></LayoutInclude>
                    </ProtectedRoute>
                } />
                <Route path="projects" element={
                    <ProtectedRoute>
                        <Isnotbuilder><LayoutInclude><AllSallerProjects /></LayoutInclude></Isnotbuilder>
                    </ProtectedRoute>
                } />
                <Route path="subscription" element={
                    <ProtectedRoute>
                        <LayoutInclude><SubscriptionComingSoon /></LayoutInclude>
                    </ProtectedRoute>
                } />
                <Route path="notifications" element={
                    <ProtectedRoute>
                        <LayoutInclude><SellerNotification /></LayoutInclude>
                    </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default SallerRoute;