import { create } from 'zustand';

export const useUIStore = create((set) => ({
  // Mobile detection
  isMobile: window.innerWidth < 768,
  
  // Modal states
  isLoginModalOpen: false,
  isSignupModalOpen: false,
  isFilterModalOpen: false,
  
  // Loading states
  isPageLoading: false,
  
  // Notification state
  notification: null,
  
  // Actions
  setIsMobile: (isMobile) => set({ isMobile }),
  setLoginModalOpen: (isOpen) => set({ isLoginModalOpen: isOpen }),
  setSignupModalOpen: (isOpen) => set({ isSignupModalOpen: isOpen }),
  setFilterModalOpen: (isOpen) => set({ isFilterModalOpen: isOpen }),
  setPageLoading: (isLoading) => set({ isPageLoading: isLoading }),
  
  // Show notification
  showNotification: (message, type = 'info') => {
    set({ notification: { message, type } });
    
    // Auto-clear notification after 3 seconds
    setTimeout(() => {
      set({ notification: null });
    }, 3000);
  },
  
  // Clear notification manually
  clearNotification: () => set({ notification: null }),
  
  // Initialize UI (call on app start)
  initUI: () => {
    // Set initial mobile state
    set({ isMobile: window.innerWidth < 768 });
    
    // Add resize listener
    const handleResize = () => {
      set({ isMobile: window.innerWidth < 768 });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Return cleanup function
    return () => window.removeEventListener('resize', handleResize);
  },
}));