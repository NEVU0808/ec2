// miniprogram/utils/auth.js
const app = getApp();

export function redirectToLogin() {
  if (!app.isUserLoggedIn()) {
    app.login();
    return false;
  }
  return true;
}