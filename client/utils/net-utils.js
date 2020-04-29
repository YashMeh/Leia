const { spawn } = require("child_process");
const { interfaceParser } = require("./query-parser");
const getAllInterfaces = () => {
  const child = spawn("ip link show", {
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

module.exports = { getAllInterfaces };
