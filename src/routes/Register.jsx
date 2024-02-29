import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '../auth/firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    // useAuthState checks from the firebase auth if the user is logged in or not
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if (!name)
            alert('Please enter your name');
        registerWithEmailAndPassword(name, email, password);
    }

    // If the user is logged in, redirect to the events page
    useEffect(() => {
        if (loading) return;
        if (user) navigate('/events');
    }, [user, loading]);

    return (
        <div className='register'>
            <h1>Register</h1>
            <input
                type="text"
                value={name}
                placeholder="Full name"
                onChange={(e) => setName(e.target.value)} />
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
            <Button onClick={register}>Register</Button>
        </div>
    )
}

export default Register;