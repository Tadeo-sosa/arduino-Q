const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let comentarios = []; // guardamos en memoria

// CREATE
app.post("/comentarios", (req, res) => {
    comentarios.push(req.body.texto);
    res.send("ok");
});

// READ
app.get("/comentarios", (req, res) => {
    res.json(comentarios);
});

// DELETE
app.delete("/comentarios/:id", (req, res) => {
    comentarios.splice(req.params.id, 1);
    res.send("ok");
});

// UPDATE
app.put("/comentarios/:id", (req, res) => {
    comentarios[req.params.id] = req.body.texto;
    res.send("ok");
});

// IMPORTANTE
app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor corriendo en puerto 3000");
});
