const express = require("express");
const { getColor, getHostname } = require("../utils");

const rootRouter = express.Router();


rootRouter.get("/", (req, res) => {
    const hostname = getHostname();
    const color = getColor();

    res.send(`<h1 style="color:${color};">    Hello from color-api!    </h1>
<h2>   Hostname: ${hostname} </h2>`);
})

module.exports = {
    rootRouter,
}