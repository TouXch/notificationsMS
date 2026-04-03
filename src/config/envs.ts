import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    DATABASE_URL: string
    NATS_SERVERS: string[];
}

const envSchema = joi.object({
    DATABASE_URL: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required()
}).unknown(true);

const {error, value} = envSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
});

if (error){
    throw new Error(`Problem with environment variables: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    databaseUrl: envVars.DATABASE_URL,
    natsServers: envVars.NATS_SERVERS
}