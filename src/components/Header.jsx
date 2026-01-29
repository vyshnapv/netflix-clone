import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import { useState } from "react";
import "./Header.css";

const Header=()=>{
    const navigate=useNavigate();
    const {logout,user}=useAuth();
    const [open,setOpen]=useState(false)

     const firstLetter =
      user?.displayName?.charAt(0).toUpperCase() ||
      user?.email?.charAt(0).toUpperCase();

    return(
        <div className="header">
          <img 
             className="header__logo"
             src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
             alt="Netflix" 
             onClick={()=>navigate("/home")}
          />

          <div className="header__actions">
             <button onClick={()=>navigate("/watchlist")}>
                My WatchList
             </button>

             <div className="profile">
              <div
                className="profile__avatar"
                onClick={() => setOpen(!open)}
              >
                {firstLetter}
              </div>

            {open && (
            <div className="profile__dropdown">
              <button onClick={logout}>Logout</button>
            </div>
          )}
          </div>
         </div>
        </div>
    )
}

export default Header;