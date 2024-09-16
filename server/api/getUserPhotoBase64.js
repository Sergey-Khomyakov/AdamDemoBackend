import axios from 'axios';
import {Bot} from "../../index.js";
import config from '../../secret.json' assert { type: 'json' };
export const getUserPhotoBase64 = async (req, res) => {
    try{
        console.log(req.query.userId);
        const userId = req.query.userId;
        const userPhotos = await Bot.getUserProfilePhotos(userId);
        
        if(userPhotos.total_count > 0){
            const photoFileId = userPhotos.photos[0][0].file_id;
            
            const file = await Bot.getFile(photoFileId);
            const {file_path} = file;
            const photoUrl = `https://api.telegram.org/file/bot${config.tokеn}/${file_path}`;

            // Загружаем изображение и преобразуем в Base64
            const response = await axios.get(photoUrl, { responseType: 'arraybuffer' });
            const base64Image = Buffer.from(response.data, 'binary').toString('base64');

            res.status(200).json({ photo: base64Image });
        }else{
            res.status(200).json({ photo: null })
        }

    }catch(e){
        res.status(500).json({message: "Что-то пошло не так", error: e})
    }
}