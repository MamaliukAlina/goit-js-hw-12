import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPhotos } from './js/pixabay-api';
import { createGalleryMarkup } from './js/render-functions';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.load-more-btn');
const perPage = 40;
let searchQuery = '';
let currentPage = 1;
let totalPages = 0;

formEl.addEventListener('submit', onSearchSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
const lightboxInstance = new SimpleLightbox('.gallery a', {
  /* options */
});

async function onSearchSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  searchQuery = form.elements.searchField.value.trim();
  if (searchQuery === '') {
    console.log('Query cannot be empty');
    iziToast.error({
      message:
        'Query cannot be empty',
      position: 'topRight',
    });
    return;
  }
  galleryEl.innerHTML = '';
  currentPage = 1;
  loaderEl.classList.remove('is-hidden');

  try {
    const { hits, totalHits } = await getPhotos(searchQuery, currentPage);
    totalPages = Math.ceil(totalHits / perPage);

    console.log('totalPages =' + totalPages );
    console.log('totalHits =' + Math.ceil(totalHits) );
    

    if (hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    renderGallery(hits);
    if ( totalPages !==1 ) {
      loadMoreBtnEl.classList.remove('is-hidden');
    }
    
  } catch (error) {
    console.log(error);
  } finally {
    loaderEl.classList.add('is-hidden');
    setTimeout(() => {
      form.reset();
    }, 3000); // затримка у 300 мс для оновлення розмітки
  }
}

async function onLoadMoreBtnClick() {
  currentPage += 1;
  loaderEl.classList.remove('is-hidden');
  try {
    const { hits } = await getPhotos(searchQuery, currentPage);
    renderGallery(hits);

    if (currentPage >= totalPages) {
      loadMoreBtnEl.classList.add('is-hidden');
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
    onScrollPage(galleryEl.firstElementChild);
  } catch (error) {
    console.log(error);
  } finally {
    loaderEl.classList.add('is-hidden');
  }
}

function onScrollPage(element) {
  if (!element) {
    return;
  }
  const { height } = element.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    left: 0,
    behavior: 'smooth',
  });
}

function renderGallery(images) {
  const markup = createGalleryMarkup(images);
  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightboxInstance.refresh();
}
