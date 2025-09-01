const express = require("express");
const { getHostname } = require("../utils");
const { getColor, getColors, saveColor, deleteColor } = require("../db/color")

const apiRouter = express.Router();


apiRouter.get("/", async (req, res) => {
    const { format, colorKey } = req.query; // localhost/api?format=text

    const color = await getColor({ key: colorKey });
    const hostname = getHostname();

    if (format === "json"){
        res.json({
            color, 
            hostname
        });
    } else {
        return res.send(`Color: ${color}, Hostname: ${hostname}`)
    }
});


apiRouter.get("/color", async (req, res) => {
    const colors = await getColors();

    return res.send({ data: colors });
});

apiRouter.get("/color/:key", async (req, res) => {
    const { key } = req.params;

    const color = await getColor({ key, strict: true });

    if (!color) {
        return res.sendStatus(404);
    } else {
        res.send({ data: color });
    }
});

apiRouter.post("/color/:key", async (req, res) => {
    const { key } = req.params;
    const { value } = req.body;

    await saveColor({ key, value });
    return res.send(201).send({ key, value });

});

apiRouter.delete("/color/:key", async (req, res) => {
    const { key } = req.params;

    await deleteColor ({ key });
    return res.sendStatus(204);

});


module.exports = {
    apiRouter,
};