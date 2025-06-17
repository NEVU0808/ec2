// pages/service-detail/service-detail.js
const { callCloudFunction } = require('../../utils/cloudFunctionUtils.js');

Page({
  data: {
    service: null
  },
  onLoad(options) {
    const serviceId = options.serviceId;
    const app = getApp();
    const db = app.db;
    db.collection('services').doc(serviceId).get({
      success: res => {
        this.setData({
          service: res.data
        });
      },
      fail: err => {
        console.error('查询服务数据失败', err);
      }
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