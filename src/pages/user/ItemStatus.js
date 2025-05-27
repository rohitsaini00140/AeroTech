import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
} from "@mui/material";

const drawerWidth = 240;

function ItemStatus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const response = await axios.get(
          `http://10.5.49.244:5000/api/admin/get-AllItemStatus/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStatusData(response.data);
      } catch (err) {
        setError("Failed to load status data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!statusData || !statusData.AllStatus)
    return <Typography>No status data found.</Typography>;

  const item = statusData.AllStatus; // Your single data object

  console.log(item);

  return (
    <Container
      sx={{
        mt: 4,
        width: {
          xs: "100%",
          sm: `calc(100% - ${drawerWidth}px)`,
        },
        marginLeft: {
          xs: 0,
          sm: `${drawerWidth}px`,
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Status Details
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ mb: 2, bgcolor: "white", color: "black" }}
        >
          Back
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
    <TableHead>
    <TableRow>
      {/* <TableCell sx={{ fontWeight: "bolder" }}>Sales Person Location</TableCell>
      <TableCell sx={{ fontWeight: "bolder" }}>Customer Ref</TableCell> */}
      <TableCell sx={{ fontWeight: "bolder" }}>Product ID</TableCell>
      <TableCell sx={{ fontWeight: "bolder" }}>Created At</TableCell>
      <TableCell sx={{ fontWeight: "bolder" }}>Updated At</TableCell>
      <TableCell sx={{ fontWeight: "bolder" }}>Designer Forward Date</TableCell>
      <TableCell sx={{ fontWeight: "bolder" }}>Designer Status</TableCell>
      <TableCell sx={{ fontWeight: "bolder" }}>Designer Person ID</TableCell>
      <TableCell sx={{ fontWeight: "bolder" }}>Print Forward Date</TableCell>
      <TableCell sx={{ fontWeight: "bolder" }}>Print Status</TableCell>
      <TableCell sx={{ fontWeight: "bolder" }}>Print Person ID</TableCell>
      <TableCell sx={{ fontWeight: "bolder" }}>Sales Forward Date</TableCell>
      <TableCell sx={{ fontWeight: "bolder" }}>Sales Status</TableCell>
      <TableCell sx={{ fontWeight: "bolder" }}>Sales Person ID</TableCell>
      <TableCell sx={{ fontWeight: "bolder" }}>PID</TableCell>
      <TableCell sx={{ fontWeight: "bolder" }}>Delivery Date</TableCell>
    </TableRow>
  </TableHead>

         <TableBody>
    <TableRow>
        {/* <TableCell>{item.salesPersonLocation}</TableCell>
        <TableCell>{item.customerRef}</TableCell> */}
        <TableCell>{item.productId}</TableCell>
        <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
        <TableCell>{new Date(item.updatedAt).toLocaleString()}</TableCell>
        <TableCell>{item.designerForwordDate}</TableCell>
        <TableCell>{item.designerForwordStatus}</TableCell>
        <TableCell>{item.designerPersonId}</TableCell>
        <TableCell>{item.printForwordDate}</TableCell>
        <TableCell>{item.printForwordStatus}</TableCell>
        <TableCell>{item.printPersonId}</TableCell>
        <TableCell>{item.salesForwordDate}</TableCell>
        <TableCell>{item.salesForwordStatus}</TableCell>
        <TableCell>{item.salesPersonId}</TableCell>
        <TableCell>{item.pId}</TableCell>
        <TableCell>{new Date(item.DeliveryDate).toLocaleDateString()}</TableCell>
      </TableRow>
  </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ItemStatus;
