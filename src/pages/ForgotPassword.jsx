import { useState } from "react";
import { Link } from "react-router-dom";

import AuthCard from "../components/AuthCard";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    function checkEmail() {

        if (!email) {

            alert("Please enter your email.");

            return;

        }

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            (item) => item.email === email
        );

        if (!user) {

            alert("No account found with this email.");

            return;

        }

        alert(
            "Email found!\n\nWhen we connect Firebase, a password reset email will be sent."
        );

    }

    return (

        <AuthCard
            title="Forgot Password"
            subtitle="Recover your CampusAI account"
        >

            <AuthInput
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <AuthButton
                text="Continue"
                onClick={checkEmail}
            />

            <p className="auth-link">

                <Link to="/login">

                    Back to Login

                </Link>

            </p>

        </AuthCard>

    );

}

export default ForgotPassword;