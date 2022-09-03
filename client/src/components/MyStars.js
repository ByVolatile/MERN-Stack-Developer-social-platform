import React, { useEffect,useState } from 'react'
import { getStaredPost } from '../axios'

import "../css/MyStars.css"
import StaredPostListener from './StaredPostListener';
const MyStars = () => {
  let id;
  const [myStaredPosts,setMyStaredPosts] = useState([])
  useEffect(()=>{
    id = JSON.parse(localStorage.getItem('user'))._id
    getStaredPost(id).then((res)=>{
      console.log(res.data)
      setMyStaredPosts(res.data)
    }).catch((err)=>console.log(err))
  },[])
  useEffect(()=>{
 console.log(myStaredPosts)
  },[myStaredPosts])
  return (
    <div className='myStars'>
       {myStaredPosts?.map((item, i) => {
            /*  item.yazi = item.yazi.replaceAll(
              "<pre",
              '<pre><code class="language-clike" style=" white-space: pre-line; "'
            );
            item.yazi = item.yazi.replaceAll("</pre>", "</code></pre>"); */
            if(item.paylasimId){
              return <StaredPostListener post ={item.paylasimId} key={i}/>
            }
            return null
          })}

    </div>
  )
}

export default MyStars