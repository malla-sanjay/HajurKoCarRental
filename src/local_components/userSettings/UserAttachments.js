import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { imageToBase64 } from "@/utility";

const UserAttachments = () => {
  const [imageBinary, setImageBinary] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

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
        setImageBinary(base64String);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Error converting image to base64.");
      });
  };

  const addAttachment = async (e) => {
    e.preventDefault();
    console.log(imageBinary);
    try {
      if (imageBinary === null) {
        toast.error("Add an Attachment first", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        const email = localStorage.getItem("email");
        const body = { email, attachmentImage: imageBinary };
        console.log(body);
        const response = await fetch(
          "https://localhost:44396/api/Authentication/AddAttachment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        const result = await response.json();
        console.log(result); //remove afterwards

        if (result.status === 400) {
          //Invalid image format
          toast.error("Image format Invalid", {
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
          //success toast
          toast.success("Attachment Added Successfully", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          localStorage.setItem("hasAttach", true);
          setTimeout(() => {
            //refresh the page so the attachment loads immediately
            location.reload();
          }, 3000);
        } else {
          toast.error("Unexpected error occured", {
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
    <form>
      <div>
        <label
          htmlFor="file-upload"
          className="page-content text-2xl bg-white rounded-lg flex mt-2"
        >
          Upload Liscence Photo PNG/JPEG:
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileUpload}
          className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
        />
        {errorMessage && (
          <p className="error-message text-red-600 text-xl">{errorMessage}</p>
        )}
      </div>
      <button
        type="submit"
        className="text-xl mt-5 p-3 px-5 text-white rounded-lg bg-slate-700"
        onClick={(e) => addAttachment(e)}
      >
        Submit
      </button>
    </form>
  );
};

export default UserAttachments;
