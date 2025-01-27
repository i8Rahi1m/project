import axios from 'axios';

export const fetchAllMovies = async () => {
    const response = await axios.get('http://localhost:3000/Movies');
    return response.data;
};

export const fetchCategories = async () => {
    const response = await axios.get('http://localhost:3000/Category');
    return response.data;
};

export const fetchMovieById = async (id) => {
    const response = await axios.get('http://localhost:3000/Movies', { params: { id } });
    return response.data[0];
};
