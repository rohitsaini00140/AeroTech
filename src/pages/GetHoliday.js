import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/system";

const drawerWidth = 240;

function GetHolidays() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    axios
      .get("http://10.5.49.244:5000/api/admin/get-holidaye", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHolidays(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading holidays...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box  sx={{
        width: {
          xs: "100%",
          sm: `calc(100% - ${drawerWidth}px)`,
        },
        marginLeft: {
          xs: 0,
          sm: `${drawerWidth}px`,
        },
        padding: 2,
        boxSizing: "border-box",
      }}>
      <h2>Holidays</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map(({ name, date, description }, index) => (
            <tr key={index}>
              <td>{name}</td>
              <td>{new Date(date).toLocaleDateString()}</td>
              <td>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}

export default GetHolidays;
