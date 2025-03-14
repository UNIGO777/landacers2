import React from 'react';
import Layout from '../Layout';
import { motion } from 'framer-motion';
import { FaEdit } from 'react-icons/fa';
import ComingSoon from '../../../components/ComingSoon/ComingSoon';

const EditSubscriptionForm = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Edit Subscription Plans</h2>
        </div>
        
        <ComingSoon 
          title="Subscription Editor Coming Soon" 
          message="We're currently developing our subscription editing system. You'll soon be able to create and modify subscription plans with customizable features, pricing tiers, and property limits." 
          icon={FaEdit}
        />
      </div>
    </Layout>
  );
}

export default EditSubscriptionForm;