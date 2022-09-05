import axios from 'axios';

var dev = process.env.REACT_APP_DEV
const allURLs = {
    usersURL: dev === 'true' ? "http://localhost:5000/users" : "https://gymkhana-iiti.herokuapp.com/users",
    contentURL: dev === 'true' ? "http://localhost:5000/content" : "https://gymkhana-iiti.herokuapp.com/content",
    imgUploadURL: dev === 'true' ? "http://localhost:5000/uploadImage" : "https://gymkhana-iiti.herokuapp.com/uploadImage",
    publicGetURL: dev === 'true' ? "http://localhost:5000/public" : "https://gymkhana-iiti.herokuapp.com/public"
}

const { imgUploadURL, usersURL, contentURL, publicGetURL } = allURLs

console.log("API URLS ", usersURL, contentURL, imgUploadURL, publicGetURL)

export const uploadImageServer = (imageData) => axios.post(imgUploadURL, imageData, { headers: { authorization: localStorage.getItem('token') } })

export const fetchUserPublic = (userName) => axios.get(`${publicGetURL}/${userName}`)

export const fetchUserAdmin = () => axios.get(`${usersURL}`, { headers: { authorization: localStorage.getItem('token') } })
export const updateGeneralDetails = (postData) => axios.patch(`${usersURL}`, postData, { headers: { authorization: localStorage.getItem('token') } })
export const publishVersion = () => axios.post(`${usersURL}`, {}, { headers: { authorization: localStorage.getItem('token') } })

export const addSection = (postData) => axios.post(`${contentURL}/sections`, postData, { headers: { authorization: localStorage.getItem('token') } })
export const updateSection = (sectionID, updateData) => axios.patch(`${contentURL}/sections/${sectionID}`, updateData, { headers: { authorization: localStorage.getItem('token') } })
export const deleteSection = (sectionID) => axios.delete(`${contentURL}/sections/${sectionID}`, { headers: { authorization: localStorage.getItem('token') } })
export const saveSection = (sectionID, updatedSection) => axios.patch(`${contentURL}/sections/save/${sectionID}`, updatedSection, { headers: { authorization: localStorage.getItem('token') } })
export const saveSequence = (sequence) => axios.patch(`${contentURL}/sections`, { sectionSequence: sequence }, { headers: { authorization: localStorage.getItem('token') } })

