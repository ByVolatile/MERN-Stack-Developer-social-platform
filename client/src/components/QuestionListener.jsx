import React from 'react'
import { Card } from 'react-bootstrap'
import parse from "html-react-parser";
import { useEffect } from 'react';
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
const QuestionListener = ({post}) => {
 
  post.yazi = post.yazi.replaceAll("<pre", '<pre><code class="language-clike" style=" white-space: pre-line; "');
  post.yazi = post.yazi.replaceAll("</pre>", '</code></pre>' );
  let result;
  if(post.postedBy){ result = Object.values(post.postedBy)} 
  console.log(result)
  useEffect(() => {
    
    Prism.highlightAll();
  }, []);
  return (
  
    <Card className='container cardbg' style={{padding:"50px",marginBottom:"5px"}}>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
       <img src={require(`../../public/uploads/${result[2]}`)}  alt="" style={{width:"100px",height:"100px",borderRadius:"50%"}} />
       <Card.Title > {result && <div> {result[1]}</div>}</Card.Title>
  </div>
    <Card.Body>
   
    <Card.Title style={{backgroundColor:"#45a29e"}}>{post.baslik}</Card.Title>
      
      <Card.Text className='Question-yazi'>
        {parse(post.yazi)}  
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="" style={{color:"#45A29E"}}>{post.start}</small>
    </Card.Footer>
  </Card>
  )
}

export default QuestionListener