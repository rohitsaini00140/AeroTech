import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const drawerWidth = 240;

function GetPaper() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [formData, setFormData] = useState({
    width: "",
    height: "",
    pricePerSheet: "",
  });

  const fetchPapers = async () => {
    try {
      const response = await fetch("http://10.5.49.244:5000/api/admin/get-paper");
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to fetch papers");

      setPapers(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleOpenDialog = (paper) => {
    setSelectedPaper(paper);
    setFormData({
      width: paper.width,
      height: paper.height,
      pricePerSheet: paper.pricePerSheet,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPaper(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://10.5.49.244:5000/api/admin/paper-update/${selectedPaper._id}`,
        {
          method: "POSt",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            width: Number(formData.width),
            height: Number(formData.height),
            pricePerSheet: Number(formData.pricePerSheet),
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update paper");
      }

      handleCloseDialog();
      fetchPapers(); // refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box
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
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bolder", color: "white" }}>
        Paper List
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bolder" }}>Width</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Height</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Price Per Sheet</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Created At</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Updated At</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {papers.map((paper) => (
                <TableRow key={paper._id}>
                  <TableCell>{paper.width}</TableCell>
                  <TableCell>{paper.height}</TableCell>
                  <TableCell>{paper.pricePerSheet}</TableCell>
                  <TableCell>{new Date(paper.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{new Date(paper.updatedAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleOpenDialog(paper)}>
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Update Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Paper</DialogTitle>
        <DialogContent>
          <TextField
            label="Width"
            name="width"
            value={formData.width}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Price Per Sheet"
            name="pricePerSheet"
            value={formData.pricePerSheet}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default GetPaper;
