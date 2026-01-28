import { useEffect, useState } from "react";
import axios from "../api/axios";
import requests from "../api/requests";
import { useNavigate } from "react-router-dom";
import "./Banner.css";

const base_url = "https://image.tmdb.org/t/p/original";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      const randomMovie =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ];
      setMovie(randomMovie);
    }
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button
            className="banner__button"
            onClick={() => navigate("/watch", { state: { movie } })}
          >
            ▶ Play
          </button>

          <button
            className="banner__button"
            onClick={() => navigate("/movie", { state: { movie } })}
          >
            More Info
          </button>
        </div>

        <p className="banner__description">
          {movie?.overview?.length > 150
            ? movie.overview.substring(0, 150) + "..."
            : movie?.overview}
        </p>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
