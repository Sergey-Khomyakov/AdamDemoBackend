import TelegramBot from 'node-telegram-bot-api';
import config from './../secret.json' assert { type: 'json' };

export default function launchBot(){
    const token = config.tokеn;
    const bot = new TelegramBot(token, {polling: true});


    bot.onText(/\/echo (.+)/, (msg, match) => {

        const chatId = msg.chat.id;
        const resp = match[1]; // the captured "whatever"
    
        bot.sendMessage(chatId, resp);
    });
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
    
        bot.sendMessage(chatId, 'Received your message');
    });
}