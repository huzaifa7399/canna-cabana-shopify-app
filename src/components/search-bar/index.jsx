/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";

const SearchBar = ({
  setSearchText,
  setSearchedData,
  disabled,
  setLoading,
  tableData,
  mode,
}) => {
  const [internalSearchText, setInternalSearchText] = useState("");
  const handleChange = (value) => {
    setInternalSearchText(value);
  };

  const debouncedSearch = useMemo(() => {
    const debounceTimeout = setTimeout(async () => {
      if (internalSearchText === "") return;
      setSearchText(internalSearchText);
      setLoading(true);

      if (mode === "sites") {
        setSearchedData(
          tableData.filter(
            (data) =>
              data.name.toLowerCase().includes(internalSearchText) ||
              data.title?.toLowerCase().includes(internalSearchText)
          )
        );
      } else {
        setSearchedData(
          tableData.filter((data) =>
            data.code.toLowerCase().includes(internalSearchText)
          )
        );
      }

      setLoading(false);
    }, 100);

    return () => clearTimeout(debounceTimeout);
  }, [internalSearchText]);

  return (
    <Box mb="20px">
      <TextField
        disabled={disabled}
        value={internalSearchText}
        onChange={(e) => {
          if (e.target.value === "") {
            setSearchText("");
            setInternalSearchText("");
          } else {
            handleChange(e.target.value);
            debouncedSearch();
          }
        }}
        size="small"
        placeholder={
          mode === "sites"
            ? "Search sites by name or title ..."
            : "Search coupons by code"
        }
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {internalSearchText !== "" && (
                <IconButton
                  onClick={() => {
                    setSearchText("");
                    setInternalSearchText("");
                  }}
                >
                  <CancelIcon fontSize="small" />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
