import React from "react";
import { useState, useEffect } from "react";
import Navibar from "@/global_components/Navibar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApproveRent = () => {
  const [approvalRequests, setApprovalRequests] = useState([{}]);
  const [refresh, setRefresh] = useState(false);
  const userID = "922AF30D-F88C-45E7-8EC7-587C39E9BBBE";

  const denyRequest = async (requestID) => {
    //delete approval request entry
    //take the user id from approval request and add notification with denied message to the user
    try {
      const response = await fetch(
        "'https://localhost:44396/api/Authentication/DeleteApprovalRequests'",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ requestID }),
        }
      );
      const result = await response.json();
      console.log(result);

      if (result.data.status === "Success") {
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

  const approveRequest = async () => {
    //delete approver reqeust entry
    //create rent history
    //check if user has any 2 rent history with within 3 months
    //create payment history
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
      setUsers(data);
    } catch (err) {
      console.log(err);
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

  useEffect(() => {
    getApprovalRequests();
  }, []);

  return (
    <>
      <Navibar />
      <div className="justify-center flex overflow-auto m-10">
        <table className="table w-full border-collapse border border-gray-300">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-white bg-gray-800 uppercase border-b border-gray-300">
              <th className="px-4 py-3">SN</th>
              <th className="px-4 py-3">Request ID</th>
              <th className="px-4 py-3">Full Name</th>
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
                <td className="px-4 py-3 border">{request.carModel}</td>
                <td className="px-4 py-3 border">{request.requestedDate}</td>
                <td className="px-4 py-3 border">
                  <button
                    className="px-3text-sm m rounded-sm mr-2 bg-emerald-600 text-white p-2"
                    onClick={approveRequest}
                  >
                    Approve Request
                  </button>

                  <button
                    className="px-3 text-sm rounded-sm bg-red-600 text-white p-2"
                    onClick={() => denyRequest(request.requestID)}
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
