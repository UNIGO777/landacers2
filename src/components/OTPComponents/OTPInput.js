import React, { useState, useEffect, useRef } from 'react';
import { Clock, RefreshCw, Send, Shield } from 'lucide-react';
import { handleOTPError, formatCountdownTime, showOTPSentSuccess, showOTPVerifiedSuccess } from '../../utils/otpErrorHandler';

const OTPInput = ({
    length = 6,
    onComplete,
    onResend,
    phoneNumber,
    isLoading = false,
    className = '',
    showResendButton = true,
    resendCooldown = 30, // Default 30 seconds for resend
    title = "Enter OTP",
    subtitle = "We've sent a verification code to your WhatsApp"
}) => {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const [activeOTPIndex, setActiveOTPIndex] = useState(0);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [resendCountdown, setResendCountdown] = useState(0);
    const [rateLimitCountdown, setRateLimitCountdown] = useState(0);
    const [error, setError] = useState('');
    
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeOTPIndex]);

    const handleOnChange = (e, index) => {
        const { value } = e.target;
        const newOTP = [...otp];
        
        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;
        
        newOTP[index] = value;
        setOtp(newOTP);
        setError('');

        // Move to next input if value entered
        if (value && index < length - 1) {
            setActiveOTPIndex(index + 1);
        }

        // Auto-submit when OTP is complete
        const otpValue = newOTP.join('');
        if (otpValue.length === length) {
            onComplete(otpValue);
        }
    };

    const handleOnKeyDown = (e, index) => {
        const { key } = e;
        
        if (key === 'Backspace') {
            const newOTP = [...otp];
            newOTP[index] = '';
            setOtp(newOTP);
            
            // Move to previous input if current is empty
            if (index > 0) {
                setActiveOTPIndex(index - 1);
            }
        } else if (key === 'ArrowLeft' && index > 0) {
            setActiveOTPIndex(index - 1);
        } else if (key === 'ArrowRight' && index < length - 1) {
            setActiveOTPIndex(index + 1);
        } else if (key === 'Enter' && otp.join('').length === length) {
            onComplete(otp.join(''));
        }
    };

    const handleOnFocus = (index) => {
        setActiveOTPIndex(index);
    };

    const handleOnPaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain');
        const pastedChars = pastedData.replace(/\D/g, '').slice(0, length);
        
        if (pastedChars.length > 0) {
            const newOTP = [...otp];
            for (let i = 0; i < length; i++) {
                newOTP[i] = pastedChars[i] || '';
            }
            setOtp(newOTP);
            setActiveOTPIndex(Math.min(pastedChars.length, length - 1));
            
            // Auto-submit if complete
            if (pastedChars.length === length) {
                onComplete(pastedChars);
            }
        }
    };

    const handleResend = async () => {
        try {
            setError('');
            await onResend();
            showOTPSentSuccess(phoneNumber);
            
            // Start resend cooldown
            setIsResendDisabled(true);
            setResendCountdown(resendCooldown);
            
            const timer = setInterval(() => {
                setResendCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsResendDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            
        } catch (error) {
            const result = handleOTPError(error, setIsResendDisabled, setRateLimitCountdown);
            setError(result.message);
        }
    };

    const clearOTP = () => {
        setOtp(new Array(length).fill(''));
        setActiveOTPIndex(0);
        setError('');
        inputRef.current?.focus();
    };

    return (
        <div className={`max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
            {/* Header */}
            <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600 text-sm">
                    {subtitle}
                    {phoneNumber && (
                        <span className="block font-medium text-gray-900 mt-1">
                            {phoneNumber}
                        </span>
                    )}
                </p>
            </div>

            {/* OTP Input Fields */}
            <div className="flex justify-center space-x-3 mb-6">
                {otp.map((_, index) => (
                    <input
                        key={index}
                        ref={index === activeOTPIndex ? inputRef : null}
                        type="text"
                        className={`w-12 h-14 border-2 rounded-xl text-center text-xl font-bold transition-all duration-200 ${
                            activeOTPIndex === index
                                ? 'border-blue-500 ring-2 ring-blue-200 shadow-md'
                                : error
                                ? 'border-red-300 bg-red-50'
                                : otp[index]
                                ? 'border-green-400 bg-green-50 text-green-700'
                                : 'border-gray-300 hover:border-gray-400'
                        } focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                        onChange={(e) => handleOnChange(e, index)}
                        onKeyDown={(e) => handleOnKeyDown(e, index)}
                        onFocus={() => handleOnFocus(index)}
                        onPaste={handleOnPaste}
                        value={otp[index]}
                        disabled={isLoading}
                        maxLength={1}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="one-time-code"
                    />
                ))}
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm text-center font-medium">{error}</p>
                </div>
            )}

            {/* Rate Limit Warning */}
            {rateLimitCountdown > 0 && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-amber-600 mr-2" />
                    <p className="text-amber-700 text-sm font-medium">
                        Please wait {formatCountdownTime(rateLimitCountdown)} before requesting another OTP
                    </p>
                </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
                {/* Clear OTP Button */}
                {otp.some(digit => digit !== '') && (
                    <button
                        onClick={clearOTP}
                        className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                        disabled={isLoading}
                    >
                        <RefreshCw className="w-4 h-4 inline mr-2" />
                        Clear OTP
                    </button>
                )}

                {/* Resend Button */}
                {showResendButton && (
                    <button
                        onClick={handleResend}
                        disabled={isResendDisabled || rateLimitCountdown > 0 || isLoading}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                            isResendDisabled || rateLimitCountdown > 0 || isLoading
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                        }`}
                    >
                        <Send className="w-4 h-4 mr-2" />
                        {isLoading ? (
                            'Sending...'
                        ) : isResendDisabled && resendCountdown > 0 ? (
                            `Resend OTP (${formatCountdownTime(resendCountdown)})`
                        ) : rateLimitCountdown > 0 ? (
                            `Wait ${formatCountdownTime(rateLimitCountdown)}`
                        ) : (
                            'Resend OTP'
                        )}
                    </button>
                )}
            </div>

            {/* Help Text */}
            <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                    Didn't receive the code? Check your WhatsApp messages or 
                    <button 
                        onClick={handleResend}
                        disabled={isResendDisabled || rateLimitCountdown > 0 || isLoading}
                        className="text-blue-600 hover:text-blue-700 ml-1 underline disabled:text-gray-400 disabled:no-underline"
                    >
                        try again
                    </button>
                </p>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-80 rounded-2xl flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-blue-600 font-medium">Verifying...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OTPInput; 