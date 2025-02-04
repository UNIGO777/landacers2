import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function EditSubscriptionForm({ subscription, onClose }) {
  const [formData, setFormData] = useState({
    planName: subscription?.name || '',
    description: subscription?.description || '',
    features: subscription?.features || [],
    monthly: {
      properties_limit: subscription?.pricing?.monthly?.properties_limit || 0,
      projects_limit: subscription?.pricing?.monthly?.projects_limit || 0,
      price: subscription?.pricing?.monthly?.price || '',
    },
    yearly: {
      properties_limit: subscription?.pricing?.yearly?.properties_limit || 0,
      projects_limit: subscription?.pricing?.yearly?.projects_limit || 0,
      price: subscription?.pricing?.yearly?.price || '',
    },
    price: typeof subscription.pricing === 'string' ? subscription.pricing : '',
    payPerPropertyprice: subscription?.payperpropertyprice || '', // New field added for pay per property
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleChange = (e, section, field) => {
    const value = e.target.value;
    const isNumeric = (val) => /^\d*$/.test(val);
    if (section === 'payPerPropertyprice'|| section === 'price'|| field === 'price' || field === 'properties_limit' || field === 'projects_limit') {
        if (!isNumeric(value)) {
            toast.error("enter a number")
            return
        }
    }
    if (section === 'features') {
      const newFeatures = [...formData.features];
      newFeatures[field] = value;
      setFormData((prevData) => ({ ...prevData, features: newFeatures }));
    } else if (section === 'price') {
      setFormData((prevData) => ({
        ...prevData,
        price: value,
      }));
    } else if (section === 'payPerPropertyprice') {
      setFormData((prevData) => ({
        ...prevData,
        payPerPropertyprice: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: value,
        },
      }));
    }
  };

  const handleAddFeature = () => {
    setFormData((prevData) => ({
      ...prevData,
      features: [...prevData.features, ''],
    }));
  };

  const handleDeleteFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, features: newFeatures }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.planName || !formData.description) {
      toast.error('Plan Name and Description are required.');
      return;
    }
    // Add more validation as needed
    console.log(formData);
    toast.success('Subscription plan updated successfully!');
    
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-scroll">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Edit Subscription Plan</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Plan Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.planName}
              onChange={(e) => handleChange(e, 'planName')}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={formData.description}
              onChange={(e) => handleChange(e, 'description')}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Features</label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={feature}
                    onChange={(e) => handleChange(e, 'features', index)}
                  />
                  <button
                    type="button"
                    className="px-3 py-2 text-red-700 border border-red-300 rounded-lg hover:bg-red-50"
                    onClick={() => handleDeleteFeature(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={handleAddFeature}
              >
                Add Feature
              </button>
            </div>
          </div>

          {subscription.pricing?.monthly && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="mb-4 font-medium text-gray-900">Monthly Plan</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Properties Limit</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.monthly.properties_limit}
                      onChange={(e) => handleChange(e, 'monthly', 'properties_limit')}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Projects Limit</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.monthly.projects_limit}
                      onChange={(e) => handleChange(e, 'monthly', 'projects_limit')}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Price (₹)</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.monthly.price}
                      onChange={(e) => handleChange(e, 'monthly', 'price')}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-4 font-medium text-gray-900">Yearly Plan</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Properties Limit</label>
                    <input
                      type="text"
                      pattern="^[1-9]\d*$"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.yearly.properties_limit}
                      onChange={(e) => handleChange(e, 'yearly', 'properties_limit')}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Projects Limit</label>
                    <input
                      type="text"
                      pattern="^[1-9]\d*$"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.yearly.projects_limit}
                      onChange={(e) => handleChange(e, 'yearly', 'projects_limit')}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Price (₹)</label>
                    <input
                      type="text"
                      pattern="^[1-9]\d*$"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.yearly.price}
                      onChange={(e) => handleChange(e, 'yearly', 'price')}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* New field for Pay Per Property */}
          {subscription?.payperpropertyprice && <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Pay Per Property (₹)</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.payPerPropertyprice}
              onChange={(e) => handleChange(e, 'payPerPropertyprice')}
            />
          </div>}

          <div className="flex justify-end pt-6 space-x-3">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSubscriptionForm;