import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";

const API_ID = "5a13c0ba";

const API_KEY = "35d55206e902541643e35bb359f15b9a";

const App = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const url = `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`;

  const getData = async () => {
    if (query !== "") {
      const result = await axios.get(url);
      if(!result.data.more){
        return setAlert("No food with such name");
      }
      setRecipes(result.data.hits);
      console.log(result);
      setAlert("");
      setQuery("");
    }else{
      setAlert("Please fill the form!");
    }
  };

  const onsubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="App">
      <h1 onClick={getData}>Food Searching App</h1>
      <form className="search-form" onSubmit={onsubmit}>
      {alert !== "" && <Alert alert={alert} />}
        <input
          type="text"
          placeholder="Search Food"
          autoComplete="off"
          onChange={onChange}
          value={query}
        />
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipes !== [] &&
          recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default App;
