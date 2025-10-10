import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ROUTES_NAME from '../constants/routes';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import AdminDashboard from './Pages/Dashboard/Dashboard';

import ManageProperties from './Pages/Properties/components/AllProperties/ManageProperties';
import ManageUsers from './Pages/Users/ManageUsers';
import SallersManagement from './Pages/Brokers/ManageSellers';
import PaymentPage from './Pages/Payments/PaymentsPage';
import EditSubscriptionForm from './Pages/Subscription/EditSubs';
import ManageSubscription from './Pages/Subscription/ManageSubs';
import ManageProjects from './Pages/Projects/ManageProjects';
import FeaturedItem from './Pages/FeaturedItems/FeaturedItem';
import Feedback from './Pages/Feedbacks/Feedback';
import axios from 'axios';

// Protected Route Component - moved outside to prevent re-creation
const ProtectedRoute = ({ children }) => {
    const adminToken = localStorage.getItem('adminToken');

    if (!adminToken) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

// Public Route Component - moved outside to prevent re-creation
const PublicRoute = ({ children }) => {
    const adminToken = localStorage.getItem('adminToken');

    if (adminToken) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
};

const AdminRoute = () => {

    // Verify admin token on component mount
    useEffect(() => {
        const verifyAdminToken = async () => {
            const adminToken = localStorage.getItem('adminToken');
            

            if (adminToken) {
                try {
                    const response = await axios.post(
                        `https://api.landacre.in/api/admin/verify-admin-token`,
                        {},
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${adminToken}`
                            }
                        }
                    );

                  

                    if (!response.data.success) {
                        // If verification fails, remove token and redirect
                        localStorage.removeItem('adminToken');
                        window.location.href = '/admin/login';
                    }
                } catch (error) {
                    console.error('Error verifying admin token:', error);
                    localStorage.removeItem('adminToken');
                    window.location.href = '/admin/login';
                }
            }
        };

        verifyAdminToken();
    }, []);

    return (
        <Routes>
            <Route path="login" element={
                <PublicRoute>
                    <AdminLogin />
                </PublicRoute>
            } />

            {/* Protected Routes */}
            <Route path="dashboard" element={
                <ProtectedRoute>
                    <AdminDashboard />
                </ProtectedRoute>
            } />

            <Route path="properties" element={
                <ProtectedRoute>
                    <ManageProperties />
                </ProtectedRoute>
            } />

            <Route path="projects" element={
                <ProtectedRoute>
                    <ManageProjects />
                </ProtectedRoute>
            } />

            <Route path="users/manage" element={
                <ProtectedRoute>
                    <ManageUsers />
                </ProtectedRoute>
            } />

            <Route path="sallers/manage" element={
                <ProtectedRoute>
                    <SallersManagement />
                </ProtectedRoute>
            } />

            <Route path="/featured/manage" element={
                <ProtectedRoute>
                    <FeaturedItem />
                </ProtectedRoute>
            } />

            <Route path="feedbacks" element={
                <ProtectedRoute>
                    <Feedback />
                </ProtectedRoute>
            } />

            <Route path='all/payments' element={
                <ProtectedRoute>
                    <PaymentPage />
                </ProtectedRoute>
            } />

            <Route path="subscription/edit" element={
                <ProtectedRoute>
                    <EditSubscriptionForm />
                </ProtectedRoute>
            } />

            <Route path="/subscription/manage" element={
                <ProtectedRoute>
                    <ManageSubscription />
                </ProtectedRoute>
            } />
        </Routes>
    );
};

export default AdminRoute;
