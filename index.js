var cron = require("node-cron");
const helper = require('./helper');
const consts = require('./constants');

async function bot() {
  let pairUni = await helper.getPair(consts.usdt_usdc, consts.uniswap_factory);
  let pairPk = await helper.getPair(consts.usdc_usdt, consts.pancake_factory);

  console.log("pairUni: ", pairUni);
  console.log("pairPk: ", pairPk);

  const priceImpact1 = await helper.getPriceImpact(consts.usdt_usdc, pairUni, "uniswap")
  console.log(priceImpact1);

  const priceImpact2 = await helper.getPriceImpact(consts.usdc_usdt, pairPk, "pancake")
  console.log(priceImpact2);



}


cron.schedule("*/1.5 * * * * *", async () => {

  bot()
  // let prices = await helper.getPrice(3);
  // console.log("prices: ", prices)
});

