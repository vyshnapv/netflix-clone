// //MovieDetail.jsx
// import { useLocation ,useNavigate} from "react-router-dom";
// import "./MovieDetail.css"
// import { db } from "../firebase/firebase";
// import { doc,setDoc } from "firebase/firestore";
// import { useAuth } from "../context/AuthContext";
// import Header from "../components/Header";

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
//       <>
//        <Header />
//         <div className="movieDetail">
//            <img 
//               src={`${base_url}${movie.backdrop_path}`}
//               alt={movie.title}
//               className="movieDetail__banner"
//             />

//            <div className="movieDetail__content">
//                <h1>{movie.title || movie.name}</h1>
//                <p>{movie.overview}</p>

//                <button className="watchlistBtn"
//                  style={{ margin: "20px", padding: "10px 20px", backgroundColor: "#e50914", color: "white", border: "none", borderRadius: "4px" }}
//                  onClick={() => navigate("/watchlist")}
//                >
//                 ❤️ My Watchlist
//                </button>
//                <button
//                className="watchlistBtn"
//                style={{ marginLeft: "10px", backgroundColor: "#0066ff" }}
//                onClick={() => navigate("/watch", { state: { movie } })}
//             >
//               ▶ Watch Now
//             </button>
//            </div>
//         </div>
//       </>
//     )
// }

// export default MovieDetail;

// //MovieDetail.css
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

// //request.jsx
// const API_KEY = "4060f2c9bef06b2b7f6ee977bf6c2a12";

// const requests = {
//   fetchTrending: `/trending/movie/week?api_key=${API_KEY}`,
//   fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
//   fetchTopRated: `/movie/top_rated?api_key=${API_KEY}`,
//   fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
// };
// export const fetchMovieVideos = (movieId) =>
//   `/movie/${movieId}/videos?api_key=${API_KEY}`;


// export default requests;

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

// //Watchlist.jsx
// import { useEffect,useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { db } from "../firebase/firebase";
// import { collection,getDocs } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import "./Watchlist.css"

// const Watchlist=()=>{
//     const {user}=useAuth();
//     const [movies,setMovies]=useState([])
//     const navigate=useNavigate();

//     useEffect(()=>{
//         const fetchWatchlist=async()=>{
//             if(!user){
//                 return;
//             }

//             try{
//               const watchlistRef=collection(db,"watchlists",user.uid,"movies")
//               const snapshot=await getDocs(watchlistRef)
//               const moviesList=snapshot.docs.map(doc=>doc.data());
//               setMovies(moviesList)
//             }catch(error){
//               console.log("Error fetching watchlist:",error)
//             }
//         }

//         fetchWatchlist();
//     },[user])

//     if(!user){
//         return <h2 className="watchlist__error">Please login to view your watchlist</h2>
//     }
//     return(
//       <> 
//        <Header />
//         <div className="watchlist"> 
//            <h1 className="watchlist__title">Your Watchlist</h1>

//            {movies.length===0?(
//             <p className="watchlist__empty">No movies  added yet.</p>
//            ):(
//             <div className="watchlist__grid">
//                 {movies.map((movie)=>(
//                     <div 
//                       key={movie.id}
//                       className="watchlist__card"
//                       onClick={()=>navigate("/movie",{state:{movie}})}
//                     >
//                       <img 
//                         src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
//                         alt={movie.title || movie.name}
//                       />
//                       <p>{movie.title || movie.name}</p>
//                     </div>
//                 ))}
//             </div>
//            )}
//         </div>
//       </> 
//     )
// }

// export default Watchlist

// //watchlist.css
// .watchlist {
//   padding: 40px;
//   background-color: #111;
//   min-height: 100vh;
//   color: white;
// }

// .watchlist__title {
//   font-size: 2.5rem;
//   margin-bottom: 20px;
// }

// .watchlist__empty {
//   font-size: 1.1rem;
//   opacity: 0.8;
// }

// .watchlist__grid {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   margin-top: 20px;
// }

// .watchlist__card {
//   width: 150px;
//   cursor: pointer;
//   transition: transform 0.3s ease;
// }

// .watchlist__card:hover {
//   transform: scale(1.08);
// }

// .watchlist__card img {
//   width: 100%;
//   border-radius: 6px;
// }

// .watchlist__card p {
//   margin-top: 8px;
//   font-size: 0.9rem;
//   text-align: center;
// }

// .watchlist__error {
//   color: white;
//   padding: 40px;
//   background-color: #111;
// }

// //App.jsx
// import React from "react";
// import { Routes,Route } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Home from "./pages/Home";
// import MovieDetail from "./pages/MovieDetail";
// import Watch from "./pages/Watch";
// import Watchlist from "./pages/Watchlist";

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
//                         <Watch />
//                     </ProtectedRoute>
//                 }/>

//                 <Route path="/watchlist" element={
//                     <ProtectedRoute>
//                         <Watchlist />
//                     </ProtectedRoute>
//                 }/>
                
//             </Routes>
//         </div>
//     )
// }

// export default App;