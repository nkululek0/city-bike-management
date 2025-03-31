import "dotenv/config";
import express from "express";

const app = express();

app.listen(process.env.APPLICATION_SERVER_PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Application is running of port: ${ process.env.APPLICATION_SERVER_PORT }`);    
    }
});