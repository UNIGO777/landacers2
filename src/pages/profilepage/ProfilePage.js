import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Add CSS for toggle switches


import axios from "axios";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Bell,
    Lock,
    LogOut,
    Camera,
    CheckCircle,
    AlertCircle,
    Key,
    Eye,
    EyeOff,
    Loader,
    ChevronRight,
    Shield,
    Settings,
    Heart,
    Home,
    Building,
    X
} from "lucide-react";

const ProfilePage = () => {
    // User data state
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("profile");
    const [profileImage, setProfileImage] = useState(null);

    // Change password states
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [passwordChangeStep, setPasswordChangeStep] = useState(1);
    const [passwordData, setPasswordData] = useState({
        phoneNumber: "",
        otp: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    // Notification states
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [notificationLoading, setNotificationLoading] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: ""
    });
    const [formEditable, setFormEditable] = useState(false);
    const [formLoading, setFormLoading] = useState(false);

    // Load user data from localStorage on component mount
    useEffect(() => {
        const fetchUserData = () => {
            try {
                const userToken = localStorage.getItem("token");
                if (!userToken) {
                    window.location.href = "/login";
                    return;
                }

                const user = JSON.parse(localStorage.getItem("user") || "{}");
                if (user) {
                    setUserData(user);
                    setFormData({
                        firstName: user.firstName || "",
                        lastName: user.lastName || "",
                        email: user.email || "",
                        phoneNumber: user.phoneNumber || "",
                        address: user.address || ""
                    });
                    setPasswordData(prev => ({
                        ...prev,
                        phoneNumber: user.phoneNumber || ""
                    }));

                    // Set profile image if available
                    if (user.profilePicture) {
                        setProfileImage(`https://api.landacre.in/storage/${user.profilePicture}`);
                    }
                }
            } catch (error) {
                console.error("Error loading user data:", error);
                toast.error("Failed to load user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
        fetchNotifications();
    }, []);

    // Fetch user notifications
    const fetchNotifications = async () => {
        try {
            setNotificationLoading(true);
            const token = localStorage.getItem("token");
            if (!token) return;

            // Example API call to fetch notifications
            // In a real app, replace with actual API endpoint
            const response = await axios.get(
                `https://api.landacre.in/api/notifications`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // For demo purposes, using mock data if API fails
            if (response.data) {
                setNotifications(response.data.data.notifications);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
            // Mock notifications for demo
            setNotifications([
                {
                    id: 1,
                    title: "New Property Listed",
                    message: "A new property matching your preferences has been listed.",
                    createdAt: new Date(Date.now() - 3600000).toISOString(),
                    read: false
                },
                {
                    id: 2,
                    title: "Price Drop Alert",
                    message: "A property you saved has reduced its price by 5%.",
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                    read: true
                },
                {
                    id: 3,
                    title: "Account Security",
                    message: "Your password was changed successfully.",
                    createdAt: new Date(Date.now() - 259200000).toISOString(),
                    read: true
                }
            ]);
        } finally {
            setNotificationLoading(false);
        }
    };

    // Handle profile image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
            // Image will be uploaded when the form is submitted
            toast.info("Profile picture will be updated when you save changes");
            // Enable form editing mode to allow saving the changes
            if (!formEditable) {
                setFormEditable(true);
            }
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setFormLoading(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("You must be logged in to update your profile");
                return;
            }

            // Create FormData object for submission
            const formDataToSend = new FormData();

            // Append text data
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('lastName', formData.lastName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phoneNumber', formData.phoneNumber);
            formDataToSend.append('address', formData.address);

            // Append profile image if changed
            if (profileImage && !profileImage.startsWith(process.env.REACT_APP_backendUrl)) {
                const response = await fetch(profileImage);
                const blob = await response.blob();
                formDataToSend.append('profilePicture', blob, 'profile.jpg');
            }

            // Send update request to backend API
            const response = await axios.post(
                `https://api.landacre.in/api/users/update`,
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data) {
                // Update localStorage with new user data
                const updatedUser = {
                    ...userData,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    address: formData.address
                };

                if (response.data.profilePicture) {
                    updatedUser.profilePicture = response.data.profilePicture;
                }

                localStorage.setItem("user", JSON.stringify(updatedUser));
                localStorage.setItem("firstName", formData.firstName);
                localStorage.setItem("lastName", formData.lastName);
                setUserData(updatedUser);
                toast.success("Profile updated successfully");
                setFormEditable(false);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setFormLoading(false);
        }
    };

    // Handle password change
    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!passwordData.phoneNumber) {
            setPasswordError("Please enter your phone number");
            return;
        }

        setPasswordLoading(true);
        setPasswordError("");

        try {
            // Example API call to send OTP
            // In a real app, replace with actual API endpoint
            const response = await axios.post(
                `https://api.landacre.in/api/users/send-password-otp`,
                { phoneNumber: passwordData.phoneNumber }
            );

            if (response.data) {
                toast.success("OTP sent successfully!");
                setPasswordChangeStep(2);
            }
        } catch (error) {
            setPasswordError(error.response?.data?.message || "Failed to send OTP");
            toast.error("Failed to send OTP");
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        if (!passwordData.otp) {
            setPasswordError("Please enter the OTP");
            return;
        }

        // For demo purposes, moving to next step without actual verification
        // In a real app, you would verify the OTP with the server
        setPasswordChangeStep(3);
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumber &&
            hasSpecialChar
        );
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!passwordData.newPassword) {
            setPasswordError("Please enter a new password");
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        if (!validatePassword(passwordData.newPassword)) {
            setPasswordError(
                "Password must be at least 8 characters long and contain uppercase, lowercase, number and special character"
            );
            return;
        }

        setPasswordLoading(true);
        setPasswordError("");

        try {
            // Example API call to change password
            // In a real app, replace with actual API endpoint
            const response = await axios.post(
                `https://api.landacre.in/api/users/change-password`,
                {
                    phoneNumber: passwordData.phoneNumber,
                    otp: passwordData.otp,
                    newPassword: passwordData.newPassword
                }
            );

            if (response.data) {
                toast.success("Password changed successfully!");
                setIsChangePasswordOpen(false);
                setPasswordChangeStep(1);
                setPasswordData({
                    phoneNumber: userData?.phoneNumber || "",
                    otp: "",
                    newPassword: "",
                    confirmPassword: ""
                });
            }
        } catch (error) {
            setPasswordError(error.response?.data?.message || "Failed to change password");
            toast.error("Failed to change password");
        } finally {
            setPasswordLoading(false);
        }
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    // Format date for notifications
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            if (diffInDays < 7) {
                return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
            } else {
                return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            }
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center">
                    <Loader className="w-12 h-12 text-blue-500 animate-spin" />
                    <p className="mt-4 text-lg text-gray-600">Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen mt-16 bg-gray-50 pt-16 pb-12">
            <div className="container px-4 mx-auto max-w-6xl">
                {/* Profile Header */}
                <div className="relative mb-8">
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 relative rounded-xl">
                        <div className="absolute flex  font-semibold text-white font-mono top-0 left-0 w-full h-full justify-center items-center rounded-tl-xl">{formData.firstName + " " + formData.lastName}</div>
                    </div>
                    <div className="absolute -bottom-16 left-8 flex items-end">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden">
                                {profileImage && profileImage !== "" ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500 text-2xl sm:text-3xl md:text-4xl font-bold">
                                        {formData.firstName?.charAt(0) || "U"}
                                    </div>
                                )}
                            </div>
                            <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-blue-500 p-1.5 sm:p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                                <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                <input
                                    type="file"
                                    id="profile-image"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        <div className="ml-0 sm:ml-4 mt-2 sm:mt-0 text-center sm:text-left">
                            <h1 className="text-xl sm:text-2xl font-bold text-black">
                                {`${formData.firstName} ${formData.lastName}` || "User"}
                            </h1>
                            <p className="text-sm sm:text-base text-gray-500">{formData.email}</p>
                        </div>
                    </div>
                </div>

                {/* Profile Navigation */}
                <div className="mt-20 mb-6 md:mb-8">
                    <div className="flex flex-wrap gap-2 border-b border-gray-200 overflow-x-auto pb-1 scrollbar-hidden">
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`px-3 sm:px-4 py-2 font-medium text-sm sm:text-base rounded-t-lg transition-colors ${activeTab === "profile" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            Profile
                        </button>
                        <button
                            onClick={() => setActiveTab("security")}
                            className={`px-3 sm:px-4 py-2 font-medium text-sm sm:text-base rounded-t-lg transition-colors ${activeTab === "security" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            Security
                        </button>
                        <button
                            onClick={() => setActiveTab("notifications")}
                            className={`px-3 sm:px-4 py-2 font-medium text-sm sm:text-base rounded-t-lg transition-colors ${activeTab === "notifications" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            Notifications
                        </button>
                    </div>
                </div>

                {/* Profile Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <AnimatePresence mode="wait">
                            {activeTab === "profile" && (
                                <motion.div
                                    key="profile"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                                            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Personal Information</h2>
                                            <button
                                                onClick={() => setFormEditable(!formEditable)}
                                                className="text-blue-500 hover:text-blue-700 font-medium text-sm sm:text-base"
                                            >
                                                {formEditable ? "Cancel" : "Edit"}
                                            </button>
                                        </div>

                                        <form onSubmit={handleUpdateProfile}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                                                <div>
                                                    <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                                                        First Name
                                                    </label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            value={formData.firstName}
                                                            onChange={handleInputChange}
                                                            disabled={!formEditable}
                                                            className={`w-full px-8 sm:px-10 py-2 text-sm sm:text-base border ${formEditable ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                                                        Last Name
                                                    </label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            name="lastName"
                                                            value={formData.lastName}
                                                            onChange={handleInputChange}
                                                            disabled={!formEditable}
                                                            className={`w-full px-8 sm:px-10 py-2 text-sm sm:text-base border ${formEditable ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                                                        Email Address
                                                    </label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                            disabled={true}
                                                            className="w-full px-8 sm:px-10 py-2 text-sm sm:text-base border border-gray-200 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                                                        Phone Number
                                                    </label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                                        <input
                                                            type="tel"
                                                            value={passwordData.phoneNumber}
                                                            onChange={(e) => setPasswordData({ ...passwordData, phoneNumber: e.target.value })}
                                                            className="w-full px-8 sm:px-10 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            placeholder="Enter your phone number"
                                                            disabled={true}
                                                            required
                                                        />
                                                    </div>
                                                    <p className="mt-1 sm:mt-2 text-xs text-gray-500">We'll send a verification code to this number</p>
                                                </div>

                                                <div className="col-span-1 md:col-span-2">
                                                    <button
                                                        type="submit"
                                                        disabled={formLoading}
                                                        className="w-full py-2 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                                                    >
                                                        {formLoading ? (
                                                            <>
                                                                <Loader className="w-4 h-4 mr-2 animate-spin" />
                                                                <span>Updating...</span>
                                                            </>
                                                        ) : (
                                                            "Update Profile"
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            {passwordChangeStep === 2 && (
                                                <form onSubmit={handleVerifyOTP}>
                                                    <div className="mb-4">
                                                        <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                                                            Enter OTP
                                                        </label>
                                                        <div className="relative">
                                                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                                            <input
                                                                type="text"
                                                                value={passwordData.otp}
                                                                onChange={(e) => setPasswordData({ ...passwordData, otp: e.target.value })}
                                                                className="w-full px-8 sm:px-10 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center tracking-widest"
                                                                placeholder="••••••"
                                                                maxLength={6}
                                                                disabled={passwordLoading}
                                                                required
                                                            />
                                                        </div>
                                                        <p className="mt-1 sm:mt-2 text-xs text-gray-500">Enter the 6-digit code sent to your phone</p>
                                                    </div>

                                                    <div className="flex gap-2 sm:gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => setPasswordChangeStep(1)}
                                                            disabled={passwordLoading}
                                                            className="w-1/3 py-2 sm:py-3 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                                                        >
                                                            Back
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            disabled={passwordLoading}
                                                            className="w-2/3 py-2 sm:py-3 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                                                        >
                                                            {passwordLoading ? (
                                                                <>
                                                                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                                                                    Verifying...
                                                                </>
                                                            ) : (
                                                                "Verify OTP"
                                                            )}
                                                        </button>
                                                    </div>
                                                </form>
                                            )}

                                            {passwordChangeStep === 3 && (
                                                <form onSubmit={handleChangePassword}>
                                                    <div className="mb-4">
                                                        <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                                                            New Password
                                                        </label>
                                                        <div className="relative">
                                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                                            <input
                                                                type={showPassword ? "text" : "password"}
                                                                value={passwordData.newPassword}
                                                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                                className="w-full px-8 sm:px-10 pr-10 sm:pr-12 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                placeholder="Enter new password"
                                                                disabled={passwordLoading}
                                                                required
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                            >
                                                                {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                                                            </button>
                                                        </div>
                                                        <p className="mt-1 sm:mt-2 text-xs text-gray-500">Password must be at least 8 characters with uppercase, lowercase, number and special character</p>
                                                    </div>

                                                    <div className="mb-4">
                                                        <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                                                            Confirm Password
                                                        </label>
                                                        <div className="relative">
                                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                                            <input
                                                                type={showPassword ? "text" : "password"}
                                                                value={passwordData.confirmPassword}
                                                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                                className="w-full px-8 sm:px-10 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                placeholder="Confirm new password"
                                                                disabled={passwordLoading}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2 sm:gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => setPasswordChangeStep(2)}
                                                            disabled={passwordLoading}
                                                            className="w-1/3 py-2 sm:py-3 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                                                        >
                                                            Back
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            disabled={passwordLoading}
                                                            className="w-2/3 py-2 sm:py-3 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                                                        >
                                                            {passwordLoading ? (
                                                                <>
                                                                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                                                                    Changing...
                                                                </>
                                                            ) : (
                                                                "Change Password"
                                                            )}
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                        </form>
                                    </div>
                                </motion.div>
                            )}
                            
                            {activeTab === "security" && (
                                <motion.div
                                    key="security"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                                            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Security Settings</h2>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center">
                                                        <Shield className="w-5 h-5 text-blue-500 mr-3" />
                                                        <h3 className="font-medium">Password Management</h3>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-3">Secure your account with a strong password</p>
                                                <button
                                                    onClick={() => setIsChangePasswordOpen(true)}
                                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                                                >
                                                    Change Password
                                                </button>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            
                            {activeTab === "notifications" && (
                                <motion.div
                                    key="notifications"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                                            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Notification Preferences</h2>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            {notificationLoading ? (
                                                <div className="flex justify-center py-8">
                                                    <Loader className="w-8 h-8 text-blue-500 animate-spin" />
                                                </div>
                                            ) : (
                                                <>
                                                   
                                                    
                                                    <div className="mt-6">
                                                        <h3 className="font-medium mb-3">Recent Notifications</h3>
                                                        <div className="space-y-3 max-h-80 overflow-y-auto">
                                                            {notifications.length > 0 ? (
                                                                notifications.map((notification, index) => (
                                                                    <div key={index} className={`p-3 rounded-lg ${notification.isRead ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500'}`}>
                                                                        <div className="flex justify-between items-start">
                                                                            <h4 className="font-medium text-sm">Massage</h4>
                                                                            <span className="text-xs text-gray-500">{formatDate(notification.createdAt)}</span>
                                                                        </div>
                                                                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="text-center py-4 text-gray-500">
                                                                    <p>No notifications found</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 order-1 lg:order-2 mb-4 lg:mb-0">
                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                            <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Quick Actions</h2>
                            <div className="space-y-2 sm:space-y-3">
                                <button
                                    onClick={() => setActiveTab("notifications")}
                                    className="w-full flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center">
                                        <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2 sm:mr-3" />
                                        <span className="text-xs sm:text-sm text-gray-700">Manage Notifications</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                </button>
                                <button
                                    onClick={() => setIsChangePasswordOpen(true)}
                                    className="w-full flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center">
                                        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2 sm:mr-3" />
                                        <span className="text-xs sm:text-sm text-gray-700">Change Password</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center">
                                        <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 sm:mr-3" />
                                        <span className="text-xs sm:text-sm text-gray-700">Logout</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Password Modal */}
            <AnimatePresence>
                {isChangePasswordOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                        onClick={() => !passwordLoading && setIsChangePasswordOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center p-4 sm:p-6 border-b">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                                    {passwordChangeStep === 1 && "Change Password"}
                                    {passwordChangeStep === 2 && "Verify OTP"}
                                    {passwordChangeStep === 3 && "Set New Password"}
                                </h2>
                                <button
                                    onClick={() => !passwordLoading && setIsChangePasswordOpen(false)}
                                    disabled={passwordLoading}
                                    className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-4 sm:p-6">
                                {passwordError && (
                                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-xs sm:text-sm">
                                        {passwordError}
                                    </div>
                                )}

                                {passwordChangeStep === 1 && (
                                    <form onSubmit={handleSendOTP}>
                                        <div className="mb-4">
                                            <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    value={passwordData.phoneNumber}
                                                    onChange={(e) => setPasswordData({ ...passwordData, phoneNumber: e.target.value })}
                                                    className="w-full px-8 sm:px-10 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Enter your phone number"
                                                    disabled={passwordLoading}
                                                    required
                                                />
                                            </div>
                                            <p className="mt-1 sm:mt-2 text-xs text-gray-500">We'll send a verification code to this number</p>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={passwordLoading}
                                            className="w-full py-2 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                                        >
                                            {passwordLoading ? (
                                                <>
                                                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                                                    Sending OTP...
                                                </>
                                            ) : (
                                                "Send OTP"
                                            )}
                                        </button>
                                    </form>
                                )}

                                {passwordChangeStep === 2 && (
                                    <form onSubmit={handleVerifyOTP}>
                                        <div className="mb-4">
                                            <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                                                Enter OTP
                                            </label>
                                            <div className="relative">
                                                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={passwordData.otp}
                                                    onChange={(e) => setPasswordData({ ...passwordData, otp: e.target.value })}
                                                    className="w-full px-8 sm:px-10 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center tracking-widest"
                                                    placeholder="••••••"
                                                    maxLength={6}
                                                    disabled={passwordLoading}
                                                    required
                                                />
                                            </div>
                                            <p className="mt-1 sm:mt-2 text-xs text-gray-500">Enter the 6-digit code sent to your phone</p>
                                        </div>

                                        <div className="flex gap-2 sm:gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setPasswordChangeStep(1)}
                                                disabled={passwordLoading}
                                                className="w-1/3 py-2 sm:py-3 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={passwordLoading}
                                                className="w-2/3 py-2 sm:py-3 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                                            >
                                                {passwordLoading ? (
                                                    <>
                                                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                                                        Verifying...
                                                    </>
                                                ) : (
                                                    "Verify OTP"
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {passwordChangeStep === 3 && (
                                    <form onSubmit={handleChangePassword}>
                                        <div className="mb-4">
                                            <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                                                New Password
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={passwordData.newPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                    className="w-full px-8 sm:px-10 pr-10 sm:pr-12 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Enter new password"
                                                    disabled={passwordLoading}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                                                </button>
                                            </div>
                                            <p className="mt-1 sm:mt-2 text-xs text-gray-500">Password must be at least 8 characters with uppercase, lowercase, number and special character</p>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={passwordData.confirmPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                    className="w-full px-8 sm:px-10 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Confirm new password"
                                                    disabled={passwordLoading}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-2 sm:gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setPasswordChangeStep(2)}
                                                disabled={passwordLoading}
                                                className="w-1/3 py-2 sm:py-3 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={passwordLoading}
                                                className="w-2/3 py-2 sm:py-3 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                                            >
                                                {passwordLoading ? (
                                                    <>
                                                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                                                        Changing...
                                                    </>
                                                ) : (
                                                    "Change Password"
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ToastContainer />
            
           
        </div>
    );
};

export default ProfilePage;