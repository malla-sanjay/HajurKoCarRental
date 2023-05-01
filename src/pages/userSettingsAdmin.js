import React from "react";
import { useState, useEffect } from "react";
import Navibar from "@/global_components/Navibar";

const UserSettingsAdmin = () => {
  const [users, setUsers] = useState([{}]);
  const [modal, closeModal] = useState(true);
  const [editEmail, setEditEmail] = useState("");
  const user_ID = "922AF30D-F88C-45E7-8EC7-587C39E9BBBE";

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
      console.log(response);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditButton = async () => {
    //just opens the modal for editing
    closeModal(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Navibar />
      <div className="justify-center flex">
        <div className="container">
          <div class="py-4  ml-10">
            <div class="overflow-x-auto">
              <table class="table w-full border-collapse border border-gray-300">
                <thead>
                  <tr class="text-xs font-semibold tracking-wide text-left text-white bg-gray-800 uppercase border-b border-gray-300">
                    <th class="px-4 py-3">SN</th>
                    <th class="px-4 py-3">Full Name</th>
                    <th class="px-4 py-3">Email</th>
                    <th class="px-4 py-3">Contact</th>
                    <th class="px-4 py-3">Address</th>
                    <th class="px-4 py-3">Role</th>
                    <th class="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody class="text-sm font-normal text-gray-700">
                  {users.map((user, index) => (
                    <tr class="hover:bg-gray-100" key={user.email}>
                      <td class="px-4 py-3 border">{index + 1}</td>
                      <td class="px-4 py-3 border">{user.full_Name}</td>
                      <td class="px-4 py-3 border">{user.email}</td>
                      <td class="px-4 py-3 border">{user.contact_No}</td>
                      <td class="px-4 py-3 border">{user.address}</td>
                      <td class="px-4 py-3 border">{user.roleName}</td>
                      <td class="px-4 py-3 border">
                        <button
                          className="px-5 text-xl rounded-sm bg-emerald-600 text-white p-2"
                          onClick={handleEditButton}
                        >
                          Edit User
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSettingsAdmin;
