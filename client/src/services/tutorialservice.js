import { HTTP } from "../axios";


const getAll = () => {
 
    return HTTP.get("/Question/Q");

  };
  
  
  const TutorialService = {
    getAll,
   
  };
  
  export default TutorialService;

/* const Login = async(formData) => await HTTP.post('/users/signin',formData)
 const Kayit = async(formData) => await HTTP.post('/users/signup',formData)
 const Listele = async(formData) => await HTTP.get('/users/signin')
 const CreatePost = async(formData) => await HTTP.post('/users/post',formData)
 const GetPost = async(formData) => await HTTP.get('/users/post')
 const CreateQuestioner = async(formData) => await HTTP.post('/Question/Create',formData)
 const GetQuestions = async(formData) => await HTTP.get('/Question/Q') */