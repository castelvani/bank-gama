import React from 'react';
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./style/global";
import { ToastContainer } from 'react-toastify';
import Routes from "./routes"
import 'react-toastify/dist/ReactToastify.css';
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
          <Routes/>
      </BrowserRouter>
      <GlobalStyle/>
      <ToastContainer/>
    </>
  );
}

export default App;
