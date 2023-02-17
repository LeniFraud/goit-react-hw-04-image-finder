import axios from 'axios';

const API_KEY = '32823425-3cb9791a2d27dd26f71023aa3';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getPixabayImages = async (query, page) => {
  const params = {
    q: query,
    page,
  };

  const { data } = await axios.get('', { params });
  const images = data.hits.map(
    ({ id, tags, webformatURL, largeImageURL }, idx) => ({
      id,
      alt: tags,
      smallUrl: webformatURL,
      largeUrl: largeImageURL,
      isScrollAnchor: !idx,
    })
  );

  return { images, totalImages: data.totalHits };
};
