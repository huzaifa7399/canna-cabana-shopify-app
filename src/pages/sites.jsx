import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";
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
import { PageLoader, SearchBar } from "../components";

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
  const [searchText, setSearchText] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

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

      <SearchBar
        setLoading={setTableLoading}
        disabled={sites.length === 0}
        setSearchedData={setSearchedData}
        setSearchText={setSearchText}
        tableData={sites}
        mode={"sites"}
      />

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
              {(searchText === ""
                ? sites.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : searchedData
              ).map((row) => {
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
              {!tableLoading &&
                (sites.length === 0 ||
                  (searchText !== "" && searchedData.length === 0)) && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Box
                        m="20px 0 20px 0"
                        fontSize="20px"
                        display="flex"
                        gap="10px"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography variant="h6">No Sites found</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
        {searchText === "" && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={sites.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </div>
  );
};

export default Sites;
