import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADRESS = "0x3409727c9505a6294c8A4F4C5C0633c7549faAbD";

const mockVoting = {
  option1: "Clara",
  votes1: 0,
  option2: "João Pedro",
  votes2: 0,
  maxDate: Date.now() + 86400000, // 1 dia a partir de agora
};

export async function doLogin() {
  if (!window.ethereum) throw new Error("No Metamask found.");

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  if (!accounts || !accounts.length)
    throw new Error("Wallet not found/allowed.");

  localStorage.setItem("wallet", accounts[0]);
  return accounts[0];
}

function getContract(){
  const wallet = localStorage.getItem("wallet");
  if (!wallet) throw new Error("Wallet not found.");

  const web3 = new Web3(window.ethereum);
  return new web3.eth.Contract(ABI, CONTRACT_ADRESS, {
    from: wallet,
  });
}

export async function getCurrentVoting() {
  const contract = getContract();
  try {
    const voting = await contract.methods.getCurrentVoting().call();
    return voting;
  } catch (err) {
    console.warn(
      "Erro ao pegar votação do contrato, retornando mock de votação."
    );
    return mockVoting; // Retorna o mock em caso de erro
  }
}

export async function addVote(choice){
  const contract = getContract();

  return contract.methods.addVote(choice).send();
};
