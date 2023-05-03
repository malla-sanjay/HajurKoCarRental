import React from "react";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import Navibar from "@/global_components/Navibar";
import CardDamageLogByID from "./CardDamageLogByID";

export default function RentByID() {
  const [rentals, setRentals] = React.useState([{}]);
  const [search, setSearch] = React.useState("");
  const [userID, setUserID] = React.useState("");

  const loadRentalHistory = async (userID) => {
    try {
      const result = await fetch(
        "https://localhost:44396/api/Authentication/GetRentHistoryByUserID",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userID }),
        }
      );
      const data = await result.json();
      setRentals(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    const UserID = localStorage.getItem("userID");
    setUserID(UserID);
    loadRentalHistory(UserID);
  }, []);

  return (
    <>
      <div>
        <Navibar> </Navibar>
        <h1 class="mx-10 text-4xl font-bold text-gray-800 mt-8 mb-4 mr-4">
          User Rent History
        </h1>

        <div className="container">
          <div class="py-4  mx-10">
            <div class="overflow-x-auto">
              <table class="table w-full border-collapse border border-gray-300">
                <thead>
                  <tr class="text-xs font-semibold tracking-wide text-left text-white bg-gray-800 uppercase border-b border-gray-300">
                    <th class="px-4 py-3">ID</th>
                    <th class="px-4 py-3">RentID</th>
                    <th class="px-4 py-3">Car Model</th>
                    <th class="px-4 py-3">Rented By</th>
                    <th class="px-4 py-3">RequestDate</th>
                    <th class="px-4 py-3">Approver</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Ammount</th>
                    <th class="px-4 py-3">Operations</th>
                  </tr>
                </thead>
                <tbody class="text-sm font-normal text-gray-700">
                  {rentals
                    .filter((rentals) => {
                      return search.toLowerCase() === ""
                        ? rentals
                        : rentals.userName.toLowerCase().includes(search);
                    })
                    .map((rental, index) => (
                      <tr class="hover:bg-gray-100" key={rental.rentID}>
                        <td class="px-4 py-3 border">{index + 1}</td>
                        {rental.rentID ===
                        "00000000-0000-0000-0000-000000000000" ? (
                          <td class="px-4 py-3 border text-red-500">
                            User has no Rent history as of yet
                          </td>
                        ) : (
                          <td class="px-4 py-3 border">{rental.rentID}</td>
                        )}
                        <td class="px-4 py-3 border">{rental.carModel}</td>
                        <td class="px-4 py-3 border">{rental.userName}</td>
                        <td class="px-4 py-3 border">{rental.requestDate}</td>
                        <td class="px-4 py-3 border">{rental.approver}</td>
                        <td class="px-4 py-3 border">
                          {rental.returnStatusName}
                        </td>
                        <td class="px-4 py-3 border">{rental.payment}</td>
                        <td class="px-4 py-3 border">
                          <button class=" ml-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full">
                            Request Damaged
                          </button>
                          <button class=" ml-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                            Cancel
                          </button>
                          <button class=" ml-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">
                            Make Payment
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <h1 class="mx-10 text-4xl font-bold text-gray-800 mt-8 mb-4 mr-4">
          Damage Payments
        </h1>
        {userID === "" ? (
          <div class="mx-10 text-x font-bold text-emerald-600 mb-4 mr-4">
            No Damage payment required
          </div>
        ) : (
          <CardDamageLogByID userID={userID} />
        )}
      </div>
    </>
  );
}