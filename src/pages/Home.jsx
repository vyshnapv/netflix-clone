import Row from "../components/Row";
import requests from "../api/requests";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={logout}>Logout</button>

      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
    </div>
  );
};

export default Home;
