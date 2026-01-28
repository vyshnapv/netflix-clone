import Row from "../components/Row";
import requests from "../api/requests";
import Header from "../components/Header";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner/>
      <div style={{ paddingTop: "80px" ,background:"black"}}>
         <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
         <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} />
         <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
         <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      </div>
    </div>
  );
};

export default Home;
