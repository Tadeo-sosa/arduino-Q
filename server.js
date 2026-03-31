const express = require("express");
const cors = require("cors");
const Valkey = require("iovalkey");

const app = express();
app.use(cors());
app.use(express.json());

const valkey = new Valkey();

const KEY = "comentarios";

// CREATE
app.post("/comentarios", async (req, res) => {
    await valkey.rpush(KEY, req.body.texto);
    res.send("ok");
});

// READ
app.get("/comentarios", async (req, res) => {
    let datos = await valkey.lrange(KEY, 0, -1);
    res.json(datos);
});

// DELETE
app.delete("/comentarios/:id", async (req, res) => {
    let datos = await valkey.lrange(KEY, 0, -1);
    datos.splice(req.params.id, 1);

    await valkey.del(KEY);

    if (datos.length > 0) {
        await valkey.rpush(KEY, ...datos);
    }

    res.send("ok");
});

// UPDATE
app.put("/comentarios/:id", async (req, res) => {
    let datos = await valkey.lrange(KEY, 0, -1);

    datos[req.params.id] = req.body.texto;

    await valkey.del(KEY);

    if (datos.length > 0) {
        await valkey.rpush(KEY, ...datos);
    }

    res.send("ok");
});

// SIEMPRE AL FINAL
app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
