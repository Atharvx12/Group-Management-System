import axios from "axios";

const API_URL = "http://localhost:8080/chains";

const getChains = () => {
    return axios.get(API_URL);
};

const addChain = (chain) => {
    return axios.post(API_URL, chain);
};

const updateChain = (id, chain) => {
    return axios.put(`${API_URL}/${id}`, chain);
};

const deleteChain = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const chainService = {
    getChains,
    addChain,
    updateChain,
    deleteChain,
};

export default chainService;