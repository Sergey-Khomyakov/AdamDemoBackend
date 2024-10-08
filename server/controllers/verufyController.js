import CryptoJS from "crypto-js";
import config from './../../secret.json' assert { type: 'json' };
export const verifyTelegramWebAppData = async (telegramInitData) =>{
    try{
        const initData = new URLSearchParams(telegramInitData);
        //console.log("telegramInitData", initData);
        const hash = initData.get("hash");
        const userData = {
            query_id: initData.get("query_id"),
            user: JSON.parse(initData.get("user")),
            auth_date: initData.get("auth_date"),
        }
        
        //console.log("userData", userData);
        let dataToCheck = [];
    
        initData.sort();
        initData.forEach(
            (val, key) => key !== "hash" && dataToCheck.push(`${key}=${val}`)
        );
    
        const secret = CryptoJS.HmacSHA256(config.tokеn, "WebAppData");
        const _hash = CryptoJS.HmacSHA256(dataToCheck.join("\n"), secret).toString(CryptoJS.enc.Hex);
    
        const isVerify = hash === _hash;
    
        return {isVerify, userData};
    }catch(e){
        console.log(e);
        return {isVerify: false, userData: {}}
    }
}

export const verifyTelegramInitData = async (req, res) => {
    try{
        const { initData } = req.body;
        const {isVerify, userData} = await verifyTelegramWebAppData(initData);
        console.log(isVerify)
        if(isVerify){
            res.status(200).json({...userData})
        }else{
            res.status(403).json({message : "Нет доступа"});
        }
    }catch(e){
        res.status(500).json({message: "Что-то пошло не так", error: e})
    }
}