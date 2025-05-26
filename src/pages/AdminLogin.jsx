import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// AdminLogin.jsx
export default function AdminLogin() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

 const navigate = useNavigate(); // Initialize navigate

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await fetch('http://10.5.49.244:5000/api/admin/admin-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Email, Password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Login failed');
    }

    localStorage.setItem('adminToken', result.data.JwtToken);

    navigate('/dashboard'); // ✅ Redirect to dashboard on success

  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <Container maxWidth="sm" sx={{ mt: 8,}}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Admin Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Email"
            fullWidth
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <Box sx={{ mt: 2, position: 'relative' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              Login
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{ position: 'absolute', top: '50%', left: '50%', mt: '-12px', ml: '-12px' }}
              />
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
