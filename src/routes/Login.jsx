import { useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // useAuthState checks from the firebase auth if the user is logged in or not
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const login = () => {
        loginWithEmailAndPassword(email, password);
    }

    // If the user is logged in, redirect to the events page
    useEffect(() => {
        if (loading) return;
        if (user) navigate('/events');
    }, [user, loading]);

    return (
        <div className="logIn">
            <h1>Login</h1>
            <input
                type="text"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)} />
            <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={login}>Login</Button>
        </div>
    )
}

export default Login