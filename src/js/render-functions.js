import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function renderImages(images) {
  const gallery = document.querySelector(".gallery");
  const markup = images.hits
    .map(
      (image) => `<li class="gallery-item">
        <a href="${image.largeImageURL}">
          <div class="gallery-top">
            <img class="gallery-img" src="${image.webformatURL}" alt="${image.tags}" />
          </div>
          <ul class="gallery-bottom">
            <li class="gallery-bottom-item">
              <p class="gallery-bottom-stat">Likes</p>
              <p class="gallery-bottom-value">${image.likes}</p>
            </li>
            <li class="gallery-bottom-item">
              <p class="gallery-bottom-stat">Views</p>
              <p class="gallery-bottom-value">${image.views}</p>
            </li>
            <li class="gallery-bottom-item">
              <p class="gallery-bottom-stat">Comments</p>
              <p class="gallery-bottom-value">${image.comments}</p>
            </li>
            <li class="gallery-bottom-item">
              <p class="gallery-bottom-stat">Downloads</p>
              <p class="gallery-bottom-value">${image.downloads}</p>
            </li>
          </ul>
          </a>
        </li>`
    )
    .join("");
  gallery.insertAdjacentHTML("beforeend", markup);
  const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
  });
  lightbox.refresh();
}