import axios from "axios";

const API_URL = "http://localhost:8080/brands";

const getBrands = () => {
    return axios.get(API_URL);
};

const getBrandById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const addBrand = (brand) => {
    return axios.post(API_URL, brand);
};

const updateBrand = (id, brand) => {
    return axios.put(`${API_URL}/${id}`, brand);
};

const deleteBrand = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const getBrandsByChain = (chainId) => {
    return axios.get(`${API_URL}/chain/${chainId}`);
};

const getBrandsByGroup = (groupId) => {
    return axios.get(`${API_URL}/group/${groupId}`);
};

const brandService = {
    getBrands,
    getBrandById,
    addBrand,
    updateBrand,
    deleteBrand,
    getBrandsByChain,
    getBrandsByGroup
};

export default brandService;