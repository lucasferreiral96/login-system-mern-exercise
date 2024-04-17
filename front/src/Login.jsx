import React, { useState } from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/login", {username, password}).then(res => {
      console.log(res.data);

      if(res.data.login){
        navigate("/dashboard");
      }else{
        navigate("/login");
      }
     
    }).catch(error => {
      console.log(error.response.data);
    })
  }
  return (
    <div className="login-container d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="form bg-white p-3 rounded">

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='username'><strong>Username</strong></label>
          <input type='text' className='form-control rounded-0' onChange={(e) => setUsername(e.target.value)} autoComplete='off' name='username' id='username' placeholder='Digite seu nick' />
        </div>

        <div className='mb-3 signup-password'>
          <label htmlFor='password'><strong>Senha</strong></label>
          <input type='password' className='form-control rounded-0' onChange={(e) => setPassword(e.target.value)} name='password' id='password' placeholder='Digite sua senha' />
        </div>
        <div className="login">
          <button className='btn btn-primary btn-login'>Logar</button>
        </div>
        <div className="account">
          <span><strong>Não tem conta?</strong> </span><a href='/signup' className='btn btn-dark'>Criar conta</a>
        </div>
      </form>
      </div>
    </div>
  )
}
