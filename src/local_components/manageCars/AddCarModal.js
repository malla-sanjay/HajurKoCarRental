import { isAnyInputEmpty } from "@/utility";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { imageToBase64 } from "@/utility";

const AddCarModal = ({ closeModal }) => {
  //Object that contains all fields key value pair
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const years = Array.from({ length: 24 }, (_, i) => (2000 + i).toString());
  const [carDetails, setCarDetails] = useState({
    car_Model: "",
    car_Year: "2000",
    car_Company: "",
    description: "",
    price_PerDay: 0,
  });

  const handleAddCar = async () => {
    try {
      if (!isAnyInputEmpty(carDetails) && !imageUrl == "") {
        const response = await fetch(
          "https://localhost:44396/api/Authentication/CreateCar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...carDetails, car_Image: imageUrl }),
          }
        );
        const fetchData = await response.json();
        if (fetchData.data[0].status === "SUCCESS") {
          toast.success(fetchData.data[0].message, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          closeModal(true);
        } else {
          toast.error("Could not enter correctly", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        toast.error("Fill all the parameters of Car", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      toast.error("SERVER ERROR", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err);
    }
  };

  //modal styles
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxFileSize = 1500000; // 1.5 MB

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Only Image(PNG/JPEG) files are allowed.");
      return;
    }

    if (file.size > maxFileSize) {
      setErrorMessage("File size must be less than 1.5 MB.");
      return;
    }

    imageToBase64(file)
      .then((base64String) => {
        setImageUrl(base64String);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Error converting image to base64.");
      });
  };

  const handleCancel = () => {
    console.log(carDetails);
    closeModal(true);
  };

  const onChange = (e) => {
    setCarDetails({
      ...carDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      contentLabel="Add Class Modal"
    >
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
      <div className="overflow-auto flex-col  ">
        <form className=" flex  mx-52 mt-10 mb-10 p-10 flex-col bg-amber-100 rounded-xl">
          <h2 className="text-2xl font-semibold mb-2">Update User</h2>
          <div className="flex flex-wrap justify-around">
            <div className="w-5/12 p-4 flex flex-col">
              <label htmlFor="car_Modal" className="text-xl font-semibold mb-2">
                Car Model
              </label>
              <input
                className="text-xl p-2 bg-purple-100"
                type="text"
                name="car_Model"
                value={carDetails.car_Model}
                onChange={(e) => onChange(e)}
                placeholder="User Name"
              />
            </div>

            <div className="w-5/12 p-4 flex flex-col">
              <label
                htmlFor="car_Company"
                className="text-xl font-semibold mb-2"
              >
                Company
              </label>
              <input
                className="text-xl p-2 bg-purple-100"
                type="text"
                name="car_Company"
                value={carDetails.car_Company}
                onChange={(e) => onChange(e)}
                placeholder="Contact No"
              />
            </div>

            <div className="w-5/12 p-4 flex flex-col">
              <label
                htmlFor="description"
                className="text-xl font-semibold mb-2"
              >
                description
              </label>
              <input
                className="text-xl p-2 bg-purple-100"
                type="text"
                name="description"
                value={carDetails.description}
                onChange={(e) => onChange(e)}
                placeholder="Address"
              />
            </div>

            <div className="w-5/12 p-4 flex flex-col">
              <label htmlFor="Car Year" className="text-xl font-semibold mb-2">
                Year
              </label>
              <select
                name="car_Year"
                value={carDetails.car_Year}
                onChange={(e) => {
                  onChange(e);
                }}
                className="text-xl p-2  bg-purple-100 mb-2"
              >
                {years.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-5/12 p-4 flex flex-col">
              <label
                htmlFor="file-upload"
                className="page-content text-2xl rounded-lg flex mt-10"
              >
                Upload an image or PDF:
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileUpload}
                className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              />
              {errorMessage && (
                <p className="error-message text-red-600 text-xl">
                  {errorMessage}
                </p>
              )}
            </div>
            <div className="w-5/12 p-4 flex flex-col">
              <label
                htmlFor="no_of_students"
                className="text-xl font-normal mb-3"
              >
                Price Per Day
              </label>
              <input
                className="text-xl p-2 bg-purple-100 mb-2"
                type="number"
                name="price_PerDay"
                value={carDetails.price_PerDay}
                placeholder="Number of Students"
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
          </div>

          <div className="flex justify-around">
            <button
              type="button"
              className="w-5/12 px-3 py-4 mt-6 mb-2  text-white bg-slate-700 rounded-md focus:bg-slate-800 focus:outline-none"
              onClick={handleAddCar}
            >
              Add
            </button>
            <button
              type="button"
              className="w-5/12 px-3 py-4 mt-6 mb-2 text-white bg-slate-700 rounded-md focus:bg-slate-800 focus:outline-none"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddCarModal;
