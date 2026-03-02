import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Camera, CheckCircle, AlertCircle } from "lucide-react";
import Layout from "../../Layout";
import axios from "axios";
import { toast } from "react-toastify";


const UpdateProfile = ({ sellerDetails }) => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    address: ""
  });

  const [emailVerificationBox, setEmailVerificationBox] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const [sellerDetail, setSellerDetail] = useState(null);

  

  // Update form data when sellerDetails becomes available
  useEffect(() => {
    if (sellerDetails) {
      
      sellerDetails?.then(data => {

        setFormData(prevData => ({
          ...prevData,
          name: data.name,
          email: data.email || '',
          phone: data.phone || '',
          companyName: data.companyName || '',
          address: data.address || '',
        }));
        // Set seller details
        setSellerDetail(data);
        

        // Set profile image if exists
        if (data.profilePicture) {
          setProfileImage(`${process.env.REACT_APP_backendUrl}/storage/${data.profilePicture}`);
        }
      });
    }
  }, [sellerDetails]);

  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const token = localStorage.getItem('sellerToken');
    const formDataToSend = new FormData();
    
    // Append text data
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('companyName', formData.companyName);
    formDataToSend.append('address', formData.address);
    
    // Append profile image if changed
    if (profileImage && !profileImage.startsWith('http')) {
      const response = await fetch(profileImage);
      const blob = await response.blob();
      formDataToSend.append('profilePicture', blob, 'profile.jpg');
    }

    const response = await axios.post(
      `${process.env.REACT_APP_backendUrl}/api/sellers/update`,
      formDataToSend,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    if (response.data) {
      toast.success('Profile updated successfully');
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update profile');
  } finally {
    setLoading(false);
  }
};

  const getStatusIcon = (status) => {

    switch (status) {
      case true:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case false:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const toggleEmailVarificationBox = () => {
    if (!sellerDetail?.emailVerified) {
      setEmailVerificationBox(!emailVerificationBox)
    }
  }

  const sendVerificationEmail = async () => {
    try {
      setVerifyLoading(true);
      const token = localStorage.getItem('sellerToken');
      await axios.get(
        `${process.env.REACT_APP_backendUrl}/api/sellers/send-email-verification-otp`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setOtpSent(true);
      toast.success('OTP sent to your email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setVerifyLoading(false);
    }
  };

  const verifyEmail = async () => {
    try {
      setVerifyLoading(true);
      const token = localStorage.getItem('sellerToken');
      await axios.post(
        `${process.env.REACT_APP_backendUrl}/api/sellers/confirm-email-verification-otp`,
        { otp },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success('Email verified successfully');
      setEmailVerificationBox(false);
      // Update seller details
      if (sellerDetails) {
        sellerDetails.then(data => {
          setSellerDetail({ ...data, emailVerified: true });
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to verify email');
    } finally {
      setVerifyLoading(false);
    }
  };

  

  return (
    <>
      <div className=" py-12 bg-gray-50">
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-10 md:flex-row md:gap-5 items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Update Profile</h1>
                <p className="mt-2 text-gray-600">
                  Manage your account settings and profile information
                </p>
              </div>
              <div className="flex items-center space-x-4">

                <div
                  onClick={sellerDetail?.emailVerified ? () => { } : () => { toggleEmailVarificationBox() }}
                  className={`flex items-center px-4 py-2 space-x-2  bg-white rounded-lg shadow-sm ${!sellerDetail?.emailVerified && 'hover:cursor-pointer hover:scale-[1.1]'}`}
                >
                  {getStatusIcon(sellerDetail?.emailVerified)}
                  <span className="text-sm font-medium capitalize">
                    {sellerDetail?.emailVerified ? 'Email Verified' : 'Email Not Verified'}
                  </span>
                </div>

              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Profile Image Section */}
              <div className="p-6   bg-white rounded-xl shadow-sm">
                <div className="flex  flex-col items-center">
                  <div className="relative  group">
                    <div className="relative w-32 h-32 overflow-hidden rounded-full">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-4xl text-white bg-blue-500">
                          {formData.name}
                        </div>
                      )}
                    </div>
                    <label
                      htmlFor="profile-image"
                      className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 rounded-full opacity-0 cursor-pointer group-hover:opacity-100"
                    >
                      <Camera className="w-8 h-8 text-white" />
                    </label>
                    <input
                      type="file"
                      id="profile-image"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">
                    {formData.name}
                  </h3>
                  <p className="text-gray-500">{formData.email}</p>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Account Status</h4>
                      <p className="text-sm text-gray-500">Your account is active and verified</p>
                    </div>
                    <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Account Type</h4>
                      <p className="text-sm text-gray-500">Your account is {sellerDetail?.sellerType}</p>
                    </div>
                    <span className="px-3 py-1 text-sm text-blue-500 bg-blue-100 rounded-full">
                      {sellerDetail?.sellerType}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Phone Number</h4>
                      <p className="text-sm text-gray-500">Your account Number is {sellerDetail?.phone}</p>
                    </div>

                  </div>





                </div>
              </div>


              {/* Form Section */}
              <div className="md:col-span-2 p-6 bg-white rounded-xl shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>



                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      className="px-6 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="flex items-center space-x-2">
                          <svg
                            className="w-5 h-5 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Saving...</span>
                        </span>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {emailVerificationBox && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
              >
                <h3 className="mb-4 text-xl font-semibold">Email Verification</h3>
                {!otpSent ? (
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Click below to receive a verification code on your email:
                      <span className="block font-medium">{formData.email}</span>
                    </p>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setEmailVerificationBox(false)}
                        className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={sendVerificationEmail}
                        disabled={verifyLoading}
                        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                      >
                        {verifyLoading ? 'Sending...' : 'Send OTP'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => {
                          setEmailVerificationBox(false);
                          setOtpSent(false);
                          setOtp('');
                        }}
                        className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={verifyEmail}
                        disabled={verifyLoading || !otp}
                        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                      >
                        {verifyLoading ? 'Verifying...' : 'Verify OTP'}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
