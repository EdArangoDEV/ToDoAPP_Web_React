import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const api = {
  getTasks: () => API.get('/tasks'),
  createTask: (task) => API.post('/tasks', task),
  completeTask: (id) => API.put(`/tasks/${id}/completar`),
  deleteTask: (id) => API.delete(`/tasks/${id}`),
  getTask: (id) => API.get(`/tasks/${id}`)
};
