import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function GetItem() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [excel, setExcel] = useState([]);

  const excelDownload = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      const response = await axios.get(
        "http://10.5.49.244:5000/api/admin/get-ItemExcel",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setExcel(response.data || []);
    } catch (err) {
      console.error("Error fetching item:", err);
      setError("Failed to fetch item.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    excelDownload();
  }, []);

  const getItem = async () => {
    const token = localStorage.getItem("adminToken");

    console.log(token);

    try {
      const response = await axios.get(
        "http://10.5.49.244:5000/api/admin/get-Item",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response, "what is data here");

      setItems(response.data.data || []);
    } catch (err) {
      console.error("Error fetching item:", err);
      setError("Failed to fetch item.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  console.log(items, "kya aa raha ha");

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Get Items
        </Typography>

        <a href={excel.downloadUrl} download style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Excel Download
          </Button>
        </a>
      </Box>

      {loading && <CircularProgress />}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && items.length === 0 && (
        <Typography variant="body1">No items found.</Typography>
      )}

      {!loading && items.length > 0 && (
        <TableContainer component={Paper} >
          <Table >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>
                  <strong>PartyName</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>MobileNumber</strong>
                </TableCell>
                <TableCell>
                  <strong>DeliveryDate</strong>
                </TableCell>
                <TableCell>
                  <strong>Address</strong>
                </TableCell>
                <TableCell>
                  <strong>BoxColor</strong>
                </TableCell>
                <TableCell>
                  <strong>OtherDetails</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>AdvanceAmount</strong>
                </TableCell>
                <TableCell>
                  <strong>DewPayment</strong>
                </TableCell>
                <TableCell>
                  <strong>ChoosePaperSize</strong>
                </TableCell>
                <TableCell>
                  <strong>BoxQuantityTotal</strong>
                </TableCell>
                <TableCell>
                  <strong>TotalPriceAcoShit</strong>
                </TableCell>
                <TableCell>
                  <strong>FinalPrice</strong>
                </TableCell>
                <TableCell>
                  <strong>SheetsRequired</strong>
                </TableCell>
                <TableCell>
                  <strong>BoxDimensions</strong>
                </TableCell>
                <TableCell>
                  <strong>SalesPersonLocation</strong>
                </TableCell>
                <TableCell>
                  <strong>CustomerRef</strong>
                </TableCell>
                <TableCell>
                  <strong>ProductId</strong>
                </TableCell>

                <TableCell>
                  <strong>CreatedAt</strong>
                </TableCell>
                <TableCell>
                  <strong>UpdatedAt</strong>
                </TableCell>

                <TableCell>
                  <strong>ForwordTo</strong>
                </TableCell>
                <TableCell>
                  <strong>ViewStatus</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
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
                  <TableCell>
                    {new Date(item.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(item.updatedAt).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    {item.forwordTo ? item.forwordTo : "Pending"}
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Button
                  variant="outlined"
                    onClick={() => navigate(`/dashboard/item-status/${item._id}`)}
                    sx={{bgcolor:"#8E0048",color:"white"}}
                    >
                      Show Status
                    </Button>{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default GetItem;
