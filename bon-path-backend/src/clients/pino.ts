import pino from "pino"

export const PinoClient = pino({
    level: 'error',
    transport: {
        target: 'pino/file',
        options: {
            destination: 'logs/error.log',
            mkdir: true
        }
    }
})