import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://10.5.49.244:5000/api/admin/get-AllUser")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data?.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };

  const handleDeactivate = async (id) => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(
        `http://10.5.49.244:5000/api/admin/user-deactivate/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in the header
          },
        }
      );

      const result = await res.json();

      if (res.ok) {
        alert(result.message);
        fetchUsers(); // refresh user list
      } else {
        alert(result.message || "Failed to deactivate");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(
        `http://10.5.49.244:5000/api/admin/user-delete/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      if (res.ok) {
        alert("User deleted");
        fetchUsers();
      } else {
        alert(result.message || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };



  return (
    <TableContainer
      component={Paper}
      sx={{
        width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
        marginLeft: { xs: 0, sm: `${drawerWidth}px` },
        mt: 4,
      }}
    >
      <Typography variant="h5" sx={{ p: 2,fontWeight:'bolder' }}>
        All Users
      </Typography>
      {loading ? (
        <CircularProgress sx={{ m: 2 }} />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell  sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell  sx={{ fontWeight: "bold" }}>Number</TableCell>
              <TableCell  sx={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell  sx={{ fontWeight: "bold" }}>Customer</TableCell>
              <TableCell  sx={{ fontWeight: "bold" }}>Created At</TableCell>
              <TableCell  sx={{ fontWeight: "bold" }}>Updated At</TableCell>
              <TableCell  sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>{user.MobileNumber}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.customerRef}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(user.updatedAt).toLocaleString()}
                </TableCell>
                <TableCell>
  <Box display="flex" alignItems="center" gap={1}>
    {/* Only show Edit and Delete buttons if the user is not deleted */}
    {!user.delete && (
      <>

      <Tooltip title={"Edit User"}>
        <IconButton
          onClick={() => navigate(`/dashboard/edit-user/${user._id}`)}
        >
          <EditIcon />
        </IconButton>
        </Tooltip>

        <Tooltip title={"Delete  User"}>
        <IconButton
          onClick={() => handleDelete(user._id)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
        </Tooltip>
      </>
    )}

    {/* Always show Deactivate button, but change color based on deletion status */}
    <Tooltip title={user.delete ? "Activate" : "Deactivate"}>
      <IconButton
        onClick={() => handleDeactivate(user._id)}
        color={user.delete ? "warning" : "success"} // green or orange
      >
        {user.delete ? <BlockIcon /> : <CheckCircleIcon />}
      </IconButton>
    </Tooltip>
  </Box>
</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default GetUsers;
