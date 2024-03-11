import { setLocalStore } from "./localStore";
import { removeLocalStore } from "./localStore";
import RootValriable from "../api";
export async function login(key: string, token: string) {
  try {
    var result = await setLocalStore(key, token)
      .then((_set) => {
        if (_set) {
          return true;
        }
        return false;
      })
      .catch(() => {
        return false;
      });
    return result;
  } catch (e: any) {
    console.log(e.message);
  }
}

export function logout() {
  try {
    var logoutKeystore = [
      RootValriable.localKeys["@token"],
      RootValriable.localKeys["@user"],
    ];
    if (logoutKeystore.length > 0) {
      for (let i = 0; i < logoutKeystore.length - 1; i++) {
        removeLocalStore(logoutKeystore[i]);
      }
      return true;
    }
  } catch (e: any) {}
}
