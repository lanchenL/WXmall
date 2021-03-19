// 封装数据请求的方法

// 用于计数有几个数据请求
let ajaxTimes = 0;
export const request = (params) => {
  ajaxTimes++;
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  // 公共基础url
  const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1';
  return new Promise((resolve, reject) => {
    var reqTask = wx.request({
      ...params,
      url: baseURL + params.url,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      },
      // 无论成功还是失败都会调用
      complete: () => {
        ajaxTimes--;
        if(ajaxTimes === 0) {
          wx.hideLoading();
        }
      }
    });
  })
}