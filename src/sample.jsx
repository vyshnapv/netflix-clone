// //axios.js
// import axios from "axios";

// const instance=axios.create({
//     baseURL:"https://api.themoviedb.org/3"
// })
// // 
// export default instance;

// //requests.js
// const API_KEY = "4060f2c9bef06b2b7f6ee977bf6c2a12";

// const requests = {
//   fetchTrending: `/trending/movie/week?api_key=${API_KEY}`,
//   fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
//   fetchTopRated: `/movie/top_rated?api_key=${API_KEY}`,
//   fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
// };

// export default requests;

// //protectedroute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute=({children})=>{
//     const {user}=useAuth();
//     if(!user){
//         return <Navigate to="/"/>
//     }
//     return children;
// }

// export default ProtectedRoute;

// //row.jsx
// import { useEffect,useState } from "react";
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";

// const Row=({title,fetchUrl})=>{
//     const [movies,setMovies]=useState([])
//     const navigate=useNavigate()

//     useEffect(()=>{
//         async function fetchData(){
//             const response=await axios.get(fetchUrl)
//             setMovies(response.data.results);
//         }
//         fetchData();
//     },[fetchUrl])

//     return(
//         <div style={{marginBottom:"20px"}}>
//            <h2>{title}</h2>
           
//            <div style={{display:"flex",overflowX:"scroll"}}>
//               {movies.map((movie)=>(
//                 <img 
//                    key={movie.id}
//                    className="row_poster"
//                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
//                    alt={movie.name || movie.title}
//                    onClick={() =>
//                         navigate("/movie", { state: { movie } })
//                   }
//                 />
//               ))}
//            </div>
//         </div>
//     )
// }

// export default Row;

// //AuthContext.jsx
// import {createContext,useContext,useEffect,useState } from "react";
// import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signOut,
//     onAuthStateChanged,
// } from "firebase/auth"
// import { auth } from "../firebase/firebase";

// const AuthContext=createContext();

// export const AuthProvider=({children})=>{
//     const [user,setUser]=useState(null);
//     const [loading,setLoading]=useState(true)

//     const signup=(email,password)=>{
//         return createUserWithEmailAndPassword(auth,email,password)
//     }

//     const login=(email,password)=>{
//         return signInWithEmailAndPassword(auth,email,password)
//     }

//     const logout=()=>{
//         return signOut(auth)
//     }

//     useEffect(()=>{
//         const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
//             setUser(currentUser)
//             setLoading(false)
//         })

//         return unsubscribe
//     },[])

//     return(
//         <AuthContext.Provider value={{user,signup,login,logout}}>
//             {!loading && children}
//         </AuthContext.Provider>
//     )
// }

// export const useAuth=()=>{
//     return useContext(AuthContext)
// }

// //firebase.js

// import { initializeApp } from "firebase/app";//it connect our app to firebase
// import { getAuth } from "firebase/auth";//it enable login and sighnup
// import { getFirestore } from "firebase/firestore";//it enable watchlist data

// const firebaseConfig = {
//   apiKey: "AIzaSyAfxJAfPlgL-I2R1i6OHVU5IudxOBH6Knk",
//   authDomain: "netflix-clone-75a07.firebaseapp.com",
//   projectId: "netflix-clone-75a07",
//   storageBucket: "netflix-clone-75a07.firebasestorage.app",
//   messagingSenderId: "548926390297",
//   appId: "1:548926390297:web:8bb36487d870fe6c5faa88"
// };


// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);

// //Home.jsx
// import Row from "../components/Row";
// import requests from "../api/requests";
// import { useAuth } from "../context/AuthContext";

// const Home = () => {
//   const { logout } = useAuth();

//   return (
//     <div>
//       <button onClick={logout}>Logout</button>

//       <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
//       <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} />
//       <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
//       <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
//     </div>
//   );
// };

// export default Home;

// //login.jsx
// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login=()=>{
//     const [email,setEmail]=useState("");
//     const [password,setPassword]=useState("");
//     const [error,setError]=useState("")

