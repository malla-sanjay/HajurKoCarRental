import React, { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { useEffect } from "react";

const PaymentModal = ({ closeModal, carID, rentDate }) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [total, setTotal] = useState(0);
  const [userRole, setUserRole] = useState("");

  const handlePayment = () => {
    closeModal(true);
  };

  const handleCancel = () => {
    closeModal(true);
  };

  const discountedTotal = async () => {
    try {
      const response = await fetch(
        "https://localhost:44396/api/Authentication/GetCarById",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ carID }),
        }
      );

      const cardata = await response.json();
      console.log(cardata);

      const pricePerDay = cardata.data[0].pricePerDay;

      //take price per day

      const noOfDays = daysBetweenTodayAndDate(rentDate);
      let discount = 1;

      if (userRole === "staff") {
        discount = 0.25;
      }

      const finalTotal = discount * pricePerDay * noOfDays;

      setTotal(finalTotal);
    } catch (err) {
      console.log(err);
    }
  };

  function daysBetweenTodayAndDate(dateStr) {
    // Parse the input date string as a Date object
    const date = new Date(dateStr);

    // Get the current date as a Date object
    const today = new Date();

    // Calculate the difference in milliseconds between the two dates
    const diffMillis = Math.abs(today - date);

    // Convert milliseconds to days
    const diffDays = Math.ceil(diffMillis / (1000 * 60 * 60 * 24));

    // Return the result, making sure to return 1 if both dates are the same
    return diffDays === 0 ? 1 : diffDays;
  }

  useEffect(() => {
    const staff = localStorage.getItem("role");
    discountedTotal();
    setUserRole(staff);
  }, []);

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      contentLabel="Payment Modal"
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
        <h2 className="text-xl font-bold mb-4">Your total is: {total} </h2>
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
