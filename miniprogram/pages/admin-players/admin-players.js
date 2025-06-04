// pages/admin-players/admin-players.js
const { callCloudFunction } = require('../../utiles/cloudFunctionUtils.js');

Page({
  data: {
    players: []
  },
  onLoad() {
    const mockPlayers = [
      {
        id: 1,
        name: '陪玩 A',
        phone: '13700137000'
      },
      {
        id: 2,
        name: '陪玩 B',
        phone: '13600136000'
      }
    ];
    this.setData({
      players: mockPlayers
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
    // 这里可以添加禁用陪玩的逻辑，例如调用 API 禁用陪玩
    wx.showToast({
      title: '陪玩已禁用',
      icon: 'success'
    });
    const players = this.data.players.filter(player => player.id !== playerId);
    this.setData({
      players
    });
  }
});