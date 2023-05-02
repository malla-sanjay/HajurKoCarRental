import React from "react";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import PaidIcon from "@mui/icons-material/Paid";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

export default function AllCars() {
  const theme = createTheme();
  const [cars, setCars] = React.useState([{}]);
  const user_ID = "FEAAF683-E3D9-478C-8999-31B068C37980";
  const body = { user_ID };
  const [currentRole, setCurrentRole] = React.useState(null);

  const loadCars = async () => {
    try {
      const result = await fetch(
        "https://localhost:44396/api/Authentication/GetAllCars",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await result.json();

      setCars(data.data);
      console.log(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderCards = () => {
    try {
      return cars.map((car, index) => {
        return car.carStatus === "available" ? (
          <Grid item key={car.car_ID} xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
              }}
              style={{ boxShadow: "2px 3px 10px #888888" }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CardMedia
                  component="img"
                  style={{
                    height: "280px",
                    width: "420px",
                    marginTop: "20px",
                  }}
                  src={`data:image/png;base64,${car.car_Image}`}
                  alt="random"
                />
              </div>
              <CardContent sx={{ flexGrow: 2 }}>
                <Stack direction="row" spacing={3} marginBottom={2}>
                  <Typography variant="h6">{`${car.car_Model}`}</Typography>

                  <Typography color="primary" variant="filled">
                    {`${car.car_Company}`}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  marginBottom={2}
                  marginTop={2}
                  style={{ justifyContent: "left" }}
                >
                  <Stack direction="row" spacing={2}>
                    <Chip
                      icon={<PaidIcon color="warning" />}
                      label={`${car.price_PerDay}`}
                    />
                    <Chip variant="outlined" label={`${car.car_Year}`} />
                  </Stack>
                </Stack>

                <Stack
                  direction="column"
                  spacing={1}
                  style={{ marginTop: 5, justifyContent: "left" }}
                >
                  <Typography>{`${car.description}`}</Typography>
                </Stack>
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <Button
                  size="large"
                  variant="contained"
                  style={{
                    backgroundColor: "black",
                    borderRadius: 20,
                    marginBottom: 10,
                  }}
                  onClick={() => handleRequest(car.car_ID)}
                >
                  Add Request
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ) : null;
      });
    } catch (err) {
      console.log(err);
      console.log("error while rendering cards");
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

  const handleRequest = async (carID) => {
    try {
      if (currentRole === null) {
        toast.error("Please login to make rent requests", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        const userID = localStorage.getItem("userID");
        const requestedDate = getCurrentDate();

        console.log(carID);
        console.log(userID);
        console.log(requestedDate);

        const result = await fetch(
          "https://localhost:44396/api/Authentication/CreateApprovalRequest",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ carID, userID, requestedDate }),
          }
        );
        const data = await result.json();
        console.log;
        console.log(data);

        if (data.data.length === 0) {
          toast.error("Could not request the car", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (data.data[0].status === "SUCCESS") {
          toast.success("Request made successfully", {
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
      }
    } catch (err) {
      console.log(err);
      toast.error("Server Error", {
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

  React.useEffect(() => {
    loadCars();
    const role = localStorage.getItem("role");
    setCurrentRole(role);
  }, []);
  return (
    <div>
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          <div style={{ margin: 20, padding: 20 }} maxWidth="md">
            <h1 class="ml-10 text-4xl font-bold text-gray-800  mb-4 mr-4">
              Our Available Cars
            </h1>
            <Grid container spacing={4}>
              {renderCards()}
            </Grid>
          </div>
        </main>

        {/* Footer */}
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            With Regards
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            HajurKoCarRental
          </Typography>
        </Box>
        {/* End footer */}
      </ThemeProvider>
    </div>
  );
}
