import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
export const getApplicationShortcut = async (req, res) => {
    try{
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const filePath = path.join(__dirname, 'AdamWebTG.url');
        const shortcutContent = `
            [InternetShortcut]
            URL=tg://resolve/?domain=adamwebbot&appname=AdamWebDemo`;
        
        // Создание файла
        fs.writeFile(filePath, shortcutContent, (err) => {
            if (err) {
                console.error("Ошибка при создании файла:", err);
                return res.status(500).json({ message: "Ошибка при создании файла", error: err });
            }
            // Отправка файла
            res.setHeader('Content-Type', 'application/octet-stream');
            res.download(filePath, encodeURIComponent('AdamWebTG.url'), (err) => {
                if (err) {
                    console.error("Ошибка при отправке файла:", err);
                    res.status(500).json({ message: "Ошибка при отправке файла", error: err });
                }

                // Удаление файла после отправки (по желанию)
                fs.unlink(filePath, (err) => {
                    if (err) console.error("Ошибка при удалении файла:", err);
                });
            });
        });

    }catch(e){
        res.status(500).json({message: "Что-то пошло не так", error: e})
    }
}