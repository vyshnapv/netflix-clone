import { useEffect,useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Row.css";

const base_url="https://image.tmdb.org/t/p/w300";

const Row=({title,fetchUrl})=>{
    const [movies,setMovies]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        async function fetchData(){
            const response=await axios.get(fetchUrl)
            setMovies(response.data.results);
        }
        fetchData();
    },[fetchUrl])

    return(
        <div className="row">
           <h2>{title}</h2>
           
           <div className="row__posters">
              {movies.map((movie)=>
                movie.poster_path && (
                <img 
                   key={movie.id}
                   className="row__poster"
                   src={`${base_url}${movie.poster_path}`}
                   alt={movie.title || movie.name}
                   onClick={() =>
                        navigate("/movie", { state: { movie } })
                  }
                />
              ))}
           </div>
        </div>
    )
}

export default Row;