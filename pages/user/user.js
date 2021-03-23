// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {}
  },
  onShow: function () {
    const userinfo = wx.getStorageSync('userinfo');
    console.log(userinfo);
    this.setData({userinfo});
  }
})