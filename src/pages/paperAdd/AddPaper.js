import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

function AddPaperForm() {
  const [formData, setFormData] = useState({
    width: "",
    height: "",
    pricePerSheet: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { width, height, pricePerSheet } = formData;
    if (!width || !height || !pricePerSheet) {
      setError("All fields are required.");
      return;
    }

    if (isNaN(width) || isNaN(height) || isNaN(pricePerSheet)) {
      setError("Please enter valid numbers.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "http://10.5.49.244:5000/api/admin/addpaper",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            {
              width: Number(width),
              height: Number(height),
              pricePerSheet: Number(pricePerSheet),
            },
          ]),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add paper");
      }

      setSuccess("Paper added successfully!");
      setFormData({ width: "", height: "", pricePerSheet: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        bgcolor: "white",
      }}
    >
      <Typography variant="h5" mb={2}>
        Add Paper
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Width"
          name="width"
          type="number"
          fullWidth
          margin="normal"
          value={formData.width}
          onChange={handleChange}
          inputProps={{ min: 0, step: "any" }}
        />
        <TextField
          label="Height"
          name="height"
          type="number"
          fullWidth
          margin="normal"
          value={formData.height}
          onChange={handleChange}
          inputProps={{ min: 0, step: "any" }}
        />
        <TextField
          label="Price Per Sheet"
          name="pricePerSheet"
          type="number"
          fullWidth
          margin="normal"
          value={formData.pricePerSheet}
          onChange={handleChange}
          inputProps={{ min: 0, step: "any" }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Add Paper"}
        </Button>
      </form>
    </Box>
  );
}

export default AddPaperForm;
