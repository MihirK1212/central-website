import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL


const usersURL = BASE_URL + '/api/users'
const contentURL = BASE_URL + '/api/content'
const googleloginURL = BASE_URL + '/api/auth/googlelogin'


export const googlelogin = (googleLoginData) => axios.post(`${googleloginURL}` , googleLoginData)

export const uploadImageServer = (imageData) => axios.post(`${contentURL}/image`, imageData, {headers: { 'Content-Type': 'application/json' , authorization: localStorage.getItem('token') }})

export const getContentVersionAdmin = () => axios.get(`${usersURL}/admin`, { headers: { authorization: localStorage.getItem('token') } })
export const getContentVersionPublic = (userEmailId) => axios.get(`${usersURL}/public/${userEmailId}`)

export const updateContentVersion = (updatedContentVersion) => axios.patch(`${contentURL}`, updatedContentVersion , { headers: { authorization: localStorage.getItem('token') } })
export const publishVersion = () => axios.patch(`${usersURL}/admin`, {}, { headers: { authorization: localStorage.getItem('token') } })

export const addSection = (newSection) => axios.post(`${contentURL}/sections`, newSection, { headers: { authorization: localStorage.getItem('token') } })
export const updateSection = (updateSectionDetails) => axios.patch(`${contentURL}/sections`, updateSectionDetails , { headers: { authorization: localStorage.getItem('token') } })
export const deleteSection = (sectionId) => axios.delete(`${contentURL}/sections/${sectionId}`, { headers: { authorization: localStorage.getItem('token') } })

export const addSectionChild = (newSectionChildDetails) => axios.post(`${contentURL}/sections/sectionChildren` , newSectionChildDetails ,{ headers: { authorization: localStorage.getItem('token') } } )

