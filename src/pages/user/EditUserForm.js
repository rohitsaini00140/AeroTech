import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const EditUserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    Email: '',
    MobileNumber: '',
    role: '',
    // Password: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    fetch(`http://10.5.49.244:5000/api/admin/userfind/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data?.data) {
          setFormData({
            name: data.data.name || '',
            Email: data.data.Email || '',
            MobileNumber: data.data.MobileNumber || '',
            role: data.data.role || '',
            // Password: '' // Password is left empty for security reasons
          });
        } else {
          console.error("No user data found:", data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching user:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


  console.log(formData,)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`http://10.5.49.244:5000/api/admin/user-update/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        alert('User updated successfully!');
        navigate('/dashboard/get-user');
      } else {
        alert(result.message || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return loading ? (
    <Typography align="center" sx={{ mt: 5 }}>Loading user data...</Typography>
  ) : (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, bgcolor:"white", boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{fontWeight:'bolder'}}>Edit User</Typography>
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
          type="number"
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
          <MenuItem value="Accounted">Accounted</MenuItem>
        </TextField>
        {/* <TextField
          label="Password (optional)"
          name="Password"
          value={formData.Password}
          onChange={handleChange}
          type="password"
          fullWidth
          margin="normal"
        /> */}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Update User
        </Button>
      </form>
    </Box>
  );
};

export default EditUserForm;
