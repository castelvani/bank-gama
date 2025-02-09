import React, {useState, FormEvent} from 'react';
import { Link, useHistory } from "react-router-dom";
import { HomePage } from "./style"
import Logo from "../../img/logo.png";

import api from "../../services/api"
import { toast } from 'react-toastify';

const Home: React.FC = () => {

  const history = useHistory(); 

  const [ cpf, setCpf ] = useState('');
  const [ name, setName ] = useState('');
  const [ userName, setUserName ] = useState('');
  const [ password,setPassword ] = useState('');
  const [ confirmPass, setConfirmPass ] = useState('');

  function createAccount(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    const postData = {
      cpf,
      nome: name,
      login: userName,
      senha: password
    }
    
    if(password !== confirmPass){
      toast.error('Confirm pass');
      return;
    }

    try{
      api.post(`usuarios`, postData )
      .then(response => {
        if(response.status === 200){
          history.push('/login');
        }else{
          toast.error("Erro no cadastro");
        }
      })
    }catch(e){
      toast.error('Confirm pass');
    }
  }

  return (
    <HomePage>
      <Link to="/">
        <img className="logo-gama" src={Logo} alt=""/>
      </Link>
      <div className="middle-div">
        <div className="access-div">
          <h2>Gama Bank é um projeto de nossos alunos.</h2>
          <h2>Já tem conta?</h2>
          <Link to="/login">
            <button>Acessar</button>
          </Link>
        </div>
        <div className="signup-div">
          <div>
            <h4>
              Peça sua conta e cartão de crédito Gama Bank
            </h4>
          </div>
          <form onSubmit={createAccount}>
            <input type="text" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="Digite seu CPF"/>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome completo"/>
            <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Nome do usuário"/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha"/>
            <input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} placeholder="Confirme sua senha"/>
            <button type="submit">Continuar</button>
          </form>
        </div>
      </div>
    </HomePage>
    );
}

export default Home;