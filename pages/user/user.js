// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    // 收藏商品的数量
    collectNums: 0
  },
  onShow: function () {
    const collect = wx.getStorageSync('collect') || [];
    const userinfo = wx.getStorageSync('userinfo');
    console.log(userinfo);
    this.setData({
      userinfo,
      collectNums: collect.length
    });
  },
  // 关于我们
  handleAboutOur() {
    wx.showToast({
      title: '个人练习项目',
      icon: 'none',
      mask: true,
    });
  }
})