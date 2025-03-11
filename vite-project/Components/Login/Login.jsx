import React, { useEffect } from 'react';
import { loginUser } from '../../API/User';
import Logo from '../../Assets/Logo.svg';
import Mail from '../../Assets/Mail.svg';
import Eye from '../../Assets/Eye.svg';
import EyeSlash from '../../Assets/EyeClose.png';
import Lock from '../../Assets/Lock.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function Login() {
  const [formData, setFormData] = useState({ password: '', email: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    try {
      if (!formData.password || !formData.email) {
        toast.error("Fields can't be empty");
        return;
      }
      const response = await loginUser({ ...formData });
      if (response?.message === "User logged in successfully") {
        toast.success(response.message);
        console.log(response.message);
      } else {
        toast.error(response.message);
      }
      if (response?.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("name", response.name);
        localStorage.setItem("userEmail", response.email);
        localStorage.setItem("user_Id", response.id);
        setTimeout(() => {
          navigate('/');
        }, 2500);
      }
    } catch (error) {
      console.log(error)
    }
  };



  return (
    <div className={`{styles.body} d-flex `}>
      <ToastContainer />
      <div className={ `${styles.left}  d-flex flex-column justify-content-center align-items-center `}>
        <img src={Logo} className={`${styles.logo} img-fluid `} alt="Logo" />
        <p className={`${styles.p1} ms-xs-3 ms-sm-3 fs-2 fw-bold  text-wrap text-center `}>Welcome aboard my friend</p>
        <p className={`${styles.p2} ms-xs-3 ms-sm-3 fs-3 fw-bold text-wrap text-center`}>just a couple of clicks and we start</p>
      </div>

      <div className={`${styles.right} `}>
        <p className={styles.text}>Login</p>

        <div className={`${styles.content} form-inline d-flex gap-3 me-lg-5 me-md-5 me-sm-3 me-xs-3 col-lg-6 col-md-4 col-sm-6 col-xs-5`}>
          <img src={Mail} className={`${styles.mail}  `} alt="Mail Icon" />
          <input type="text" name="email" placeholder="Email" onChange={handleChange} value={formData.email} 
          className={`${styles.input} form-control ms-lg-5  col-lg-6 col-md-4 col-sm-6 col-xs-5 `} />
        </div>

        <div className={`${styles.content} d-flex gap-3 me-lg-5 me-md-5 me-sm-3 me-xs-3 col-lg-6 col-md-4 col-sm-6 col-xs-5`}>
          <img src={Lock} className={`${styles.lock}`} alt="Password Icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className={`${styles.input} form-control ms-lg-5   col-lg-6 col-md-4 col-sm-6 col-xs-5`}
          />
          <img
            src={showPassword ? EyeSlash : Eye}
            className={`${styles.eye}  `}
            alt="Toggle Password Visibility"
            onClick={togglePasswordVisibility}
          />
        </div>

        <button onClick={handleSubmit} className={styles.register}>Log in</button>
        <p className={styles.para}>Have no account yet ?</p>
        <button className={styles.login} onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Login;
