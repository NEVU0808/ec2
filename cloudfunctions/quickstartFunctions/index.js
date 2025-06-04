// cloudfunctions/getOrderDetail/index.js
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const res = await db.collection('orders')
      .doc(event.orderId)
      .get()
      
    return {
      success: true,
      data: res.data
    }
  } catch (e) {
    console.error('获取订单详情失败', e)
    return {
      success: false,
      error: e.message
    }
  }
}