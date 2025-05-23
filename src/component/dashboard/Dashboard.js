import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  People,
  AttachMoney,
  ShoppingCart,
  Feedback,
  CheckCircle,
  Cancel,
  Pending,
  Inventory,
  TimeToLeave,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/system";

const drawerWidth = 240;

const DashboardContent = () => {
  const [data, setData] = useState({
    totalComplete: 0,
    totalItem: 0,
    totalLeave: 0,
    totalOrderCancel: 0,
    totalPending: 0,
    totalPrice: 0,
    totalUser: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://10.5.49.244:5000/api/admin/get-total",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(res.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    if (token) {
      fetchData();
    } else {
      console.warn("No admin token found.");
    }
  }, []);


  console.log(data,'dddddddddd')

  const cards = [
    {
      title: "Users",
      value: data.totalUser,
      icon: <People fontSize="large" color="primary" />,
    },
    {
      title: "Revenue",
      value: `$${data.totalPrice}`,
      icon: <AttachMoney fontSize="large" color="success" />,
    },
    {
      title: "Items",
      value: data.totalItem,
      icon: <Inventory fontSize="large" color="info" />,
    },
    {
      title: "Completed Orders",
      value: data.totalComplete,
      icon: <CheckCircle fontSize="large" color="success" />,
    },
    {
      title: "Pending Orders",
      value: data.totalPending,
      icon: <Pending fontSize="large" color="warning" />,
    },
    {
      title: "Cancelled Orders",
      value: data.totalOrderCancel,
      icon: <Cancel fontSize="large" color="error" />,
    },
    {
      title: "Leaves",
      value: data.totalLeave,
      icon: <TimeToLeave fontSize="large" color="secondary" />,
    },
  ];

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          sm: `calc(100% - ${drawerWidth}px)`,
        },
        marginLeft: {
          xs: 0,
          sm: `${drawerWidth}px`,
        },
        padding: 2,
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={2}>
        {cards.map(({ title, value, icon }) => (
          <Grid item   size={{xs:6,sm:3,md:3}} key={title}>
            <Card
              elevation={3}
              sx={{
                backgroundColor: "#ffff",
                height: "100%", // ensures card takes full height of grid row
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  {icon}
                  <Typography variant="h6">{title}</Typography>
                </Box>
                <Typography variant="h4">{value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardContent;
