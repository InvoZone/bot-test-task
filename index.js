// var cron = require("node-cron");

const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');

const helper = require('./helper');
const consts = require('./constants');

const app = express();
const PORT = 3001;


const corsOpts = {
  origin: '*',

  methods: ['GET', 'POST'],

  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOpts));


app.use(bodyParser.json());

app.get('/webhook', async(req, res) => {

  let priceImpact1 = await bot();

  console.log('Received webhook:', priceImpact1);

  res.send({priceImpact1});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function bot() {
  let pairUni = await helper.getPair(consts.usdt_usdc, consts.uniswap_factory);
  let pairPk = await helper.getPair(consts.usdc_usdt, consts.pancake_factory);

  console.log("pairUni: ", pairUni);
  console.log("pairPk: ", pairPk);

  const priceImpact1 = await helper.getPriceImpact(consts.usdt_usdc, pairUni, "uniswap")
  console.log(priceImpact1);

  const priceImpact2 = await helper.getPriceImpact(consts.usdc_usdt, pairPk, "pancake")
  console.log(priceImpact2);



  return priceImpact1;
}


// cron.schedule("*/1.5 * * * * *", async () => {

//   bot()
//   // let prices = await helper.getPrice(3);
//   // console.log("prices: ", prices)
// });