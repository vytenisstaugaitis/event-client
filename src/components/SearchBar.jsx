import * as React from "react";
import dayjs from "dayjs";
import { useState } from "react";
import { IconButton, InputBase, useTheme, useMediaQuery } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function SearchBar({ setResults }) {
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const alt = theme.palette.background.alt;
  const isNonMobileScreens = useMediaQuery("(min-width: 1300px)");
  const token = useSelector((state) => state.token);
  const [input, setInput] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchDataTitle = (value) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/events`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((event) => {
          return (
            value &&
            event &&
            event.title &&
            event.title.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const fetchDataUsername = (value) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/events`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((event) => {
          return (
            value &&
            event &&
            event.username &&
            event.username.toLowerCase().includes(value)
          );
        });
        setResults((prevResults) => [...prevResults, ...results]);
      });
  };

  const fetchDataLocation = (value) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/events`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((event) => {
          return (
            value &&
            event &&
            event.location &&
            event.location.toLowerCase().includes(value)
          );
        });
        setResults((prevResults) => [...prevResults, ...results]);
      });
  };
  const fetchDataDate = (value) => {
    if (!value) {
      setResults([]);
      return;
    }
    const dateObject = dayjs(value);
    const formattedDate = dateObject.format("YYYY-MM-DD");

    fetch(`${import.meta.env.VITE_SERVER_URL}/events`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((event) => {
          return (
            value && event && event.date && event.date.includes(formattedDate)
          );
        });
        setResults((prevResults) => [...prevResults, ...results]);
      });
  };
  const fetchDataDateString = (value) => {
  
    fetch(`${import.meta.env.VITE_SERVER_URL}/events`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((event) => {
          return (
            value && event && event.date && event.date.includes(value)
          );
        });
        setResults((prevResults) => [...prevResults, ...results]);
      });
  };
  const fetchDataDescription = (value) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/events`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((event) => {
          return (
            value &&
            event &&
            event.description &&
            event.description.toLowerCase().includes(value)
          );
        });
        setResults((prevResults) => [...prevResults, ...results]);
      });
  };
  const fetchDataCategory = (value) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/events`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((event) => {
          return (
            value &&
            event &&
            event.category &&
            event.category.toLowerCase().includes(value)
          );
        });
        setResults((prevResults) => [...prevResults, ...results]);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchDataTitle(value);
    fetchDataUsername(value);
    fetchDataLocation(value);
    fetchDataDate(value);
    fetchDataDescription(value);
    fetchDataCategory(value);
    fetchDataDateString(value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.format("ddd, DD MMM YYYY HH:mm:ss [GMT]");
    fetchDataDate(formattedDate);
    console.log(formattedDate);
  };

  const handleClear = () => {
    setInput("");
    setSelectedDate(null);
    setResults([]);
  };

  return (
    <FlexBetween
      padding="1rem 6%"
      backgroundColor={alt}
      display={isNonMobileScreens ? "flex" : "block"}
    >
      <FlexBetween
        backgroundColor={alt}
        borderRadius="9px"
        gap="1rem"
        padding="0rem 0.2rem"
      >
        <div style={{ display: "flex", alignItems: "left", gap: "2rem" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              onChange={(formattedDate) => handleDateChange(formattedDate)}
              value={selectedDate}
              sx={{
                width: "30%",
                borderRadius: "2rem",
              }}
            />
          </LocalizationProvider>
          <InputBase
            sx={{
              fontSize: "1rem",
              fontFamily: "monospace",
              borderRadius: "0.5rem",
              padding: "0.2rem 0.2rem",
            }}
            placeholder="Search..."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            endAdornment={
              input && (
                <IconButton onClick={handleClear}>
                  <CloseIcon />
                </IconButton>
              )
            }
          />
        </div>
      </FlexBetween>
    </FlexBetween>
  );
}

export default SearchBar;
