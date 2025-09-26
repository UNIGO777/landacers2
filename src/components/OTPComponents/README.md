# OTP System - Frontend Implementation

This directory contains the complete frontend implementation for the secure OTP system with rate limiting, error handling, and user-friendly UI components.

## 🚀 Features

- **Secure OTP Input**: Professional 6-digit OTP input with auto-focus and validation
- **Rate Limiting**: Automatic handling of "wait 1 minute" messages from backend
- **Countdown Timers**: Visual countdown for both resend cooldown and rate limit periods
- **Error Handling**: Comprehensive error messages with appropriate icons and colors
- **Professional UI**: Modern design with Lucide React icons and Tailwind CSS
- **Auto-completion**: Automatic form submission when OTP is complete
- **Loading States**: Visual feedback during OTP sending and verification

## 📁 File Structure

```
src/
├── utils/
│   └── otpErrorHandler.js       # Error handling utility functions
├── hooks/
│   └── useOTP.js               # Custom hook for OTP operations
├── components/
│   ├── OTPComponents/
│   │   ├── OTPInput.js         # Reusable OTP input component
│   │   └── README.md           # This documentation file
│   └── ExampleUsage/
│       └── LoginWithOTP.js     # Example implementation
```

## 🛠️ Quick Setup

### 1. Install Dependencies

Make sure you have the required packages:

```bash
npm install react-hot-toast lucide-react axios
```

### 2. Environment Variables

Add to your `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000
```

### 3. Import and Use

```jsx
import OTPInput from './components/OTPComponents/OTPInput';
import useOTP from './hooks/useOTP';
import { handleOTPError } from './utils/otpErrorHandler';
```

## 📚 Component Usage

### OTPInput Component

```jsx
import OTPInput from './components/OTPComponents/OTPInput';

const MyComponent = () => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const handleOTPComplete = async (otp) => {
        try {
            // Verify OTP with your API
            const response = await verifyOTP(otp);
            console.log('OTP verified:', response);
        } catch (error) {
            console.error('Verification failed:', error);
        }
    };

    const handleResendOTP = async () => {
        try {
            // Resend OTP
            await sendOTP(phoneNumber, setIsDisabled, setCountdown);
        } catch (error) {
            console.error('Resend failed:', error);
        }
    };

    return (
        <OTPInput
            length={6}
            onComplete={handleOTPComplete}
            onResend={handleResendOTP}
            phoneNumber="+1234567890"
            isLoading={false}
            title="Enter OTP"
            subtitle="We've sent a verification code to your WhatsApp"
        />
    );
};
```

### useOTP Hook

```jsx
import useOTP from './hooks/useOTP';

const LoginComponent = () => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);
    
    const {
        isLoading,
        isVerifying,
        error,
        sendSellerLoginOTP,
        verifySellerLoginOTP
    } = useOTP();

    const handleLogin = async () => {
        try {
            // This will automatically handle rate limiting and show appropriate messages
            await sendSellerLoginOTP(email, password, setIsDisabled, setCountdown);
        } catch (error) {
            // Error is already handled by the hook
            console.log('Login failed');
        }
    };

    const handleVerifyOTP = async (otp) => {
        try {
            const result = await verifySellerLoginOTP(email, otp);
            // Handle successful login
            localStorage.setItem('token', result.token);
        } catch (error) {
            // Error is already handled by the hook
            console.log('Verification failed');
        }
    };

    return (
        <div>
            {/* Your login form */}
            <button 
                onClick={handleLogin}
                disabled={isLoading || isDisabled}
            >
                {isLoading ? 'Sending...' : 'Login'}
            </button>
            
            {/* Show countdown if rate limited */}
            {countdown > 0 && (
                <p>Please wait {countdown} seconds before trying again</p>
            )}
        </div>
    );
};
```

## 🚨 Error Handling

### Backend Error Codes

The system handles these specific error codes from the backend:

- `RATE_LIMIT_EXCEEDED`: Shows countdown timer and disables button
- `PHONE_BLOCKED`: Shows blocked message with time remaining
- `OTP_SEND_FAILED`: Shows send failure message
- `INVALID_OTP`: Shows invalid OTP message
- `NO_SESSION`: Shows session expired message
- `OTP_EXPIRED`: Shows expired OTP message

### Error Response Format

Expected backend error response:

```json
{
    "message": "Please wait 1 minute before requesting another OTP. Too many requests in a short time.",
    "error": "RATE_LIMIT_EXCEEDED",
    "waitTime": 60,
    "action": "WAIT_AND_RETRY"
}
```

### Custom Error Handling

