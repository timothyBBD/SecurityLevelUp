import React, { useState } from 'react';

import './loginModal.scss';

import { loginController } from '../../controllers'
import { validation } from '../../services'



export default function LoginModal(props) {
    const [loginSelected, setLoginSelected] = useState(true);
    const [invalidUser, setInvalidUser] = useState(false);
    const [passwordCritera, setPasswordCriteria] = useState({})
    const closeModal = props.closeModal

    async function validatePasswordRequirements(event) {
        const password = event.target.value;
        const passwordCriteria = validation.passwordCreation(password);
        await setPasswordCriteria(passwordCriteria);
    }

    function LoginForm() {
        function handleForgotPassword() {
            alert('Too bad');
        }

        async function handleLogin(event) {
            event.preventDefault();
            const username = event.target[0].value;
            const password = event.target[1].value;
            const result = await loginController.login(username, password)
            if (result) {
                closeModal();
            }
            else {
                setInvalidUser(true);
            }
        }
        return (
            <form onSubmit={handleLogin} className="login-container">
                <label>Please enter your details</label>
                <input name="username" type="text" id="username" placeholder="Username" />
                <input name="password" type="password" id="password" placeholder="Password" />
                <p className="password-reset-text" onClick={handleForgotPassword}>Forgot your password</p>
                <br />
                <p className={`login-failed-text ${invalidUser ? 'visible' : ''}`}>Invalid Login Details</p>
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

            const passwordCriteria = validation.passwordCreation(password);
            if (!passwordCriteria.hasUpperCase || !passwordCriteria.hasLowerCase || !passwordCriteria.hasNumber || !passwordCriteria.hasSpecialChar || !passwordCriteria.hasEightChars) {
                alert('password Criteria not met');
                return;
            }

            const result = await loginController.register(username, email, password);
            if (result) {
                closeModal();
            }
            else {
                setInvalidUser(true);
            }
        }
        return (
            <form onSubmit={handleRegister} className="login-container">
                <input name="username" type="text" id="username" placeholder="Username" />
                <input name="email" type="text" id="email" placeholder="Email Address" />
                <input name="password" type="password" id="password" placeholder="Password" onChange={validatePasswordRequirements} />

                <input name="confirmPassword" type="password" id="confirmPassword" placeholder="Confirm Password" />
                <section className="password-requirement-container">
                    <h6>Password Requirements</h6>
                    <ul>
                        <li className={passwordCritera.hasUpperCase ? 'criteria-met' : ''}>Must contain upper case letter</li>
                        <li className={passwordCritera.hasLowerCase ? 'criteria-met' : ''}>Must contain lower case letter</li>
                        <li className={passwordCritera.hasNumber ? 'criteria-met' : ''}>Must contain number</li>
                        <li className={passwordCritera.hasSpecialChar ? 'criteria-met' : ''}>Must contain special character</li>
                        <li className={passwordCritera.hasEightChars ? 'criteria-met' : ''}>Must contain at least 8 characters</li>
                    </ul>
                </section>
                <br />
                <button type="submit">Register</button>
            </form>
        )
    }

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