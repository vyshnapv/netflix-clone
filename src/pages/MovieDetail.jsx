import { useLocation ,useNavigate} from "react-router-dom";
import "./MovieDetail.css"
import { db } from "../firebase/firebase";
import { doc,setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const base_url="https://image.tmdb.org/t/p/original/";

const MovieDetail=()=>{
    const {state}=useLocation();
    const movie=state?.movie;
    const {user}=useAuth()
    const navigate = useNavigate();

    const addToWatchlist=async()=>{
        if(!user){
            alert("please login first")
            return;
        }

        await setDoc(
            doc(db,"watchlists",user.uid,"movies",movie.id.toString()),
            movie
        )
        alert ("Added to watchList")
    }

    if(!movie){
        return <h2>Movie Not Found</h2>
    }
    return(
        <div className="movieDetail">
           <img 
              src={`${base_url}${movie.backdrop_path}`}
              alt={movie.title}
              className="movieDetail__banner"
            />

           <div className="movieDetail__content">
               <h1>{movie.title || movie.name}</h1>
               <p>{movie.overview}</p>

               <button className="watchlistBtn"
                 style={{ margin: "20px", padding: "10px 20px", backgroundColor: "#e50914", color: "white", border: "none", borderRadius: "4px" }}
                 onClick={() => navigate("/watchlist")}
               >
                ❤️ My Watchlist
               </button>
               <button
               className="watchlistBtn"
               style={{ marginLeft: "10px", backgroundColor: "#0066ff" }}
               onClick={() => navigate("/watch", { state: { movie } })}
            >
              ▶ Watch Now
            </button>
           </div>
        </div>
    )
}

export default MovieDetail;