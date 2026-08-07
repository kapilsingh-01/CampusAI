import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import AuthCard from "../components/AuthCard";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    async function handleLogin() {

    if (!email || !password) {

        alert("Please fill all fields.");

        return;

    }

    try {

        const user = await loginUser(
            email,
            password
        );


        alert("Login Successful!");

        navigate("/dashboard");

    } catch (error) {

      console.error(error);
         alert(error.code + "\n" + error.message);

    }

}

    return (

        <AuthCard

            title="Welcome Back"

            subtitle="Login to CampusAI"

        >

            <AuthInput

                type="email"

                placeholder="Email"

                value={email}

                onChange={(e)=>setEmail(e.target.value)}

            />

            <AuthInput

                type="password"

                placeholder="Password"

                value={password}

                onChange={(e)=>setPassword(e.target.value)}

            />

            <AuthButton
    text="Login"
    onClick={handleLogin}
/>

            <p className="auth-link">

                New User?

                <Link to="/register">

                    Register

                </Link>

            </p>

            <p className="auth-link">

                <Link to="/forgot-password">

                    Forgot Password?

                </Link>

            </p>

        </AuthCard>

    );

}

export default Login;