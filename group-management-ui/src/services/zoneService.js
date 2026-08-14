import axios from "axios";

const API_URL = "http://localhost:8080/zones";

const getZones = () => {
    return axios.get(API_URL);
};

const getZoneById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const addZone = (zone) => {
    return axios.post(API_URL, zone);
};

const updateZone = (id, zone) => {
    return axios.put(`${API_URL}/${id}`, zone);
};

const deleteZone = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const getZonesByBrand = (brandId) => {
    return axios.get(`${API_URL}/brand/${brandId}`);
};

const zoneService = {
    getZones,
    getZoneById,
    addZone,
    updateZone,
    deleteZone,
    getZonesByBrand
};

export default zoneService;