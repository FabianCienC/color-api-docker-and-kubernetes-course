const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { healthRouter } = require("./routes/health");
const { apiRouter } = require("./routes/api");
const { rootRouter } = require("./routes/root");

const app = express();
const port = 3000;


const delay_startup = process.env.DELAY_STARTUP === "true";
console.log(`Delay startup : ${delay_startup}`);

app.use(bodyParser.json());
app.use("/", rootRouter);
app.use("/", healthRouter);
app.use("/api", apiRouter);

if (delay_startup) {
    const start = Date.now();

    while (Date.now() - start < 60000) { }
}

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(port, () => {
            console.log(`Color api listen in port ${port}`)
        });
    })
    .catch((err) => {
        console.error("Coudl not connect to MongoDB");
        console.error(err);
    });