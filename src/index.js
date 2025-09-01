const express = require("express");

const { healthRouter } = require("./routes/health");
const { apiRouter } = require("./routes/api");
const { rootRouter } = require("./routes/root");

const app = express();
const port = 3000;


const delay_startup = process.env.DELAY_STARTUP === "true";
console.log(`Delay startup : ${delay_startup}`);


app.use("/", rootRouter);
app.use("/", healthRouter);
app.use("/api", apiRouter);

if (delay_startup) {
    const start = Date.now();
    
    while (Date.now() - start < 60000) {}
}

app.listen(port, () => {
    console.log(`Color api listen in port ${port}`)
});