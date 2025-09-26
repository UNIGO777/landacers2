import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Phone } from 'lucide-react';
import OTPInput from '../OTPComponents/OTPInput';
import useOTP from '../../hooks/useOTP';

const LoginWithOTP = ({ userType = 'user' }) => {
    const [step, setStep] = useState(1); // 1: credentials, 2: OTP
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phoneNumber: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const {
        isLoading,
        isVerifying,
        error,
        isOTPSent,
        sendUserRegistrationOTP,
        verifyUserRegistrationOTP,
        sendSellerLoginOTP,
        verifySellerLoginOTP,
        sendAdminLoginOTP,
        verifyAdminLoginOTP,
        resetOTPState
    } = useOTP();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();
        
        try {
            let response;
            
            if (userType === 'admin') {
                response = await sendAdminLoginOTP(
                    formData.email, 
                    formData.password, 
                    setIsButtonDisabled, 
                    setCountdown
                );
            } else if (userType === 'seller') {
                response = await sendSellerLoginOTP(
                    formData.email, 
                    formData.password, 
                    setIsButtonDisabled, 
                    setCountdown
                );
            } else {
                // For user registration example
                response = await sendUserRegistrationOTP(
                    formData, 
                    setIsButtonDisabled, 
                    setCountdown
                );
            }
            
            if (response) {
                setStep(2);
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const handleVerifyOTP = async (otp) => {
        try {
            let response;
            
            if (userType === 'admin') {
                response = await verifyAdminLoginOTP(formData.email, otp);
            } else if (userType === 'seller') {
                response = await verifySellerLoginOTP(formData.email, otp);
            } else {
                response = await verifyUserRegistrationOTP(formData.phoneNumber, otp);
            }
            
            if (response) {
                // Handle successful verification
                console.log('Login/Registration successful:', response);
                // Redirect or update UI as needed
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    const handleResendOTP = async () => {
        try {
            if (userType === 'admin') {
                await sendAdminLoginOTP(
                    formData.email, 
                    formData.password, 
                    setIsButtonDisabled, 
                    setCountdown
                );
            } else if (userType === 'seller') {
                await sendSellerLoginOTP(
                    formData.email, 
                    formData.password, 
                    setIsButtonDisabled, 
                    setCountdown
                );
            } else {
                await sendUserRegistrationOTP(
                    formData, 
                    setIsButtonDisabled, 
                    setCountdown
                );
            }
        } catch (error) {
            console.error('Error resending OTP:', error);
        }
    };

    const handleBackToLogin = () => {
        setStep(1);
        resetOTPState();
    };

    if (step === 2) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <OTPInput
                        length={6}
                        onComplete={handleVerifyOTP}
                        onResend={handleResendOTP}
                        phoneNumber={formData.phoneNumber || "your registered phone"}
                        isLoading={isVerifying}
                        title="Verify Your Identity"
                        subtitle="We've sent a verification code to your WhatsApp"
                    />
                    
                    <button
                        onClick={handleBackToLogin}
                        className="w-full mt-4 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {userType === 'admin' ? 'Admin Login' : 
                         userType === 'seller' ? 'Seller Login' : 'User Registration'}
                    </h1>
                    <p className="text-gray-600">
                        {userType === 'admin' ? 'Access your admin dashboard' :
                         userType === 'seller' ? 'Access your seller account' : 'Create your account'}
                    </p>
                </div>

                <form onSubmit={handleSendOTP} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    {/* Phone Number for User Registration */}
                    {userType === 'user' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Rate Limit Warning */}
                    {countdown > 0 && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <p className="text-amber-700 text-sm text-center">
                                Please wait {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')} before requesting another OTP
                            </p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm text-center">{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading || isButtonDisabled}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                            isLoading || isButtonDisabled
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                        }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Sending OTP...
                            </div>
                        ) : (
                            `Send OTP${countdown > 0 ? ` (${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')})` : ''}`
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginWithOTP; 