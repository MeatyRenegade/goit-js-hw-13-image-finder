import ApiService from './api-service.js';
import getRefs from './refs.js';
import pictureCardTemplate from '../templates/picture-card.hbs';
import easyScroll from 'easy-scroll';

const refs = getRefs();
const galleryApiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', loadMorePics);

function onSearch(event) {
  event.preventDefault();

  galleryApiService.query = event.currentTarget.elements.query.value;
  galleryApiService.resetPage();
  galleryApiService.fetchOn().then(pictures => {
    clearMarkup();
    renderMarkup(pictures);
  });
}

function loadMorePics() {
  galleryApiService.fetchOn().then(renderMarkup);

  const cordinates = refs.loadMore.offsetTop;

  easyScroll({
    scrollableDomEle: window,
    direction: 'bottom',
    duration: cordinates,
    easingPreset: 'easeInOutCubic',
  });
}

function renderMarkup(pictures) {
  refs.gallery.insertAdjacentHTML('beforeend', pictureCardTemplate(pictures));
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
  refs.loadMore.classList.remove('is-hidden');
}
