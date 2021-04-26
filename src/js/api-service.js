const API_KEY = '21331461-15f5bdfd142a82f8595dd354e';
const BASE_URL = 'https://pixabay.com/api/';
const PROPS = '&image_type=photo&orientation=horizontal&per_page=12';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchOn() {
    return fetch(
      `${BASE_URL}/?key=${API_KEY}&page=${this.page}&q=${this.searchQuery}${PROPS}`,
    )
      .then(response => response.json())
      .then(({ hits }) => {
        if (hits.length === 0) {
          alert('нет результатов!');
        }
        this.incrementPage();
        return hits;
      })
      .catch(error => console.log(error));
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(value) {
    return (this.searchQuery = value);
  }
}
