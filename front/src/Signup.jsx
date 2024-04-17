import React, { useState } from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const Signup = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/signup", {username, email, password}).then(res => {
      console.log(res);
      navigate("/login");
     
    }).catch(error => {
      console.log(error);
    })
  }
  return (
    <div className="signup-container d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="form bg-white p-3 roundeed">

      <h2>Criar conta</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='username'><strong>Username</strong></label>
          <input type='text' className='form-control rounded-0' onChange={(e) => setUsername(e.target.value)} autoComplete='off' name='username' id='username' placeholder='Digite seu nick' />
        </div>

        <div className='mb-3'>
          <label htmlFor='email'><strong>E-mail</strong></label>
          <input type='text' className='form-control rounded-0' onChange={(e) => setEmail(e.target.value)}  autoComplete='off' name='email' id='email' placeholder='Digite seu e-mail' />
        </div>

        <div className='mb-3 signup-password'>
          <label htmlFor='password'><strong>Senha</strong></label>
          <input type='password' className='form-control rounded-0' onChange={(e) => setPassword(e.target.value)}  name='password' id='password' placeholder='Digite sua senha' />
        </div>
        <button className='btn btn-primary'>Cadastrar</button>
      </form>
      </div>
    </div>
  )
}
