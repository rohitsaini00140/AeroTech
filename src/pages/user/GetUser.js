'use client';
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, CircularProgress
} from '@mui/material';

const drawerWidth = 240;

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://10.5.49.244:5000/api/admin/get-AllUser')
      .then(response => response.json())
      .then(data => {
        setUsers(data?.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  return (
    <TableContainer component={Paper} sx={{ width: {
          xs: "100%",
          sm: `calc(100% - ${drawerWidth}px)`,
        },
        marginLeft: {
          xs: 0,
          sm: `${drawerWidth}px`,
        },mt: 4 }}>
      <Typography variant="h5" sx={{ p: 2 }}>
        All Users
      </Typography>
      {loading ? (
        <CircularProgress sx={{ m: 2 }} />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell> Number</TableCell>
              <TableCell>Role</TableCell>
     
              <TableCell>Customer</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                {/* <TableCell>{user._id}</TableCell> */}
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>{user.MobileNumber}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.customerRef}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(user.updatedAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default GetUsers;
