import React, {useState} from "react";
import { useNavigate } from "react-router-dom"

export const RegisterForm = (props) => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null)
        let success = true
        let errorText = ''

        // Get current date in YYYY-MM-DD format
        const currentDate = new Date().toISOString().split('T')[0];
        const payload = JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            username: username,
            email: email,
            password: pass,
            date_created: currentDate // Add the date_created field
        })
        try {
            fetch('http://localhost:8000/users/',{
            method: 'POST',
            body: payload,
            headers:{
                'Content-Type': 'application/json'
                }
            }).then(res => {
                    console.log(res)
                    if (!res.ok){
                        errorText = "Error: " + res.status + ' - '
                        success = false
                        return res.json()
                    }
                    else {
                        success = true
                        return res.json()
                    }
                 }
              ).then(data => {
                if (!success) {
                    for (const err in data.errors){
                    for (const msg in data.errors[err]) errorText += data.errors[err][msg]
                    }
                    console.log(errorText)
                    setError(errorText)
                }

            })
            .catch(error => {
                success = false
                console.error(error)
            });
            if (success) {
                setFirstName('')
                setLastName('')
                setUsername('')
                setEmail('')
                setPass('')
                setError('Registered Successfully!')
            }
            else{
                setError(errorText)
            }
        } catch (error) {
            console.error(error);
            setError('Error Registering - Check your information and try again')
        }

    }

    return (
        <div >
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" id="firstName" name="firstName"/>
                
                <label htmlFor="lastName">Last Name</label>
                <input required value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" id="lastName" name="lastName"/>

                <label htmlFor="username">User Name</label>
                <input required value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="User Name" id="username" name="username"/>

                <label htmlFor="email">Email</label>
                <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@email.com" id="email" name="email"/>
                
                <label htmlFor="password">Password</label>
                <input required value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password"/>
                
                <button type="submit">Register</button>
                
                <p className="text-success"><b>{error}</b></p>
            </form>

            <button className="link-btn" onClick={() => navigate('/login')}>Already have an account? Login here.</button>

        </div>
    )
}

export default RegisterForm;