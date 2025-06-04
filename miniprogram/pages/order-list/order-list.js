// pages/order-list/order-list.js
Page({
  data: {
    orders: []
  },
  onLoad() {
    const mockOrders = [
      {
        id: 1,
        serviceName: '热门游戏陪玩服务',
        price: 50,
        status: '已完成'
      },
      {
        id: 2,
        serviceName: '竞技游戏陪练服务',
        price: 80,
        status: '待支付'
      }
    ];
    this.setData({
      orders: mockOrders
    });
  },
  viewOrderDetail(e) {
    const orderId = e.currentTarget.dataset.orderId;
    console.log(`用户查看订单详情，订单 ID：${orderId}`);
    // 这里可以添加跳转到订单详情页的逻辑
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?orderId=${orderId}`
    });
  }
});