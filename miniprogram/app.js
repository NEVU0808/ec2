// app.js
App({
  globalData: {
    env: "ec2-0gmiv6901398bd7a", // 请替换为正确的云开发环境ID
    userInfo: null,
    isLoggedIn: false,
    loginReady: false
  },
  
  pendingPages: [],
  
  onLaunch: function () {
    // 初始化云开发
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: this.globalData.env,
        traceUser: true,
      });
    }
    
    // 检查登录状态
    this.checkLoginStatus()
      .then(userInfo => {
        console.log('用户已登录');
        this.globalData.userInfo = userInfo;
        this.globalData.isLoggedIn = true;
      })
      .catch(err => {
        console.log('用户未登录', err);
        this.globalData.isLoggedIn = false;
        // 若获取存储失败，提示用户并可考虑跳转到登录页
        wx.showToast({
          title: '请先登录',
          icon: 'none'
        });
      })
      .finally(() => {
        this.globalData.loginReady = true;
        this._checkPendingPages();
      });
  },
  
  // 检查登录状态
  checkLoginStatus: function() {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: 'userInfo',
        success: (res) => {
          if (res.data && res.data.openid) {
            console.log('从本地存储获取用户信息成功');
            resolve(res.data);
          } else {
            console.log('本地存储中的用户信息无效');
            reject(new Error('Invalid userInfo'));
          }
        },
        fail: (err) => {
          console.log('获取本地存储失败', err);
          reject(err);
        }
      });
    });
  },
  
  // 登录方法
  login: function() {
    return new Promise((resolve, reject) => {
      wx.navigateTo({
        url: '/pages/login/login',
        success: () => {
          this.loginCallback = resolve;
        },
        fail: (err) => {
          console.error('跳转到登录页失败', err);
          wx.showToast({
            title: '无法跳转到登录页，请重试',
            icon: 'none'
          });
          reject(err);
        }
      });
    });
  },
  
  // 登录成功后调用
  onLoginSuccess: function(userInfo) {
    // 保存用户信息到全局数据
    this.globalData.userInfo = userInfo;
    this.globalData.isLoggedIn = true;
    
    // 保存用户信息到本地存储
    wx.setStorage({
      key: 'userInfo',
      data: userInfo,
      success: () => {
        console.log('用户信息已保存到本地存储');
        
        // 执行登录回调（如果有）
        if (typeof this.loginCallback === 'function') {
          this.loginCallback(userInfo);
          this.loginCallback = null;
        }
        
        // 返回上一页
        wx.navigateBack();
      },
      fail: (err) => {
        console.error('保存用户信息失败', err);
        wx.showToast({
          title: '保存用户信息失败，请重试',
          icon: 'none'
        });
        // 可考虑再次尝试保存或者执行其他操作
      }
    });
  },
  
  // 登出方法
  logout: function() {
    // 清除全局数据
    this.globalData.userInfo = null;
    this.globalData.isLoggedIn = false;
    
    // 清除本地存储
    wx.removeStorage({
      key: 'userInfo',
      success: () => {
        console.log('用户已登出，本地存储已清除');
        
        // 跳转到登录页
        const currentPages = getCurrentPages();
        if (currentPages.length > 0 && currentPages[currentPages.length - 1].route !== 'pages/login/login') {
          wx.navigateTo({
            url: '/pages/login/login'
          });
        }
      },
      fail: (err) => {
        console.error('清除本地存储失败', err);
        wx.showToast({
          title: '清除本地存储失败，请重试',
          icon: 'none'
        });
      }
    });
  },
  
  // 添加待检查的页面
  addPendingPage: function(page) {
    if (!this.pendingPages) {
      this.pendingPages = [];
    }
    
    this.pendingPages.push(page);
    
    // 如果登录流程已完成，立即检查
    if (this.globalData.loginReady) {
      this._checkPendingPages();
    }
  },
  
  // 检查所有待处理页面
  _checkPendingPages: function() {
    const { isLoggedIn, loginReady } = this.globalData;
    
    if (this.pendingPages && this.pendingPages.length > 0) {
      this.pendingPages.forEach(page => {
        if (loginReady) {
          if (!isLoggedIn && page.needLogin) {
            page.navigateToLogin();
          } else {
            page.onLoadAfterLogin();
          }
        }
      });
      
      // 清空队列
      this.pendingPages = [];
    }
  },
  
  // 检查用户是否已登录（同步方法）
  isUserLoggedIn: function() {
    return this.globalData.isLoggedIn;
  },
  
  // 获取当前用户信息
  getUserInfo: function() {
    return this.globalData.userInfo;
  }
});