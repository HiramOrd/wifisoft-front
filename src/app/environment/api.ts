export class API {
  static SERVER =
    "https://c08f-2806-2f0-8080-16f2-4e67-d514-9b0e-967b.ngrok-free.app/wifisoft";
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
