var cron = require("node-cron"); 
const Web3 = require("web3");
const ethereumUri =
  "https://mainnet.infura.io/v3/c1ef40ba0f90483f9e6c5f3e365128fd";
var web3 = new Web3(new Web3.providers.HttpProvider(ethereumUri));

let RouterABI = [
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
    ],
    name: "getAmountsOut",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// Router V2 
let uniswap_address = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
let pancake_address = "0xEfF92A263d31888d860bD50809A8D171709b7b1c";

const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

async function getPrice(amount) {
  console.log("\n-----Price at Ethereum DEXs----")

  let coin1ToSell = web3.utils.toWei(`${amount}`, "ether");
  let amountOutUni;
  let amountOutPk;

  try {
    let routerUniswap = await new web3.eth.Contract(
      RouterABI,
      uniswap_address
    );

    amountOutUni = await routerUniswap.methods
      .getAmountsOut(coin1ToSell, [USDT, USDC])
      .call();
    amountOutUni = web3.utils.fromWei(amountOutUni[1], "ether");

    let routerPancake = await new web3.eth.Contract(
      RouterABI,
      pancake_address
    );

    amountOutPk = await routerPancake.methods
      .getAmountsOut(coin1ToSell, [USDC, USDT])
      .call();
      amountOutPk = web3.utils.fromWei(amountOutPk[1], "ether");


    console.log("Uniswap: ", amountOutUni + " USDT" + ", Pancakeswap: ", amountOutPk + " USDT" );
  } catch (error) {
    console.log("error: ", error);
  }
}


cron.schedule("*/1.5 * * * * *", () => {
  let dbGet = true;
  if(dbGet){
    getPrice(3);
  }
});

