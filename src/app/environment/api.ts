export class API {
  static SERVER =
    "https://01923057-59e4-4822-95f6-a446588754ff.mock.pstmn.io/wifisoft";
  static API = "/api/v1";
  static BASE = this.SERVER + this.API;

  // LANDING
  static HEADER = "/page/header";
  static PACKAGES = "/page/packs";
  static ABOUT = "/page/about";

  // AUTH
  static LOGIN = "/login";
  static REGISTER = "/register";

  // DASHBOARD
  static USER_INFO = "/user";
  static PACK = "/pack";
  static VOUCHER = "/pack/voucher";
}
