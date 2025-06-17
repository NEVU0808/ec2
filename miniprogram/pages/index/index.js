// ec2/miniprogram/pages/index/index.js
const BasePage = require('/utils/base_page.js');
const { callCloudFunction } = require('/utils/cloudFunctionUtils.js');

Page(BasePage.createPage({
  data: {
    userInfo: null,
    listData: []
  },
  
  onLoad: async function(options) {
    const app = getApp();
    this.setData({ userInfo: app.globalData.userInfo });
    try {
      await this.loadData();
    } catch (error) {
      console.error('加载数据失败', error);
    }
  },
  
  loadData: async function() {
    try {
      const res = await callCloudFunction('quickstartFunctions', { type: 'getData' });
      this.setData({ listData: res });
    } catch (error) {
      console.error('获取数据失败', error);
    }
  },

  // 示例跳转方法
  navigateToOtherPage: function() {
    const app = getApp();
    if (app.interceptNavigate()) {
      wx.navigateTo({
        url: '/pages/other/other'
      });
    }
  }
}));