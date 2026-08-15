import axios from "axios";

const API_URL = "http://localhost:8080/groups";


// ===============================
// GET ALL GROUPS
// ===============================

const getGroups = () => {
    return axios.get(API_URL);
};


// ===============================
// ADD GROUP
// ===============================

const addGroup = (group) => {
    return axios.post(API_URL, group);
};


// ===============================
// UPDATE GROUP
// ===============================

const updateGroup = (id, group) => {
    return axios.put(`${API_URL}/${id}`, group);
};


// ===============================
// DELETE GROUP
// ===============================

const deleteGroup = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};


// ===============================
// EXPORT
// ===============================

const groupService = {
    getGroups,
    addGroup,
    updateGroup,
    deleteGroup
};

export default groupService;