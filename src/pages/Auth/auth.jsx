import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../img/Leonardo_Phoenix_A_stylized_logo_resembling_the_Netflix_logo_b_3-removebg-preview (2).png';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const Login = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const { userName, password } = e.target;
    const user = users.find(
      (u) => u.userName === userName.value && u.password === password.value
    );

    if (user) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userName', userName.value);
      toast.success('Login successful');
      navigate('/');
    } else {
      toast.error('Invalid username or password');
    }
  };

  const Regist = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const { userName, phoneNumber, email, password, confirmPassword } = e.target;

    if (password.value !== confirmPassword.value) {
      toast.error('Passwords do not match');
      return;
    }

    if (users.find((u) => u.userName === userName.value)) {
      toast.error('Username already exists');
      return;
    }

    const newUser = {
      userName: userName.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      password: password.value,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userName', userName.value);
    toast.success('Registration successful');
    navigate('/');
  };

  return (
    <div className="auth-container">
      <ToastContainer autoClose={2000} position="top-right" />
      <div className="logoDiv">
        <img className="logoImg" src={logo} alt="Logo" />
      </div>
      <div className="auth-box">
        <div className="auth-header">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        <div className="auth-form">
          {isLogin ? <LoginForm onSubmit={Login} /> : <RegisterForm onSubmit={Regist} />}
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ onSubmit }) => (
  <div className="form-container">
    <form onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        style={{ marginTop: '15px' }}
        type="text"
        placeholder="Name"
        name="userName"
        className="auth-input"
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="auth-input"
      />
      <br />
      <br />
      <button style={{ marginRight: '20px' }} type="submit" className="auth-button">
        Log in
      </button>
      <a href="https://www.wikihow.com/Remember-a-Forgotten-Password" className="auth-link">
        Forgot password?
      </a>
    </form>
  </div>
);

const RegisterForm = ({ onSubmit }) => (
  <div className="form-container">
    <form onSubmit={onSubmit}>
      <h2>Register</h2>
      <input
        style={{ marginTop: '15px' }}
        type="text"
        placeholder="Name"
        name="userName"
        className="auth-input"
      />
      <input
        type="number"
        placeholder="Phone"
        name="phoneNumber"
        className="auth-input"
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="auth-input"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="auth-input"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        className="auth-input"
      />
      <br />
      <button type="submit" className="auth-button">
        Sign up
      </button>
    </form>
  </div>
);

export default Auth;
