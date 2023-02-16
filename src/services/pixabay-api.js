import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32823425-3cb9791a2d27dd26f71023aa3';

export const getImagesByQuery = async (query, page) => {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    page,
    per_page: 12,
  };

  const { data } = await axios.get(BASE_URL, { params });
  const images = data.hits.map(
    ({ id, tags, webformatURL, largeImageURL }, idx) => ({
      id,
      tags,
      webformatURL,
      largeImageURL,
      isScrollAnchor: !idx,
    })
  );
  const totalImages = data.totalHits;

  return { images, totalImages };
};
