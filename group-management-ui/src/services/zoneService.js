import axios from "axios";

const API_URL = "https://group-management-system-production.up.railway.app/zones";


// ===============================
// GET ALL ZONES
// ===============================

const getZones = () => {
    return axios.get(API_URL);
};


// ===============================
// GET ZONE BY ID
// ===============================

const getZoneById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};


// ===============================
// ADD ZONE
// ===============================

const addZone = (zone) => {
    return axios.post(API_URL, zone);
};


// ===============================
// UPDATE ZONE
// ===============================

const updateZone = (id, zone) => {
    return axios.put(`${API_URL}/${id}`, zone);
};


// ===============================
// DELETE ZONE
// ===============================

const deleteZone = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};


// ===============================
// GET ZONES BY BRAND
// ===============================

const getZonesByBrand = (brandId) => {
    return axios.get(`${API_URL}/brand/${brandId}`);
};


// ===============================
// EXPORT
// ===============================

const zoneService = {
    getZones,
    getZoneById,
    addZone,
    updateZone,
    deleteZone,
    getZonesByBrand
};

export default zoneService;