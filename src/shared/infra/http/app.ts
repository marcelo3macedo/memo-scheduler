import express from 'express'
import { Cron } from './cron'

const app = express()

Cron.scheduler()

export { app };