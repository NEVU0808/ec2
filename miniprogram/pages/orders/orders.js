// pages/orders/orders.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    loading: false,
    error: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getOrders();
  },

  /**
   * 获取订单列表
   */
  getOrders() {
    this.setData({ loading: true, error: null });
    const app = getApp();
    const db = app.db;
    const userInfo = app.globalData.userInfo;

    // 检查 userInfo 是否存在
    if (!userInfo || !userInfo._id) {
      console.error('用户信息为空或缺少 _id 属性');
      this.setData({
        error: '请先登录',
        loading: false
      });
      wx.navigateTo({
        url: '/pages/login/login'
      });
      return;
    }

    const userId = userInfo._id;

    db.collection('orders')
      .where({
        playerId: userId
      })
      .get({
        success: res => {
          this.setData({
            orders: res.data,
            loading: false
          });
        },
        fail: err => {
          console.error('查询订单数据失败', err);
          this.setData({
            error: '查询订单数据失败，请重试',
            loading: false
          });
        }
      });
  },

  /**
   * 查看订单详情
   */
  viewOrderDetail(e) {
    const orderId = e.currentTarget.dataset.id;
    console.log(`用户查看订单详情，订单 ID：${orderId}`);
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?orderId=${orderId}`
    });
  },

  /**
   * 添加订单
   */
  addOrder() {
    console.log('用户点击了添加订单按钮');
    // 这里可以添加添加订单的逻辑，例如跳转到添加订单页面
    wx.navigateTo({
      url: '/pages/add-order/add-order' // 假设存在添加订单的页面
    });
  },

  /**
   * 退出登录
   */
  logout() {
    const app = getApp();
    app.logout();
  }
});