import React from 'react';
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

const Popup = ({ isOpen, onClose, children }) => {


React.useEffect(() => {
  if (isOpen) {
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = 'hidden';
  } else {
    // Re-enable scrolling when modal is closed
    document.body.style.overflow = 'unset';
  }

  // Cleanup function to ensure scroll is re-enabled when component unmounts
  return () => {
    document.body.style.overflow = 'unset';
  };
}, [isOpen]);

  const handleClose = () => {
    // Close animation or cleanup if needed
    
    onClose(); // Call the parent's onClose handler
  };
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '8px',
      padding: '20px',
      maxWidth: '95%',
      maxHeight: '95vh',
      overflow: 'auto',
      zIndex: 1000,
      backgroundColor: 'white',
      width: 'auto',
      minWidth: '50%'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000,
      overflow: 'auto'
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={customStyles}
      contentLabel="Popup Modal"
    >
      <div className="relative">
       
        
        <div className="w-full overflow-y-auto pt-6">
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default Popup;
