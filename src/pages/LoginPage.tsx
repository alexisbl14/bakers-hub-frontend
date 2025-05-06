import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";


const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await API.post("/users/login/", {username, password});
            localStorage.setItem("token", res.data.token);
            console.log("Token stored, navigating...");
            navigate("/dashboard", { replace: true });
        } catch (err) {
            console.log("Login Failed");
        }
    }

    return (
        <>
            <h1>Welcome to Baker's Hub!</h1>
            <p>Please sign in before continuing.</p>
            <form onSubmit={handleLogin}>
                <input value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Sign Up!</Link></p>
        </>
    )
}

export default LoginPage;