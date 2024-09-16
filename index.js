import { verifyTelegramInitData } from "./server/controllers/verufyController.js";
import { getUserPhotoBase64 } from "./server/api/getUserPhotoBase64.js";
import { getApplicationShortcut } from "./server/api/getApplicationShortcut.js";
import launchBot from "./bot/bot.js"
import express from 'express';
import https from 'https';
import fs from 'fs';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const options = {
    key: fs.readFileSync('./certs/privkey.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
    rejectUnauthorized: true // отключение SSL верификации, на боевом сервере должно быть true !!
};

app.post('/api/verify', verifyTelegramInitData)
app.get('/api/getUserPhotoBase64', getUserPhotoBase64)
app.get('/api/getApplicationShortcut', getApplicationShortcut)
//app.get('/api/test', test)

const PORT = 443;
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running on https://192.168.0.101:${PORT}`);
});

export const Bot = launchBot();