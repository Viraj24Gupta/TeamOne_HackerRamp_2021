const express = require("express");
const router = express.Router();

router.use(require("./login"));
router.use(require("./users"));
router.use(require("./client"));
router.use(require("./test_db"));

module.exports = router;
