import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "../state/index.js";
import EventWidget from "./EventWidget.jsx";

const EventsWidget = ({ userId, category, isProfile = false }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const token = useSelector((state) => state.token);

  const getEvents = async (category) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/events`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    let data = await response.json();
    if (category) data = data.filter((event) => event.category == category);
    dispatch(setEvents({ events: data }));
  };

  const getUserEvents = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/events/${userId}/events`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setEvents({ events: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserEvents();
    } else {
      getEvents(category);
    }
  }, [category]);

  return (
    <>
      {events.map(
        ({
          _id,
          userId,
          username,
          description,
          date,
          category,
          location,
          title,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <EventWidget
            key={_id}
            eventId={_id}
            eventUserId={userId}
            username={username}
            description={description}
            category={category}
            date={date}
            title={title}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default EventsWidget;
