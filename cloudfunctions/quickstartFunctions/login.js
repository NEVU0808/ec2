// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV // 使用当前云环境
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  
  try {
    // 检查用户是否已存在于数据库中
    const userRecord = await db.collection('users').where({
      _openid: openid
    }).get()
    
    let userInfo
    
    if (userRecord.data.length === 0) {
      // 用户不存在，创建新用户记录
      const now = new Date()
      
      const newUser = {
        _openid: openid,
        created_at: now,
        updated_at: now,
        // 可以添加更多用户默认信息
        roles: ['user'], // 默认角色
        profile: {
          nickname: `用户${openid.substring(0, 8)}`, // 默认昵称
          avatarUrl: '', // 默认头像
          gender: 0, // 性别，0表示未知
        }
      }
      
      // 保存新用户到数据库
      await db.collection('users').add({
        data: newUser
      })
      
      userInfo = newUser
    } else {
      // 用户已存在，更新用户信息
      userInfo = userRecord.data[0]
      
      // 更新最后登录时间
      await db.collection('users').doc(userInfo._id).update({
        data: {
          updated_at: new Date()
        }
      })
    }
    
    return {
      success: true,
      userInfo: {
        openid: userInfo._openid,
        created_at: userInfo.created_at,
        updated_at: userInfo.updated_at,
        roles: userInfo.roles,
        profile: userInfo.profile
      }
    }
  } catch (error) {
    console.error('登录云函数错误:', error)
    return {
      success: false,
      error: error.message,
      userInfo: {
        openid: openid
      }
    }
  }
}