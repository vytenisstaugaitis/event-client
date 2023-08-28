import { useState } from "react";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

function CategoriesNavbar({ onStateChange }) {
  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();

  const onClick = (searchTerm) => {
    console.log(searchTerm);
    onStateChange(searchTerm !== "" ? searchTerm : "");
  };

  return (
    <FlexBetween  backgroundColor={alt}>

    <div
      style={{ display: "flex", alignItems: "left" }}
    >


      <FlexBetween padding="1rem 11%" backgroundColor={alt}>
        {/* DESKTOP NAV */}
        <IconButton
          onClick={() => navigate("/events")}
          sx={{
            fontSize: "1rem",
            fontFamily: "monospace",
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          ⭐4ll 3v3ntSs⭐
        </IconButton>
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <IconButton
              onClick={() => onClick("Fantasy Life")}
              sx={{ fontSize: "1rem", fontFamily: "monospace" }}
            >
              {" "}
              Fantasy Life
            </IconButton>
            <IconButton
              onClick={() => onClick("New Age")}
              sx={{ fontSize: "1rem", fontFamily: "monospace" }}
            >
              {" "}
              New Age
            </IconButton>
            <IconButton
              onClick={() => onClick("Concert")}
              sx={{ fontSize: "1rem", fontFamily: "monospace" }}
            >
              {" "}
              Concert
            </IconButton>
            <IconButton
              onClick={() => onClick("Theater")}
              sx={{ fontSize: "1rem", fontFamily: "monospace" }}
            >
              {" "}
              Theater
            </IconButton>
            <IconButton
              onClick={() => onClick("Rave")}
              sx={{ fontSize: "1rem", fontFamily: "monospace" }}
            >
              {" "}
              Rave
            </IconButton>
            <IconButton
              onClick={() => onClick("Club")}
              sx={{ fontSize: "1rem", fontFamily: "monospace" }}
            >
              {" "}
              Club
            </IconButton>
            <IconButton
              onClick={() => onClick("For Animals")}
              sx={{ fontSize: "1rem", fontFamily: "monospace" }}
            >
              {" "}
              For Animals
            </IconButton>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            sx={{
              fontSize: "1rem",
              fontFamily: "monospace",
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            ⭐c4t3g0r13s⭐✧✧
          </IconButton>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="20"
            height="80%"
            zIndex="10"
            marginTop="600px"
            marginRight="25px"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={alt}
            borderRadius="16px"
          >
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
              gap="3rem"
            >
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <IconButton
                  onClick={() => onClick("Fantasy Life")}
                  sx={{ fontSize: "20px", fontFamily: "monospace" }}
                >
                  {" "}
                  Fantasy Life
                </IconButton>
              </IconButton>

              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <IconButton
                  onClick={() => onClick("New Age")}
                  sx={{ fontSize: "20px", fontFamily: "monospace" }}
                >
                  {" "}
                  New Age
                </IconButton>
              </IconButton>

              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <IconButton
                  onClick={() => onClick("For Animals")}
                  sx={{ fontSize: "20px", fontFamily: "monospace" }}
                >
                  {" "}
                  For Animals
                </IconButton>
              </IconButton>

              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <IconButton
                  onClick={() => onClick("Concert")}
                  sx={{ fontSize: "20px", fontFamily: "monospace" }}
                >
                  {" "}
                  Concert
                </IconButton>
              </IconButton>

              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <IconButton
                  onClick={() => onClick("Theater")}
                  sx={{ fontSize: "20px", fontFamily: "monospace" }}
                >
                  {" "}
                  Theater
                </IconButton>
              </IconButton>

              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <IconButton
                  onClick={() => onClick("Rave")}
                  sx={{ fontSize: "20px", fontFamily: "monospace" }}
                >
                  {" "}
                  Rave
                </IconButton>
              </IconButton>

              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <IconButton
                  onClick={() => onClick("Club")}
                  sx={{ fontSize: "20px", fontFamily: "monospace" }}
                >
                  {" "}
                  Club
                </IconButton>
              </IconButton>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </div>
    </FlexBetween>

  );
}

export default CategoriesNavbar;
