const express = require("express");
const router = express.Router();

router.use("/", require("./listar"));
router.use("/", require("./criar"));
router.use("/", require("./editar"));
router.use("/", require("./excluir"));

module.exports = router;
