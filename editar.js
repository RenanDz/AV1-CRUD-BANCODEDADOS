const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/editar/:id", async (req, res) => {
  const [perguntaRows] = await db.query("SELECT * FROM perguntas WHERE id = ?", [req.params.id]);
  const [respostas] = await db.query("SELECT * FROM respostas WHERE id_pergunta = ?", [req.params.id]);

  res.render("editar", { pergunta: perguntaRows[0], respostas });
});

router.post("/editar/:id", async (req, res) => {
  await db.query("UPDATE perguntas SET tipo = ?, texto = ? WHERE id = ?", [
    req.body.tipo,
    req.body.texto,
    req.params.id
  ]);

  await db.query("DELETE FROM respostas WHERE id_pergunta = ?", [req.params.id]);

  if (req.body.tipo === "multipla" && req.body.respostas) {
    const respostas = req.body.respostas.filter(t => t.trim() !== "");
    for (const texto of respostas) {
      await db.query("INSERT INTO respostas (id_pergunta, texto) VALUES (?, ?)", [
        req.params.id,
        texto
      ]);
    }
  }

  res.redirect("/perguntas/listar");
});

module.exports = router;
