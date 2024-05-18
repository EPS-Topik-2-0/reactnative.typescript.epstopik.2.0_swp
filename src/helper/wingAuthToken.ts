import axios from "axios";
import qs from 'qs';

export const wingAuthToken=async(callback:(res:unknown)=>void)=>{
   const data = {
     username: "online.hrddeeplink",
     password: "914bade01fd32493a0f2efc583e1a5f6",
     client_id: "third_party",
     client_secret: "16681c9ff419d8ecc7cfe479eb02a7a",
     grant_type: "password"
   };
   const URL_WING_DEEP_LINK = "https://ir.wingmoney.com:9443/RestEngine";
   try {
     const formData = qs.stringify(data);
     axios.post(`${URL_WING_DEEP_LINK}/oauth/token`, formData, {
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       }
     })
     .then(response => {
       return callback({
         err_code:200,
         data:response.data
       });
     })
     .catch(error => {
       return callback({
         err_code:400,
         data:error
       });
     });
   } catch (er) {
     return callback({
       err_code:400,
       data:er
     })
   }
 }