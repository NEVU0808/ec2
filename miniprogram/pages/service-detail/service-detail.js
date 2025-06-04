// pages/service-detail/service-detail.js
Page({
  data: {
    service: null
  },
  onLoad(options) {
    const serviceId = options.serviceId;
    const mockService = {
      id: serviceId,
      name: '热门游戏陪玩服务',
      price: 50,
      description: '专业陪玩，带你畅玩游戏'
    };
    this.setData({
      service: mockService
    });
  },
  bookService() {
    console.log('用户预订了服务');
    // 这里可以添加预订服务的逻辑，例如调用 API 提交订单
    wx.showToast({
      title: '预订成功',
      icon: 'success'
    });
  }
});