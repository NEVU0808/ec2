// pages/player-home/player-home.js
Page({
  data: {
    user: null,
    recentOrders: []
  },
  onLoad() {
    const app = getApp();
    const db = app.db;
    const userId = app.globalData.userInfo._id; // 假设用户信息中有 _id

    // 获取用户信息
    db.collection('users').doc(userId).get({
      success: res => {
        this.setData({
          user: res.data
        });
      },
      fail: err => {
        console.error('查询用户数据失败', err);
      }
    });

    // 获取最新订单信息
    db.collection('orders')
      .where({
        playerId: userId
      })
      .orderBy('date', 'desc')
      .limit(2)
      .get({
        success: res => {
          this.setData({
            recentOrders: res.data
          });
        },
        fail: err => {
          console.error('查询订单数据失败', err);
        }
      });
  },
  navigateToOrderList() {
    wx.navigateTo({
      url: '/pages/order-list/order-list'
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