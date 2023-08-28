import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import { SearchedEvent } from "../components/SearchedEvent";
import WidgetWrapper from "../components/WidgetWrapper";
import UserImage from "../components/UserImage";

const SearchedEventWidget = ({
  result,
  userPicturePath,
  title,
  location,
  category,
  date,
  description,
}) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;

  return (
    <WidgetWrapper m="2rem 0">
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImage image={userPicturePath} size="55px" />
          <Box>
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              <SearchedEvent result={result.username} />
            </Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>
      <Typography
        color={main}
        fontWeight="400"
        variant="h5"
        sx={{ mt: "3rem", mb: "1rem" }}
      >
        <SearchedEvent result={title} />
      </Typography>
      <FlexBetween>
        <Typography color={main} sx={{ mt: "1rem" }}>
          <CategoryIcon />
          <SearchedEvent result={category} />
        </Typography>
        <Typography color={main} sx={{ mt: "1rem" }}>
          <CalendarMonthIcon />
          <SearchedEvent result={date} />
        </Typography>
        <Typography color={main} sx={{ mt: "1rem" }}>
          <LocationOnIcon />
          <SearchedEvent result={location} />
        </Typography>
      </FlexBetween>
      <Typography color={main} sx={{ mt: "1rem" }}>
        <SearchedEvent result={description} />
      </Typography>
    </WidgetWrapper>
  );
};

export default SearchedEventWidget;
