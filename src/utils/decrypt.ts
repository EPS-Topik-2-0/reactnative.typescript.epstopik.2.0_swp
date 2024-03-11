import { AES, enc, mode, pad } from "crypto-js";
import { keystores } from "../constants";
export function decrypt(encrypted: string, key: string) {
  const parsedKey = enc.Utf8.parse(key);
  const decryptedData = AES.decrypt(encrypted, parsedKey, {
    mode: mode.ECB,
    padding: pad.Pkcs7,
  });
  return decryptedData.toString(enc.Utf8);
}

export function defaultDecrypt(encrypted: string) {
  return decrypt(
    encrypted,
    `VITE_APP_ENC_KEY=KaPdSgVkYp3s6v9y\$B&E)H@McQeThWmZ
  `
  );
}
