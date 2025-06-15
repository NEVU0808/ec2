Page({
  data: {
    user: null
  },

  onLoad() {
    this.loadUserInfo();
  },

  onShow() {
    this.loadUserInfo();
  },

  loadUserInfo() {
    const user = wx.getStorageSync('user');
    if (user) {
      this.setData({ user });
    }
  },

  navigateToOrders() {
    wx.navigateTo({
      url: '/pages/orders/orders'
    });
  },

  navigateToTransactions() {
    wx.navigateTo({
      url: '/pages/transactions/transactions'
    });
  },

  navigateToWithdrawals() {
    wx.navigateTo({
      url: '/pages/withdrawals/withdrawals'
    });
  },

  navigateToSecurity() {
    wx.navigateTo({
      url: '/pages/security/security'
    });
  },
  logout() {
    // 清除本地存储的用户信息
    wx.removeStorageSync('user');
    const app = getApp();
    app.globalData.userInfo = null;
    // 跳转到登录页面
    wx.reLaunch({
      url: '/pages/login/login'
    });
  }
});