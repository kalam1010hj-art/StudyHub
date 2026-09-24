import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL

function getColleges(id){
    if (id == undefined){
        return axios.get(`${API_URL}/Hub/college`)
    }
    return  axios.get(`${API_URL}/Hub/college?university=${id}`)
}export default getColleges

function getPrograms(id){
    return axios.get(`${API_URL}/Hub/degree?collegeId=${id}`)
}export {getPrograms}

function getBranches(id){
    return axios.get(`${API_URL}/Hub/branch?degreeId=${id}`)
}export {getBranches}

function getSemesters(id){
    return axios.get(`${API_URL}/Hub/sem?branchId=${id}`)
}export {getSemesters}

function getSubjects(id){
    return axios.get(`${API_URL}/Hub/subject?semesterId=${id}`)
} export {getSubjects}