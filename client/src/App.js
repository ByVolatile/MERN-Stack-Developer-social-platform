
import './App.css';
import Navbar from './components/Navbar2';
import FormComponent from './components/FormComponent';
import Post from './components/Post';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Question from './components/Question';
import {  useEffect } from 'react';
import MainMenu from './components/MainMenu'
import CreateQuestion from './components/CreateQuestion';
import { useCallback } from 'react';
import Account from './components/Account';
import Questions from './components/Questions';
import { CodeEditor } from './components/CodeEditor';
import Register from './components/Register';
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveTutorials,
  
} from "./actions/tutorials";
import { getUserData } from './actions/userData/user';




function App() {
  
  const userData = useSelector(state => state.users);
  const dispatch = useDispatch();


  const fetchBusinesses = useCallback(() => {
    if(localStorage.getItem('user') && userData==null){
      
      var x =(JSON.parse(localStorage.getItem("user")))
      
      dispatch(getUserData(x))
     
     }
  }, [dispatch,userData])
  useEffect(() => {
    fetchBusinesses()
  }, [fetchBusinesses])
  
  useEffect(() => {
    console.log("app rendered")
   
  }, []);
 
  // const tutorials = useSelector(state => state.tutorials);
  

 
  useEffect(() => {
  
    dispatch(retrieveTutorials());
   
  }, [dispatch]);
  
 
  

 
  
  
  
 
  return (
    <>
   

    
    <BrowserRouter>
   
    <Navbar  />
    <Routes>
    
     <Route path="/" element={<Questions  exact/>} /> 
    
      <Route  path="/Anasayfa" element={<MainMenu   />}   />
  {/*  <Route path="/Post" element={<Post  /> }/> */} 
     <Route path="/CreateQuestion" element={<CreateQuestion />}/>
     <Route path="/Login" element={<FormComponent  />} /> 
     <Route path="/Kaydol" element={<Register />}/>
     <Route path="/Questions" element={<Questions />}/>
        <Route path="/signup" element={<LoginForm  />}  /> 
      <Route path="/Editor" element={<CodeEditor />}/>
     
      <Route path="/Account/:username" element={<Account />}/>
      <Route path="/Question/:questionId" element={<Question />}/>
     
    </Routes>
  </BrowserRouter>
    
  </>
    
  ); 
}

export default App;