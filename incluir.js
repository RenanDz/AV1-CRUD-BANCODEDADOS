const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/criar", (req, res) => res.render("criar"));

router.post("/criar", async (req, res) => {
  const [result] = await db.query("INSERT INTO perguntas (tipo, texto) VALUES (?, ?)", [
    req.body.tipo,
    req.body.texto
  ]);

  const idPergunta = result.insertId;

  if (req.body.tipo === "multipla" && req.body.respostas) {
    const respostas = req.body.respostas.filter(t => t.trim() !== "");
    for (const texto of respostas) {
      await db.query("INSERT INTO respostas (id_pergunta, texto) VALUES (?, ?)", [
        idPergunta,
        texto
      ]);
    }
  }

  res.redirect("/perguntas/listar");
});

module.exports = router;
