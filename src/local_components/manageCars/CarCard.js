import React from "react";
import Image from "next/image";
import { base64ToImage } from "@/utility";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Refresh } from "@mui/icons-material";

const CarCard = ({
  car_ID,
  car_Year,
  car_Model,
  car_Company,
  description,
  car_Image,
  price_PerDay,
  carStatus,
  Refresh,
}) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const convertToImageURL = () => {
      const image = base64ToImage(car_Image);
      setImageUrl(image);
    };
    convertToImageURL();
  }, []);

  //function to delete car entry
  const removeEntry = async () => {
    try {
      const response = await fetch(
        "https://localhost:44396/api/Authentication/DeleteCarRecord",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ carID: car_ID }),
        }
      );
      const result = await response.json();
      console.log(result);

      if (result.data[0].status === "Success") {
        console.log("success");
        toast.success("Car Deleted Successfully", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        Refresh();
      } else {
        //Unhandled error
        toast.error("Unexpected ERROR!", {
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
      //Expected server error
      toast.error("SERVER ERROR!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="pr-4 pl-10 mt-10 pb-4 w-5/12 mb-4 bg-gray-600 rounded-2xl">
        <div className="flex justify-between ">
          <div className="text-3xl font-semibold text-zinc-200 font-mono mt-6">
            {car_Model}
          </div>
          <div className="flex justify-end">
            <button onClick={() => removeEntry(car_ID)}>
              <Image src="/cancel.png" alt="admin" height={25} width={25} />
            </button>
          </div>
        </div>
        <div className="m-2 flex justify-center rounded-lg">
          <Image src={imageUrl.src} alt="Car" height={180} width={420} />
        </div>
        <div className="text-zinc-200 font-semibold text-xl  mt-1 mb-1">
          {car_Year}
        </div>
        <div className="flex mb-2">
          <div className="text-zinc-200 font-semibold text-lg  mt-1 mb-1">
            {car_Company}
          </div>
          <div className="text-zinc-200 font-semibold  text-lg pl-40 mt-1 mb-1">
            {description}
          </div>
        </div>
        <div className="flex mb-2">
          <div className="text-zinc-200 font-semibold text-lg  mt-1 mb-1">
            {carStatus}
          </div>
          <div className="text-zinc-200 font-semibold  text-lg pl-40 mt-1 mb-1">
            {`Price per Day: ${price_PerDay}`}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarCard;
