// 封装数据请求的方法
export const request = (params) => {
  return new Promise((resolve, reject) => {
    var reqTask = wx.request({
      ...params,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}