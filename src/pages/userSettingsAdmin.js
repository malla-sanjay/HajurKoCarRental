/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useState, useEffect } from "react";
import Navibar from "@/global_components/Navibar";
import UpdateUserModal from "@/local_components/userSettingsAdmin/UpdateUserModal";
import "react-toastify/dist/ReactToastify.css";
import { Result } from "postcss";
import { getActiveUser } from "@/utility";
import { ErrorOutlineOutlined } from "@mui/icons-material";

const userSettingsAdmin = () => {
  const [users, setUsers] = useState([{}]);
  const [modal, closeModal] = useState(true);
  const [editUserEmail, setEditUserEmail] = useState("");
  const [editUserRole, setEditUserRole] = useState("");
  const user_ID = "2697e68e-4f1d-44f4-9137-f7bd9bb0206f";
  const [regularCustomer, setRegularCustomer] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://localhost:44396/api/Authentication/ViewUsersAdmin",
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
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditButton = async (email, role) => {
    //set paramters for modal
    console.log(email);
    console.log(role);
    setEditUserEmail(email);
    setEditUserRole(role);
    //just opens the modal for editing
    closeModal(false);
  };

  const getRegularUsers = async () => {
    try {
      const response = await fetch(
        "https://localhost:44396/api/Authentication/GetAllRentHistory",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userID: user_ID }),
        }
      );

      const result = await response.json();
      const activeUsers = await getActiveUser(result.data);

      setRegularCustomer(activeUsers);
    } catch (err) {
      console.log("error while fetching active users.");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    getRegularUsers();
  }, [modal]);

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
      <div className="justify-center flex overflow-auto m-10">
        <table className="table w-full border-collapse border border-gray-300">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-white bg-gray-800 uppercase border-b border-gray-300">
              <th className="px-4 py-3">SN</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal text-gray-700">
            {users.map((user, index) => (
              <tr className="hover:bg-gray-100" key={user.email}>
                <td className="px-4 py-3 border">{index + 1}</td>
                <td className="px-4 py-3 border">{user.full_Name}</td>
                <td class="px-4 py-3 border">
                  {regularCustomer.includes(user.full_Name) ? (
                    <div className="text-emerald-500">Regular</div>
                  ) : (
                    <div className="text-red-500">Non-Regular</div>
                  )}
                </td>
                <td className="px-4 py-3 border">{user.email}</td>
                <td className="px-4 py-3 border">{user.contact_No}</td>
                <td className="px-4 py-3 border">{user.address}</td>
                <td className="px-4 py-3 border">{user.roleName}</td>
                <td className="px-4 py-3 border">
                  <button
                    className="px-5 text-xl rounded-sm bg-emerald-600 text-white p-2"
                    onClick={() => handleEditButton(user.email, user.roleName)}
                  >
                    Edit User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default userSettingsAdmin;
