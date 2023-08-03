import axios from 'axios';

const apiInstance = axios.create({
    baseURL: 'http://localhost:4000/api/v1', // The base URL for your API
    timeout: 5000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
        // You can set other default headers here if needed
    },
});

export default apiInstance;
