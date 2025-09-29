import { useState, useCallback } from 'react';
import axios from 'axios';
import { handleOTPError, showOTPSentSuccess, showOTPVerifiedSuccess } from '../utils/otpErrorHandler';

const useOTP = (baseURL = process.env.REACT_APP_backendUrl || 'https://api.landacre.in') => {
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState(null);
    const [isOTPSent, setIsOTPSent] = useState(false);

    // Send OTP for user registration
    const sendUserRegistrationOTP = useCallback(async (userData, setIsDisabled, setCountdown) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios.post(`${baseURL}/api/users/register`, userData);
            showOTPSentSuccess(userData.phoneNumber);
            setIsOTPSent(true);
            return response.data;
        } catch (error) {
            const result = handleOTPError(error, setIsDisabled, setCountdown);
            setError(result.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [baseURL]);

    // Verify user registration OTP
    const verifyUserRegistrationOTP = useCallback(async (phoneNumber, otp) => {
        setIsVerifying(true);
        setError(null);

        try {
            const response = await axios.post(`${baseURL}/api/users/verify-registration-otp`, {
                phoneNumber,
                otp
            });
            showOTPVerifiedSuccess();
            return response.data;
        } catch (error) {
            const result = handleOTPError(error);
            setError(result.message);
            throw error;
        } finally {
            setIsVerifying(false);
        }
    }, [baseURL]);

    // Send OTP for admin login
    const sendAdminLoginOTP = useCallback(async (email, password, setIsDisabled, setCountdown) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${baseURL}/api/users/admin-login`, {
                email,
                password
            });
            showOTPSentSuccess("your registered phone number");
            setIsOTPSent(true);
            return response.data;
        } catch (error) {
            const result = handleOTPError(error, setIsDisabled, setCountdown);
            setError(result.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [baseURL]);

    // Verify admin login OTP
    const verifyAdminLoginOTP = useCallback(async (email, otp) => {
        setIsVerifying(true);
        setError(null);

        try {
            const response = await axios.post(`${baseURL}/api/users/verify-admin-otp`, {
                email,
                otp
            });
            showOTPVerifiedSuccess();
            return response.data;
        } catch (error) {
            const result = handleOTPError(error);
            setError(result.message);
            throw error;
        } finally {
            setIsVerifying(false);
        }
    }, [baseURL]);

    // Send OTP for password change
    const sendPasswordChangeOTP = useCallback(async (phoneNumber, setIsDisabled, setCountdown) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${baseURL}/api/users/change-password`, {
                phoneNumber
            });
            showOTPSentSuccess(phoneNumber);
            setIsOTPSent(true);
            return response.data;
        } catch (error) {
            const result = handleOTPError(error, setIsDisabled, setCountdown);
            setError(result.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [baseURL]);

    // Verify password change OTP
    const verifyPasswordChangeOTP = useCallback(async (phoneNumber, otp, newPassword) => {
        setIsVerifying(true);
        setError(null);

        try {
            const response = await axios.post(`${baseURL}/api/users/pass-change-otp-verify`, {
                phoneNumber,
                otp,
                newPassword
            });
            showOTPVerifiedSuccess();
            return response.data;
        } catch (error) {
            const result = handleOTPError(error);
            setError(result.message);
            throw error;
        } finally {
            setIsVerifying(false);
        }
    }, [baseURL]);

    // Send OTP for seller registration
    const sendSellerRegistrationOTP = useCallback(async (sellerData, setIsDisabled, setCountdown) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${baseURL}/api/sellers/register`, sellerData);
            showOTPSentSuccess(sellerData.phone);
            setIsOTPSent(true);
            return response.data;
        } catch (error) {
            const result = handleOTPError(error, setIsDisabled, setCountdown);
            setError(result.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [baseURL]);

    // Verify seller registration OTP
    const verifySellerRegistrationOTP = useCallback(async (phone, otp) => {
        setIsVerifying(true);
        setError(null);

        try {
            const response = await axios.post(`${baseURL}/api/sellers/verify-registration-otp`, {
                phone,
                otp
            });
            showOTPVerifiedSuccess();
            return response.data;
        } catch (error) {
            const result = handleOTPError(error);
            setError(result.message);
            throw error;
        } finally {
            setIsVerifying(false);
        }
    }, [baseURL]);

    // Send OTP for seller login
    const sendSellerLoginOTP = useCallback(async (email, password, setIsDisabled, setCountdown) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${baseURL}/api/sellers/login`, {
                email,
                password
            });
            showOTPSentSuccess("your registered phone number");
            setIsOTPSent(true);
            return response.data;
        } catch (error) {
            const result = handleOTPError(error, setIsDisabled, setCountdown);
            setError(result.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [baseURL]);

    // Verify seller login OTP
    const verifySellerLoginOTP = useCallback(async (email, otp) => {
        setIsVerifying(true);
        setError(null);

        try {
            const response = await axios.post(`${baseURL}/api/sellers/verify-login-otp`, {
                email,
                otp
            });
            showOTPVerifiedSuccess();
            return response.data;
        } catch (error) {
            const result = handleOTPError(error);
            setError(result.message);
            throw error;
        } finally {
            setIsVerifying(false);
        }
    }, [baseURL]);

    // Send OTP for seller password change
    const sendSellerPasswordChangeOTP = useCallback(async (phone, setIsDisabled, setCountdown) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${baseURL}/api/sellers/send-change-password-otp`, {
                phone
            });
            showOTPSentSuccess(phone);
            setIsOTPSent(true);
            return response.data;
        } catch (error) {
            const result = handleOTPError(error, setIsDisabled, setCountdown);
            setError(result.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [baseURL]);

    // Verify seller password change OTP
    const verifySellerPasswordChangeOTP = useCallback(async (phone, otp, newPassword) => {
        setIsVerifying(true);
        setError(null);

        try {
            const response = await axios.post(`${baseURL}/api/sellers/change-password`, {
                phone,
                otp,
                newPassword
            });
            showOTPVerifiedSuccess();
            return response.data;
        } catch (error) {
            const result = handleOTPError(error);
            setError(result.message);
            throw error;
        } finally {
            setIsVerifying(false);
        }
    }, [baseURL]);

    // Reset state
    const resetOTPState = useCallback(() => {
        setIsLoading(false);
        setIsVerifying(false);
        setError(null);
        setIsOTPSent(false);
    }, []);

    return {
        // State
        isLoading,
        isVerifying,
        error,
        isOTPSent,
        
        // User functions
        sendUserRegistrationOTP,
        verifyUserRegistrationOTP,
        sendAdminLoginOTP,
        verifyAdminLoginOTP,
        sendPasswordChangeOTP,
        verifyPasswordChangeOTP,
        
        // Seller functions
        sendSellerRegistrationOTP,
        verifySellerRegistrationOTP,
        sendSellerLoginOTP,
        verifySellerLoginOTP,
        sendSellerPasswordChangeOTP,
        verifySellerPasswordChangeOTP,
        
        // Utility functions
        resetOTPState
    };
};

export default useOTP; 