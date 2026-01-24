import React from "react";
import { Routes,Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

const App=()=>{
    const {user}=useAuth()
    return(
        <div>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route 
                   path="/home" 
                   element={
                     <ProtectedRoute>
                          <Home/>
                     </ProtectedRoute>}
                 />
                {/* <Route path="/movie/:id" element={<h1>Movie Details</h1>}/>
                <Route path="/watch/:id" element={<h1>Watch page</h1>}/>
                <Route path="/watchlist" element={<h1>WatchList page</h1>}/> */}
            </Routes>
        </div>
    )
}

export default App;