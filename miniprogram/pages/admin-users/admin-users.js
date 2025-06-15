// pages/admin-users/admin-users.js
const { callCloudFunction } = require('../../utiles/cloudFunctionUtils.js');

Page({
  data: {
    users: []
  },
  onLoad() {
    const app = getApp();
    const db = app.db;
    db.collection('users').get({
      success: res => {
        this.setData({
          users: res.data
        });
      },
      fail: err => {
        console.error('查询用户数据失败', err);
      }
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
    const app = getApp();
    const db = app.db;
    // 调用数据库更新操作来封禁用户，例如添加一个 isBanned 字段
    db.collection('users').doc(userId).update({
      data: {
        isBanned: true
      },
      success: res => {
        wx.showToast({
          title: '用户已封禁',
          icon: 'success'
        });
        const users = this.data.users.filter(user => user._id !== userId);
        this.setData({
          users
        });
      },
      fail: err => {
        console.error('封禁用户失败', err);
        wx.showToast({
          title: '封禁用户失败',
          icon: 'none'
        });
      }
    });
  }
});