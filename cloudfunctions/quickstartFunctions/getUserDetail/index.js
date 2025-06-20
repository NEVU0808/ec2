// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const userId = event.userId
  try {
    const res = await db.collection('users').doc(userId).get()
    return res.data
  } catch (e) {
    console.error(e)
    return null
  }
}