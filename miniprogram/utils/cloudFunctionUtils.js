// ec2/miniprogram/utils/cloudFunctionUtils.js
const callCloudFunction = async (name, data = {}) => {
  try {
    const res = await wx.cloud.callFunction({
      name,
      data
    });
    return res.result;
  } catch (error) {
    console.error(`调用云函数 ${name} 失败`, error);
    throw error;
  }
};

module.exports = {
  callCloudFunction
};