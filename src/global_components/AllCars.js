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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const theme = createTheme();

export default function AllCars() {
  const [cars, setCars] = React.useState([{}]);
  const user_ID = "FEAAF683-E3D9-478C-8999-31B068C37980";
  const body = { user_ID };

  const loadCars = async () => {
    try{
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
          console.log(data.data)
    
    }
    catch(err){
      console.log(err)
    }
   };

  React.useEffect(() => {
    loadCars();
    console.log(loadCars());
  }, []);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          <div style={{ margin: 20, padding: 20 }} maxWidth="md">
            {/* End hero unit */}
            <Stack direction="row" spacing={2} justifyContent={"center"}>
              {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search by Name"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                disabled
                className="btn btn-outline-primary"
                type="submit"
              >
                Search
              </button>
            </form> */}
            </Stack>
            <Typography color="text.secondary" style={{ margin: "10px" }}>
              View all the cars.
            </Typography>
            <Grid container spacing={4}>
              {/* {packages.map((spackage, index) => ( */}
              {cars.map((car, index) => (
                <Grid item 
                key={car.car_ID}
                 xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "10px",
                    }}
                    style={{ boxShadow: "2px 3px 10px #888888" }}
                  >
                    <div style={{display:"flex", justifyContent:"center"}}> 
                    <CardMedia
                      component="img"
                
                     style={{height:"150px", width:"150px"}}
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
                          <Chip
                            variant="outlined"
                            // icon={
                            //   <LocationOnIcon color="error"></LocationOnIcon>
                            // }
                            label={`${car.car_Year}`}
                          />
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
                      {/* <Link
                  
                        to={`/package/${spackage.id}`}
                        style={{ textDecoration: "none" }}
                      > */}
                      <Button
                        size="small"
                        variant="contained"
                       
                        
                        style={{backgroundColor: "black", borderRadius: 20 }}
                      >
                        Explore
                      </Button>
                      {/* </Link> */}
                    </CardActions>
                  </Card>
                </Grid>
              ))} 
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