//     const {login,signup}=useAuth();
//     const navigate=useNavigate();

//     const handleLogin=async(e)=>{
//         e.preventDefault();
//         setError("")

//         try{
//             await login(email,password)
//             navigate("/home")
//         }catch(err){
//             setError(err.message)
//         }
//     };

//     const handleSignup=async(e)=>{
//         e.preventDefault();
//         setError("")

//         try{
//             await signup(email,password)
//             navigate("/home")
//         }catch(err){
//             setError(err.message)
//         }
//     };
//     return(
//         <div style={{padding:"40px"}}>
//            <h1>Netflix Login</h1>
//            <form>
//               <input 
//                 type="email" 
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e)=>setEmail(e.target.value)}
//               />

//               <br /><br />

//               <input 
//                 type="password" 
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e)=>setPassword(e.target.value)}
//               />

//               <br /><br />

//               {error && <p style={{color:"red"}}>{error}</p>}

//               <button onClick={handleLogin}>Login</button>
//               <br /><br />
//               <button onClick={handleSignup}>Sign up</button>
//            </form>
//         </div>
//     )
// }

// export default Login;

// //Moviedetail.css
// .movieDetail {
//   min-height: 100vh;
//   background-color: #111;
//   color: white;
// }

// .movieDetail__banner {
//   width: 100%;
//   height: 70vh;
//   object-fit: cover;
//   opacity: 0.6;
// }

// .movieDetail__content {
//   padding: 40px;
//   margin-top: -200px;
//   position: relative;
//   z-index: 1;
// }

// .movieDetail__content h1 {
//   font-size: 3rem;
//   margin-bottom: 20px;
// }

// .movieDetail__content p {
//   max-width: 600px;
//   line-height: 1.6;
//   font-size: 1rem;
// }

// .watchlistBtn {
//   margin-top: 20px;
//   padding: 10px 20px;
//   background-color: #e50914;
//   border: none;
//   color: white;
//   font-size: 1rem;
//   cursor: pointer;
//   border-radius: 4px;
// }

// .watchlistBtn:hover {
//   background-color: #f40612;
// }

// //MovieDetail.jsx
// import { useLocation } from "react-router-dom";
// import "./MovieDetail.css"
// import { db } from "../firebase/firebase";
// import { doc,setDoc } from "firebase/firestore";
// import { useAuth } from "../context/AuthContext";

// const base_url="https://image.tmdb.org/t/p/original/";

// const MovieDetail=()=>{
//     const {state}=useLocation();
//     const movie=state?.movie;
//     const {user}=useAuth()

//     const addToWatchlist=async()=>{
//         if(!user){
//             alert("please login first")
//             return;
//         }

//         await setDoc(
//             doc(db,"watchlists",user.uid,"movies",movie.id.toString()),
//             movie
//         )
//         alert ("Added to watchList")
//     }

//     if(!movie){
//         return <h2>Movie Not Found</h2>
//     }
//     return(
//         <div className="movieDetail">
//            <img 
//               src={`${base_url}${movie.backdrop_path}`}
//               alt={movie.title}
//               className="movieDetail__banner"
//             />

//            <div className="movieDetail__content">
//                <h1>{movie.title || movie.name}</h1>
//                <p>{movie.overview}</p>

//                <button className="watchlistBtn" onClick={addToWatchlist}>❤️ Add to Watchlist</button>
//            </div>
//         </div>
//     )
// }

// export default MovieDetail;

// //App.jsx
// import React from "react";
// import { Routes,Route } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Home from "./pages/Home";
// import MovieDetail from "./pages/MovieDetail";

