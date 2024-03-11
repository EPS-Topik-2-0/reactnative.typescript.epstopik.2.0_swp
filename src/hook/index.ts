import { logout, login } from "./loginout";
import {
  allLocalStore,
  setLocalStore,
  getLocalStore,
  removeLocalStore,
  containsKeyLocalStore,
} from "./localStore";
import { setThemeLocal } from "./theme";
import { setLanguageLocal } from "./language";
import { getHightChildren } from "./getHightChildren";
const Hook = {
  logout,
  login,
  allLocalStore,
  getLocalStore,
  setLocalStore,
  removeLocalStore,
  containsKeyLocalStore,
  setThemeLocal,
  setLanguageLocal,
  getHightChildren,
};
export default Hook;
