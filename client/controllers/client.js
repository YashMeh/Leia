const express = require("express"),
  router = express.Router();

const {
  getAllInterfaces,
  startDumping,
  stopDumping,
} = require("../utils/net-utils");

/**
 * Get all the ethernet drivers of the device
 */
router.get("/allEth", (req, res) => {
  getAllInterfaces().then((data) => {
    res.status(200).json({ interfaces: data });
  });
});

//TODO:Create a custom sanitizer for commands
/**
 * Start sending https traffic
 */
router.get("/start/:prot", (req, res) => {
  const prot = req.params.prot;
  res.status(200).json({ msg: startDumping(prot) });
});
/**
 * Stop sending the packets
 */
router.get("/stop/:prot", (req, res) => {
  const prot = req.params.prot;
  res.status(200).json({ msg: stopDumping(prot) });
});

module.exports = router;
