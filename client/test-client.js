const NATS = require("nats");
const nc = NATS.connect("nats://0.0.0.0:4222");

nc.subscribe("packet", function (msg) {
  console.log("Received a message: " + msg);
});
