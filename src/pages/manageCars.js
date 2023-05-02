/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useState, useEffect } from "react";
import Navibar from "@/global_components/Navibar";
import UpdateUserModal from "@/local_components/userSettingsAdmin/UpdateUserModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CarCard from "@/local_components/manageCars/CarCard";
import { Refresh } from "@mui/icons-material";

const userSettingsAdmin = () => {
  const [cars, setCars] = useState([{}]);
  const [modal, closeModal] = useState(true);
  const user_ID = "922AF30D-F88C-45E7-8EC7-587C39E9BBBE";
  const [refresh, setRefresh] = useState(false);

  const fetchCars = async () => {
    try {
      const response = await fetch(
        "https://localhost:44396/api/Authentication/GetAllCars",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_ID }),
        }
      );
      const fetchData = await response.json();
      const data = fetchData.data;
      setCars(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddButton = async () => {
    //just opens the modal for editing
    closeModal(false);
  };

  const renderCards = () => {
    try {
      return cars.map((car, index) => {
        return (
          <CarCard
            key={car.car_ID}
            car_ID={car.car_ID}
            car_Model={car.car_Model}
            car_Company={car.car_Company}
            car_Year={car.car_Year}
            car_Image={car.car_Image}
            carStatus={car.carStatus}
            price_PerDay={car.price_PerDay}
            description={car.description}
            Refresh={Refresh}
          />
        );
      });
    } catch (err) {
      console.log(err);
    }
  };

  const Refresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    fetchCars();
  }, [modal, refresh]);

  return (
    <>
      {!modal ? (
        <UpdateUserModal
          userEmail={editUserEmail}
          userRole={editUserRole}
          closeModal={closeModal}
        />
      ) : (
        <div />
      )}
      <Navibar />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex justify-end">
        <button
          className="bg p-2 m-2 mr-5 pr-4  font-semibold text-xl rounded-lg bg-emerald-500 transition-colors duration-200 ease-in-out hover:bg-emerald-600 active:bg-emerald-400focus:outline-none"
          onClick={() => {
            handleAddButton;
          }}
        >
          + Add Car
        </button>
      </div>

      <div className="m-3 ml-6 h-[700px] flex flex-wrap justify-around p-4 rounded-2xl overflow-auto">
        {renderCards()}
      </div>
    </>
  );
};

export default userSettingsAdmin;
