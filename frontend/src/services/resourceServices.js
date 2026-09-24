import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function getResoucresfiles(subjectId){
  
 if (subjectId == undefined){
   return axios.get(`${API_URL}/Hub/resource`)
 }
   return axios.get(`${API_URL}/Hub/resource?subjectId=${subjectId}`)
} export default getResoucresfiles

function postResoucreFile(resourceData){
  let token = localStorage.getItem("token")
  let formData = new FormData()
  formData.append("title", resourceData.title);
formData.append("description", resourceData.description);
formData.append("file", resourceData.file);
formData.append("resource_type", resourceData.resource_type);
formData.append("subject", resourceData.subject);
  return axios.post(`${API_URL}/Hub/resource`,formData,{
    headers:{
      Authorization:`Token ${token}`
    }
  })
} export {postResoucreFile}


function getResourceDetails() {
  return axios.get(`${API_URL}/Hub/directory`)
  
} export {getResourceDetails}

function getMyUploads() {
  const token = localStorage.getItem("token");

  return axios.get(`${API_URL}/Hub/my-uploads`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}

export { getMyUploads };


function deleteResource(resourceId) {
  const token = localStorage.getItem("token");

  return axios.delete(`${API_URL}/Hub/resource/${resourceId}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}

export { deleteResource };
