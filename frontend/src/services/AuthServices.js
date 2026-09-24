import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL

function AccountLogin(identifier, password){
  return axios.post(`${API_URL}/account/login`, {
    identifier,
    password,
  });
} export default AccountLogin

export function CreateAccount(formData){
  return axios.post(`${API_URL}/account/register`,formData)
}



function changePassword(passwordData) {
  const token = localStorage.getItem("token");

  return axios.post(`${API_URL}/account/change-password`, passwordData, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}

export { changePassword };


function logoutAccount() {
  const token = localStorage.getItem("token");

  return axios.post(
    `${API_URL}/account/logout`,
    {},
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
}

export { logoutAccount };


function deleteAccount(password) {
  const token = localStorage.getItem("token");

  return axios.delete(`${API_URL}/account/delete-account`, {
    headers: {
      Authorization: `Token ${token}`,
    },
    data: { password },
  });
}

export { deleteAccount };


export function requestPasswordReset(email) {
  return axios.post(`${API_URL}/account/forgot-password`, { email });
}

export function resetPassword(uid, token, password, confirm_password) {
  return axios.post(`${API_URL}/account/reset-password`, {
    uid,
    token,
    password,
    confirm_password,
  });
}
