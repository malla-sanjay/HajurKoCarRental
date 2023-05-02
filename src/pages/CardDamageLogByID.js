import React from "react";
import { Card, CardContent, Chip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

export default function CardDamageLogByID({ userID }) {
  const [damages, setDamages] = React.useState([{}]);

  const loadDamages = async () => {
    try {
      const result = await fetch(
        "https://localhost:44396/api/Authentication/GetDamageLogByUserID",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userID }),
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
      <Grid
        container
        height="50vh"
        spacing={4}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <div className="bg-white shadow-lg rounded-lg px-6 py-4 w-full md:w-96">
            <h2 className="text-2xl font-bold mb-4">Damage Log</h2>
            <Grid container spacing={2}>
              {damages.map((damage, index) => (
                <Grid
                  alignItems="flex-start"
                  item
                  key={damage.damageLogID}
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <p className="text-lg font-semibold">
                    Name: {damage.userName}
                  </p>
                  <p className="text-lg font-semibold">
                    Model: {damage.carName}
                  </p>
                  <p className="text-lg font-semibold">
                    Amount: {damage.paymentFees}
                  </p>
                  <p className="text-lg font-semibold">
                    Status: {damage.payed ? "Paid" : "Not Paid"}
                  </p>
                </Grid>
              ))}
            </Grid>
            <p className="text-lg font-semibold mt-4">Tags:</p>
            <div className="flex flex-wrap mb-2">
              <span className="bg-gray-100 py-1 px-2 rounded-full mr-1 mb-1 text-sm font-medium">
                Damaged Car
              </span>
              <span className="bg-gray-100 py-1 px-2 rounded-full mr-1 mb-1 text-sm font-medium">
                Status
              </span>
            </div>
            <div className="flex justify-center">
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
                <DeleteIcon className="inline-block mr-2" /> Delete
              </button>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
