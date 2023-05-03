import React from "react";
import { Card, CardContent, Chip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import Navibar from "@/global_components/Navibar";

export default function Notification() {
  const [notifications, setNotifications] = React.useState([{}]);

  const userID = "2697e68e-4f1d-44f4-9137-f7bd9bb0206f";
  const body = { userID };

  const loadNotifications = async () => {
    try {
      const result = await fetch(
        "https://localhost:44396/api/Authentication/GetNotificationByID",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await result.json();
      setNotifications(data.data);
      console.log(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <>
      <Navibar />
      <div class="flex justify-center items-center h-screen">
        <div class="w-full max-w-md">
          <div class="shadow-lg rounded-lg bg-white">
            <div class="px-6 py-4">
              <h2 class="text-2xl font-semibold text-center mb-4">
                Notifications
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notifications.map((notification, index) => (
                  <div class="flex flex-col items-start" key={index}>
                    <p class="text-sm font-semibold mb-1">
                      For: {notification.userName}
                    </p>
                    <p class="text-sm font-semibold mb-1">
                      Approver: {notification.approverName}
                    </p>
                    <p class="text-sm font-semibold mb-2">Message:</p>
                    <p class="text-sm">{notification.notificationMessage}</p>
                  </div>
                ))}
              </div>
              <div class="flex flex-wrap items-center mt-4">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Rent Request
                </span>
                <span class="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">
                  Approved
                </span>
                <button class="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full h-10 w-10 ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
