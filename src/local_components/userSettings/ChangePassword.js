import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAnyInputEmpty } from "@/utility";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    current_password: "",
    newPassword: "",
    confirm_password: "",
  });

  const { current_password, newPassword, confirm_password } = passwords;

  const onChangePasswordForm = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const onSubmitPasswordForm = async (e) => {
    e.preventDefault();
    try {
      if (isAnyInputEmpty(passwords)) {
        toast.error("Fill all the inputs", {
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
        //check password new = password confirm
        if (newPassword === confirm_password) {
          //check password correct or not
          const email = localStorage.getItem("email");
          const password = current_password;
          const response = await fetch(
            "https://localhost:44396/api/Authentication/LoginUser",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );
          const loginResult = await response.json();

          console.log(loginResult);

          if (loginResult.data.status === "Success") {
            const response = await fetch(
              "https://localhost:44396/api/Authentication/ChangePassword",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, newPassword }),
              }
            );

            const changeResult = await response.json();
            if ((changeResult.data.status = "SUCCESS")) {
              //success message
              toast.success("Password Changed", {
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
              //error message
              toast.error("Error while changing password", {
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
            //password incorrect
            toast.error("Password Incorrect", {
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
          //two password dont match
          toast.error("The new passwords must match", {
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
    <>
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

      <div className="bg-gray-400 "></div>
      <form className=" p-12 py-0 w-2/5  flex flex-col">
        <h1 className=" text-4xl font-semibold mb-6">Change Password</h1>
        <label htmlFor="current_password:" className="text-xl font-normal mb-3">
          Current Password
        </label>
        <input
          className="text-2xl p-2 bg-purple-100"
          type="password"
          name="current_password"
          id="current_password"
          value={current_password}
          onChange={(e) => onChangePasswordForm(e)}
          placeholder="Enter Current Password"
        />
        <label htmlFor="newPassword" className="text-2xl font-normal mb-3">
          New Password
        </label>
        <input
          className="text-2xl p-2 bg-purple-100"
          type="password"
          name="newPassword"
          id="newPassword"
          value={newPassword}
          onChange={(e) => onChangePasswordForm(e)}
          placeholder="New password here"
        />
        <label htmlFor="confirm_password" className="text-2xl font-normal mb-3">
          Confirm
        </label>
        <input
          className="text-2xl p-2 bg-purple-100"
          type="password"
          name="confirm_password"
          id="confirm_password"
          value={confirm_password}
          onChange={(e) => onChangePasswordForm(e)}
          placeholder="Re Enter the new Password"
        />
        <button
          type="button"
          onClick={onSubmitPasswordForm}
          className="w-full text-2xl px-3 py-4 mt-6 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
        >
          Change Password
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
