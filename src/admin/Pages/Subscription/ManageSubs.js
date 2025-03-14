import React from 'react';
import Layout from '../Layout';
import { motion } from 'framer-motion';
import { FaMoneyBillWave } from 'react-icons/fa';
import ComingSoon from '../../../components/ComingSoon/ComingSoon';

const ManageSubscription = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Manage Subscriptions</h2>
        </div>
        
        <ComingSoon 
          title="Subscription Management Coming Soon" 
          message="We're currently developing our subscription management system. You'll soon be able to create, edit, and manage subscription plans for users, brokers, and builders." 
          icon={FaMoneyBillWave}
        />
      </div>
    </Layout>
  );
}

export default ManageSubscription;