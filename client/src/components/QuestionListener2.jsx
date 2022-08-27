import React from "react";

import parse from "html-react-parser";
import {Link} from "react-router-dom";
import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
const QuestionListener = ({ post }) => {
  post.yazi = post.yazi.replaceAll(
    "<pre",
    '<pre><code class="language-clike" style=" white-space: pre-line; "'
  );
  post.yazi = post.yazi.replaceAll("</pre>", "</code></pre>");
  let result;
  if (post.postedBy) {
    result = Object.values(post.postedBy);
  }
  
  useEffect(() => {
    Prism.highlightAll();
   
  }, []);

  function formatDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric'};

    
   
    return new Date(string).toLocaleDateString([],options);
}
function formatHours(string){
 var hours =  string.slice(11, 16)
 var convert = hours.slice(0,2);
 convert = parseInt(convert);
 convert+=3
 var time = hours.slice(2,5);
 var sonuc = convert + time;

  return sonuc
}
  return (
    <>
      <div
        style={{
          backgroundColor: "#45a29e",
          width: "60%",
          margin: "0 auto",
          height: "auto",
          marginTop: "10px",
        
          border: "3px solid #45a29e",
          borderRadius:"5px"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#0b0c10",
          
            
          }}
        >
          {post.baslik}
        </div>
        <div>
          
          
          <div
          className="postYazi"
            style={{
              color:"#c5c6c7",
             backgroundColor:"#1f2833",
              padding:"10px 5px 1px 5px",
              width:"100%",
              border:"none",
              maxHeight:"800px",
              textOverflow:"ellipsis",
              whiteSpace:"nowrap",
              overflow:"hidden"
            }}
          >
            {parse(post.yazi)}
          
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div>
              <img
                src={require(`../../../server/uploads/${result[2]}`)}
                alt=""
                style={{ width: "auto", height: "64px", borderRadius: "50% " }}
              />
              <span style={{ color: "black" }}>{result[1]}</span>
            </div>
            <div>{formatDate(post.start)} {formatHours(post.start)}</div>
          </div>
        </div>
        <div style={{width:"100%",direction:"rtl"}}><Link className="linkclass" to ={"Question/"+post._id}> Yorumları gör</Link></div>
      </div>
    </>
  );
};

export default QuestionListener;
