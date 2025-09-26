import toast from 'react-hot-toast';

/**
 * Handle OTP-related errors and show appropriate messages to users
 * @param {Object} error - Error object from API response
 * @param {Function} setIsDisabled - Function to disable/enable the send button
 * @param {Function} setCountdown - Function to set countdown timer
 * @returns {Object} - Error handling result with message and actions
 */
export const handleOTPError = (error, setIsDisabled = null, setCountdown = null) => {
    const errorData = error.response?.data || {};
    const { message, error: errorCode, waitTime } = errorData;

    switch (errorCode) {
        case 'RATE_LIMIT_EXCEEDED':
            return handleRateLimitError(message, waitTime || 60, setIsDisabled, setCountdown);
        
        case 'PHONE_BLOCKED':
            return handlePhoneBlockedError(message);
        
        case 'OTP_SEND_FAILED':
            return handleSendFailedError(message);
        
        case 'INVALID_OTP':
            return handleInvalidOTPError(message);
        
        case 'NO_SESSION':
            return handleNoSessionError(message);
        
        case 'OTP_EXPIRED':
            return handleExpiredOTPError(message);
        
        default:
            return handleGenericError(message || 'An unexpected error occurred');
    }
};

/**
 * Handle rate limit exceeded error with countdown timer
 */
const handleRateLimitError = (message, waitTime, setIsDisabled, setCountdown) => {
    const displayMessage = message || 'Please wait 1 minute before requesting another OTP';
    
    // Show error toast
    toast.error(displayMessage, {
        duration: 4000,
        icon: '⏰',
        style: {
            borderRadius: '10px',
            background: '#FEF2F2',
            color: '#DC2626',
            border: '1px solid #FECACA'
        }
    });

    // Start countdown timer if functions are provided
    if (setIsDisabled && setCountdown) {
        setIsDisabled(true);
        let remainingTime = waitTime;
        setCountdown(remainingTime);

        const timer = setInterval(() => {
            remainingTime -= 1;
            setCountdown(remainingTime);

            if (remainingTime <= 0) {
                clearInterval(timer);
                setIsDisabled(false);
                setCountdown(0);
                toast.success('You can now request a new OTP', {
                    icon: '✅',
                    duration: 3000
                });
            }
        }, 1000);

        return { 
            success: false, 
            message: displayMessage, 
            waitTime,
            timer 
        };
    }

    return { 
        success: false, 
        message: displayMessage, 
        waitTime 
    };
};

/**
 * Handle phone blocked error
 */
const handlePhoneBlockedError = (message) => {
    const displayMessage = message || 'Phone number is temporarily blocked. Please try again later.';
    
    toast.error(displayMessage, {
        duration: 6000,
        icon: '🚫',
        style: {
            borderRadius: '10px',
            background: '#FEF2F2',
            color: '#DC2626',
            border: '1px solid #FECACA'
        }
    });

    return { success: false, message: displayMessage };
};

/**
 * Handle OTP send failed error
 */
const handleSendFailedError = (message) => {
    const displayMessage = message || 'Failed to send OTP. Please check your phone number and try again.';
    
    toast.error(displayMessage, {
        duration: 4000,
        icon: '📱',
        style: {
            borderRadius: '10px',
            background: '#FEF2F2',
            color: '#DC2626'
        }
    });

    return { success: false, message: displayMessage };
};

/**
 * Handle invalid OTP error
 */
const handleInvalidOTPError = (message) => {
    const displayMessage = message || 'Invalid OTP. Please check and try again.';
    
    toast.error(displayMessage, {
        duration: 3000,
        icon: '❌',
        style: {
            borderRadius: '10px',
            background: '#FEF2F2',
            color: '#DC2626'
        }
    });

    return { success: false, message: displayMessage };
};

/**
 * Handle session not found error
 */
const handleNoSessionError = (message) => {
    const displayMessage = message || 'Session expired. Please start the process again.';
    
    toast.error(displayMessage, {
        duration: 4000,
        icon: '🔄',
        style: {
            borderRadius: '10px',
            background: '#FEF2F2',
            color: '#DC2626'
        }
    });

    return { success: false, message: displayMessage, action: 'restart' };
};

/**
 * Handle OTP expired error
 */
const handleExpiredOTPError = (message) => {
    const displayMessage = message || 'OTP has expired. Please request a new one.';
    
    toast.error(displayMessage, {
        duration: 4000,
        icon: '⏰',
        style: {
            borderRadius: '10px',
            background: '#FEF2F2',
            color: '#DC2626'
        }
    });

    return { success: false, message: displayMessage, action: 'resend' };
};

/**
 * Handle generic errors
 */
const handleGenericError = (message) => {
    const displayMessage = message || 'Something went wrong. Please try again.';
    
    toast.error(displayMessage, {
        duration: 4000,
        icon: '⚠️'
    });

    return { success: false, message: displayMessage };
};

/**
 * Format countdown time for display
 * @param {number} seconds - Remaining seconds
 * @returns {string} - Formatted time string
 */
export const formatCountdownTime = (seconds) => {
    if (seconds <= 0) return '';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    return `${remainingSeconds}s`;
};

/**
 * Show success message for OTP sent
 */
export const showOTPSentSuccess = (phoneNumber) => {
    toast.success(`OTP sent to ${phoneNumber}`, {
        duration: 4000,
        icon: '📱',
        style: {
            borderRadius: '10px',
            background: '#F0FDF4',
            color: '#166534',
            border: '1px solid #BBF7D0'
        }
    });
};

/**
 * Show success message for OTP verified
 */
export const showOTPVerifiedSuccess = () => {
    toast.success('OTP verified successfully!', {
        duration: 3000,
        icon: '✅',
        style: {
            borderRadius: '10px',
            background: '#F0FDF4',
            color: '#166534',
            border: '1px solid #BBF7D0'
        }
    });
}; 