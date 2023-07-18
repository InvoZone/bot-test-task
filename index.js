const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");

const helper = require("./helper");
const consts = require("./constants");

const app = express();
const PORT = 3001;

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

app.use(bodyParser.json());

app.get("/webhook", async (req, res) => {
  let maindata = await bot();

  console.log("Received webhook:", maindata);

  res.send({ maindata });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function bot() {
  var data = [];
  var isOppertunity = "false";

  let pairUni = await helper.getPair(consts.usdc_usdt, consts.uniswap_factory);
  let pairPk = await helper.getPair(consts.usdt_usdc, consts.pancake_factory);

  console.log("pairUni: ", pairUni);
  console.log("pairPk: ", pairPk);

  if (consts.nullAddress == pairUni && consts.nullAddress == pairPk) {
    console.log(
      `${consts.usdc_usdt.symbol1} - ${consts.usdc_usdt.symbol2} no pair exists at uniswap\n`,
      `${consts.usdt_usdc.symbol1} -  ${consts.usdt_usdc.symbol2} no pair exists at pancake\n`
    );
  } else if (consts.nullAddress == pairUni) {
    console.log(`${consts.usdc_usdt.symbol1} - ${consts.usdc_usdt.symbol2} no pair exists at uniswap`);
  } else if (consts.nullAddress == pairPk) {
    console.log(`${consts.usdt_usdc.symbol1} - ${consts.usdt_usdc.symbol2} no pair exists at pancake\n`);
  } else {
    const priceImpact1 = await helper.getPriceImpact(consts.usdc_usdt, pairUni, "uniswap");
    console.log(priceImpact1);

    const priceImpact2 = await helper.getPriceImpact(consts.usdt_usdc, pairPk, "pancake");
    console.log(priceImpact2);

    let prices_usdc_usdt = await helper.getPrice(1, consts.usdc_usdt, consts.RouterABI, consts.uniswap_address, "uniswap");
    console.log("prices_usdc_usdt", prices_usdc_usdt)
   
    let prices_usdt_usdc = await helper.getPrice(prices_usdc_usdt, consts.usdt_usdc, consts.RouterABI, consts.pancake_address, "pancake");
    console.log("prices_usdt_usdc", prices_usdt_usdc)

    let calculate = prices_usdc_usdt - prices_usdt_usdc;

    if(calculate > 0) {
      console.log(`Oppertunity at pair ${consts.usdc_usdt.symbol1 - consts.usdc_usdt.symbol2} at uniswap and pancakeswap`)
      isOppertunity = "true"
    }

    data.push(pairUni, pairPk, isOppertunity, prices_usdc_usdt, prices_usdt_usdc)

    


  }

  return data;
}
