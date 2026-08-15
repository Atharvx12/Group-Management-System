import axios from "axios";

const API_URL = "http://localhost:8080/brands";


// ===============================
// GET ALL BRANDS
// ===============================

const getBrands = () => {
    return axios.get(API_URL);
};


// ===============================
// GET BRAND BY ID
// ===============================

const getBrandById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};


// ===============================
// ADD BRAND
// ===============================

const addBrand = (brand) => {
    return axios.post(API_URL, brand);
};


// ===============================
// UPDATE BRAND
// ===============================

const updateBrand = (id, brand) => {
    return axios.put(`${API_URL}/${id}`, brand);
};


// ===============================
// DELETE BRAND
// ===============================

const deleteBrand = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};


// ===============================
// GET BRANDS BY CHAIN
// ===============================

const getBrandsByChain = (chainId) => {
    return axios.get(`${API_URL}/chain/${chainId}`);
};


// ===============================
// GET BRANDS BY GROUP
// ===============================

const getBrandsByGroup = (groupId) => {
    return axios.get(`${API_URL}/group/${groupId}`);
};


// ===============================
// EXPORT
// ===============================

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