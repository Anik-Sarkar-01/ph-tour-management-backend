/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server : Server;

const startServer = async() => {
    try {
        await mongoose.connect(envVars.DB_URL);
        console.log("Connected to MongoDB");

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is running on port ${envVars.PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}
startServer();

// unhandled rejection error
process.on("unhandledRejection", (error) => {
    console.error("Unhandled Rejection:", error);
    if(server){
        server.close(() => {
            console.log("Server closed due to unhandled rejection");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});

// uncaught exception error
process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    if(server){
        server.close(() => {
            console.log("Server closed due to uncaught exception");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
}); 

// SIGTERM signal
process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully.");
    if(server){
        server.close(() => {
            console.log("Server closed due to SIGTERM");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
}); 

// SIGINT signal
process.on("SIGINT", () => {        
    console.log("SIGINT received. Shutting down gracefully.");
    if(server){
        server.close(() => {
            console.log("Server closed due to SIGINT");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});