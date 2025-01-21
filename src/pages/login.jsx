import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './home.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../img/Leonardo_Phoenix_A_stylized_logo_resembling_the_Netflix_logo_b_3-removebg-preview (2).png'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  async function Login(e) {
    e.preventDefault();
    try {
        const { data } = await axios.post("http://135.181.152.249:8072/Account/login", {
            'userName': e.target.userName.value,
            'password': e.target.password.value
        });
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userName', e.target.userName.value);
        navigate("/");
    } catch (error) {
        toast.error('Registration failed');
    }
}

  async function Regist(e) {  
    e.preventDefault();
    try {
      const { data } = await axios.post('http://135.181.152.249:8072/Account/register', {
        'userName': e.target.userName.value,
        'phoneNumber': e.target.phoneNumber.value,
        'email': e.target.email.value,
        'password': e.target.password.value,
        'confirmPassword': e.target.confirmPassword.value
      });
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userName', e.target.userName.value);
      navigate("/");
    } catch (error) {
      toast.error('Registration failed');
      console.log(error);
    }
  }

  const showToast = (message, type) => {
    alert(message);
  };

  return (
    <div className="auth-container">
      <ToastContainer autoClose={2000} position="top-right" />
      <div className='logoDiv'>
        <img className='logoImg' src={logo}/>
      </div>
      <div className="auth-box">
        <div className="auth-header">
          <button className={`auth-tab ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button className={`auth-tab ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>
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
      <input style={{ marginTop: '15px' }} type="text" placeholder="Name" name="userName" className="auth-input" /><br />
      <input type="password" placeholder="Password" name="password" className="auth-input" /><br /><br />
      <button style={{marginRight: '20px'}} type="submit" className="auth-button">Log in</button>
      <a href="https://www.wikihow.com/Remember-a-Forgotten-Password" className="auth-link">Forgot password?</a>
    </form>
  </div>
);

const RegisterForm = ({ onSubmit }) => (
  <div className="form-container">
    <form onSubmit={onSubmit}>
      <h2>Register</h2>
      <input style={{ marginTop: '15px' }} type="text" placeholder="Name" name="userName" className="auth-input" />
      <input type="number" placeholder="Phone" name="phoneNumber" className="auth-input" />
      <input type="email" placeholder="Email" name="email" className="auth-input" />
      <input type="password" placeholder="Password" name="password" className="auth-input" />
      <input type="password" placeholder="Confirm Password" name="confirmPassword" className="auth-input" /><br />
      <button type="submit" className="auth-button">Sign up</button>
    </form>
  </div>
);

export default Auth;
