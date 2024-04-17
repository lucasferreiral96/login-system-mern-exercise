import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios"

export const Dashboard = () => {
  const [welcome, setWelcome] = useState();
  // const [username, setUsername] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/dashboard").then(res => {
      console.log(res);
      if(res.data.valid){
        setWelcome(res.data.message);
        // setUsername(res.data.message);
      }else{
        navigate("/");
        
      }

    }).catch(error => {
      console.log("Erro backend dashboard: "+error);
    })
  });


  return (
    <div>
      <h1>Olá, {welcome}</h1>
      
      <br />
      <a href='/'>Inicio</a>
      <br />
      <a href='/login'>Login</a>
      </div>
  )
}
