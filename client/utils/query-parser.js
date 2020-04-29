const interfaceParser = (output) => {
  return output.split("\n").map((data) => {
    return data.split(" ")[1] === undefined || data.split(" ")[1] === ""
      ? "None"
      : data.split(" ")[1].slice(0, -1);
  });
};

module.exports = { interfaceParser };
