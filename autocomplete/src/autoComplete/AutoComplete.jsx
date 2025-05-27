import React, { useCallback, useState } from "react";
import InputText from "../inputText/InputText";
import Button from "../Button";
import Suggestions from "../Suggestions/Suggestions";
import "./style.css";

function AutoComplete(prps) {
  const { suggestions, onChange, isLoading, debounce = false } = prps;
  const [query, setQuery] = useState("");
  const [ShowSuggestions, setShowSuggestions] = useState(false);
  function debouncFunction(callback, delay) {
    let timeOut = "";
    return function (...args) {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
    manageDebounce(e.target.value);
  };
  const handleClear = () => {
    setQuery("");
    setShowSuggestions(false);
  };
  const handleSelect = (value) => {
    setQuery(value);
    setShowSuggestions(false);
    manageDebounce(value);
  };
  const filteredQuery = suggestions.filter((suggestions) => {
    return suggestions.toLowerCase().includes(query.toLowerCase());
  });

  const handleDebounce = useCallback(debouncFunction(onChange, 200), []);
  const manageDebounce = (value) => {
    if (debounce) {
      handleDebounce(value);
    } else {
      onChange(value);
    }
  };
  return (
    <div>
      <div className="AutoComplete">
        <InputText onChange={handleQueryChange} value={query} />
        <Button onClick={handleClear} name={"clear"} />
      </div>

      {ShowSuggestions && query.length && (
        <Suggestions
          onSelect={handleSelect}
          suggestions={filteredQuery}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default AutoComplete;
