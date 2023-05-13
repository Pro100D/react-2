import axios from 'axios';

export const perPage = 15;

const API_KEY = '563492ad6f9170000100000108dc2880626e4436b3634ce1cf6b4d74';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: perPage,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`search?query=${query}&page=${page}`);

  return data;
};
