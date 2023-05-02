import React from "react";
import Navibar from "@/global_components/Navibar";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DamageLogByID() {
  const [damages, setDamages] = React.useState([{}]);
  const [search, setSearch] = React.useState("");
  const userID = "922AF30D-F88C-45E7-8EC7-587C39E9BBBE";
  const body = { userID };

  const loadDamages = async () => {
    try {
      const result = await fetch(
        "https://localhost:44396/api/Authentication/GetDamageLogByUserID",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await result.json();
      setDamages(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    loadDamages();
  }, []);

  return (
    <>
      <div>
        <div>
          <h1 class="ml-10 text-4xl font-bold text-gray-800 mt-8 mb-4 mr-4">
             Damage Logs By ID
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
          <div class="py-4  ml-10">
            <div class="overflow-x-auto">
              <table class="table w-full border-collapse border border-gray-300">
                <thead>
                  <tr class="text-xs font-semibold tracking-wide text-left text-white bg-gray-800 uppercase border-b border-gray-300">
                    <th class="px-4 py-3">ID</th>
                    <th class="px-4 py-3">DamageLog ID</th>
                    <th class="px-4 py-3">Damaged By</th>
                    <th class="px-4 py-3">Car Model</th>
                    <th class="px-4 py-3">Ammount</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Operations</th>
                  </tr>
                </thead>
                <tbody class="text-sm font-normal text-gray-700">
                  {damages
                    .filter((damages) => {
                      return search.toLowerCase() === ""
                        ? damages
                        : damages.userName.toLowerCase().includes(search);
                    })
                    .map((damage, index) => (
                      <tr class="hover:bg-gray-100">
                        <td class="px-4 py-3 border">{index + 1}</td>
                        <td class="px-4 py-3 border">{damage.damageLogID}</td>
                        <td class="px-4 py-3 border">{damage.userName}</td>
                        <td class="px-4 py-3 border">{damage.carName}</td>
                        <td class="px-4 py-3 border">{damage.paymentFees}</td>
                        <td class="px-4 py-3 border">{damage.payed ? "Paid" : "Not Paid"}</td>
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
