const express = require("express"),
  router = express.Router();

const { getAllInterfaces } = require("../utils/net-utils");

/**
 * Get all the ethernet drivers of the device
 */
router.get("/allEth", (req, res) => {
  getAllInterfaces().then((data) => {
    res.status(200).json({ interfaces: data });
  });
});

/**
 * Toggle the sharing of
 */

module.exports = router;
