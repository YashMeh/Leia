const NATS = require("nats");
const nc = NATS.connect("nats://0.0.0.0:4222");
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

// const { getAllInterfaces } = require("./utils/net-utils");

// getAllInterfaces()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("error occured");
//   });
