import dotenv from "dotenv";

dotenv.config();

interface EnvVars {
    PORT: string;
    DB_URL: string;
    NODE_ENV: "development" | "production";
}

const loadEnvVar = (): EnvVars => {
    const requiredVars : string[] = ["PORT", "DB_URL", "NODE_ENV"];

    requiredVars.forEach((key) => {
        if(!process.env[key]){
            throw new Error(`Environment variable ${key} is missing.`);
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
    }
}

export const envVars = loadEnvVar();