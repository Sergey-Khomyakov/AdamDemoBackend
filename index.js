import { verifyTelegramInitData } from "./server/controllers/verufyController.js";
import launchBot from "./bot/bot.js"
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/verify', verifyTelegramInitData)

const Bot = launchBot();
