// utils/base_page.js
module.exports = {
  // 页面混入
  pageMixin: {
    data: {
      loginChecked: false
    },
    
    // 页面onLoad时调用
    onLoad: function(options) {
      const app = getApp();
      
      // 标记需要登录
      this.needLogin = true;
      
      // 保存原始onLoad参数
      this._onLoadOptions = options;
      
      // 添加到待检查队列
      app.addPendingPage(this);
    },
    
    // 导航到登录页
    navigateToLogin: function() {
      const app = getApp();
      
      // 如果已经在登录页，不重复跳转
      const pages = getCurrentPages();
      if (pages.length > 0 && pages[pages.length - 1].route === 'pages/login/login') {
        return;
      }
      
      // 保存当前页面路径，用于登录后返回
      const currentRoute = pages.length > 0 ? pages[pages.length - 1].route : '';
      if (currentRoute) {
        app.loginRedirect = currentRoute;
      }
      
      // 跳转到登录页
      app.login();
    },
    
    // 登录完成后执行原始onLoad
    onLoadAfterLogin: function() {
      // 如果已经检查过，不再重复执行
      if (this.data.loginChecked) return;
      
      // 执行原始onLoad逻辑
      if (typeof this._originalOnLoad === 'function') {
        this._originalOnLoad(this._onLoadOptions);
      }
      
      // 标记已检查
      this.setData({ loginChecked: true });
    }
  },
  
  // 创建需要登录的页面
  createPage: function(pageConfig) {
    // 保存原始onLoad
    const originalOnLoad = pageConfig.onLoad;
    
    // 替换onLoad
    pageConfig.onLoad = function(options) {
      // 调用混入的onLoad
      this.onLoad(options);
      
      // 保存原始onLoad
      this._originalOnLoad = originalOnLoad;
    };
    
    // 合并混入
    return Object.assign({}, this.pageMixin, pageConfig);
  }
};