import React from "react";
import SearchedEventWidget from "./SearchedEventWidget";

const SearchResultsWidget = ({ results }) => {
  return (
    <>
        {results.map((result, index) => (
          <SearchedEventWidget
            key={index}
            result={result}
            userPicturePath={result.userPicturePath}
            title={result.title}
            location={result.location}
            category={result.category}
            date={result.date}
            selectedDate={result.date}
            formattedDate={result.date}
            description={result.description}
          />
        ))}
    </>
  );
};

export default SearchResultsWidget;
