import React, { useState } from 'react';
import Layout from '../Layout';
import { motion } from 'framer-motion';
import EditSubscriptionForm from './EditSubs';


const subscriptions = [
  {
    name: "Pay Per Property",
    type: "user",
    description: "Ideal for individual users who want to list a property on the portal.",
    features: [
      "Post a single property",
      "Visibility on the platform",
      "Basic analytics"
    ],
    payperpropertyprice: "200"
  },
  {
    name: "Broker Plan",
    type: "broker",
    description: "Designed for real estate brokers to manage multiple property listings.",
    features: [
      "Bulk property posting",
      "Broker dashboard for analytics and management",
      "Lead management"
    ],
    pricing: {
      monthly: {
        properties_limit: 10,
        price: "0"
      },
      yearly: {
        properties_limit: 120,
        price: "0"
      }
    }
  },
  {
    "name": "Builder Plan - Basic",
    "type": "builder",
    "description": "For builders who need to manage multiple properties and projects.",
    "features": [
      "Post up to 10 properties per month",
      "Broker dashboard included",
      "Project listing"
    ],
    "pricing": {
      "monthly": {
        "properties_limit": 10,
        "projects_limit": 1,
        "price": "0"
      },
      "yearly": {
        "properties_limit": 120,
        "projects_limit": 12,
        "price": "0"
      }
    }
  },
  {
    "name": "Builder Plan - Premium",
    "type": "builder",
    "description": "For builders who require extensive project and property management.",
    "features": [
      "Post up to 30 properties per month",
      "Broker dashboard included",
      "List up to 3 projects"
    ],
    "pricing": {
      "monthly": {
        "properties_limit": 30,
        "projects_limit": 3,
        "price": "0"
      },
      "yearly": {
        "properties_limit": 360,
        "projects_limit": 36,
        "price": "0"
      }
    }
  }
];

const ManageSubscription = () => {
  const [iseditformopen, setiseditformopen] = useState(false)
  const [editproperty, seteditproperty] = useState({})

  const handleEditFormClose = ()=>{
    setiseditformopen(false)
    seteditproperty({})
  }

  const handleEditFormOpen =(subscription)=>{
    setiseditformopen(true)
    seteditproperty(subscription)
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Manage Subscriptions</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {subscriptions.map((subscription, index) => (
            <motion.div
              key={index}
              className="flex flex-col justify-between overflow-hidden bg-white shadow-lg rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{subscription.name}</h3>
                  <span className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                    {subscription.type}
                  </span>
                </div>
                <p className="mb-4 text-gray-600">{subscription.description}</p>
                <div className="space-y-3">
                  {subscription.features.map((feature, i) => (
                    <div key={i} className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {subscription?.pricing?.monthly?.properties_limit && <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{subscription?.pricing?.monthly?.properties_limit} Properties/mounth</span>
                    </div>}
                  {subscription?.pricing?.monthly?.projects_limit && <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{subscription?.pricing?.monthly?.projects_limit} Projects/mounth</span>
                    </div>}
                </div>
              </div>

              <div className="p-6 bg-gray-50">
                {subscription.payperpropertyprice  ? (
                  <p className="text-xl font-bold text-gray-900">₹{subscription.payperpropertyprice}</p>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Monthly</span>
                      <span className="text-xl font-bold text-gray-900">₹{subscription.pricing.monthly.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Yearly</span>
                      <span className="text-xl font-bold text-gray-900">₹{subscription.pricing.yearly.price}</span>
                    </div>
                  </div>
                )}
                <div className="flex mt-4 space-x-3">
                  <button className="flex-1 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700" onClick={()=>handleEditFormOpen(subscription)}>
                    Edit
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

     
      {iseditformopen && <EditSubscriptionForm subscription={editproperty} onClose={handleEditFormClose}/>}
    </Layout>
  );
}

export default ManageSubscription;