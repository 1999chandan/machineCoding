import React from "react";
import ListItems from "../ListItems/ListItems";
import "./style.css";
function Suggestions(props) {
  const { suggestions, onSelect, isLoading } = props;
  return (
    <div className="Suggestions">
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        suggestions.map((suggestions, idx) => {
          return (
            <ListItems onSelect={onSelect} value={suggestions} key={idx} />
          );
        })
      )}
    </div>
  );
}

export default Suggestions;