```jsx
import { handleOTPError } from './utils/otpErrorHandler';

try {
    await sendOTP();
} catch (error) {
    const result = handleOTPError(error, setIsDisabled, setCountdown);
    
    if (result.waitTime) {
        // Handle rate limiting
        console.log(`Wait ${result.waitTime} seconds`);
    }
    
    if (result.action === 'restart') {
        // Handle session expired
        resetForm();
    }
}
```

## 🎨 UI Customization

### Custom Styling

```jsx
<OTPInput
    className="my-custom-class"
    length={6}
    onComplete={handleComplete}
    // ... other props
/>
```

### Custom CSS

```css
.otp-input-custom {
    /* Override default styles */
    border-radius: 8px;
    border-color: #your-color;
}

.otp-input-custom:focus {
    border-color: #your-focus-color;
    box-shadow: 0 0 0 3px rgba(your-color, 0.1);
}
```

## 📱 Mobile Responsiveness

The components are fully responsive and include:

- Touch-friendly input fields
- Proper keyboard types for mobile (`inputMode="numeric"`)
- Accessible tap targets
- Responsive spacing and sizing

## ♿ Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Screen reader compatible
- Focus management
- High contrast support

## 🔒 Security Features

### Frontend Security

- Input validation and sanitization
- XSS prevention
- Secure token storage recommendations
- Rate limiting UI feedback

### Integration with Backend Security

- Automatic handling of rate limits
- Secure OTP transmission
- Session management
- Error message standardization

## 📊 Usage Examples

### Basic Registration Flow

```jsx
const RegistrationFlow = () => {
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({});
    const { sendUserRegistrationOTP, verifyUserRegistrationOTP } = useOTP();

    const handleRegister = async (formData) => {
        try {
            await sendUserRegistrationOTP(formData);
            setUserData(formData);
            setStep(2);
        } catch (error) {
            // Error handled automatically
        }
    };

    const handleVerify = async (otp) => {
        try {
            await verifyUserRegistrationOTP(userData.phoneNumber, otp);
            setStep(3); // Success page
        } catch (error) {
            // Error handled automatically
        }
    };

    return (
        <div>
            {step === 1 && <RegistrationForm onSubmit={handleRegister} />}
            {step === 2 && <OTPInput onComplete={handleVerify} />}
            {step === 3 && <SuccessPage />}
        </div>
    );
};
```

### Admin Login Flow

```jsx
const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showOTP, setShowOTP] = useState(false);
    const { sendAdminLoginOTP, verifyAdminLoginOTP } = useOTP();

    const handleLogin = async () => {
        try {
            await sendAdminLoginOTP(credentials.email, credentials.password);
            setShowOTP(true);
        } catch (error) {
            // Error handled automatically
        }
    };

    const handleVerifyAdmin = async (otp) => {
        try {
            const result = await verifyAdminLoginOTP(credentials.email, otp);
            // Redirect to admin dashboard
            window.location.href = '/admin/dashboard';
        } catch (error) {
            // Error handled automatically
        }
    };

    return (
        <div>
            {!showOTP ? (
                <AdminLoginForm 
                    credentials={credentials}
                    setCredentials={setCredentials}
                    onSubmit={handleLogin}
                />
            ) : (
                <OTPInput
                    onComplete={handleVerifyAdmin}
                    title="Admin Verification"
                    subtitle="Enter the OTP sent to your registered phone"
                />
            )}
        </div>
    );
};
```

## 🐛 Troubleshooting

### Common Issues

1. **OTP not received**: Check WhatsApp messages, verify phone number format
2. **Rate limit errors**: Wait for the countdown to finish
3. **Invalid OTP**: Ensure correct digits, check for typos
4. **Session expired**: Restart the process from the beginning

### Debug Mode

Enable debug logging:

```jsx
const { ... } = useOTP();

// Add this for debugging
useEffect(() => {
    console.log('OTP State:', { isLoading, isVerifying, error, isOTPSent });
}, [isLoading, isVerifying, error, isOTPSent]);
```

## 📈 Performance Optimization

- Components use React.memo for performance
- Debounced input handling
- Efficient re-renders
- Cleanup of timers and intervals

## 🔄 Updates and Maintenance

To update the OTP system:

1. Check backend API compatibility
2. Update error codes if needed
3. Test all user flows
4. Update documentation

## 📞 Support

For issues or questions:

1. Check this documentation
2. Review the example implementations
3. Check backend API responses
4. Verify environment configuration

---

**Note**: This implementation follows the user's preference for professional UI designs and uses React Lucide icons as specified in their requirements. 