import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';

const drawerWidth = 240;

function GetItem() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getItem = async () => {
    const token = localStorage.getItem('adminToken');

    try {
      const response = await axios.get('http://10.5.49.244:5000/api/adimn/get-Item', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems(response.data.data || []);
    } catch (err) {
      console.error('Error fetching item:', err);
      setError('Failed to fetch item.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  // Extract all possible keys except '_id' to create table headers
  const allKeys = React.useMemo(() => {
    const keysSet = new Set();
    items.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== '_id') {
          keysSet.add(key);
        }
      });
    });
    return Array.from(keysSet);
  }, [items]);

  return (
    
    <Container
      sx={{
        mt: 4,
        width: {
          xs: '100%',
          sm: `calc(100% - ${drawerWidth}px)`,
        },
        marginLeft: {
          xs: 0,
          sm: `${drawerWidth}px`,
        },
      }}
    >
      <Typography variant="h4" gutterBottom>
    Get Items (Table View)
      </Typography>

      {loading && <CircularProgress />}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && items.length === 0 && (
        <Typography variant="body1">No items found.</Typography>
      )}

      {!loading && items.length > 0 && (
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="items table" size="small">
            <TableHead>
              <TableRow>
                {allKeys.map((key) => (
                  <TableCell key={key} sx={{ fontWeight: 'bold' }}>
                    {key}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  {allKeys.map((key) => (
                    <TableCell key={key}>{String(item[key] ?? '')}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default GetItem;
