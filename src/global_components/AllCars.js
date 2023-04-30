import React from 'react'
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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from '@mui/material/Divider';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const theme = createTheme();

export default function AllCars() {
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
            {/* {packages
              .filter((packages) => {
                return search.toLowerCase() === ""
                  ? packages
                  : packages.name.toLowerCase().includes(search);
              })
             
              .map((spackage, index) => ( */}
                <Grid item 
                // key={spackage.id} 
                xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "10px",
                    }}
                    style={{ boxShadow: "2px 3px 10px #888888" }}
                  >
                    <CardMedia
                      component="img"
                      height="150"
                      width="150"
                      //src={`http://localhost:8080/p/image/${spackage.id}`}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 2 }}>
                      <Stack direction="row" spacing={3} marginBottom={2}> 
                      <Typography variant="h6">{`Car.Model`}</Typography>
                      <Divider orientation="vertical" style={{backgroundColor:"#96ebd4"}} flexItem sx={{ borderRightWidth: 2 }} />
                      <Chip label={`Car.Company`} color="primary" variant ="filled" />
            
                      </Stack>
                      <Divider sx={{ borderBottomWidth: 2}} style={{backgroundColor:"#96ebd4"}}/>
                      <Stack
                        direction="row"
                        spacing={2}
                        marginBottom={2}
                        marginTop={2}
                        style={{  justifyContent: "left" }}
                      >
                          
                
                          
                        
                           
                      
                            <Stack direction="row" spacing={2}>
                              <Chip
                                icon={<PaidIcon color="warning" />}
                                label={
                                  <span>
                                    {`Car.Price`}
                                    <span></span>
                                  </span>
                                }
                              />
                              <Chip
                        variant="outlined"
                          icon={<LocationOnIcon color="error"></LocationOnIcon>}
                          label={`Car.Year`}
                        />
                            </Stack>
                         
                       
                      </Stack>
                     
                      <Stack  direction ="column" spacing={1}  style={{ marginTop: 5, justifyContent: "left" }}> 
                        
                       
                         <Chip variant="outlined" label={`Car.Desc`} />
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
                          className="hover1"
                          sx={{ "&:hover": { borderRadius: 13, width: "fit-content", boxShadow: "inset 100px 0 0 0 #54b3d6" } }}  
                          style={{ borderRadius: 20 }}
                        >
                          Explore
                        </Button>
                      {/* </Link> */}
                    </CardActions>
                  </Card>
                </Grid>
              {/* ))} */}
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
          Travel and Tour Management System
        </Typography>
       
      </Box>
      {/* End footer */}
    </ThemeProvider>
    </div>
  )
}
