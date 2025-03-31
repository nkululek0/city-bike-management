import "dotenv/config";
import express from "express";

const app = express();

import bodyParser from "body-parser";
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

import dashboardRouter from "./routers/dashboard-router.js";
app.use("/dashboard", dashboardRouter);

app.listen(process.env.APPLICATION_SERVER_PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Application is running of port: ${ process.env.APPLICATION_SERVER_PORT }`);    
    }
});