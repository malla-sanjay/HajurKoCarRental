import * as React from "react";
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
import Container from "@mui/material/Container";
import CheckIcon from "@mui/icons-material/Check";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainNavbar from "./MainNavBar";
import Divider from '@mui/material/Divider';
import axios from "axios";
import { Link } from "react-router-dom";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import { LockReset, SettingsAccessibility } from "@mui/icons-material";
import ShieldIcon from "@mui/icons-material/Shield";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { width } from "@mui/system";
import "../../index.css"
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"© "}
      <Link color="inherit" href="/">
        www.travelandtour.com
      </Link>{" "}
      {new Date().getFullYear()}
      {""}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function AllCars() {
  
  const [packages, setPackages] = React.useState([{}]);
  const [search, setSearch] = React.useState("");
  
  React.useEffect(() => {
    console.log("use");
    loadPackages();
  }, []);
  const loadPackages = async () => {
    console.log("load");
    const result = await axios.get("https://localhost:44396/api/Authentication/GetAllCars");
  //console.log(result.data);
    setPackages(result.data);
  };
  
  return (
    <div> 
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <div style={{ margin: 20, padding: 20 }} maxWidth="md">
          {/* End hero unit */}
          <Stack direction="row" spacing={2} justifyContent={"center"}>
            <form className="d-flex" role="search">
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
            </form>
          </Stack>
          <Typography color="text.secondary" style={{ margin: "10px" }}>
            View the latest cars available for rent
          </Typography>
          <Grid container spacing={4}>
            {/* {packages.map((spackage, index) => ( */}
            {packages
              .filter((packages) => {
                return search.toLowerCase() === ""
                  ? packages
                  : packages.CarModel.toLowerCase().includes(search);
              })
              .map((spackage, index) => (
                <Grid item key={spackage.CarId} xs={12} sm={6} md={4}>
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
                    //   src={`http://localhost:8080/p/image/${spackage.id}`}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 2 }}>
                      <Stack direction="row" spacing={3} marginBottom={2}> 
                      <Typography variant="h6">{spackage.CarModel}</Typography>
                      <Divider orientation="vertical" style={{backgroundColor:"#96ebd4"}} flexItem sx={{ borderRightWidth: 2 }} />
                      <Chip label={`${spackage.CarYear}`} color="primary" variant ="filled" />
                    
                      </Stack>
                      
                      <Stack  direction ="row" spacing={1}  style={{ marginTop: 5, justifyContent: "left" }}> 
                        
                       
                         <Chip variant="outlined" label={`${spackage.CarCompany}`} />
                         </Stack>
                    </CardContent>
                    <CardActions style={{ justifyContent: "center" }}>
                      <Link
                  
                        to={`/package/${spackage.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          size="small"
                          variant="contained"
                          className="hover1"
                          sx={{ "&:hover": { borderRadius: 13, width: "fit-content", boxShadow: "inset 100px 0 0 0 #54b3d6" } }}  
                          style={{ borderRadius: 20 }}
                        >
                          Rent
                        </Button>
                      </Link>
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
          ---
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
    </div>
  );
}
