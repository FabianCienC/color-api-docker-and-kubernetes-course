const express = require("express");
const { getHostname } = require("../utils");
const { getColor } = require("../db/color")

const rootRouter = express.Router();


rootRouter.get("/", async (req, res) => {
    console.log("Antes de fetch")
    const { colorKey } = req.query; // localhost/api?format=text
    console.log("despues de fetch")
    const hostname = getHostname();
    
    const color = await getColor({ key: colorKey });

    res.send(`<h1 style="color:${color};">    Hello from color-api!    </h1>
<h2>   Hostname: ${hostname} </h2>`);
})

module.exports = {
    rootRouter,
}