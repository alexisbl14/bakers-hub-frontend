import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
            navigate("/dashboard");
        } catch (err) {
            console.log("Login Failed");
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <input value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginPage;