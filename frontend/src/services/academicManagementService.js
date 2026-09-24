import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const authConfig = () => ({
  headers: {
    Authorization: `Token ${localStorage.getItem("token")}`,
  },
});

export function getAcademicDirectory() {
  return axios.get(`${API_URL}/Hub/directory`);
}

export function createBranch(data) {
  return axios.post(`${API_URL}/Hub/branch`, data, authConfig());
}

export function updateBranch(id, data) {
  return axios.put(`${API_URL}/Hub/branch/${id}`, data, authConfig());
}

export function deleteBranch(id) {
  return axios.delete(`${API_URL}/Hub/branch/${id}`, authConfig());
}

export function createSemester(data) {
  return axios.post(`${API_URL}/Hub/sem`, data, authConfig());
}

export function updateSemester(id, data) {
  return axios.put(`${API_URL}/Hub/sem/${id}`, data, authConfig());
}

export function deleteSemester(id) {
  return axios.delete(`${API_URL}/Hub/sem/${id}`, authConfig());
}

export function createSubject(data) {
  return axios.post(`${API_URL}/Hub/subject`, data, authConfig());
}

export function updateSubject(id, data) {
  return axios.put(`${API_URL}/Hub/subject/${id}`, data, authConfig());
}

export function deleteSubject(id) {
  return axios.delete(`${API_URL}/Hub/subject/${id}`, authConfig());
}
