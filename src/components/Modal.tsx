import React, { ReactNode } from "react";
import Button from "./Button";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md">
        <div className="flex flex-col justify-between items-center border-b p-4">
          <div className="flex w-full justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>

            <Button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              X
            </Button>
          </div>

          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
