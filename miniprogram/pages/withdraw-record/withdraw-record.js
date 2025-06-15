// pages/withdraw-record/withdraw-record.js
Page({
  data: {
    withdrawRecords: []
  },
  onLoad(options) {
    const app = getApp();
    const db = app.db;
    const userId = app.globalData.userInfo._id; // 假设用户信息中有 _id

    db.collection('withdrawRecords')
      .where({
        userId
      })
      .get({
        success: res => {
          this.setData({
            withdrawRecords: res.data
          });
        },
        fail: err => {
          console.error('查询提现记录失败', err);
        }
      });
  }
});