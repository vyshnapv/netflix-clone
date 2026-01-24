import React from "react";
import { Routes,Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Watch from "./pages/Watch";

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
                <Route path="/movie" element={<MovieDetail/>}/>
                <Route path="/watch" element={
                    <ProtectedRoute>
                        <Watch />
                    </ProtectedRoute>
                }/>
                
            </Routes>
        </div>
    )
}

export default App;