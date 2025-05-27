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
  Button,
  Modal,
  TextField,
} from "@mui/material";

const drawerWidth = 240;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function GetHolidays() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = (holiday) => {
    setSelectedHoliday(holiday);
    setName(holiday.name);
    setDate(holiday.date.split("T")[0]);
    setDescription(holiday.description || ""); // default empty if not set
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const fetchHolidays = () => {
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
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

console.log(holidays)

  const handleUpdate = () => {
    const token = localStorage.getItem("adminToken");

    axios
      .post(
        "http://10.5.49.244:5000/api/admin/holiday-update",
        {
          holidays: [
            {
              _id: selectedHoliday._id,
              name,
              date,
              description,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        handleClose();
        fetchHolidays(); // Refresh data
      })
      .catch((err) => {
        alert("Update failed: " + (err.response?.data?.message || err.message));
      });
  };

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
      <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
        Holidays
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holidays.map((holiday, index) => (
              <TableRow key={index} hover>
                <TableCell>{holiday.name}</TableCell>
                <TableCell>
                  {new Date(holiday.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{holiday.description}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(holiday)}>Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Update Holiday
          </Typography>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            type="date"
            label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />

          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default GetHolidays;
