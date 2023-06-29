require('dotenv').config();
const ethers = require("ethers")
const abi = require("./corsapiquet.node.abi.json")

async function main() {
  const wallet = ethers.Wallet.createRandom()
  const walletResp = {
    mnemonic: wallet.mnemonic.phrase,
    address: wallet.address,
    privateKey: wallet.privateKey
  }
  console.log("Nova carteira: ", walletResp)
  const walletComoDoMetamask = wallet.encryptSync("ironicoHehehesenhaSegura")
  console.log("Nova carteira Como Do Metamask: ", walletComoDoMetamask)
}

async function mainTx() {
  const contractAddress = "0xB8Abed49fb68b23c2DF9a07e8f6f086c633522B1"
  const infuraProvider = new ethers.InfuraProvider("maticmum")
  const minhaWallet = new ethers.Wallet(process.env.PVT_KEY, infuraProvider)
  const contract = new ethers.Contract(contractAddress, abi, minhaWallet)
  const tokenName = await contract.name()
  console.log("nome do token é", tokenName)
  console.log("wallet", minhaWallet)
  console.log("Criando novo token...")
  try {
    const tx = await contract.safeMint("0xB8Abed49fb68b23c2DF9a07e8f6f086c633522B1", "https://tiagohencarvalho.github.io/meunft/1.json");
    console.log("tx enviada: ", tx);
    const txReceipt = await tx.wait();
    console.log("txReceipt: ", txReceipt);
    if (txReceipt.status === 1) {
      console.log("Parabéns! Novo NFT gerado");
    }
  } catch (err) {
    console.error("Erro ao gerar token:", err)
  }
}

async function readEvents() {
  const contractAddress = "0xB8Abed49fb68b23c2DF9a07e8f6f086c633522B1"
  const infuraProvider = new ethers.InfuraProvider("maticmum")
  const contract = new ethers.Contract(contractAddress, abi, infuraProvider)
  const tokenName = await contract.name()
  console.log("nome do token é", tokenName)
  console.log("Lendo eventos...")
  const filtroEvento = contract.filters.Transfer;
  eventos = await contract.queryFilter(filtroEvento, -9000000);
  console.log("Numero de transferencias: ", eventos.length);
  console.log("Logs de transferencias: ", eventos);
}

readEvents().then( () => process.exit(0) )