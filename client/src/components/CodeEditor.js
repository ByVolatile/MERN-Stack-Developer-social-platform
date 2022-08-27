import React from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import { useState, useEffect } from "react";
export const CodeEditor = () => {
  var language = "xml";
  var displayName = "HTML";
  var value = "html";

  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        <div>
          <Editor
            language="xml"
            height="45%"
            width="25vw"
            displayName="HTML"
            value={html}
            onChange={(e)=>{
              console.log(e)
              e = e.toString();
              e = e.split("")
              if(e.length===1){
               if(e[0]==="!"){
                console.log("boş")
                e = e.join("")
                e = `<html>
                <head>
                </head>
                <body>
                </body>
              </html>`
              console.log(e)
                setHtml(e)
               }
               
              }
              else{
                e = e.join("")
                setHtml(e)
              }


              e = e.toString();
              e = e.split("")
              console.log(e.indexOf("<"))  
              console.log(e.indexOf("d")) 
              if(e.lastIndexOf("<")- e.lastIndexOf("d") === 1  || e.lastIndexOf("<")- e.lastIndexOf("d") === -1 )
              {
              
                e = e.join("")
                setHtml(e)
                e = e.split("")
                let index = e.indexOf("<d");
                e.splice(index-1,2, "<div></div>");
                
                e = e.join("")
                
                setHtml(e)
              }
               
              
              else{
                e = e.join("")
                setHtml(e)
              }
             
             
              
            }}
            className="hello"
          />
          <Editor
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
            height="52%"
            width="25vw"
          />
        </div>

        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="80%"
          height="100%"
          className="shower"
        />

        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
          height="98%"
          width="25vw"
        />
      </div>
    </>
  );
};
