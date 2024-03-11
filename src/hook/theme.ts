import { setLocalStore } from "./localStore";
import RootValriable from "../api";
export async function setThemeLocal(themeString: string) {
  try {
    var result = await setLocalStore(
      RootValriable.localKeys["@theme"],
      themeString
    )
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
  } catch (e: any) {}
}
