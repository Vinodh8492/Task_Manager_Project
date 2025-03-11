import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Assets/Logo.svg';
import Person from '../../Assets/Person.svg';
import Lock from '../../Assets/Lock.svg';
import Mail from '../../Assets/Mail.svg';
import Eye from '../../Assets/Eye.svg';
import EyeSlash from '../../Assets/EyeClose.png';
import styles from './Register.module.css';
import { registerUser } from '../../API/User';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function Register() {
  const [formData, setFormData] = useState({ name: '', password: '', email: '', confirmpassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    localStorage.clear()
    navigate('/login');
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmpassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData.password || !formData.name || !formData.email || !formData.confirmpassword) {
        toast.error("Fields can't be empty");
        return;
      }
      const response = await registerUser({ ...formData });

      if (response?.message === "user already exists, try another Email") {
        toast.info(response.message);
        return;
      }

      if (response?.message === "Passwords do not match") {
        toast.error(response.message);
        return;
      }

      if (response?.message === "Invalid email format. Only @gmail.com emails are allowed.") {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      setFormData({ name: '', password: '', email: '', confirmpassword: '' });
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
        <p className={styles.text}>Register</p>
        <div className={`${styles.content} form-inline d-flex gap-3 me-lg-5 me-md-5 me-sm-3 me-xs-3 col-lg-6 col-md-4 col-sm-6 col-xs-5`}>
          <img src={Person} className={`${styles.person} img img-fluid`} alt="Person Icon" />
          <input type="text" name="name" placeholder="Name" maxLength={20} onChange={handleChange} value={formData.name} className={`${styles.input} form-control ms-lg-5  col-lg-6 col-md-4 col-sm-6 col-xs-5 `}  />
        </div>

        <div className={`${styles.content} form-inline  d-flex gap-3 me-lg-5 me-md-5 me-sm-3 me-xs-3 col-lg-6 col-md-4 col-sm-6 col-xs-5`}>
          <img src={Mail} className={`${styles.mail}`} alt="Mail Icon" />
          <input type="text" name="email" placeholder="Email" maxLength={30} onChange={handleChange} value={formData.email} className={`${styles.input} form-control ms-lg-5  col-lg-6 col-md-4 col-sm-6 col-xs-5 `}  />
        </div>

        <div className={`${styles.content} form-inline  d-flex gap-3 me-lg-5 me-md-5 me-sm-3 me-xs-3 col-lg-6 col-md-4 col-sm-6 col-xs-5`}>
          <img src={Lock} className={`${styles.lock}`} alt="Password Icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className={`${styles.input} form-control ms-lg-5  col-lg-6 col-md-4 col-sm-6 col-xs-5 `} 
            maxLength={20}
          />
          <img
            src={showPassword ? EyeSlash : Eye}
            className={styles.eye}
            alt="Toggle Password Visibility"
            onClick={() => togglePasswordVisibility('password')}
          />
        </div>

        <div className={`${styles.content} form-inline  d-flex gap-3 me-lg-5 me-md-5 me-sm-3 me-xs-3 col-lg-6 col-md-4 col-sm-6 col-xs-5`}>
          <img src={Lock} className={`${styles.lock}`} alt="Confirm Password Icon" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmpassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formData.confirmpassword}
            className={`${styles.input} form-control ms-lg-5  col-lg-6 col-md-4 col-sm-6 col-xs-5 `} 
            maxLength={20}
          />
          <img
            src={showConfirmPassword ? EyeSlash : Eye}
            className={`${styles.eye}  `}
            alt="Toggle Confirm Password Visibility"
            onClick={() => togglePasswordVisibility('confirmpassword')}
          />
        </div>

        <button onClick={handleSubmit} className={styles.register}>Register</button>
        <p className={styles.para}>Have an account ?</p>
        <button className={styles.login} onClick={handleLogin}>Log in</button>
      </div>
    </div>
  );
}

export default Register;
