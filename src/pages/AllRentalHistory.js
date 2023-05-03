import React from "react";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import Navibar from "@/global_components/Navibar";

export default function AllRentalHistory() {
  const [rentals, setRentals] = React.useState([{}]);
  const [search, setSearch] = React.useState("");
  const UserID = "2697e68e-4f1d-44f4-9137-f7bd9bb0206f";
  const body = { UserID };

  const loadRentalHistory = async () => {
    try {
      const result = await fetch(
        "https://localhost:44396/api/Authentication/GetRentHistoryByUserID",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await result.json();
      console.log(data);
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
      <Navibar />
      <div>
        <div>
          <h1 class="ml-10 text-4xl font-bold text-gray-800 mt-8 mb-4 mr-4">
            Rental History
          </h1>
          <div class="flex items-center mr-10 ml-10">
            <form class="flex items-center" role="search">
              <input
                class="form-input h-12 w-72 px-2 rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                type="search"
                placeholder="Search by Name"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="container">
          <div class="py-4  mx-10">
            <div class="overflow-x-auto">
              <table class="table w-full border-collapse border border-gray-300">
                <thead>
                  <tr class="text-xs font-semibold tracking-wide text-left text-white bg-gray-800 uppercase border-b border-gray-300">
                    <th class="px-4 py-3">ID</th>
                    <th class="px-4 py-3">RentID</th>
                    <th class="px-4 py-3">Customer Status</th>
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
                        <td class="px-4 py-3 border">{rental.rentID}</td>
                        <td class="px-4 py-3 border">
                          {index === 2 ? (
                            <div className="text-emerald-500">Regular</div>
                          ) : (
                            <div className="text-red-500">Non-Regular</div>
                          )}
                        </td>
                        <td class="px-4 py-3 border">{rental.carModel}</td>
                        <td class="px-4 py-3 border">{rental.userName}</td>
                        <td class="px-4 py-3 border">{rental.requestDate}</td>
                        <td class="px-4 py-3 border">{rental.approver}</td>
                        <td class="px-4 py-3 border">
                          {rental.returnStatusName}
                        </td>
                        <td class="px-4 py-3 border">{rental.payment}</td>

                        <td class="px-4 py-3 border">
                          <AppRegistrationRoundedIcon
                            fontSize="medium"
                            color="primary"
                          />
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
