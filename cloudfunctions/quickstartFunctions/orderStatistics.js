// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { startTime, endTime } = event
    const orders = await db.collection('orders')
      .where({
        createTime: db.command.gte(startTime).lte(endTime)
      })
      .get()

    const gameOrderCount = orders.data.length
    let orderAmount = 0
    let refundOrderCount = 0
    let refundAmount = 0

    orders.data.forEach(order => {
      if (order.status === '已完成') {
        orderAmount += order.price
      }
      if (order.status === '已退款') {
        refundOrderCount++
        refundAmount += order.price
      }
    })

    return {
      gameOrderCount,
      orderAmount,
      refundOrderCount,
      refundAmount
    }
  } catch (e) {
    console.error(e)
    return e
  }
}