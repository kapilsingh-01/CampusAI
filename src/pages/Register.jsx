import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthCard from "../components/AuthCard";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";

import { registerUser as firebaseRegister } from "../services/authService";
function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleRegister() {

    if (!name || !email || !password || !confirmPassword) {
        alert("Please fill all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {

        const user = await firebaseRegister(
    name,
    email,
    password
);
       

        alert("Registration Successful!");

        navigate("/dashboard");

    } catch (error) {

        alert(error.message);

    }

}

    return (

        <AuthCard
            title="Create Account"
            subtitle="Join CampusAI Today"
        >

            <AuthInput
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />

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

            <AuthInput
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
            />

           <AuthButton
    text="Register"
    onClick={handleRegister}
/>

            <p className="auth-link">

                Already have an account?

                <Link to="/login">

                    Login

                </Link>

            </p>

        </AuthCard>

    );

}

export default Register;