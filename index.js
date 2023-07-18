var cron = require("node-cron"); 
const helper = require('./helper');


cron.schedule("*/1.5 * * * * *", () => {
    helper.getPrice(3);
});

