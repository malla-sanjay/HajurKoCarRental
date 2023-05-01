import { base64ToImage, imageToBase64 } from "@/utility";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const AttachmentDisplay = () => {
  const [attachment, setAttachment] = useState("");
  const [foundAttachment, setFoundAttachment] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const getAttachment = async (e) => {
    try {
      const email = localStorage.getItem("email");
      console.log(email);
      const response = await fetch(
        "https://localhost:44396/api/Authentication/ViewAttachmentByID",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const result = await response.json();
      console.log(result);

      if (result.data.length === 0) {
        //Handeled error
        toast.error("No user Attachment found", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (result.data[0].status === "SUCCESS") {
        console.log("success");
        //set attachment
        setAttachment(result.data[0].attachment);
        setFoundAttachment(true);
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

  const fetchData = async () => {
    await getAttachment();
    if (foundAttachment) {
      console.log(attachment);
      const image = await base64ToImage(attachment);
      setImageUrl(image);
    }
  };

  useEffect(() => {
    fetchData();
  }, [foundAttachment]);

  const attachmentView = () => {
    if (!foundAttachment) {
      return (
        <div className="bg-gray-800 p-5 w-0.4 h-96 rounded-lg">
          <h1 className="text-4xl font-semibold text-white">
            No Cards Available
          </h1>
          <h1 className="text-2xl font-medium text-white">
            Attach your drivers liscence using the input field below
          </h1>
        </div>
      );
    } else {
      return (
        <div className="bg-gray-800 p-5 h-96 rounded-lg">
          <h1 className="text-4xl mb-10 font-semibold text-white">
            Your Liscence Paper
          </h1>
          <div className=" flex justify-center">
            <img src={imageUrl.src} alt="attachment" />
          </div>
        </div>
      );
    }
  };

  return <>{attachmentView()}</>;
};

export default AttachmentDisplay;
