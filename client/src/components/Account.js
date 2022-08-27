import React, { useEffect, useState } from "react";
import "../css/Account.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GetUserData, GetUserQuestions } from "../axios";
import parse from "html-react-parser";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
const Account = () => {
  var x = JSON.parse(localStorage.getItem("user"));
  
  const { username } = useParams();
  const [userData, setUserData] = useState();
  const [postData, setPostData] = useState([]);
  function formatDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
}
  useEffect(() => {
    console.log(username, "account Rendered");

    GetUserData({ username })
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
    GetUserQuestions({ username })
      .then((res) => {
        res.data.post.map((res) => {
          res.yazi = res.yazi.replaceAll(
            "<pre",
            '<pre><code class="language-clike" style=" white-space: pre-line; "'
          );
          res.yazi = res.yazi.replaceAll("</pre>", "</code></pre>");
        });

        setPostData(res.data.post);
      })
      .catch((error) => {
        console.log(error);
      });
    Prism.highlightAll();
  }, [username]);

  useEffect(() => {
    Prism.highlightAll();
  }, [postData]);
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="Account">
      <div
        style={{
          width: "100%",
          height: "100%",
          color: "#c5c6c7",
          backgroundColor: "#1f2833",
        }}
      > 
        
          {userData && (
          <div style={{ position: "fixed", top: "10%", left: "0px",border:"1px solid #66fcf1",borderRadius:"5px",padding:"10px" }}>
            <img
              src={require(`../../../server/uploads/${userData.photo}`)}
              style={{
                maxHeight: "100px",
                maxWidth: "100px",
                height:"75px",
                width:"auto",
                borderRadius: "50%",
               
              }}
             
            />
            <span >
            {userData.fullname} 
          </span>
          <br></br>
          <span style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"center"}}> Kayıt Tarihi :
            <br></br>
            {formatDate(userData.createDate)}</span></div>
          )}

        
      
        <div style={{ width: "100%", height: "100%" }}>
          {postData?.map((item, i) => {
            /*  item.yazi = item.yazi.replaceAll(
              "<pre",
              '<pre><code class="language-clike" style=" white-space: pre-line; "'
            );
            item.yazi = item.yazi.replaceAll("</pre>", "</code></pre>"); */

            return (
              <div
                key={i}
                style={{
                  backgroundColor: "#45a29e",
                  width: "60%",
                  margin: "0 auto",
                  height: "auto",
                  marginBottom: "10px",
                  border: "3px solid #45a29e",
                  borderRadius: "5px",
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
                  {item.baslik}
                </div>
                <div
                  className="postYazi"
                  style={{
                    color: "#c5c6c7",
                    backgroundColor: "#1f2833",
                    padding: "10px 10px 0px 10px",
                    width: "100%",
                    border: "none",
                    maxHeight: "800px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {parse(item.yazi)}
                </div>
                <div style={{width:"100%",direction:"ltr",display:"flex",justifyContent:"space-around"}}>{formatDate(item.start)} <Link className="linkclass" to ={"../Question/"+item._id}> Yorumları gör</Link></div>
              </div>
            );
          })}{" "}
        </div>
      </div>
      
    </div>
  );
};

export default Account;
