import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import { httpService } from "../service";
import { PageLoader } from "../components";

const columns = [
  { id: "name", label: "Name" },
  { id: "address", label: "Address" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "email" },
  { id: "license", label: "License" },
  { id: "title", label: "Title" },
  { id: "id", label: "Action" },
];

const Sites = () => {
  const navigate = useNavigate();

  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  async function getSites() {
    try {
      setSites([]);
      setLoading(true);
      const resp = await httpService.get("/store/list");
      const data = resp.data.data;
      setSites(data);
      console.log(data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function editHandler(site_id) {
    navigate(`/site/${site_id}`);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getSites();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div>
      <Typography gutterBottom variant="h5">
        Sites Page
      </Typography>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
              {sites
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "id" ? (
                              <IconButton
                                aria-label="edit"
                                onClick={() => editHandler(value)}
                                sx={{
                                  padding: "0 8px",
                                }}
                              >
                                <EditIcon />
                              </IconButton>
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
          count={sites.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default Sites;
