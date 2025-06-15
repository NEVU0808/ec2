// pages/player-services/player-services.js
Page({
  data: {
    services: []
  },
  onLoad() {
    const app = getApp();
    const db = app.db;
    db.collection('services').get({
      success: res => {
        this.setData({
          services: res.data
        });
      },
      fail: err => {
        console.error('查询服务数据失败', err);
      }
    });
  },
  editService(e) {
    const serviceId = e.currentTarget.dataset.serviceId;
    console.log(`编辑服务，服务 ID：${serviceId}`);
    // 这里可以添加编辑服务的逻辑，例如跳转到编辑页面
  },
  deleteService(e) {
    const serviceId = e.currentTarget.dataset.serviceId;
    console.log(`删除服务，服务 ID：${serviceId}`);
    const app = getApp();
    const db = app.db;
    db.collection('services').doc(serviceId).remove({
      success: res => {
        wx.showToast({
          title: '服务已删除',
          icon: 'success'
        });
        const services = this.data.services.filter(service => service._id !== serviceId);
        this.setData({
          services
        });
      },
      fail: err => {
        console.error('删除服务失败', err);
        wx.showToast({
          title: '删除服务失败',
          icon: 'none'
        });
      }
    });
  },
  addService() {
    console.log('添加服务');
    // 这里可以添加添加服务的逻辑，例如跳转到添加页面
  }
});