// const App=()=>{
//     const {user}=useAuth()
//     return(
//         <div>
//             <Routes>
//                 <Route path="/" element={<Login/>}/>
//                 <Route 
//                    path="/home" 
//                    element={
//                      <ProtectedRoute>
//                           <Home/>
//                      </ProtectedRoute>}
//                  />
//                 <Route path="/movie" element={<MovieDetail/>}/>
//                 {/* <Route path="/movie/:id" element={<h1>Movie Details</h1>}/>
//                 <Route path="/watch/:id" element={<h1>Watch page</h1>}/>
//                 <Route path="/watchlist" element={<h1>WatchList page</h1>}/> */}
//             </Routes>
//         </div>
//     )
// }

// export default App;

// //main.jsx
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from './context/AuthContext.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//        <AuthProvider>
//            <App />
//        </AuthProvider>
//     </BrowserRouter>
//   </StrictMode>,
// )

//Watch.jsx
// import { useLocation } from "react-router-dom";
// import "./Watch.css";

// const Watch=()=>{
//     const {state}=useLocation();
//     const movie=state?.movie;

//     if(!movie){
//         return <h2>Movie not Found</h2>
//     }

//     return(
//         <div className="watchPage">
//            <h1>Watching: {movie.title || movie.name}</h1>
//            <div className="videoContainer">
//               <iframe
//                  title={movie.title}
//                  width="100%"
//                  height="500px"
//                  src={`https://www.youtube.com/embed/${movie?.videoKey || ""}`}
//                  frameBorder="0"
//                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                  allowFullScreen
//               ></iframe>
//            </div>
//         </div>
//     )
// }

// export default Watch;

// //Watch.css
// .watchPage {
//   padding: 40px;
//   background-color: #111;
//   color: white;
//   min-height: 100vh;
// }

// .videoContainer {
//   margin-top: 20px;
//   display: flex;
//   justify-content: center;
// }

// //MovieDetail.jsx
// import { useLocation ,useNavigate} from "react-router-dom";
// import "./MovieDetail.css"
// import { db } from "../firebase/firebase";
// import { doc,setDoc } from "firebase/firestore";
// import { useAuth } from "../context/AuthContext";

// const base_url="https://image.tmdb.org/t/p/original/";

// const MovieDetail=()=>{
//     const {state}=useLocation();
//     const movie=state?.movie;
//     const {user}=useAuth()
//     const navigate = useNavigate();

//     const addToWatchlist=async()=>{
//         if(!user){
//             alert("please login first")
//             return;
//         }

//         await setDoc(
//             doc(db,"watchlists",user.uid,"movies",movie.id.toString()),
//             movie
//         )
//         alert ("Added to watchList")
//     }

//     if(!movie){
//         return <h2>Movie Not Found</h2>
//     }
//     return(
//         <div className="movieDetail">
//            <img 
//               src={`${base_url}${movie.backdrop_path}`}
//               alt={movie.title}
//               className="movieDetail__banner"
//             />

//            <div className="movieDetail__content">
//                <h1>{movie.title || movie.name}</h1>
//                <p>{movie.overview}</p>

//                <button className="watchlistBtn" onClick={addToWatchlist}>❤️ Add to Watchlist</button>
//                <button
//                className="watchlistBtn"
//                style={{ marginLeft: "10px", backgroundColor: "#0066ff" }}
//                onClick={() => navigate("/watch", { state: { movie } })}
//             >
//               ▶ Watch Now
//             </button>
//            </div>
//         </div>
//     )
// }

// export default MovieDetail;

// //App.jsx
// import React from "react";
// import { Routes,Route } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Home from "./pages/Home";
// import MovieDetail from "./pages/MovieDetail";

// const App=()=>{
//     const {user}=useAuth()
//     return(
//         <div>
//             <Routes>
//                 <Route path="/" element={<Login/>}/>
//                 <Route 
//                    path="/home" 
//                    element={
//                      <ProtectedRoute>
//                           <Home/>
//                      </ProtectedRoute>}
//                  />
//                 <Route path="/movie" element={<MovieDetail/>}/>
//                 <Route path="/watch" element={
//                     <ProtectedRoute>
//                         <MovieDetail/>
//                     </ProtectedRoute>
//                 }/>
                
//             </Routes>
//         </div>
//     )
// }

// export default App;