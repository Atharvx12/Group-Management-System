import axios from "axios";

const API_URL = "http://localhost:8080/chains";


// ===============================
// GET ALL ACTIVE CHAINS
// ===============================

const getChains = () => {
    return axios.get(API_URL);
};


// ===============================
// GET CHAIN BY ID
// ===============================

const getChainById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};


// ===============================
// ADD CHAIN
// ===============================

const addChain = (chain) => {
    return axios.post(API_URL, chain);
};


// ===============================
// UPDATE CHAIN
// ===============================

const updateChain = (id, chain) => {
    return axios.put(`${API_URL}/${id}`, chain);
};


// ===============================
// DELETE CHAIN
// ===============================

const deleteChain = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};


// ===============================
// GET CHAINS BY GROUP
// ===============================

const getChainsByGroup = (groupId) => {
    return axios.get(`${API_URL}/group/${groupId}`);
};


// ===============================
// EXPORT
// ===============================

const chainService = {
    getChains,
    getChainById,
    addChain,
    updateChain,
    deleteChain,
    getChainsByGroup
};

export default chainService;