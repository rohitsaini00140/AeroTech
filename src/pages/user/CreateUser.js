import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    Email: '',
    MobileNumber: '',
    role: '',
    Password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

   const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://10.5.49.244:5000/api/create-User', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      console.log('Server response:', result);
      if (response.ok) {
        alert('User created successfully!');
        navigate('/dashboard/get-user'); // Step 3: Navigate after success
      } else {
        alert(result.message || 'Failed to create user.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2,bgcolor:"white" }}>
      <Typography variant="h6" sx={{fontWeight:"bolder"}} gutterBottom>Create User</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          type="email"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Mobile Number"
          name="MobileNumber"
          value={formData.MobileNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          type='number'
        />
      <TextField
          select
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="Sales">Sales</MenuItem>
          <MenuItem value="Designer">Designer</MenuItem>
          <MenuItem value="Printer">Printer</MenuItem>
          <MenuItem value="Printer">Accounted</MenuItem>
        </TextField>
        <TextField
          label="Password"
          name="Password"
          value={formData.Password}
          onChange={handleChange}
          type="password"
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Create User
        </Button>
      </form>
    </Box>
  );
};

export default CreateUserForm;
