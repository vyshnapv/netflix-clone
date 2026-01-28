import Row from "../components/Row";
import requests from "../api/requests";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div style={{ paddingTop: "80px" }}>
         <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
         <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} />
         <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
         <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      </div>
    </div>
  );
};

export default Home;
