// 登录页面逻辑 (pages/login/login.js)
Page({
  handleWechatLogin: function() {
    // 显示加载提示
    wx.showLoading({
      title: '登录中...',
      mask: true
    });
    
    // 调用云函数获取用户信息
    wx.cloud.callFunction({
      name: 'login', // 云函数名称
      success: (res) => {
        // 隐藏加载提示
        wx.hideLoading();
        
        // 获取用户信息
        const userInfo = res.result.userInfo;
        
        // 保存用户信息到本地缓存
        wx.setStorage({
          key: 'userInfo',
          data: userInfo,
          success: () => {
            // 通知App登录成功
            const app = getApp();
            app.onLoginSuccess(userInfo);
          },
          fail: (err) => {
            wx.showToast({
              title: '登录失败，请重试',
              icon: 'none'
            });
            console.error('保存用户信息失败', err);
          }
        });
      },
      fail: (err) => {
        // 隐藏加载提示
        wx.hideLoading();
        
        wx.showToast({
          title: '登录失败，请重试',
          icon: 'none'
        });
        console.error('调用云函数失败', err);
      }
    });
  }
});