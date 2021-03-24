// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品、商家投诉',
        isActive: false
      }
    ]
  },
  onShow: function () {

  },
  handleTapItemChange(e) {
    console.log(e);
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v, i) => {
      i===index?v.isActive=true:v.isActive=false
    });
    this.setData({
      tabs
    })
  }
})