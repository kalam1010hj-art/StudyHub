import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function getResoucresfiles(subjectId){
 return axios.get(`${API_URL}/Hub/resource?subjectId=${subjectId}`)
} export default getResoucresfiles