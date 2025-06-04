// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { serviceName, price } = event
    const res = await db.collection('orders').add({
      data: {
        serviceName,
        price,
        status: '待接单',
        createTime: db.serverDate()
      }
    })
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}