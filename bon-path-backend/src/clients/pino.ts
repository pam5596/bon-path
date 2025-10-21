import pino from "pino"

export const PinoClient = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            destination: `logs/${process.env.NODE_ENV}.log`,
            mkdir: true,
            levelFirst: true,
            singleLine: false,
            translateTime: 'yyyy-mm-dd HH:MM:ss.l'
        },
    }
})
