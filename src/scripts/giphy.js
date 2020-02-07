"use strict";

//  This file should only handle the API calls against Giphy's API and return data.

const myAPI = process.env.GIPHY_API_KEY;

const searchInput = document.querySelector(".search__field");

// Fetch GIFs with your API key and search query.
const fetchGIF = () => {
  return fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${myAPI}&q=${searchInput.value}`
  )
    .then(response => response.json()) // Parse the JSON data.
    .catch(console.error);
};

export default fetchGIF;
