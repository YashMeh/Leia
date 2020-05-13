const NATS = require("nats");
const nc = NATS.connect(process.env.NATS_SERVER);
const chalk = require("chalk");
nc.subscribe("https", function (msg) {
  console.log(chalk.red(msg));
});
nc.subscribe("ftp", function (msg) {
  console.log(chalk.blue(msg));
});
nc.subscribe("dns", function (msg) {
  console.log(chalk.yellow(msg));
});
nc.subscribe("smtp", function (msg) {
  console.log(chalk.green(msg));
});
