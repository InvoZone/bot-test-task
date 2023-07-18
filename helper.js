const Web3 = require("web3");
const ethereumUri =
    "https://mainnet.infura.io/v3/c1ef40ba0f90483f9e6c5f3e365128fd";
var web3 = new Web3(new Web3.providers.HttpProvider(ethereumUri));

const consts = require('./constants');


async function getPrice(amount) {
    console.log("\n-----Price at Ethereum DEXs----")

    let coin1ToSell = web3.utils.toWei(`${amount}`, "ether");
    let amountOutUni;
    let amountOutPk;

    try {
        let routerUniswap = await new web3.eth.Contract(
            consts.RouterABI,
            consts.uniswap_address
        );

        amountOutUni = await routerUniswap.methods
            .getAmountsOut(coin1ToSell, [consts.USDT, consts.USDC])
            .call();
        amountOutUni = web3.utils.fromWei(amountOutUni[1], "ether");

        let routerPancake = await new web3.eth.Contract(
            consts.RouterABI,
            consts.pancake_address
        );

        amountOutPk = await routerPancake.methods
            .getAmountsOut(coin1ToSell, [consts.USDC, consts.USDT])
            .call();
        amountOutPk = web3.utils.fromWei(amountOutPk[1], "ether");


        console.log("Uniswap: ", amountOutUni + " USDT" + ", Pancakeswap: ", amountOutPk + " USDC");
    } catch (error) {
        console.log("error: ", error);
    }
}


module.exports = {
    getPrice
}