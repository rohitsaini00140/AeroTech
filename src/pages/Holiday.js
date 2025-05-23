import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const AddHoliday = () => {
const navigate = useNavigate();

  
  const [holiday, setHoliday] = useState({
    name: '',
    date: '',
    description: ''
  });

  const handleChange = (e) => {
    setHoliday({
      ...holiday,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  axios.post('http://10.5.49.244:5000/api/admin/holiday', {
    holidays: [holiday]
  })
  .then(response => {
    alert('Holiday added successfully!');
    setHoliday({
      name: '',
      date: '',
      description: ''
    });
  navigate('/dashboard/getadminholiday');
  })
  .catch(error => {
    console.error('Error adding holiday:', error);
  });
};

  return (

    <>
    <Card variant="outlined" sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Add New Holiday</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={holiday.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={holiday.date}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={holiday.description}
            onChange={handleChange}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
    </>
  );
};

export default AddHoliday;
