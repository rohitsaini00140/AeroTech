import React, { useEffect, useState } from "react";
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
  Alert,
  Button,
  Box,
} from "@mui/material";

const drawerWidth = 240;

export default function LeaveRequestsPage() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch leaves
  useEffect(() => {
    const fetchLeaves = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setError("Authorization token not found. Please login.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://10.5.49.244:5000/api/admin/get-leave",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch leave requests");
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

  // Handle status change
  const handleStatusChange = async (leaveId, newStatus) => {
    const token = localStorage.getItem("adminToken");

    try {
      const response = await fetch(
        `http://10.5.49.244:5000/api/admin/leave/update-status/${leaveId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update status");
      }

      // Update UI immediately
      setLeaves((prevLeaves) =>
        prevLeaves.map((leave) =>
          leave._id === leaveId ? { ...leave, status: newStatus } : leave
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container
      sx={{
        mt: 6,
        width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
        marginLeft: { xs: 0, sm: `${drawerWidth}px` },
      }}
    >
      <Typography variant="h4" gutterBottom sx={{color:'white'}}>
        Leave Requests
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bolder" }}>Employee ID</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Leave Type</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Reason</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Start Date</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>End Date</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaves.map((leave) => (
                <TableRow key={leave._id}>
                  <TableCell>{leave.employeeId}</TableCell>
                  <TableCell>{leave.name}</TableCell>
                  <TableCell>{leave.leaveType}</TableCell>
                  <TableCell>{leave.reason}</TableCell>
                  <TableCell>
                    {new Date(leave.startDate).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell>
                    {new Date(leave.endDate).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell>{leave.status}</TableCell>

                  <TableCell>
                    {leave.status === "Pending" ? (
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                      >
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() =>
                            handleStatusChange(leave._id, "Accepted")
                          }
                          sx={{ mb: 1 }}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() =>
                            handleStatusChange(leave._id, "Rejected")
                          }
                        >
                          Reject
                        </Button>
                      </Box>
                    ) : (
                      <Typography
                        color={leave.status === "Accepted" ? "green" : "red"}
                      >
                        {leave.status}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
