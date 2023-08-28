import { ManageAccountsOutlined, EditOutlined } from "@mui/icons-material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../components/UserImage";
import FlexBetween from "../components/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import hellookitty from "../assets/hellookitty.jpg";

const UserWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async (values) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  const { username, places, postedEvents, events, createdAt, picturePath } =
    user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage src={hellookitty} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {username}
            </Typography>
            <Typography color={medium}>
              {postedEvents.length} Posted events
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Diversity1Icon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{events}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <VolunteerActivismIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{places}</Typography>
        </Box>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's here</Typography>
          <Typography color={main} fontWeight="500">
            {picturePath}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Member since</Typography>
          <Typography color={main} fontWeight="500">
            {createdAt}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          More
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <TwitterIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>link</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <LanguageIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                Website
              </Typography>
              <Typography color={medium}>link</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
