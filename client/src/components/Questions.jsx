import React, { useEffect, useState } from "react";
import { HTTP } from "../axios";
import QuestionListener from "./QuestionListener";
import QuestionListener2 from "./QuestionListener2";
import { useSelector } from "react-redux";
const Questions = () => {
  /* const selectorData =useSelector(state=> state.counter.users)
 
   
   useEffect(()=>{
    
    console.log(selectorData)
    setPosts(selectorData)
   },[selectorData])
  */
   const tutorials = useSelector(state => state.tutorials);
   
  /* const dispatch = useDispatch()
   
   const posts = useSelector(state=> state.counter.users)
 
   useEffect(()=>{
    
     dispatch(getUsers())
     
   },[dispatch])
 
   */
 
 /*  useEffect(() => {
    async function fetchMyAPI() {
      let response = await HTTP.get("/Question/Q");

      setPosts(response.data.post);
    }

    fetchMyAPI();
  }, []);
*/
  /* useEffect(() => {
     GetQuestions().then((res)=> {setPosts(res.data.post)}).catch((error)=>{console.log(error)})
 
  },[]); */

  return (
    <div style={{ paddingTop: "0vh",backgroundColor:"#1f2833",margin:"0px",padding:"0px" }}>
      {tutorials.map((post, index) => (
        <QuestionListener2 post={post} key={index}  />
      ))}
      
    </div>
  );
};

export default Questions;
