// 封装数据请求的方法

// 用于计数有几个数据请求
let ajaxTimes = 0;
export const request = (params) => {
  // 判断url中是否带有/my/ 请求的是私人的路径，就要带上token
  let header = {...params.header}; // 如果页面有传header进来，则加上然后再添加token
  if(params.url.includes("/my/")) {
    // 拼接header，带上token
    header["Authorization"] = wx.getStorageSync('token');
  }

  ajaxTimes++; // 用于查看有几个请求
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  // 公共基础url
  const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1';
  return new Promise((resolve, reject) => {
    var reqTask = wx.request({
      ...params,
      header: header,
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