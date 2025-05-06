import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import axios from "axios";

interface FieldErrors {
    username?: string;
    email?: string;
    password?: string;
}

const RegisterPage = () => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        // Clear the error for this field if it exists
        setFieldErrors((prev) => ({
            ...prev,
            [e.target.name]: undefined,
        }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setFieldErrors({});
        try {
            const res = await API.post("/users/register/", formData);
            if (res.status === 201) {
                navigate("/")
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const data = err.response?.data;

                if (typeof data === "object" && data !== null) {
                    const newFieldErrors: FieldErrors = {};

                    for (const key in data) {
                        if (Array.isArray(data[key])) {
                            newFieldErrors[key as keyof FieldErrors] = data[key][0];
                        }
                    }

                    setFieldErrors(newFieldErrors);
                }
                else {
                    setError("Registration Failed.")
                }
            }
            else {
                setError("An unexpected error occured.")
            }
        }
    }

    return (
        <>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <input
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                {fieldErrors.username && <p style={{ color: "red" }}>{fieldErrors.username}</p>}
                <input
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {fieldErrors.email && <p style={{ color: "red" }}>{fieldErrors.email}</p>}
                <input
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {fieldErrors.password && <p style={{ color: "red" }}>{fieldErrors.password}</p>}
                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default RegisterPage;