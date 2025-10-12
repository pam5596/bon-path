import pino from "pino"

export const PinoClient = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            destination: 'logs/error.log',
            mkdir: true,
            levelFirst: true,
            singleLine: false,
            translateTime: 'yyyy-mm-dd HH:MM:ss.l'
        },
    }
})