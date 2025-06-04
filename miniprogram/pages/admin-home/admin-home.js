// pages/admin-home/admin-home.js
Page({
  data: {
    welcomeMessage: '欢迎进入陪玩平台管理后台！'
  },
  onLoad() {
    console.log('管理首页加载');
  },
  manageUsers() {
    console.log('管理员管理用户');
    // 这里可以添加跳转到用户管理页的逻辑
    wx.navigateTo({
      url: '/pages/admin-users/admin-users'
    });
  },
  managePlayers() {
    console.log('管理员管理陪玩');
    // 这里可以添加跳转到陪玩管理页的逻辑
    wx.navigateTo({
      url: '/pages/admin-players/admin-players'
    });
  }
});