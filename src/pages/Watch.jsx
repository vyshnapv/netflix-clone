import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { fetchMovieVideos } from "../api/requests";
import "./Watch.css";

const Watch = () => {
  const { state } = useLocation();
  const movie = state?.movie;
  const [videoKey, setVideoKey] = useState("");

  useEffect(() => {
    const fetchTrailer = async () => {
      if (!movie) return;

      try {
        const response = await axios.get(fetchMovieVideos(movie.id));

        const trailer = response.data.results.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );

        if (trailer) {
          setVideoKey(trailer.key);
        }
      } catch (error) {
        console.log("Trailer fetch error:", error);
      }
    };

    fetchTrailer();
  }, [movie]);

  if (!movie) return <h2>Movie not found</h2>;

  return (
    <div className="watchPage">
      <h1>Watching: {movie.title || movie.name}</h1>

      {videoKey ? (
        <div className="videoContainer">
          <iframe
            title="Movie Trailer"
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>Trailer not available</p>
      )}
    </div>
  );
};

export default Watch;
