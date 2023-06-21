import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { CreateCommunityFormValues } from '~/types';

interface ModalButtonProps {
  modalTitle: string;
  className: string;
  children: React.ReactNode;
  actionText: string;
  buttonText: string;
  // I really don't know how to type this
  onSubmit: (data: any) => void;
}


const ModalButton: React.FC<ModalButtonProps> = ({modalTitle, children, actionText, buttonText, onSubmit, ...props}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit } = useFormContext()

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const Modal = ({ isOpen } : {isOpen: boolean}) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="fixed inset-0 bg-gray-900 opacity-50"
          style={{ pointerEvents: 'none' }}
        ></div>
        <div className="bg-white p-5 rounded shadow relative ">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold pb-2">Create a community</h2>
            <button
              className="text-gray-500 hover:text-gray-700 ml-96"
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faX} />
            </button>
            </div>
            <div className="border-t border-gray-300 my-4 pb-2"/>
          <form onSubmit={handleSubmit((data) => {onSubmit(data); closeModal();})}>
            <div className="mb-4">{children}</div>
            <div className='flex space-x-2 justify-end pt-12 bg'>
              <button
                      className="flex items-center justify-center px-4 py-2 font-bold text-blue-500 border border-blue-500 rounded-3xl focus:outline-none hover:bg-blue-100 "
                      onClick={closeModal}
                  >
                      Close
                  </button>
                  <button
                      type='submit'
                      className="flex items-center justify-center px-4 py-2 font-bold text-white bg-blue-500 rounded-3xl focus:outline-none hover:bg-blue-600"
                  >
                      {actionText}
                  </button>
            </div>
          </form>

        </div>
      </div>
    );
  };

  return (
    <>
      <button
        {...props}
        onClick={openModal}
      >
        {buttonText}
      </button>
      {isOpen && <Modal isOpen={isOpen} />}
    </>
  );
};

export default ModalButton;
