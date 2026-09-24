import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

// This function is used to retrive information user for his Profile page
function getProfile() {
  let token = localStorage.getItem("token");
  return axios.get(`${API_URL}/account/profile`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}
export default getProfile;



// This function is used to retrive information user for public Profile
function getPublicProfile(userId){
 return axios.get(`${API_URL}/account/publicProfile`,{
  "params": {
   
    userId:userId
  }
})
}export {getPublicProfile}


// This function is used to Edit user profile information

function editUserProfile(userData) {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  for (const [key, value] of Object.entries(userData)) {
    // Don't send null or undefined values
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  }

  // Debug
  for (const [key, value] of formData.entries()) {
    console.log(key, value);

    if (key === "avatar") {
      console.log("Is avatar a File?", value instanceof File);
    }
  }

  return axios.patch(
    `${API_URL}/account/profile`,
    formData,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
} export {editUserProfile}