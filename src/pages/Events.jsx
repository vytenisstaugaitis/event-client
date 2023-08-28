import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import EventsWidget from "../widgets/EventsWidget";
import CategoriesNavbar from "../components/CategoriesNavbar";
import SearchBar from "../components/SearchBar";
import SearchResultsWidget from "../widgets/SearchResultsWidget";

const Events = () => {
  const { _id } = useSelector((state) => state.user);
  const [showContent, setShowContent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleChildState = (state) => {
    setSearchTerm(state);
    setShowContent(!showContent);
  };

  return (
    <Box
    >
      <Navbar />
      <CategoriesNavbar onStateChange={handleChildState} />
      <SearchBar setResults={setResults} />
      <div 
      style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
      gap: "1rem", padding: "2.5rem 0", padding:"2rem 6%"}}>
          {results && results.length > 0 && (
            <SearchResultsWidget results={results} />
          )}
            <EventsWidget userId={_id} category={searchTerm} />
      </div>

    </Box>
  );
};

export default Events;
