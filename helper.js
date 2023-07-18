const { utils } = require("ethers");
const Web3 = require("web3");
const ethereumUri =
    "https://mainnet.infura.io/v3/c1ef40ba0f90483f9e6c5f3e365128fd";
var web3 = new Web3(new Web3.providers.HttpProvider(ethereumUri));

const consts = require('./constants');


async function getPair(pair, factoryAddress) {
    let contract = await new web3.eth.Contract(consts.FactoryABI, factoryAddress);

    let pair_get = await contract.methods
        .getPair(pair.address1, pair.address2)
        .call();
    return pair_get;
}

async function getPriceImpact(pair, poolAddress, lp) {
    console.log(`\n----Price Impact at ${lp}----`);
    console.log(`${lp} pool address: `, poolAddress);
    let contract = await new web3.eth.Contract(consts.PoolABI, poolAddress);
    let reserves = await contract.methods.getReserves().call()

    let reserve_a_initial = parseFloat(utils.formatUnits(reserves._reserve0));
    let reserve_b_initial = parseFloat(utils.formatUnits(reserves._reserve1));
    console.log(`${pair.symbol1} in pool: ${reserve_a_initial}`);
    console.log(`${pair.symbol2} in pool: ${reserve_b_initial}`);

    const fee = 0.0025;
    let max_price_impact = 0.01;
    let amount_traded_coin1 = reserve_a_initial * max_price_impact / ((1 - max_price_impact) * (1 - fee));
    let amount_traded_coin2 = reserve_b_initial * max_price_impact / ((1 - max_price_impact) * (1 - fee));
    console.log(`Given a max price impact of ${max_price_impact * 100}%, the max amount of ${pair.symbol1} tradeable is ${amount_traded_coin1}`);
    console.log(`Given a max price impact of ${max_price_impact * 100}%, the max amount of ${pair.symbol2} tradeable is ${amount_traded_coin2}`);

    let amountInCOIN1 = amount_traded_coin1 * (1 - fee);
    let amountInCOIN2 = amount_traded_coin2 * (1 - fee);
    let price_impact_trade_coin1 = amountInCOIN1 / (reserve_a_initial + amountInCOIN1);
    let price_impact_trade_coin2 = amountInCOIN2 / (reserve_b_initial + amountInCOIN2);
    console.log(`Price impact when trading ${amount_traded_coin1} ${pair.symbol1}: ${price_impact_trade_coin1 * 100}%`);
    console.log(`Price impact when trading ${amount_traded_coin2} ${pair.symbol2}: ${price_impact_trade_coin2 * 100}%`);

    return [amount_traded_coin1, price_impact_trade_coin1, amount_traded_coin2, price_impact_trade_coin2];
}



async function getPrice(amount, pair, RouterABI, routerAddres, dex) {
    console.log("\n-----Price at Ethereum DEXs----")

    let amountOfCoins = web3.utils.toWei(`${amount}`, "ether");
    let amountOut;
    // let amountOut;

    try {
        let router = await new web3.eth.Contract(
            RouterABI,
            routerAddres
        );

        amountOut = await router.methods
            .getAmountsOut(amountOfCoins, [pair.address1, pair.address2])
            .call();
        
        amountOut = web3.utils.fromWei(amountOut[1], 'ether');



        console.log(`${dex}:  ${amountOut}  ${pair.symbol1}`);


        return amountOut;
    } catch (error) {
        console.log("error: ", error);
    }
}


module.exports = {
    getPair,
    getPriceImpact,
    getPrice
}