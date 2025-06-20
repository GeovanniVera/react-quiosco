import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Por ejemplo, 'http://localhost:8000'
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
});

export default axiosClient;