import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  InputBase,
} from "@mui/material";
import Friend from "../components/Friend";
import FlexBetween from "../components/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { setEvent, updateEvent, deleteEvent } from "../state/index.js";

const EventWidget = ({
  eventId,
  eventUserId,
  username,
  title,
  category,
  date,
  description,
  location,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [open, setOpen] = React.useState(false);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const [error, setError] = useState(null);
  const [isTiptapVisible, setTiptapVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({
    title,
    category,
    location,
    date,
    description,
  });

  const patchLike = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/events/${eventId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedEvent = await response.json();
    dispatch(setEvent({ event: updatedEvent }));
  };

  const deleteEvent = async () => {
    try {
      if (eventUserId !== loggedInUserId) {
        const errorMessage =
          "You are not authorized to delete this event. You can only delete your events. Do not mess w my database!";
        setError(errorMessage);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/events/${eventId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setOpen(true);
        console.log("Event deleted successfully");
        console.log(eventId);

        // const updatedEventData = await response.json();
        // dispatch(deleteEvent(updatedEventData));
      } else {
        console.log("Error deleting event");
      }
    } catch (error) {
      console.log("Error deleting event:", error);
    }
  };

  const handleUpdateEvent = async () => {
    try {
      if (eventUserId !== loggedInUserId) {
        const errorMessage =
          "You are not authorized to update this event. You can only update your events. Do not mess w my database!";
        setError(errorMessage);
        return;
      }
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/events/${eventId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });
      if (response.ok) {
        const updatedEventData = await response.json();
        dispatch(updateEvent(updatedEventData));
        setIsEditMode(false);
        console.log("Event updated successfully");
      } else {
        console.log("Error updating event");
      }
    } catch (error) {
      console.log("Error updating event:", error);
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleEditClick = () => {
    setTiptapVisible(true);
    setIsEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="primary" size="small" onClick={deleteEvent}>
        Delete
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <WidgetWrapper gap="1rem" display="flex" flexDirection="column">
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Are you sure? This cannot be undone. Refresh the page after lol"
        action={action}
      />
      <Friend
        friendId={eventUserId}
        username={username}
        userPicturePath={userPicturePath}
      />

      <Typography
        color={main}
        fontWeight="400"
        variant="h5"
        display="flex"
        sx={{}}
      >
        {title}
      </Typography>
      <FlexBetween>
        <Typography display="flex" gap=".4rem" color={main} sx={{ mt: "1rem" }}>
          <CategoryIcon />
          {category}
        </Typography>

        <Typography display="flex" gap=".4rem" color={main} sx={{ mt: "1rem" }}>
          <LocationOnIcon />
          {location}
        </Typography>
      </FlexBetween>
      <FlexBetween>
        <Typography display="flex" gap=".4rem" color={main} sx={{}}>
          <CalendarMonthIcon />
          {date}
        </Typography>
      </FlexBetween>
      <FlexBetween>
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
      </FlexBetween>

      <FlexBetween mt="auto">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween>
          <IconButton>
            <ShareOutlined />
          </IconButton>

          <FlexBetween>
            <IconButton onClick={handleClick}>
              <DeleteOutlineIcon />
            </IconButton>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>

      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">
            <AlertTitle>Girl!</AlertTitle>
            {error}
          </Alert>
        </Stack>
      )}

      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${username}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}

      {isEditMode ? (
        <WidgetWrapper gap="1rem" display="flex" flexDirection="column">
  
          <Divider/>

          <Typography
            color={main}
            fontWeight="400"
            variant="h5"
            display="flex"
            sx={{}}
          >
            Title:</Typography>
          <InputBase
            name="title"
            value={updatedEvent.title}
            onChange={handleInputChange}
          />
        <Divider/>

          <Typography
            color={main}
            fontWeight="400"
            variant="h5"
            display="flex"
            sx={{}}
          >
            Description:
          </Typography>
          <InputBase
            name="description"
            value={updatedEvent.description}
            onChange={handleInputChange}
          />
        <Divider/>

          <Typography
            color={main}
            fontWeight="400"
            variant="h5"
            display="flex"
            sx={{}}
          >
            Date:
          </Typography>

          <InputBase
            name="date"
            value={updatedEvent.date}
            onChange={handleInputChange}
          />

          <Button onClick={handleUpdateEvent}>Save</Button>
          <Button onClick={() => setIsEditMode(false)}>Cancel</Button>
        </WidgetWrapper>
      ) : (
        <Box>{/* ... */}</Box>
      )}
    </WidgetWrapper>
  );
};

export default EventWidget;
