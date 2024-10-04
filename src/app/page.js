"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Webbb3 | Login";
  }, []);

  function btnLoginClick(){
    alert("Ativando função de login!")
  }

  return (
    <div className="container col-xxl-8 px-4 py-5">
      <div className="row flex-lg-row-reverse aling-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src="https://t2.tudocdn.net/653782?w=824&h=494"
            className="d-block mx-lg-auto img-fluid custom-rounded"
            width="700"
            height="500"
          />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Weeeb3</h1>
          <p className="lead">Votação on-chain do BBB.</p>
          <p className="lead mb-3">Autentique-se com sua carteira e deixe seu voto para o próximo paredão.</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="button" onClick={btnLoginClick} className="custom-login-btn">
              <img src="/images/MetaMask_Fox.svg.png" width="64" className="me-3" />
              Conectar com a Metamask
            </button>
          </div> 
        </div>
      </div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-body-secondary">&copy; 2024 Webbb3, Inc</p>
        <ul className="nav col-md-4 justify-content-end">
        <li className="nav-items"><a href="/" className="nav-item px-2 text-body-secondary text-decoration-none">Home</a></li>
        <li className="nav-items"><a href="/about" className="nav-item px-2 text-body-secondary text-decoration-none">Quem somos</a></li>
        </ul>
      </footer>
    </div>
  );
}
