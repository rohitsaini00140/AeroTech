import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';

const drawerWidth = 240; 

export default function LeaveRequestsPage() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaves = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setError("Authorization token not found. Please login.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://10.5.49.244:5000/api/adimn/get-leave", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch leave requests');
        }

        setLeaves(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);


  console.log(leaves)

  return (
    <Container sx={{ mt: 6 ,
         width: {
          xs: "100%", // Full width on small screens
          sm: `calc(100% - ${drawerWidth}px)`, // Adjusted width on larger screens
        },
        marginLeft: {
          xs: 0, // No margin on small screens
          sm: `${drawerWidth}px`, // Shift content right on desktop
        },}}>
      <Typography variant="h4" gutterBottom>
        Leave Requests
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell sx={{ fontWeight: 'bolder' }}>Employee ID</TableCell>
                <TableCell sx={{ fontWeight: 'bolder' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bolder' }}>Leave Type</TableCell>
                <TableCell sx={{ fontWeight: 'bolder' }}>Reason</TableCell>
                <TableCell sx={{ fontWeight: 'bolder' }}>Start Date</TableCell>
                <TableCell sx={{ fontWeight: 'bolder' }}>End Date</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {leaves.map((leave) => (
                <TableRow key={leave._id}>
                  <TableCell>{leave.employeeId}</TableCell>
                  <TableCell>{leave.name}</TableCell>
                  <TableCell>{leave.leaveType}</TableCell>
                  <TableCell>{leave.reason}</TableCell>
                  <TableCell>{new Date(leave.startDate).toLocaleDateString("en-GB")}</TableCell>
                  <TableCell>{new Date(leave.endDate).toLocaleDateString("en-GB")}</TableCell>
                  
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}