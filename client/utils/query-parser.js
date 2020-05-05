const interfaceParser = (output) => {
  return output
    .split("\n")
    .splice(0, output.split("\n").length - 1)
    .map((term) => {
      return term.split(" ")[0].split(".")[1];
    });
};

module.exports = { interfaceParser };
