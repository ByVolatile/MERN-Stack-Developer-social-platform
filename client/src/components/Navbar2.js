import React, { useEffect ,useRef} from "react";
import {  Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";
import "../css/Navbar.css";
import Logo from "../search.svg";
import { useDispatch } from "react-redux";
import { Logout } from "../actions/userData/user";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useState } from "react";
import { SearchUser } from "../axios";
const Navbars = () => {

  const userData = JSON.parse(localStorage.getItem("user"));
  const [searchData, setSearchData] = useState({ search: "" });
  const [username, setUserName] = useState();
  const [visibility, setVisibility] = useState(0);
  const [searchComplateData, setSearchComplateData] = useState([]);
  const [temp, setTemp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutClick = () => {
    dispatch(Logout());
    navigate("/");
  };

  useEffect(()=>{

  },[temp])
  const searchHandler = (e) => {
    setSearchData({ ...searchData, search: e.target.value });
  };
  useEffect(()=>{
   function fonksiyon() {
    if(visibility && localStorage.getItem("search")!=="undefined"){
      var x =(JSON.parse(localStorage.getItem("search")))
      setSearchComplateData(x)
      
    }
   }
   fonksiyon()
  },[visibility])
  useEffect(() => {
    
   
    if (searchData.search.length >= 1) {
      var node =   mySearchLogo.current
      node.classList.remove("rotating")
      SearchUser(searchData)
        .then((res) => {
          setSearchComplateData(res.data.user);
          localStorage.setItem('search',JSON.stringify(res.data.user))
         
          node.classList.remove("rotating")
          node.classList.add("rotating")
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if(!visibility){
        setSearchComplateData([]);
      }
      
    }
  }, [searchData]);
  useEffect(() => {
    if (userData) {
      setUserName(userData.username);
    }

    console.log("navbarrendered");
  }, [userData]);
  const myRef = useRef();
  const mySearchLogo = useRef();
  const searchText = useRef();

  const handleClickOutside = e => {
   
   

    if (e.target !=null &&myRef.current!=null && !myRef.current.contains(e.target) &&searchText.current!=null &&!searchText.current.contains(e.target) && mySearchLogo.current!=null && !mySearchLogo.current.contains(e.target)) {
        setVisibility(false);
        mySearchLogo.current.style.transform = `rotate(0deg)`;
        setTemp(searchData.search)
        setSearchData({ ...searchData, search: ""})
    }
};
useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);

  return () => document.removeEventListener('mousedown', handleClickOutside);
});

  return (
    <div className="ustTaraf">
      <div className="companyName" style={{width:"35vw"}}>
        <NavLink to="/">KSG</NavLink>
      </div>
      <div  className="searchBar" 
      onClick={()=>{
        setVisibility(1)
        if(temp.length>0){
          setSearchData({ ...searchData, search: temp})
          
        }
        mySearchLogo.current.style.transition = `100ms`;
        mySearchLogo.current.style.transform = `rotate(190deg)`;
      }}
      style={{width:"30vw",height:"auto"}}>
        <div className="search"  onFocus={() => {
             
            }}
            >
          <form
            style={{ position: "relative" }}
           
           
          >
            <input
              type="text"
              placeholder=" Ara..."
              name="search"
              onChange={searchHandler}
              autoComplete="off"
              value={searchData.search}
              ref={searchText}
             style={{width:"30vw",
             maxWidth:"400px",paddingRight:"45px"}}
            ></input>
            <img
              style={{
                position: "absolute",
                height: "25px",
                width: "25px",
                left: "25vw",
              }}
              alt="SearchLogo"
              src={Logo}
          
              ref={mySearchLogo}
            />
            
          </form>
          <div >
          {visibility === 1 ? (
        <div
        
          style={{
            zIndex:"99",
            position: "absolute",
            top: "8vh",
            left: "34vw",
            backgroundColor: "black",
            width: "33vw",
            color: "white",
            minHeight: "400px",
            maxHeight: "800px",
            height:"400px",
            borderRadius:"5px",
            
            
          }}
          ref={myRef}
          
        >
          {searchComplateData.map((data, key) => {
            
            return (
            
              <Link key={key} to={"Account/" + data.username} >
                <div style={{ border: "1px solid #1c1c1c" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {data.photo && (
                      <img
                        style={{
                          maxHeight: "64px",
                          maxWidth: "64px",
                          borderRadius: "50%",
                        }}
                        src={require(`../../../server/uploads/${data.photo}`)}
                        alt="ProfilePhoto"
                      ></img>
                    )}
                    <div style={{ display: "block" }}>
                      <div> {data.fullname}</div>@{data.username}
                    </div>
                  </div>
                </div>
              </Link>
            ); 
          })}
        </div>
      ) : null}</div>
        </div>
      </div>
      <div
        style={{
        width:"33vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div>
          {userData && <NavLink  to="/CreateQuestion">Paylaşım Yap</NavLink>}
        </div>
        <div>
          <NavLink to="/Editor">Online Editor</NavLink>
        </div>

        {userData != null && (
          <div>
            {" "}
            <NavLink
              className="text-decoration-none dropMenu"
              to={"/Account/" + username}
            >
              Hesabım
            </NavLink>{" "}
          </div>
        )}
        {!userData && (
          <NavLink className="text-decoration-none" to="/Login">
            <Button  style={{backgroundColor:"#66fcf1",color:"#45a29e"}} >Giriş Yap</Button>
          </NavLink>
        )}
        {userData != null && (
          <Button style={{backgroundColor:"#45a29e",color:"#66fcf1"}} onClick={logoutClick}>
            Çıkış Yap
          </Button>
        )}
      </div>

      
    </div>
  );
};

export default Navbars;
