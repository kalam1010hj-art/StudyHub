import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL

function AccountLogin(username,password){
  return axios.post(`${API_URL}/account/login`,
    {
    username:username,
    password:password
  }
)
} export default AccountLogin

export function CreateAccount(formData){
  return axios.post(`${API_URL}/account/register`,formData)
}

