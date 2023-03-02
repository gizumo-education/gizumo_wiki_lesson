import axios from 'axios';

export default (token = null) => {
  const headers = {};
  if (token) Object.assign(headers, { Authorization: `Bearer ${token}` });

  return axios.create({
    baseURL: API_BASE_URL,
    headers,
  });
};
