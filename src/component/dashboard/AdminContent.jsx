import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Alert,
  Paper,
} from "@mui/material";

const AdminRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    Email: "",
    Password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://10.5.49.244:5000/api/admin/create-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Admin registered successfully!");
        setFormData({ name: "", Email: "", Password: "" });
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Admin
        </Typography>

        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            margin="normal"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            name="Email"
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={formData.Email}
            onChange={handleChange}
          />

          <TextField
            name="Password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={formData.Password}
            onChange={handleChange}
          />

          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminRegisterForm;
