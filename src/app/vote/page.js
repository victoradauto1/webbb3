'use client'
import Footer from "@/components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { getCurrentVoting } from "@/services/Web3Services";
import { useRouter } from "next/navigation";

export default function Vote() {
    
    const { push } = useRouter();

    const [message, setMessage] = useState("");
    const [voting, setVoting] = useState({maxDate: Date.now()});
    
    useEffect(()=>{
        document.title = "Webbb3 | Votação"
        if(!localStorage.getItem("wallet")) push("/"); 
        getCurrentVoting()
            .then(voting=>{
                console.log(voting)
                setVoting(voting)
            })
            .catch(err => {
                console.error(err)
                setMessage(err.message)
            })
    },[])

  return (
    <div className="container col-xxl-8 px-4 py-5">
      <div className="row align-align-items-center">
      <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Weeeb3</h1>
      <p className="lead">Votação on-chain do BBB.</p>
      <p className="text-alert-danger">{message}</p>
      </div>
      <Footer/>
    </div>
  );
}
