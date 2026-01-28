import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import "./Header.css";

const Header=()=>{
    const navigate=useNavigate();
    const {logout}=useAuth();

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
             <button className="logoutBtn" onClick={logout}>
                Logout
             </button>
          </div>
        </div>
    )
}

export default Header;