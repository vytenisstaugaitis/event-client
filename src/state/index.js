import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  events: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setEvents: (state, action) => {
      state.events = action.payload.events;
    },
    setEvent: (state, action) => {
      const updatedEvents = state.events.map((event) => {
        if (event._id === action.payload.event._id) return action.payload.event;
        return event;
      });
      state.events = updatedEvents;
    },
    updateEvent: (state, action) => {
      const { eventId, updatedEventData } = action.payload;
      const eventIndex = state.events.findIndex(
        (event) => event._id === eventId
      );
      if (eventIndex !== -1) {
        state.events[eventIndex] = updatedEventData;
      }
    },
    deleteEvent: (state, action) => {
      const eventId = action.payload;
      state.events = state.events.filter((event) => event._id !== eventId);
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setEvent,
  setEvents,
  updateEvent,
  deleteEvent,
} = authSlice.actions;
export default authSlice.reducer;
