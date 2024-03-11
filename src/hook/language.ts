import { setLocalStore } from "./localStore";
import RootValriable from "../api";
export async function setLanguageLocal(languageString: string) {
  try {
    var result = await setLocalStore(
      RootValriable.localKeys["@lang"],
      languageString
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
