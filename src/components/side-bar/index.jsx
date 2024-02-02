/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ListItems } from "../../constants";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

const DrawerHeader = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: "0px 20px",

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: 999,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    width: `calc( 100% - ${theme.spacing(7)} + 1px )`,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{
            backgroundColor: "#F4F5F6 ",
            boxShadow: "none ",
          }}
        >
          <Toolbar
            sx={{
              margin: "0 20px",
              paddingTop: "10px",
              paddingLeft: "12px ",
              paddingRight: "12px ",
            }}
          >
            <Container
              maxWidth="xl"
              sx={{
                paddingLeft: "0px ",
                paddingRight: "0px ",
              }}
            >
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={() => navigate("/login")} variant="contained">
                  Login
                </Button>
              </Box>
            </Container>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#1c2536",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            },
          }}
        >
          <DrawerHeader>
            {open ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon
                    sx={{
                      color: "#6366f1 ",
                    }}
                  />
                </IconButton>
              </Box>
            ) : (
              <>
                <IconButton
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  sx={{
                    ...(open && {
                      display: "block",
                    }),
                    color: "#000",
                  }}
                >
                  <MenuIcon
                    sx={{
                      color: "#6366f1 ",
                    }}
                  />
                </IconButton>
              </>
            )}
          </DrawerHeader>
          <List
            sx={{
              margin: "50px 5px 0px ",
              paddingTop: "0px ",
            }}
          >
            {ListItems.map((listItem) => {
              return (
                <ListItemButton
                  key={listItem.key}
                  to={listItem.to}
                  component={Link}
                  selected={
                    location.pathname === listItem.to ||
                    location.pathname.startsWith(listItem.to + "/")
                  }
                  sx={{
                    letterSpacing: "0.35px",
                    paddingRight: "4px",
                    margin: "5px 4px 5px 4px",
                    fontSize: "14px  ",
                    "&:hover": {
                      backgroundColor: "#5b5856  ",
                      borderRadius: "6px",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#5b5856  ",
                      borderRadius: "6px",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#5b5856  ",
                      borderRadius: "6px",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "#6366f1",
                    }}
                  >
                    <listItem.icon />
                  </ListItemIcon>

                  <Typography color="text.secondary" variant="body1">
                    {listItem.text}
                  </Typography>
                </ListItemButton>
              );
            })}
          </List>
        </Drawer>
        <Container
          maxWidth="xl"
          sx={{
            paddingLeft: "0px ",
            paddingRight: "0px ",
          }}
        >
          <Box component="main" sx={{ flexGrow: 1, p: 3, margin: "60px 0 0" }}>
            <Box />
            <Outlet />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SideBar;
