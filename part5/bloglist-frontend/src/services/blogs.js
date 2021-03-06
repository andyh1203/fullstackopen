import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blog, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `bearer ${token}`,
  };
  const request = await axios.post(baseUrl, blog, { headers });
  return request.data;
};

const update = async (id, updatedBlog) => {
  const request = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return request.data;
};

const del = async (id, token) => {
  const headers = {
    Authorization: `bearer ${token}`,
  };
  const request = await axios.delete(`${baseUrl}/${id}`, { headers });
  return request.data;
};

export default {
  getAll, create, update, del,
};
