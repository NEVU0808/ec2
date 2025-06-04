// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { orderId } = event
    const res = await db.collection('orders').doc(orderId).update({
      data: {
        status: '已完成'
      }
    })
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}