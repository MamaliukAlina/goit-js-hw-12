export function createGalleryMarkup(data = []) {
  return data
    .map((img = {}) => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = img;
      return `<li class="gallery-item">
        <a href="${largeImageURL}">
          <div class="gallery-top">
            <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
          </div>
          <ul class="gallery-bottom">
            <li class="gallery-bottom-item">
              <p class="gallery-bottom-stat">Likes</p>
              <p class="gallery-bottom-value">${likes}</p>
            </li>
            <li class="gallery-bottom-item">
              <p class="gallery-bottom-stat">Views</p>
              <p class="gallery-bottom-value">${views}</p>
            </li>
            <li class="gallery-bottom-item">
              <p class="gallery-bottom-stat">Comments</p>
              <p class="gallery-bottom-value">${comments}</p>
            </li>
            <li class="gallery-bottom-item">
              <p class="gallery-bottom-stat">Downloads</p>
              <p class="gallery-bottom-value">${downloads}</p>
            </li>
          </ul>
          </a>
        </li>`;
    })
    .join('');
}
