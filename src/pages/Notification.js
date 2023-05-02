import React from "react";
import { Card, CardContent, Chip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

export default function Notification() {
  const [notifications, setNotifications] = React.useState([{}]);

  const userID = "BF286A29-6282-47B0-9B72-E452CE58A453";
  const body = { userID };

  const loadNotifications = async () => {
    try {
      const result = await fetch(
        "https://localhost:44396/api/Authentication/GetNotificationByID",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await result.json();
      setNotifications(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
        spacing={4}
      >
        <Grid item>
          <Card sx={{ boxShadow: 4 }}>
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                textAlign={"center"}
              >
                Notification
              </Typography>
              <Grid container spacing={2}>
                {notifications.map((notification, index) => (
                  <Grid
                    alignItems="flex-start"
                    item
                    key={notification.notificationID}
                    xs={12}
                    sm={6}
                    md={4}
                  >
                    <Typography
                      variant="body1"
                      component="p"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      Name: {notification.userName}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      Approver: {notification.approverName}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      sx={{ marginTop: 2 }}
                    >
                      Message:
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      sx={{ whiteSpace: "pre-line" }}
                    >
                      {notification.notificationMessage}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Typography variant="body1" component="p" sx={{ marginTop: 2 }}>
                Tags:
              </Typography>
              <Chip
                label="Rent Request"
                sx={{ marginRight: 1, marginBottom: 1 }}
              />
              <Chip label="Approved" sx={{ marginRight: 1, marginBottom: 1 }} />
              <div
                style={{
                  justifyContent: "center",
                  alignItem: "center",
                  textAlign: "center",
                }}
              >
                <Button>
                  <DeleteIcon color="error" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
