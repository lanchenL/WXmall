import {request} from '../../request/index'
import {login} from '../../utils/asyncWX'
  // pages/auth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取用户信息
  async handleGetUserInfo(e) {
    try {
      console.log(e);
      // 1、 获取用户的信息encryptedData,rawData,iv,signature
      const {encryptedData,rawData,iv,signature} = e.detail;
      // 2、 获取小程序登录后的code
      const {code} = await login();
      console.log(code);
      // 到这里之后就可以得到了获取token的所有必要条件了（encryptedData,rawData,iv,signature,code）

      // 3、 发送请求，获取用户的token
      const loginParams = {encryptedData, rawData, iv, signature, code};
      console.log(loginParams);
      let {token} = await request({url: "/users/wxlogin", data:loginParams, method: "post"});  // 应该为const
      console.log(token);

      // 随便给个值进行模拟,这里使用他人的token
      token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";

      // 4、 把token存入缓存中，同时跳转到上一个页面
      wx.setStorageSync('token', token);
      // 跳回上一个页面
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
  }
})