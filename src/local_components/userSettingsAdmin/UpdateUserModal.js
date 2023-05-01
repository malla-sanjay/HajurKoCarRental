import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateUserModal = ({ userEmail, closeModal }) => {
  const userRoles = ["customer", "staff"];
  const [password, setPassword] = useState("");

  //Object that contains all fields key value pair
  const [userDetails, setUserDetails] = useState({
    full_Name: "",
    email: "",
    contact_No: "",
    address: "",
    roleName: "",
  });

  //get the data of user by ID
  const getUserDetails = async () => {
    try {
      const response = await fetch(
        "https://localhost:44396/api/Authentication/GetUserById",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail }),
        }
      );
      const fetchData = await response.json();

      //set the data of on update user
      setUserDetails({
        full_Name: fetchData.data.fullName,
        email: fetchData.data.email,
        contact_No: fetchData.data.contactNo,
        address: fetchData.data.address,
        roleName: fetchData.data.userRole,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      //update api here
      const response = await fetch(
        "https://localhost:44396/api/Authentication/AdminUpdateUsers",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userDetails }),
        }
      );

      const result = await response.json();
      if (result.status === 400) {
        toast.error("Could not update user", {
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
        toast.success("user updated successfully", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        //redirect to settings page
        closeModal(true);
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

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      if (password === "") {
        toast.error("Fill password first", {
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
        const response = await fetch(
          "https://localhost:44396/api/Authentication/ChangePassword",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userEmail, password }),
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

  const handleCancel = () => {
    console.log(userDetails);
    closeModal();
  };

  const onChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const onChangePasswordForm = (e) => {
    setPasswords(e.target.value);
  };

  useEffect(() => {
    //get user details by id
  }, []);

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      contentLabel="Add Class Modal"
      style={customStyles}
    >
      <div>
        <form className=" flex pt-10 ml-52 mr-52 flex-col">
          <h2 className="text-2xl font-semibold mb-2">Change User Password</h2>
          <div className="flex flex-wrap justify-between">
            <div className="w-1/2 p-4 flex flex-col">
              <label htmlFor="full_name" className="text-xl font-semibold mb-2">
                Full Name
              </label>
              <input
                className="text-2xl p-2 bg-purple-100"
                type="text"
                name="full_name"
                value={userDetails.full_Name}
                onChange={(e) => onChange(e)}
                placeholder="User Name"
              />
            </div>
          </div>
          <button
            type="button"
            className="w-full px-3 w-1/2 py-4 mt-6 mb-2 text-white bg-slate-700 rounded-md focus:bg-slate-800 focus:outline-none"
            onClick={updatePassword}
          >
            Update
          </button>
        </form>

        <form className=" flex pt-10 ml-52 mr-52 flex-col">
          <h2 className="text-2xl font-semibold mb-2">Update User</h2>
          <div className="flex flex-wrap justify-between">
            <div className="w-1/2 p-4 flex flex-col">
              <label htmlFor="full_name" className="text-xl font-semibold mb-2">
                Full Name
              </label>
              <input
                className="text-2xl p-2 bg-purple-100"
                type="text"
                name="full_name"
                value={userDetails.full_Name}
                onChange={(e) => onChange(e)}
                placeholder="User Name"
              />
            </div>

            <div className="w-1/2 p-4 flex flex-col">
              <label
                htmlFor="contact_No"
                className="text-xl font-semibold mb-2"
              >
                Contact No
              </label>
              <input
                className="text-2xl p-2 bg-purple-100"
                type="text"
                name="contact_No"
                value={userDetails.contact_No}
                onChange={(e) => onChange(e)}
                placeholder="Contact No"
              />
            </div>

            <div className="w-1/2 p-4 flex flex-col">
              <label htmlFor="address" className="text-xl font-semibold mb-2">
                Address
              </label>
              <input
                className="text-2xl p-2 bg-purple-100"
                type="text"
                name="address"
                value={userDetails.address}
                onChange={(e) => onChange(e)}
                placeholder="Address"
              />
            </div>

            <div className="w-1/3 p-4 flex flex-col">
              <label htmlFor="roleName" className="text-xl font-semibold mb-2">
                Role Name
              </label>
              <select
                name="roleName"
                value={userDetails.roleName}
                onChange={(e) => {
                  onChange(e);
                }}
                className="text-xl p-2  bg-purple-100 mb-2"
              >
                {userRoles.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="w-full px-3 py-4 mt-6 mb-2 text-white bg-slate-700 rounded-md focus:bg-slate-800 focus:outline-none"
              onClick={handleUpdate}
            >
              Add
            </button>
            <button
              type="button"
              className="w-full px-3 py-4 mt-6 mb-7 text-white bg-slate-700 rounded-md focus:bg-slate-800 focus:outline-none"
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

export default UpdateUserModal;
