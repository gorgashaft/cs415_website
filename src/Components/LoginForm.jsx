import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

const LoginForm = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null)
        let success = true
        let errorText = ''
        const payload = JSON.stringify({
            email: email,
            password: pass
        })
        // try {
            fetch('http://localhost:8000/login/', {
                method: 'POST',
                body: payload,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                return res.json();
            }).then(data => {
                console.log(data);
                if (data.success) {
                    window.sessionStorage.setItem("auth", true)
                    window.sessionStorage.setItem("user_id", data.user_id)
                    window.sessionStorage.setItem("token", data.token)
                    navigate('/userprofile')
                }
                else {
                    setError(data.error);
                }
            });
            
            // } catch (error) {
            //     console.error(error);
            //     setError('Error Registering - Check your information and try again')
            // }
        }
    return (
        <div >
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@email.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input required value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                <button type="submit">Submit</button>
                <p className="text-success"><b>{error}</b></p>
            </form>
            <button className="link-btn" onClick={() => navigate('/register')}>Don't have an account? Register here.</button>
        </div>
    );
};

export default LoginForm;


