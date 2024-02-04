import { useEffect, useState } from 'react';

import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { httpService } from '../service';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const columns = [
  { id: 'code', label: 'Code' },
  { id: 'discount_type', label: 'Discount Type' },
  { id: 'discount_value', label: 'Discount Value' },
  { id: 'expiration_date', label: 'Expiration Date' },
  { id: 'max_usage', label: 'Max Usage' },
  { id: 'id', label: 'Action' },
];

const Coupons = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  async function fetchCoupons() {
    try {
      setLoading(true);
      const resp = await httpService.get('/admin/coupons/list');
      const data = resp.data.data;

      setCoupons(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function editHandler(coupon_id) {
    navigate(`/coupon/edit/${coupon_id}`);
  }

  function deleteHandler() {
    // /admin/coupon/1/delete
  }

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div>
      <Typography variant="h4">Coupons Page</Typography>

      <Link to="/coupon/create">Create Coupons</Link>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {coupons
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'id' ? (
                              <>
                                <IconButton
                                  aria-label="edit"
                                  onClick={() => editHandler(value)}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="edit"
                                  onClick={() => deleteHandler(value)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={coupons.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default Coupons;
