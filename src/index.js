import "dotenv/config";
import express from "express";

const app = express();

/**
 * Enables the use of the keyword __dirname.
 */
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

import bodyParser from "body-parser";
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

import dashboardRouter from "./routers/dashboard-router.js";
app.use("/", dashboardRouter);

app.listen(process.env.APPLICATION_SERVER_PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Application is running of port: ${ process.env.APPLICATION_SERVER_PORT }`);    
    }
});