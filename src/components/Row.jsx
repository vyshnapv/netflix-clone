import { useEffect,useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

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
        <div style={{marginBottom:"20px"}}>
           <h2>{title}</h2>
           
           <div style={{display:"flex",overflowX:"scroll"}}>
              {movies.map((movie)=>(
                <img 
                   key={movie.id}
                   className="row_poster"
                   src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                   alt={movie.name || movie.title}
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