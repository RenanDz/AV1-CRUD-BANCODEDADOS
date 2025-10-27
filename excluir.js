const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/excluir/:id", async (req, res) => {
  await db.query("DELETE FROM perguntas WHERE id = ?", [req.params.id]);
  res.redirect("/perguntas/listar");
});

module.exports = router;
