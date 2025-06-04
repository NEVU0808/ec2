// pages/admin-users/admin-users.js
const { callCloudFunction } = require('../../utiles/cloudFunctionUtils.js');

Page({
  data: {
    users: []
  },
  onLoad() {
    const mockUsers = [
      {
        id: 1,
        name: '用户 A',
        phone: '13800138000'
      },
      {
        id: 2,
        name: '用户 B',
        phone: '13900139000'
      }
    ];
    this.setData({
      users: mockUsers
    });
  },
  async viewUserDetail(e) {
    const userId = e.currentTarget.dataset.userId;
    console.log(`管理员查看用户详情，用户 ID：${userId}`);
    try {
      const userDetail = await callCloudFunction('getUserDetail', { userId });
      if (userDetail) {
        // 这里可以跳转到用户详情页并传递详细信息
        wx.navigateTo({
          url: `/pages/user-detail/user-detail?userId=${userId}&userDetail=${JSON.stringify(userDetail)}`
        });
      } else {
        wx.showToast({
          title: '获取用户详情失败',
          icon: 'none'
        });
      }
    } catch (error) {
      console.error('调用云函数失败', error);
      wx.showToast({
        title: '获取用户详情失败',
        icon: 'none'
      });
    }
  },
  banUser(e) {
    const userId = e.currentTarget.dataset.userId;
    console.log(`管理员封禁用户，用户 ID：${userId}`);
    // 这里可以添加封禁用户的逻辑，例如调用 API 封禁用户
    wx.showToast({
      title: '用户已封禁',
      icon: 'success'
    });
    const users = this.data.users.filter(user => user.id !== userId);
    this.setData({
      users
    });
  }
});