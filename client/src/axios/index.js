import axios from 'axios';

export const HTTP = axios.create({
    baseURL:'http://localhost:5000',
})
export const Login = async(formData) => await HTTP.post('/users/signin',formData)
export const Kayit = async(formData) => await HTTP.post('/users/signup',formData)
export const Listele = async(formData) => await HTTP.get('/users/signin')
export const CreatePost = async(formData) => await HTTP.post('/users/post',formData)
export const GetPost = async(formData) => await HTTP.get('/users/post')
export const CreateQuestioner = async(formData,token) => await HTTP.post('/Question/Create',formData,{
    headers: { token }
}) 
export const GetQuestions = async(formData) => await HTTP.get('/Question/Q')
export const GetUserData = async(formData) => await HTTP.post('/users/userData',formData)
export const GetComment = async(formData) => await HTTP.post('/Question/getComment',formData)
export const GetUserQuestions = async(formData) => await HTTP.post('/Question/userQuestions',formData)
export const SearchUser = async(formData) => await HTTP.post('/users/searchUser',formData)
export const AddComment = async(formData,token) => await HTTP.post('/Question/addComment',formData,{
    headers: { token }
})
export const GetQuestion = async(formData) => await HTTP.post('/Question/getQuestion', {
  formData
  })