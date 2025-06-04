// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  // 这里可以根据业务需求添加用户信息存储逻辑
  return {
    userInfo: {
      openid: openid
    }
  }
}