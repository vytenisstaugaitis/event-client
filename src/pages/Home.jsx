import Navbar from "../components/Navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserWidget from "../widgets/UserWidget";
import PostEventWidget from "../widgets/PostEventWidget";
import EventsWidget from "../widgets/EventsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import CategoriesNavbar from "../components/CategoriesNavbar";
import SearchBar from "../components/SearchBar";
import SearchResultsWidget from "../widgets/SearchResultsWidget";

const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const [showContent, setShowContent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleChildState = (state) => {
    setSearchTerm(state);
    setShowContent(!showContent);
  };

  return (
    <Box>
      <Navbar />
      <CategoriesNavbar onStateChange={handleChildState} />
      <SearchBar setResults={setResults} />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {results && results.length > 0 && (
            <SearchResultsWidget results={results} />
          )}

          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {results && results.length > 0 && (
            <SearchResultsWidget results={results} />
          )}

          <PostEventWidget picturePath={picturePath} />

          <div style={{ marginTop: "1rem", gap:"1rem", display: "flex", flexDirection: "column-reverse" }}>
            <EventsWidget
              userId={_id}
              category={searchTerm}
            />
          </div>
        </Box>

        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
