import React, { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";

const PaymentModal = ({ closeModal }) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handlePayment = () => {
    // Handle payment logic here
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      contentLabel="Payment Modal"
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
        <select
          className="w-full p-2 border rounded mb-4"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="cash">Pay with Cash</option>
          <option value="phone">Phone Pay</option>
        </select>
        <div className="flex justify-end">
          {paymentMethod === "phone" ? (
            <div className="flex flex-col justify-around">
              <Image src="/qr.png" height={600} width={600} alt="scanner" />
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              {" "}
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                onClick={handlePayment}
                disabled={!paymentMethod}
              >
                Pay
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;
