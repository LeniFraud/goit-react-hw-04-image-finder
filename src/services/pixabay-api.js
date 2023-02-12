import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32823425-3cb9791a2d27dd26f71023aa3';

export const getPicturesByQuery = async (query, page) => {
  const searchParams = {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      page,
      per_page: 12,
    },
  };

  const { data } = await axios.get(`${BASE_URL}`, searchParams);
  return data;
};
