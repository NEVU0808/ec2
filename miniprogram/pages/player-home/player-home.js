// pages/withdraw-record/withdraw-record.js
Page({
  data: {
    user: null,
    recentOrders: []
  },
  onLoad() {
    // 模拟用户信息和最新订单信息
    this.setData({
      user: { username: '张三' },
      recentOrders: [
        { id: 1, title: '订单1', price: 100 },
        { id: 2, title: '订单2', price: 200 }
      ]
    });
  },
  navigateToOrders() {
    wx.navigateTo({
      url: '/pages/orders/orders'
    });
  },
  navigateToProfile() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    });
  },
  navigateToStatistics() {
    wx.navigateTo({
      url: '/pages/statistics/statistics'
    });
  }
});