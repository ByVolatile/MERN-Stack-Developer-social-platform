import React, { useEffect } from 'react'
import { Navbar, Container, Button, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../App.css"
import "../css/Navbar.css"

import { useDispatch } from 'react-redux';
import { Logout } from '../actions/userData/user';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import {Form,Nav,NavDropdown,Offcanvas} from "react-bootstrap"
import { useState } from 'react';
import { SearchUser } from '../axios';
const Navbars = () => {
  const userData = (JSON.parse(localStorage.getItem("user")));
  const [searchData,setSearchData] = useState({search:""});
    const [username,setUserName] = useState();
    const [searchComplateData,setSearchComplateData] = useState([]);
 
  
 
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const logoutClick = ()=>{
    dispatch(Logout());
    navigate("/")
  }
  const searchHandler=(e)=>{
    setSearchData({...searchData,search:e.target.value})
    
    
  }
  useEffect(()=>{
    if(searchData.search.length>=1){
    SearchUser(searchData)
    .then((res)=>{
      setSearchComplateData(res.data.user);
      
    }).catch((err)=>{
      console.log(err)
    })
  }
  else{
    setSearchComplateData([])
  }
  },[searchData])
  useEffect(()=>{
    if(userData){
      setUserName(userData.username)
    
    }
   
    
    
    console.log("navbarrendered")
  },[userData])
  return (
    <div className='ustTaraf'  >
  
      <Navbar   bg="dark" expand={false}  className="mb-3 "   >
        <Container fluid >
          <Navbar.Brand  ><NavLink to="/" >KSG</NavLink></Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-`} style={{backgroundColor:"#45A29E"}}/>
          <Navbar.Offcanvas 
            id={`offcanvasNavbar-expand-`}
            aria-labelledby={`offcanvasNavbarLabel-expand-`}
            placement="end"
            className="navbarRight"
          >
            <Offcanvas.Header closeButton >
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-`} >
                Menü
              </Offcanvas.Title>
            </Offcanvas.Header >
            <Offcanvas.Body >
              <Nav className="justify-content-end flex-grow-1 pe-3 rightBar">
              {userData &&<NavLink to="/CreateQuestion" >Paylaşım Yap</NavLink>}
               <NavLink to="/Editor" >Editor</NavLink>
                {/*{  userData && <NavLink to="/Post" >Post</NavLink> } */}

                {!userData &&<NavLink className='text-decoration-none'  to="/Login"><Button variant="success">Giriş Yap</Button></NavLink>}
        
      
       
                {userData &&   <NavDropdown
                  title="Hesabım"
                  id={`offcanvasNavbarDropdown-expand-`}
               
                  
                >
                 {userData!=null && <NavLink className='text-decoration-none dropMenu'  to={"/Account/"+username}>Hesabım</NavLink>}
                 <br></br>
                 
                  <Button variant='danger' onClick={logoutClick}>Çıkış Yap</Button>
                 
                  <NavDropdown.Divider  />
                
                </NavDropdown>}
                {!userData && <br></br> }
              </Nav>
              <Form className="d-flex" >
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={searchHandler}
                />
                <Button variant="outline-success">Search</Button>
                
              </Form>
              <div style={{color:"white",maxHeight:"800px",overflow:"auto"}}>
                  {
                    searchComplateData.map((data,key)=>{
                      return(
                        <Link  key={key} to={"Account/"+data.username}><div style={{border:"1px solid #1c1c1c"}} ><div style={{display:"flex",alignItems:"center"}}>
                         {data.photo &&  <img  style={{maxHeight:"64px",maxWidth:"64px",borderRadius:"50%"}}  src={require(`../../../server/uploads/${data.photo}`)} alt="ProfilePhoto"></img> } 
                          <div style={{display:"block",}}>
                            <div>  {data.fullname}</div>
                          
                          @{data.username}</div></div>
                       
                        </div></Link>
                      )
                    })
                  }
                </div>
            </Offcanvas.Body>
            
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

  </div>
  )
}

export default Navbars