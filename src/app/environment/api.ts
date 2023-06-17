export class API {
  static SERVER =
    "https://d3d4-2806-2f0-8080-16f2-69bb-a327-31ce-b822.ngrok-free.app/wifisoft";
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
}
