import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("")

    const {login,signup}=useAuth();
    const navigate=useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();
        setError("")

        try{
            await login(email,password)
            navigate("/home")
        }catch(err){
            setError(err.message)
        }
    };

    const handleSignup=async(e)=>{
        e.preventDefault();
        setError("")

        try{
            await signup(email,password)
            navigate("/home")
        }catch(err){
            setError(err.message)
        }
    };
    return(
        <div style={{padding:"40px"}}>
           <h1>Netflix Login</h1>
           <form>
              <input 
                type="email" 
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />

              <br /><br />

              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />

              <br /><br />

              {error && <p style={{color:"red"}}>{error}</p>}

              <button onClick={handleLogin}>Login</button>
              <br /><br />
              <button onClick={handleSignup}>Sign up</button>
           </form>
        </div>
    )
}

export default Login;