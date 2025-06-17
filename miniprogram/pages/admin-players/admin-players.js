// pages/admin-players/admin-players.js
const { callCloudFunction } = require('../../utils/cloudFunctionUtils.js');

Page({
  data: {
    players: []
  },
  onLoad() {
    const app = getApp();
    const db = app.db;
    db.collection('players').get({
      success: res => {
        this.setData({
          players: res.data
        });
      },
      fail: err => {
        console.error('查询陪玩数据失败', err);
      }
    });
  },
  async viewPlayerDetail(e) {
    const playerId = e.currentTarget.dataset.playerId;
    console.log(`管理员查看陪玩详情，陪玩 ID：${playerId}`);
    try {
      const playerDetail = await callCloudFunction('getPlayerDetail', { playerId });
      if (playerDetail) {
        // 这里可以跳转到陪玩详情页并传递详细信息
        wx.navigateTo({
          url: `/pages/player-detail/player-detail?playerId=${playerId}&playerDetail=${JSON.stringify(playerDetail)}`
        });
      } else {
        wx.showToast({
          title: '获取陪玩详情失败',
          icon: 'none'
        });
      }
    } catch (error) {
      console.error('调用云函数失败', error);
      wx.showToast({
        title: '获取陪玩详情失败',
        icon: 'none'
      });
    }
  },
  disablePlayer(e) {
    const playerId = e.currentTarget.dataset.playerId;
    console.log(`管理员禁用陪玩，陪玩 ID：${playerId}`);
    const app = getApp();
    const db = app.db;
    db.collection('players').doc(playerId).update({
      data: {
        isDisabled: true
      },
      success: res => {
        wx.showToast({
          title: '陪玩已禁用',
          icon: 'success'
        });
        const players = this.data.players.filter(player => player._id !== playerId);
        this.setData({
          players
        });
      },
      fail: err => {
        console.error('禁用陪玩失败', err);
        wx.showToast({
          title: '禁用陪玩失败',
          icon: 'none'
        });
      }
    });
  }
});