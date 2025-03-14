import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ROUTES_NAME from '../constants/routes';
import SallerDashboard from './Pages/Dashoard/Dashboard';
import SallerLogin from './Pages/Auth/SallerLogin';
import SallerSignUpPage from './Pages/Auth/SallerSingup';
import SallerChangePassword from './Pages/Profile/ChangePassword';
import SallerUpdateProfile from './Pages/Profile/UpdateProfile';
import AddProperty from './Pages/Properties/AddProperty';
import QueriesManagement from './Pages/Queries/ManageQueries';
import AllSallerProperties from './Pages/Properties/AllProperty';
import AllSallerProjects from './Pages/Projects/AllProjects';
import AddProject from './Pages/Projects/AddProject';
import sellerDetailsPromise from './Requests/FatchSellerData';
import Layout from './Layout';
import NotABuilder from './components/NotABuilder';
import SellerConfirmation from './components/SellerConfirmation';
import SubscriptionComingSoon from './components/SubscriptionComingSoon';
import sellerDetails from './Requests/FatchSellerData';
import SellerNotification from './Pages/SellerNotification.js/Notification';
import NotFound from '../pages/NotFound/NotFound';


const ProtectedRoute = ({ children }) => {
    const sellerToken = localStorage.getItem('sellerToken');
    if (!sellerToken) {
        return <Navigate to="/seller/login" replace />;
    }
    return children;
};


const PublicRoute = ({ children }) => {
    const sellerToken = localStorage.getItem('sellerToken');

    if (sellerToken) {
        return <Navigate to="/seller/dashboard" replace />;
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
            console.log(seller)
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
                    <LayoutInclude><SallerUpdateProfile sellerDetails={sellerDetails} /></LayoutInclude>
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
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default SallerRoute;