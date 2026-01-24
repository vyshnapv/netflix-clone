const API_KEY = "4060f2c9bef06b2b7f6ee977bf6c2a12";

const requests = {
  fetchTrending: `/trending/movie/week?api_key=${API_KEY}`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
};

export default requests;
