"use client";
import Footer from "@/components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { getCurrentVoting, addVote } from "@/services/Web3Services";
import { useRouter } from "next/navigation";

export default function Vote() {
  const { push } = useRouter();

  const DEFAULT_OPTION = {
    name: "Loading...",
    img: "https://www.dreamstime.com/stock-photo-user-profile-web-icon-illustration-design-element-image84779395",
  };

  const [message, setMessage] = useState("");
  const [voting, setVoting] = useState({ maxDate: Date.now() });
  const [option1, setOption1] = useState(DEFAULT_OPTION);
  const [option2, setOption2] = useState(DEFAULT_OPTION);
  const [showVotes, setShowVotes] = useState(0);

  useEffect(() => {
    document.title = "Webbb3 | Votação";
    if (!localStorage.getItem("wallet")) push("/");
    getCurrentVoting()
      .then((voting) => {
        console.log(voting);
        setVoting(voting);
        setOption1(getOption(voting.option1));
        setOption2(getOption(voting.option2));
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.message);
      });
  }, []);

  function getOption(option) {
    switch (option) {
      case "Clara":
        return {
          name: "Maria Clara",
          img: "https://img.freepik.com/fotos-gratis/foto-na-cabeca-de-uma-mulher-feliz-rindo-e-sorrindo-amplamente_273609-28720.jpg?t=st=1728489760~exp=1728493360~hmac=b15b070a9574d053b89f454c010d39ed987f7913bb0275ea792d8f3c437fdacd&w=740",
        };

      case "João Pedro":
        return {
          name: "João Pedro",
          img: "https://img.freepik.com/fotos-gratis/retrato-de-homem-feliz-e-sorridente_23-2149022620.jpg?w=740&t=st=1728489684~exp=1728490284~hmac=81cfaa1b0b18137c015bb7f522bd5af1396d3be3705cb7f3ff93ed5b62563be7",
        };

      default:
        return DEFAULT_OPTION;
    }
  }

  function btnVote2Click(){
    setMessage("Conectando na carteira... aguarde...");
    addVote(2)
      .then(()=>{
        setShowVotes(2);
        setMessage("Rsultados parciais sujeitos a alterações minuto a minuto.")
      })
      .catch( err =>{
        console.error(err);
        setMessage(err.message)
      })
  }

  function btnVote1Click() {
    setMessage("Conectando na carteira... aguarde...");
    addVote(1)
      .then(()=>{
        setShowVotes(1);
        setMessage("Rsultados parciais sujeitos a alterações minuto a minuto.")
      })
      .catch( err =>{
        console.error(err);
        setMessage(err.message)
      })
  }

  return (
    <div className="container col-xxl-8 px-4 py-5">
      <div className="row align-align-items-center">
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Weeeb3</h1>
        <p className="lead">Votação on-chain do BBB.</p>
        {voting.maxDate > Date.now() / 1000 ? (
          <p className="lead mb-3">
            Você tem até {new Date(Number(voting.maxDate) * 1000).toString()}{" "}
            para deixar seu voto em um dos participantes abaixo para que ele saia do programa.
          </p>
        ) : (
          <p className="lead mb-3">Votação encerrada, confira abaixo o resultado.</p>
        )}
        <p className="text-alert-danger">{message}</p>
      </div>

      {/* Novo layout para exibir os candidatos lado a lado */}
      <div className="row justify-content-center g-3 py-5">
        {/* Candidato 1 */}
        <div className="col-md-5 text-center">
          <h3 className="my-2 d-block mx-auto" style={{ width: 250 }}>
            {voting.option1}
          </h3>
          <img
            src={option1.img}
            className="d-block mx-auto img-fluid rounded"
            width={250}
            height={250}
          />
          <div className="d-flex flex-column align-items-center">
            {showVotes > 0 || voting.maxDate < Date.now() / 1000 ? (
              <button
                className="btn btn-secondary p-3 my-2 mx-auto"
                style={{ width: 250 }}
                disabled={true}
              >
                {showVotes == 1 ? Number(voting.votes1) + 1 : Number(voting.votes1)}{" "}
                votos
              </button>
            ) : (
              <button
                className="btn btn-primary p-3 my-2 mx-auto"
                style={{ width: 250 }}
                disabled={false}
                onClick={btnVote1Click}
              >
                Quero que saia este participante.
              </button>
            )}
          </div>
        </div>

        {/* Candidato 2 */}
        <div className="col-md-5 text-center">
          <h3 className="my-2 d-block mx-auto" style={{ width: 250 }}>
            {voting.option2}
          </h3>
          <img
            src={option2.img}
            className="d-block mx-auto img-fluid rounded"
            width={250}
            height={250}
          />
          <div className="d-flex flex-column align-items-center">
            {showVotes > 0 || voting.maxDate < Date.now() / 1000 ? (
              <button
                className="btn btn-secondary p-3 my-2 mx-auto"
                style={{ width: 250 }}
                disabled={true}
              >
                {showVotes == 2 ? Number(voting.votes2) + 1 : Number(voting.votes2)}{" "}
                votos
              </button>
            ) : (
              <button
                className="btn btn-primary p-3 my-2 mx-auto"
                style={{ width: 250 }}
                disabled={false}
                onClick={btnVote2Click}
              >
                Quero que saia este participante.
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
