import { keystores } from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const sendMessagePushBackError = async(messageText: string) => {
  await AsyncStorage.getItem(keystores.sideInfo).then(async (info:any)=>{
    if(info && typeof info!=='undefined'){
      const dataInfo=JSON.parse(info);
      const botToken = dataInfo?.token; // Replace with your Telegram bot token
      const chatId =dataInfo?.id; // Replace with the chat ID of the user you want to message
      try {
        await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
            messageText
          )}`
        );
      } catch (error) {
        console.error('Error sending message:', Object(error).message);
      }
    }
  })
};
