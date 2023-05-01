import React from "react";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import Navibar from "@/global_components/Navibar";

export default function AllRentalHistory() {
  const [rentals, setRentals] = React.useState([{}]);

  const UserID = "922AF30D-F88C-45E7-8EC7-587C39E9BBBE";
  const body = { UserID };

  const loadRentalHistory = async () => {
    try {
      const result = await fetch(
        "https://localhost:44396/api/Authentication/GetAllRentHistory",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await result.json();
      setRentals(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    loadRentalHistory();
  }, []);

  return (
    <>
    <Navibar> </Navibar>
      <div>

        <div className="container">
          <div class="py-4  ml-10">
            <div class="overflow-x-auto">
              <table class="table w-full border-collapse border border-gray-300">
                <thead>
                  <tr class="text-xs font-semibold tracking-wide text-left text-white bg-gray-800 uppercase border-b border-gray-300">
                    <th class="px-4 py-3">ID</th>
                    <th class="px-4 py-3">RentID</th>
                    <th class="px-4 py-3">CarID</th>
                    <th class="px-4 py-3">UserID</th>
                    <th class="px-4 py-3">RequestDate</th>
                    <th class="px-4 py-3">Approver</th>
                    <th class="px-4 py-3">Operations</th>
                  </tr>
                </thead>
                <tbody class="text-sm font-normal text-gray-700">
                  {rentals.map((rental, index) => (
                    <tr class="hover:bg-gray-100">
                      <td class="px-4 py-3 border">{index + 1}</td>
                      <td class="px-4 py-3 border">{rental.rentID}</td>
                      <td class="px-4 py-3 border">{rental.carID}</td>
                      <td class="px-4 py-3 border">{rental.userID}</td>
                      <td class="px-4 py-3 border">{rental.requestDate}</td>
                      <td class="px-4 py-3 border">{rental.approver}</td>
                      <td class="px-4 py-3 border">
                      <AppRegistrationRoundedIcon fontSize="medium" color="primary"/>
                      <DeleteIcon />
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
}
