import React, { useState } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const API_KEY = 'Sm1FENqrTkMMr4Y_ZhGFAeopbis_DkaajDgQTnI1dmM' // Replace with your Unsplash API key
  const API_URL = `https://api.unsplash.com/search/photos?client_id=${API_KEY}&query=${query}`;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const response = await axios.get(API_URL);
      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching the images", error);
    }
  };

  return (
    <div className="App">
      <h1>Image Search App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="image-gallery">
        {images.length > 0 &&
          images.map((image) => (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.description}
              className="image"
            />
          ))}
      </div>
    </div>
  );
};

export default App;
