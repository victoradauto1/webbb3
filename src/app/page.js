"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { doLogin } from "../services/Web3Services"
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  useEffect(() => {
    document.title = "Webbb3 | Login";
  }, []);

  const [message, setMessage] = useState("");
  const { push } = useRouter();

  function btnLoginClick(){
    doLogin()
      .then(account => push("/vote"))
      .catch(err => {
        console.error(err)
        setMessage(err.message)})
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
          <p className="message">{message}</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
