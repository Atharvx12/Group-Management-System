import axios from "axios";

const API_URL = "http://localhost:8080/estimates";

const getEstimates = () => {
    return axios.get(API_URL);
};

const getEstimateById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const addEstimate = (estimate) => {
    return axios.post(API_URL, estimate);
};

const updateEstimate = (id, estimate) => {
    return axios.put(`${API_URL}/${id}`, estimate);
};

const deleteEstimate = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const getEstimatesByChain = (chainId) => {
    return axios.get(`${API_URL}/chain/${chainId}`);
};

const getEstimatesByGroup = (groupName) => {
    return axios.get(
        `${API_URL}/group/${encodeURIComponent(groupName)}`
    );
};

const getEstimatesByBrand = (brandName) => {
    return axios.get(
        `${API_URL}/brand/${encodeURIComponent(brandName)}`
    );
};

const getEstimatesByZone = (zoneName) => {
    return axios.get(
        `${API_URL}/zone/${encodeURIComponent(zoneName)}`
    );
};

const estimateService = {
    getEstimates,
    getEstimateById,
    addEstimate,
    updateEstimate,
    deleteEstimate,
    getEstimatesByChain,
    getEstimatesByGroup,
    getEstimatesByBrand,
    getEstimatesByZone
};

export default estimateService;