// pages/player-orders/player-orders.js
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
        status: '待接单'
      }
    ];
    this.setData({
      orders: mockOrders
    });
  },
  acceptOrder(e) {
    const orderId = e.currentTarget.dataset.orderId;
    console.log(`陪玩接受订单，订单 ID：${orderId}`);
    // 这里可以添加接单的逻辑，例如调用 API 更新订单状态
    wx.showToast({
      title: '接单成功',
      icon: 'success'
    });
    const orders = this.data.orders.map(order => {
      if (order.id === orderId) {
        order.status = '进行中';
      }
      return order;
    });
    this.setData({
      orders
    });
  },
  completeOrder(e) {
    const orderId = e.currentTarget.dataset.orderId;
    console.log(`陪玩完成订单，订单 ID：${orderId}`);
    // 这里可以添加完成订单的逻辑，例如调用 API 更新订单状态
    wx.showToast({
      title: '订单完成',
      icon: 'success'
    });
    const orders = this.data.orders.map(order => {
      if (order.id === orderId) {
        order.status = '已完成';
      }
      return order;
    });
    this.setData({
      orders
    });
  }
});