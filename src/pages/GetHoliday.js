import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

const drawerWidth = 240;

function GetHolidays() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    axios
      .get("http://10.5.49.244:5000/api/admin/get-holidaye", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHolidays(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          sm: `calc(100% - ${drawerWidth}px)`,
        },
        ml: {
          xs: 0,
          sm: `${drawerWidth}px`,
        },
        px: 3,
        py: 2,
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{color:"white"}}>
        Holidays
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {holidays.map(({ name, date, description }, index) => (
              <TableRow key={index} hover>
                <TableCell>{name}</TableCell>
                <TableCell>{new Date(date).toLocaleDateString()}</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default GetHolidays;
