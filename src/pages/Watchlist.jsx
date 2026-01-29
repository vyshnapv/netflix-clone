import { useEffect,useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { collection,getDocs,deleteDoc,doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./Watchlist.css"

const Watchlist=()=>{
    const {user}=useAuth();
    const [movies,setMovies]=useState([])
    const navigate=useNavigate();

    useEffect(()=>{
        const fetchWatchlist=async()=>{
            if(!user){
                return;
            }

            try{
              const watchlistRef=collection(db,"watchlists",user.uid,"movies")
              const snapshot=await getDocs(watchlistRef)
              const moviesList=snapshot.docs.map(doc=>doc.data());
              setMovies(moviesList)
            }catch(error){
              console.log("Error fetching watchlist:",error)
            }
        }

        fetchWatchlist();
    },[user])

    const removeFromWatchlist=async(movieId)=>{
      if(!user){
        return;
      }

      await deleteDoc(
        doc(db,"watchlists",user.uid,"movies",movieId.toString())
      );

      setMovies((prev)=>prev.filter((m)=>m.id !==movieId))
    }

    if(!user){
        return <h2 className="watchlist__error">Please login to view your watchlist</h2>
    }
    return(
      <> 
       <Header />
        <div className="watchlist" style={{ paddingTop: "80px" }}> 
           <h1 className="watchlist__title">My Watchlist</h1>

           {movies.length===0?(
            <p className="watchlist__empty">No movies  added yet.</p>
           ):(
            <div className="watchlist__grid">
                {movies.map((movie)=>(
                    <div 
                      key={movie.id}
                      className="watchlist__card">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title || movie.name}
                        onClick={() =>
                          navigate("/movie", { state: { movie } })
                        }
                      />
                      <p>{movie.title || movie.name}</p>

                      <button
                        className="watchlist__removeBtn"
                        onClick={() => removeFromWatchlist(movie.id)}
                      >
                       ❌ Remove
                      </button>
                    </div>
                ))}
            </div>
           )}
        </div>
      </> 
    )
}

export default Watchlist