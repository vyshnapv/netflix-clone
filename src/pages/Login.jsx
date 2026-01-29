import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"

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
         <div className="login">
      <div className="login__card">
        <h1>Sign In</h1>

        <form>
          <input
            type="email"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="login__error">{error}</p>}

          <button onClick={handleLogin}>Sign In</button>
          <button onClick={handleSignup}>Sign Up</button>
        </form>

        <div className="login__signup">
          New to Netflix? <span onClick={handleSignup}>Sign up now</span>
        </div>
      </div>
    </div>
    )
}

export default Login;