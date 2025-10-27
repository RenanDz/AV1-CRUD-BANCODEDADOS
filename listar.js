const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/listar", async (req, res) => {
  const [perguntas] = await db.query("SELECT * FROM perguntas ORDER BY id DESC");
  const [respostas] = await db.query("SELECT * FROM respostas");
  res.render("listar", { perguntas, respostas });
});

module.exports = router;
