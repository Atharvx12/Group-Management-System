import axios from "axios";

const API_URL = "https://group-management-system-production.up.railway.app/groups";

const getGroups = () => {
    return axios.get(API_URL);
};

const addGroup = (group) => {
    return axios.post(API_URL, group);
};

const updateGroup = (id, group) => {
    return axios.put(`${API_URL}/${id}`, group);
};

const deleteGroup = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const groupService = {
    getGroups,
    addGroup,
    updateGroup,
    deleteGroup,
};

export default groupService;