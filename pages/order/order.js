// pages/order/order.js
import { request } from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 3,
        value: '退货/退款',
        isActive: false
      }
    ]
  },
  onShow: function () {
    // 判断是否有token
    const token = wx.getStorageSync('token');
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
      return
    }

    // 使用页面栈来获取页面的参数，一般最多能存10个页面，多出来就会被释放掉
    let pages =  getCurrentPages();
    // 索引最大的页面就是当前页面
    let currentPage = pages[pages.length-1];
    console.log(currentPage.options.type);
    const {type} = currentPage.options;
    // 根据传入的type来显示哪个按钮被选中
    this.changeTitleByIndex(type-1)
    this.getOrders(type);
  },
  // 获取订单列表的方法
  async getOrders(type) {
    const res = await request({url: "/my/orders/all", data: {type}})
    console.log('订单数据' ,res);
    this.setData({
      orders: res.data.message.orders.map(v => ({...v, create_time_cn: (new Date(v.create_time*1000).toLocaleString())}))
    })
  },
  // 根据标题索引激活选中标题的数组
  changeTitleByIndex(index) {
    let {tabs} = this.data;
    tabs.forEach((v, i) => {
      i===index?v.isActive=true:v.isActive=false
    });
    this.setData({
      tabs
    })
  },
  // 点击切换tab的选项
  handleTapItemChange(e) {
    console.log(e);
    const {index} = e.detail;
    this.changeTitleByIndex(index);
    // 点击时发送请求数据
    this.getOrders(index+1);
  }
})