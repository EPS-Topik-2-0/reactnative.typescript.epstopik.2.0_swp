import CryptoJS from 'crypto-js';

export const wingHash=(dataMake:unknown,callback:(res:unknown)=>void)=>{
   try {
     const aToken = Object(dataMake).access_token;
     const payloadData = dataMake;
     const amount = parseFloat(Object(payloadData)?.amount).toFixed(2);
     const currency = Object(payloadData)?.currency;
     const merchant_id = Object(payloadData)?.merchant_id;
     const order_reference_no = Object(payloadData)?.order_reference_no;
     const schema_url = Object(payloadData)?.schema_url;
     const token = aToken;
     const password = `${token}`.replace(/-/g, "");
     const SALT = "WINGBANK";
 
     // Create a key using PBKDF2
     const key = CryptoJS.PBKDF2(password, SALT, { keySize: 32 / 4, iterations: 65536, hasher: CryptoJS.algo.SHA256 });
 
     const strdt_org = `${amount}#${currency}#${merchant_id}#${order_reference_no}#${schema_url}`;
     // Step 1: Base64 encoding
     const step1Base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(strdt_org));
     // Step 2: AES encryption
     const payloadEncrypted = CryptoJS.AES.encrypt(step1Base64, key, { iv: CryptoJS.enc.Hex.parse('00000000000000000000000000000000') }).toString();
     // Step 3: Base64 encoding
     const step3Base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(payloadEncrypted));
     // Step 4: SHA256 hash
     const stringHash = CryptoJS.SHA256(step3Base64).toString(CryptoJS.enc.Hex).toUpperCase();
 
     const requestData = {
       username: merchant_id,
       hash: stringHash,
       sandbox: strdt_org,
       token: password,
       payloadData: payloadData
     };
 
     return callback({ data: requestData, err_code: 200 });
   } catch (error) {
     return callback({ data: error, err_code: 400 });
   }
 }
 