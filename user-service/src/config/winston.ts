import winston from 'winston';

// Imports the Google Cloud client library for Winston
import { LoggingWinston } from '@google-cloud/logging-winston';

const loggingWinston = new LoggingWinston();

// Create a Winston logger that streams to Cloud Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
export const glogger = winston.createLogger({
    level: 'info',
    defaultMeta: { service: process.env.SERVICE_LOG_LABEL, version: 'v1.0', environment: process.env.NODE_ENV ? 'production' : 'development' },
    transports: [
        new winston.transports.Console(),
        // Add Cloud Logging
        loggingWinston,
    ],
});

