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

const drawerWidth = 240;

function GetItem() {
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

  console.log(excel.downloadUrl, "what is data");

  useEffect(() => {
    excelDownload();
  }, []);

  const getItem = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      const response = await axios.get(
        "http://10.5.49.244:5000/api/admin/get-Item",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  // Extract all possible keys except '_id' to create table headers
  const allKeys = React.useMemo(() => {
    const keysSet = new Set();
    items.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== "_id") {
          keysSet.add(key);
        }
      });
    });
    return Array.from(keysSet);
  }, [items]);

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
        <Typography variant="h4" gutterBottom sx={{color:"white"}}>
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
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="items table" size="small">
            <TableHead>
              <TableRow>
                {allKeys.map((key) => (
                  <TableCell key={key} sx={{ fontWeight: "bolder" }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  {allKeys.map((key) => (
                    <TableCell key={key}>{String(item[key] ?? "")}</TableCell>
                  ))}
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
