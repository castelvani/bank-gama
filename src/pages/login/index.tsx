import React, { useState, FormEvent, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import Logo from "../../img/logo.png";
import { LoginPage } from "./style"

import api from "../../services/api"

interface IToken{
  storage: string
}

const Login: React.FC = () => {

  const history = useHistory();

  const [ login, setLogin ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ storage, setStorage ] = useState<IToken>(():any => {
    let storageToken = () => localStorage.getItem('@tokenApp')
    return storageToken();
  })
  
  useEffect(() => {
    !!storage ? history.push('/dashboard') : localStorage.clear()
  }, [storage])

  function handleLogin(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    const postData = {
      usuario: login,
      senha: password
    }

    api.post(`login`, postData )
    .then(response =>{
      console.log(response.data);
      localStorage.setItem('@tokenApp', response.data.token);
      history.push('/dashboard');
    })
  }

  return (
    <LoginPage>
      <Link to="/">
        <img className="logo-gama" src={Logo} alt=""/>
      </Link>
      <div className="login-div">
        <div>
          <h4>
            Faça seu Login
          </h4>
        </div>
          <form onSubmit={handleLogin}>
            <input onChange={e=>setLogin(e.target.value)} value={login} type="text"/>
            <input onChange={e=>setPassword(e.target.value)} value={password} type="password"/>
            <button type="submit">Logar</button>
          </form>
          <Link to="/recoveryPass">
            Esqueci minha senha
          </Link>
          <Link to="/">
            Ainda não sou cliente
          </Link>
      </div>
    </LoginPage>
  );
}

export default Login;