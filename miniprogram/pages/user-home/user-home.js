// pages/user-home/user-home.js
Page({
  data: {
    welcomeMessage: '欢迎来到陪玩平台，开启游戏之旅！'
  },
  onLoad() {
    console.log('用户首页加载');
  },
  onButtonClick() {
    console.log('用户点击了按钮');
    // 这里可以添加跳转页面的逻辑，例如跳转到服务列表页
    wx.navigateTo({
      url: '/pages/service-list/service-list'
    });
  }
});