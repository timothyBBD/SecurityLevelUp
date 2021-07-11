import React, { useState } from 'react';

import './loginModal.scss';

import { loginController } from '../../controllers'

function LoginForm() {
    function handleForgotPassword() {
        alert('Too bad');
    }

    async function handleLogin(event) {
        event.preventDefault();
        const username = event.target[0].value;
        const password = event.target[1].value;
        const result = await loginController.login(username, password)
    }
    return (
        <form onSubmit={handleLogin} className="login-container">
            <label>Please enter your details</label>
            <input name="username" type="text" id="username" placeholder="Username" />
            <input name="password" type="password" id="password" placeholder="Password" />
            <p className="password-reset-text" onClick={handleForgotPassword}>Forgot your password</p>
            <br/>
            <p className='login-failed-text'>Invalid Login Details</p>
            <button type="submit">Login</button>
        </form>
    )
}

function RegisterForm() {
    async function handleRegister(event) {
        event.preventDefault();
        const username = event.target[0].value;
        const email = event.target[1].value
        const password = event.target[2].value;
        const confirmPassword = event.target[3].value;

        if (password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        const result = await loginController.register(username, email, password);
    }
    return (
        <form onSubmit={handleRegister} className="login-container">
            <input name="username" type="text" id="username" placeholder="Username" />
            <input name="email" type="text" id="email" placeholder="Email Address" />
            <input name="password" type="password" id="password" placeholder="Password" />
            <input name="confirmPassword" type="password" id="confirmPassword" placeholder="Confirm Password" />
            <br />
            
            <button type="submit">Register</button>
        </form>
    )
}

export default function LoginModal() {
    const [loginSelected, setLoginSelected] = useState(true)

    function changeRegister() {
        setLoginSelected(false);
    }

    function changeLogin() {
        setLoginSelected(true);
    }

    return (
        <div className="login-modal">
            <div className="modal-content">
                <nav>
                    <ul className="login-tab">
                        <li className={loginSelected ? 'selected' : ''} onClick={changeLogin}>Login</li>
                        <li className={!loginSelected ? 'selected' : ''} onClick={changeRegister}>Register</li>
                    </ul>
                </nav>
                {
                    loginSelected ? LoginForm() : RegisterForm()
                }
            </div>
        </div>
    )
}