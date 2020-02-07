"use strict";

// This file should handle your application's logic such as adding images to the gallery.

import "../styles/index.scss";
import fetchGIF from "../scripts/giphy";

// Creating clickable GIF
const createClickableImage = data => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("gallery__item-wrapper");

  const link = document.createElement("a");
  link.href = data.url;
  link.classList.add("gallery__item");

  const image = document.createElement("img");
  image.src = data.images.original.url;
  image.title = data.type;
  image.classList.add("gallery__image");

  // Add image to anchor element
  link.appendChild(image);

  wrapper.appendChild(link);

  return wrapper;
};

const searchForm = document.querySelector(".search");

searchForm.addEventListener("submit", event => {
  event.preventDefault();

  const result = fetchGIF();

  // Remove the old gifs when the user searches again
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  // Remove "not found" if there are gifs
  const notFound = document.querySelector(".not-found");
  notFound.classList.remove("not-found--active");

  const search = document.querySelector(".search__field");
  const searchQuery = search.value;

  result.then(response => {
    // console.log(response.data.length);
    if (response.data.length === 0) {
      notFound.textContent = `We could not find any GIFS for "${searchQuery}"`;
      notFound.classList.add("not-found--active");
    }
    response.data.forEach(item => {
      const galleryImage = createClickableImage(item);
      gallery.appendChild(galleryImage);
    });
  });
});
