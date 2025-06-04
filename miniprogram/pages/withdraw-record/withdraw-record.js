// pages/withdraw-record/withdraw-record.js
Page({
  data: {
    withdrawRecords: [
      {
        id: 1,
        amount: 100,
        date: '2024-10-01',
        status: '已完成'
      },
      {
        id: 2,
        amount: 200,
        date: '2024-10-10',
        status: '处理中'
      },
      {
        id: 3,
        amount: 150,
        date: '2024-10-15',
        status: '已拒绝'
      }
    ]
  },
  onLoad(options) {
    // 这里可以添加实际获取提现记录的逻辑，例如调用云函数或接口
    // 目前使用模拟数据
  }
})