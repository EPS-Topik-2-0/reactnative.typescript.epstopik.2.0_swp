import {
  Platform,
  Linking
} from "react-native";

const PLAY_STORE_WING_BANK='https://play.google.com/store/apps/details?id=com.wingmoney.wingpay&pcampaignid=web_share';
const APP_STORE_WING_BANK="https://apps.apple.com/kh/app/wing-bank/id1113286385";
export const wingGotoStore=async()=>{
  if(Platform.OS==='ios'){
   return Linking.openURL(APP_STORE_WING_BANK);
  }else{
    return Linking.openURL(PLAY_STORE_WING_BANK);
  }
}