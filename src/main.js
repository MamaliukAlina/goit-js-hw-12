import { fetchImages } from "./js/pixabay-api.js";
import { renderImages } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#search-form");
  const loader = document.querySelector(".loader");
  const gallery = document.querySelector(".gallery");
  const loadMoreBtn = document.createElement("button");
  loadMoreBtn.textContent = "Load more";
  loadMoreBtn.classList.add("load-more");
  document.body.appendChild(loadMoreBtn);
  loadMoreBtn.style.display = "none";

  let query = "";
  let page = 1;
  const perPage = 40;

  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    query = searchForm.elements.searchQuery.value.trim();
    if (!query) {
      iziToast.warning({
        title: "Warning",
        message: "Please enter a search term!",
        position: "topRight",
      });
      return;
    }
    gallery.innerHTML = "";
    page = 1;
    loadMoreBtn.style.display = "none";
    await loadImages();
  });

  loadMoreBtn.addEventListener("click", async () => {
    page++;
    await loadImages();
  });

  async function loadImages() {
    loader.style.display = "block";
    try {
      const images = await fetchImages(query, page, perPage);
      renderImages(images);
      
      const galleryItems = document.querySelectorAll(".gallery-item");
      if (galleryItems.length > 0) {
        const cardHeight = galleryItems[0].getBoundingClientRect().height;
        window.scrollBy({
          top: cardHeight * 2,
          behavior: "smooth",
        });
      }
  
      if (page * perPage >= images.totalHits) {
        loadMoreBtn.style.display = "none";
        iziToast.info({
          title: "Info",
          message: "We're sorry, but you've reached the end of search results.",
          position: "topRight",
        });
      } else {
        loadMoreBtn.style.display = "block";
      }
    } catch (error) {
      console.error(error);
    }
    loader.style.display = "none";
  }
  
});