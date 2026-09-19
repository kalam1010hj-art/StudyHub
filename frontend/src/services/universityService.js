import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL;

function getUniversities(){
    return axios.get(`${API_URL}/Hub/university`)
}
export default getUniversities;