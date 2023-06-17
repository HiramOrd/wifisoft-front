export class API {
  static SERVER =
    "https://e2a30e3c-0ee7-49f4-84b3-d366c86d15b9.mock.pstmn.io/wifisoft";
    //https://feba19b4-3f0d-4798-9c5b-d83c87725c9a.mock.pstmn.io
  static API = "/api/v1";
  static BASE = this.SERVER + this.API;

  // LANDING
  static HEADER = "/page/header";
  static PACKAGES = "/page/packs";
  static ABOUT = "/page/about";

  // AUTH
  static LOGIN = "/login";
  static REGISTER = "/register";
  static REGISTER_TEMP = "/register/temp";

  // DASHBOARD
  static USER_INFO = "/user";
  static PACK = "/user/historial";

  static BUY_PACK = "/pack";

  static VOUCHER = "/pack/voucher";
  static ADD_VOUCHER = "/pack/voucher/add";
}
