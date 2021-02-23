import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

import { useHistory } from "react-router-dom";

import api from "../../services/api";
import Headers from "../../services/headers";

interface IUser {
  idUsuario: number;
  sub: string;
}

interface IDataAccount {
  contaBanco: {
    saldo: number;
    id: number;
    lancamentos: [];
  };
  contaCredito: {
    saldo: number;
    id: number;
    lancamentos: [];
  };
}

const DashBoard: React.FC = () => {
  const [dataAccount, setDataAccount] = useState<IDataAccount>();

  const TokenStorage = null || localStorage.getItem("@tokenApp");

  const TokenDecodedValue = () => {
    if (TokenStorage) {
      const TokenArr = TokenStorage.split(" ");
      const TokenDecode = TokenArr[1];
      const decoded = jwt_decode<IUser>(TokenDecode);

      return decoded.sub;
    } else {
      alert("err");
    }
  };

  console.log(TokenDecodedValue());

  const history = useHistory();
  const teste = TokenDecodedValue();

  useEffect(() => {
    api
      .get(`dashboard?fim=2021-01-31&inicio=2021-01-01&login=${teste}`, Headers)
      .then((response) => {
        setDataAccount(response.data);
      })
      .catch((e) => {
        // localStorage.clear();
        // toast.error('Ops, sua sessão está expirada')
        // history.push('/login')
      });
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      {dataAccount?.contaCredito.lancamentos.map(
        (account: any, index: number) => (
          <div key={index}>
            <h2>{account.contaCredito}</h2>
            <h2>{account.length()}</h2>
          </div>
        )
      )}
    </>
  );
};

export default DashBoard;
