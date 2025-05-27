import { useEffect, useState } from "react";
import "./App.css";
import AutoComplete from "./autoComplete";
const SUGGESTIONS = [
  "apple",
  "banana",
  "orange",
  "grape",
  "kiwi",
  "mango",
  "peach",
  "pear",
  "pineapple",
  "strawberry",
];

function App() {
  // const URL = "https://api.example.com/suggestions"; // Replace with your API endpoint
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setLoading] = useState([]);
  function handleChange(selectVal) {
    console.log(selectVal);
  }

  useEffect(() => {
    // fetch(URL)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Assuming the API returns an array of suggestions
    //     // suggestions = data.suggestions; // Uncomment if you want to use API data
    // })
    // .catch((error) => console.error("Error fetching suggestions:", error));
    setLoading(true);
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(SUGGESTIONS);
      }, 10000);
    }).then((data) => {
      setSuggestions(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <AutoComplete
      debounce = {true}
        isLoading={isLoading}
        onChange={handleChange}
        suggestions={suggestions}
      />
    </>
  );
}

export default App;
