import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state/index.js";
import FlexBetween from "./FlexBetween.jsx";
import {
  Box,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";

function Navbar() {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const username = `Hi, ${user.username}`;

  return (
    <>
      <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
          <Typography
            onClick={() => navigate("/home")}
            sx={{
              fontSize: "2rem",
              fontFamily: "monospace",
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            ✧⭐Qu33n 3v3ntSs⭐✧
          </Typography>
        </FlexBetween>

        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={username} >
              <Select
                value={username}
                sx={{
                  fontSize: "1rem",
                  fontFamily: "monospace",
                  backgroundColor: alt,
                  width: "250px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
              >
                <MenuItem value={username}>
                  <Typography>{username}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="70"
            height="20%"
            zIndex="10"
            marginTop="130px"
            marginRight="25px"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={alt}
            borderRadius="16px"
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
            >
              <FormControl variant="standard" value={username}>
                <Select
                  value={username}
                  sx={{
                    backgroundColor: alt,
                    width: "250px",
                    borderRadius: "9px",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                >
                  <MenuItem value={username}>
                    <Typography>{username}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>

              <FlexBetween
                display="block"
                justifyContent="center"
                alignItems="center"
                gap="2rem"
              >
                <IconButton
                  onClick={() => dispatch(setMode())}
                  sx={{ fontSize: "25px" }}
                >
                  {theme.palette.mode === "dark" ? (
                    <DarkMode sx={{ fontSize: "25px" }} />
                  ) : (
                    <LightMode sx={{ color: dark, fontSize: "25px" }} />
                  )}
                </IconButton>
                <Message sx={{ fontSize: "25px" }} />
                <Notifications sx={{ fontSize: "25px" }} />
                <Help sx={{ fontSize: "25px" }} />
              </FlexBetween>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </>
  );
}

export default Navbar;
