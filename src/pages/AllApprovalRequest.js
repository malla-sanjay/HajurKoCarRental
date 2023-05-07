import React from "react";
import Navibar from "@/global_components/Navibar";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AllApprovalRequest() {
  const [approvals, setApprovals] = React.useState([{}]);
  const [search, setSearch] = React.useState("");

  const userID = "922AF30D-F88C-45E7-8EC7-587C39E9BBBE";
  const body = { userID };

  const loadApprovals = async () => {
    try {
      const result = await fetch(
        "https://localhost:44396/api/Authentication/GetAllApprovalRequests",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await result.json();
      setApprovals(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    loadApprovals();
  }, []);
  return (
    <>
      <Navibar> </Navibar>
      <div>
        <div>
          <h1 class="ml-10 text-4xl font-bold text-gray-800 mt-8 mb-4 mr-4">
            Approval Requests
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
                    <th class="px-4 py-3">RequestID</th>
                    <th class="px-4 py-3">Requested By</th>
                    <th class="px-4 py-3">Car Model</th>
                    <th class="px-4 py-3">RequestDate</th>
                    <th class="px-4 py-3">Operations</th>
                  </tr>
                </thead>
                <tbody class="text-sm font-normal text-gray-700">
                  {approvals
                    .filter((approvals) => {
                      return search.toLowerCase() === ""
                        ? approvals
                        : approvals.fullName.toLowerCase().includes(search);
                    })
                    .map((approval, index) => (
                      <tr class="hover:bg-gray-100" key={index + 1}>
                        <td class="px-4 py-3 border">{index + 1}</td>
                        <td class="px-4 py-3 border">{approval.requestID}</td>
                        <td class="px-4 py-3 border">{approval.fullName}</td>
                        <td class="px-4 py-3 border">{approval.carModel}</td>
                        <td class="px-4 py-3 border">
                          {approval.requestedDate}
                        </td>
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
