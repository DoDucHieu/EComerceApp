import pino from "pino"
import dayjs from "dayjs"
import { timeStamp } from "console"


const log =pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      },
    },
  })

export default log;