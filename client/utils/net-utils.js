const NATS = require("nats");
const nc = NATS.connect(process.env.NATS_SERVER);
const chalk = require("chalk");
const emoji = require("node-emoji");
nc.on("connect", () => {
  console.log(
    chalk.green(
      `Connection to nats-server successfull ${emoji.get("white_check_mark")}`
    )
  );
});
nc.on("error", (err) => {
  console.log(
    chalk.redBright(
      `Error connecting to nats-server ${emoji.get("heavy_exclamation_mark")}`
    )
  );
  console.log(chalk.redBright(`${err}`));
});
const { spawn } = require("child_process");
const { interfaceParser } = require("./query-parser");
const PROT_TO_PORT = {
  http: 80,
  https: 443,
  ftp: 20,
  ssh: 22,
  dns: 53,
  smtp: 25,
};
const PROT_TO_PID = {
  http: -1,
  https: -1,
  ftp: -1,
  ssh: -1,
  dns: -1,
  smtp: -1,
};

const getAllInterfaces = () => {
  const child = spawn("tcpdump -D", {
    shell: true,
  });
  return new Promise((resolve, reject) => {
    child.stdout.on("data", (data) => {
      resolve(interfaceParser(`${data}`));
    });
    child.stderr.on("data", (data) => {
      reject(`${data}`);
    });
  });
};
const fetchPid = () => {
  const child = spawn("pidof tcpdump", {
    shell: true,
  });
  return new Promise((resolve, reject) => {
    child.stdout.on("data", (data) => {
      const currId = String(data)
        .slice(0, String(data).length - 1)
        .split(" ")[0];
      resolve(currId);
    });
    child.stderr.on("data", (data) => {
      reject(`${data}`);
    });
  });
};
const startDumping = (prot) => {
  if (!(prot in PROT_TO_PID)) return "Not supported";
  else if (PROT_TO_PID[prot] !== -1) return "already running";
  //console.log(PROT_TO_PORT[prot]);
  const child = spawn(`tcpdump -i any port ${PROT_TO_PORT[prot]}`, {
    shell: true,
  });
  fetchPid().then((pid) => {
    //set the pid of the process
    PROT_TO_PID[prot] = pid;
    //console.log("Start", PROT_TO_PID);
  });
  child.stdout.on("data", (data) => {
    nc.publish(`${prot}`, `${data}`);
  });
  return "started";
};
const stopDumping = (prot) => {
  if (!(prot in PROT_TO_PID)) return "Not supported";
  if (PROT_TO_PID[prot] === -1) return "not started";
  //console.log("Stop", PROT_TO_PID);
  const child = spawn(`kill -9 ${PROT_TO_PID[prot]}`, {
    shell: true,
  });
  //reset the pid of the process
  PROT_TO_PID[prot] = -1;
  return "stopped";
};
module.exports = { getAllInterfaces, startDumping, stopDumping };
