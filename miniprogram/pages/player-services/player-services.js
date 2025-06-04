// pages/player-services/player-services.js
Page({
  data: {
    services: []
  },
  onLoad() {
    const mockServices = [
      {
        id: 1,
        name: '热门游戏陪玩服务',
        price: 50,
        description: '专业陪玩，带你畅玩游戏'
      },
      {
        id: 2,
        name: '竞技游戏陪练服务',
        price: 80,
        description: '提升游戏技能，专业陪练'
      }
    ];
    this.setData({
      services: mockServices
    });
  },
  editService(e) {
    const serviceId = e.currentTarget.dataset.serviceId;
    console.log(`陪玩编辑服务，服务 ID：${serviceId}`);
    // 这里可以添加跳转到服务编辑页的逻辑
    wx.navigateTo({
      url: `/pages/service-edit/service-edit?serviceId=${serviceId}`
    });
  },
  deleteService(e) {
    const serviceId = e.currentTarget.dataset.serviceId;
    console.log(`陪玩删除服务，服务 ID：${serviceId}`);
    // 这里可以添加删除服务的逻辑，例如调用 API 删除服务
    wx.showToast({
      title: '服务删除成功',
      icon: 'success'
    });
    const services = this.data.services.filter(service => service.id !== serviceId);
    this.setData({
      services
    });
  },
  addService() {
    console.log('陪玩添加服务');
    // 这里可以添加跳转到服务添加页的逻辑
    wx.navigateTo({
      url: '/pages/service-add/service-add'
    });
  }
});