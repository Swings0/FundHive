import React, { useEffect } from "react";

interface ModalProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, message, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose(); // Hide the modal after 10 seconds
      }, 5000); // 10000ms = 10 seconds

      return () => clearTimeout(timer); // Clean up the timeout if the modal is closed
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null; // Don't render the modal if it's not visible

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm lg:w-full md:w-full w-fit text-center">
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Modal;
