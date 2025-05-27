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
  if (!statusData || !statusData.creater)
    return <Typography>No status data found.</Typography>;

  const item = statusData.creater; // Your single data object

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
        <Typography variant="h4" gutterBottom sx={{color:"white"}}>
        Status Details
        </Typography>
        <Button  variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2,bgcolor:"white",color:"black"}}>
          Back
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table >
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell sx={{fontWeight:"bolder"}}>Party Name</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Email</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Mobile Number</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Delivery Date</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Address</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Box Color</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Other Details</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Status</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Advance Amount</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Dew Payment</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Choose Paper Size</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Box Quantity Total</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Total Price Aco Shit</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Final Price</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Sheets Required</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Box Dimensions</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Sales Person Location</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Customer Ref</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Product ID</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Created At</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Updated At</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>__v</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              {/* <TableCell>{item._id}</TableCell> */}
              <TableCell>{item.partyName}</TableCell>
              <TableCell>{item.Email}</TableCell>
              <TableCell>{item.MobileNumber}</TableCell>
              <TableCell>
                {new Date(item.DeliveryDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.boxColor}</TableCell>
              <TableCell>{item.otherDetails}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.AdvanceAmount}</TableCell>
              <TableCell>{item.dewPayment}</TableCell>
              <TableCell>{item.choosePaperSize}</TableCell>
              <TableCell>{item.boxQuantityTotal}</TableCell>
              <TableCell>{item.totalPriceAcoShit}</TableCell>
              <TableCell>{item.finalPrice}</TableCell>
              <TableCell>{item.sheetsRequired}</TableCell>
              <TableCell>{item.boxDimensions}</TableCell>
              <TableCell>{item.salesPersonLocation}</TableCell>
              <TableCell>{item.customerRef}</TableCell>
              <TableCell>{item.productId}</TableCell>
              {/* <TableCell>{item.delete ? "Yes" : "No"}</TableCell> */}
              <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(item.updatedAt).toLocaleString()}</TableCell>
              {/* <TableCell>{item.__v}</TableCell> */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ItemStatus;
