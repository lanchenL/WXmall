// pages/search/search.js
import { request } from "../../request/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isFocus: false,
    // 输入框的值
    inpValue: ""
  },
  TimeId: 1,
  handleInput(e) {
    console.log(e);
    const {value} = e.detail;
    // 验证合法性
    if(!value.trim()) {
      clearTimeout(this.TimeId);
      this.setData({
        isFocus: false,
        goods: []
      })
      return
    }
    // 准备发送请求获取数据
    // 使用防抖来进行搜索
    this.setData({
      isFocus: true
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000)
    
  },
  async qsearch(query) {
    const res = await request({url: "/goods/qsearch", data: {query}});
    console.log(res);
    this.setData({
      goods: res.data.message
    })
  },
  // 点击取消按钮
  handleCancel() {
    this.setData({
      isFocus: false,
      goods: [],
      inpValue: ""
    })
  }
})