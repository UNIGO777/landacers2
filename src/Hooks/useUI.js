import { useUIStore } from '../store';

/**
 * Custom hook for UI management
 * Provides a simplified interface to the UI store
 */
export const useUI = () => {
  const { 
    isMobile,
    isLoginModalOpen,
    isSignupModalOpen,
    isFilterModalOpen,
    isPageLoading,
    notification,
    setIsMobile,
    setLoginModalOpen,
    setSignupModalOpen,
    setFilterModalOpen,
    setPageLoading,
    showNotification,
    clearNotification
  } = useUIStore();
  
  // Get the initUI function directly from the store
  const { initUI } = useUIStore();
  
  return {
    // Responsive state
    isMobile,
    setIsMobile,
    
    // Modal states
    isLoginModalOpen,
    isSignupModalOpen,
    isFilterModalOpen,
    setLoginModalOpen,
    setSignupModalOpen,
    setFilterModalOpen,
    
    // Helper functions for modals
    openLoginModal: () => setLoginModalOpen(true),
    closeLoginModal: () => setLoginModalOpen(false),
    openSignupModal: () => setSignupModalOpen(true),
    closeSignupModal: () => setSignupModalOpen(false),
    openFilterModal: () => setFilterModalOpen(true),
    closeFilterModal: () => setFilterModalOpen(false),
    
    // Loading state
    isPageLoading,
    setPageLoading,
    
    // Notification
    notification,
    showNotification,
    clearNotification,
    
    // Helper functions for notifications
    showSuccessNotification: (message) => showNotification(message, 'success'),
    showErrorNotification: (message) => showNotification(message, 'error'),
    showInfoNotification: (message) => showNotification(message, 'info'),
    showWarningNotification: (message) => showNotification(message, 'warning'),
    
    // UI initialization
    initUI
  };
};