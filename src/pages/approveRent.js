import React from "react";
import { useState, useEffect } from "react";
import Navibar from "@/global_components/Navibar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getActiveUser } from "@/utility";

const ApproveRent = () => {
  const [approvalRequests, setApprovalRequests] = useState([{}]);
  const [refresh, setRefresh] = useState(false);
  const userID = "2697e68e-4f1d-44f4-9137-f7bd9bb0206f";
  const [regularCustomer, setRegularCustomer] = useState([]);
  const [approverID, setApproverID] = useState([]);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let daye = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }

    if (daye < 10) {
      daye = `0${daye}`;
    }

    return `${year}-${month}-${daye}`;
  }

  const denyRequest = async (requestID) => {
    try {
      console.log(requestID);
      const response = await fetch(
        "https://localhost:44396/api/Authentication/DeleteApprovalRequests",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ requestID, userID }),
        }
      );
      const result = await response.json();
      console.log(result);

      if (result.data[0].status === "Success") {
        console.log("success");
        toast.success("Approval request removed", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        //Add Notification
        const responseNotific = await fetch(
          "https://localhost:44396/api/Authentication/CreateNotification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userID,
              approverID,
              message:
                "Your request for car rental has been denied, try again next it",
            }),
          }
        );

        console.log(responseNotific);

        setRefresh(!refresh);
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

  const approveRequest = async (requestID, userID, carID) => {
    try {
      //create rent history
      const rentHistBody = {
        carID: "string",
        userID: "string",
        requestDate: "string",
        approverID: "string",
        approvedDate: "string",
        returnedDate: "string",
      };

      const historyResp = await fetch(
        "https://localhost:44396/api/Authentication/CreateRentHistory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestID }),
        }
      );

      const response = await fetch(
        "https://localhost:44396/api/Authentication/DeleteApprovalRequests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestID }),
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.data[0].status === "Success") {
        console.log("success");
        toast.success("Approval request Accepted", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        //Add Notification
        const responseNotific = await fetch(
          "https://localhost:44396/api/Authentication/CreateNotification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userID,
              approverID,
              message:
                "Your request for car rental has been approved. check your profile ",
            }),
          }
        );

        //create rental history
        const requestedDate = getCurrentDate();
        const responseHist = await fetch(
          "https://localhost:44396/api/Authentication/CreateRentHistory",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              carID,
              userID,
              requestDate: requestedDate,
              approverID: approverID,
              approvedDate: requestedDate,
              returnedDate: requestedDate,
            }),
          }
        );

        //update car status
        const responseCar = await fetch(
          "https://localhost:44396/api/Authentication/UpdateCarStatus",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newStatus: "renting",
              car_ID: carID,
            }),
          }
        );

        setRefresh(!refresh);
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
      console.log(err);
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
    }
  };

  //get approval requests
  const getApprovalRequests = async () => {
    try {
      const response = await fetch(
        "https://localhost:44396/api/Authentication/GetAllApprovalRequests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID }),
        }
      );
      const fetchData = await response.json();
      const data = fetchData.data;
      setApprovalRequests(data);
    } catch (err) {
      console.log(err);
    }
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let daye = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }

    if (daye < 10) {
      daye = `0${daye}`;
    }

    return `${year}-${month}-${daye}`;
  }

  const getRegularUsers = async () => {
    try {
      const response = await fetch(
        "https://localhost:44396/api/Authentication/GetAllRentHistory",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userID }),
        }
      );

      const result = await response.json();
      const activeUsers = await getActiveUser(result.data);
      console.log(activeUsers);
      setRegularCustomer(activeUsers);
    } catch (err) {
      console.log("error while fetching active users.");
      console.log(err);
    }
  };

  useEffect(() => {
    const approver = localStorage.getItem("userID");
    setApproverID(approver);
    getApprovalRequests();
    getRegularUsers();
  }, [refresh]);

  return (
    <>
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
      <div className="justify-center flex overflow-auto m-10">
        <table className="table w-full border-collapse border border-gray-300">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-white bg-gray-800 uppercase border-b border-gray-300">
              <th className="px-4 py-3">SN</th>
              <th className="px-4 py-3">Request ID</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Customer Status</th>
              <th className="px-4 py-3">Requested Model</th>
              <th className="px-4 py-3">Requested Data</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal text-gray-700">
            {approvalRequests.map((request, index) => (
              <tr className="hover:bg-gray-100" key={request.requestID}>
                <td className="px-4 py-3 border">{index + 1}</td>
                <td className="px-4 py-3 border">{request.requestID}</td>
                <td className="px-4 py-3 border">{request.fullName}</td>
                <td class="px-4 py-3 border">
                  {regularCustomer.includes(request.fullName) ? (
                    <div className="text-emerald-500">Regular</div>
                  ) : (
                    <div className="text-red-500">Non-Regular</div>
                  )}
                </td>
                <td className="px-4 py-3 border">{request.carModel}</td>
                <td className="px-4 py-3 border">{request.requestedDate}</td>
                <td className="px-4 py-3 border">
                  <button
                    className="px-3text-sm m rounded-sm mr-2 bg-emerald-600 text-white p-2"
                    onClick={() =>
                      approveRequest(
                        request.requestID,
                        request.userID,
                        request.carID
                      )
                    }
                  >
                    Approve Request
                  </button>

                  <button
                    className="px-3 text-sm rounded-sm bg-red-600 text-white p-2"
                    onClick={() =>
                      denyRequest(request.requestID, request.userID)
                    }
                  >
                    Deny Request
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

export default ApproveRent;
