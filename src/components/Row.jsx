import { useEffect,useState } from "react";
import axios from "../api/axios";

const Row=({title,fetchUrl})=>{
    const [movies,setMovies]=useState([])

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
                   src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                   alt={movie.name || movie.title}
                   style={{ marginRight: "10px", width: "150px" }}
                />
              ))}
           </div>
        </div>
    )
}

export default Row;