
import 'reflect-metadata';
import 'express-async-errors';
import express from 'express'
import { Cron } from './cron'

import '@shared/infra/typeorm';
import '@shared/container';
import CacheManager from 'lib/CacheManager';
import Queue from 'lib/Queue';
import queueConfig from '@config/queue';

const app = express()
const queue = new Queue(queueConfig.url)

CacheManager.connect()
Cron.scheduler()
queue.start()

export { app };