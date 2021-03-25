import { request } from "../../request/index";

// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },
  // 搜索时需要的参数
  QueryParams: {
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    // 有无cid
    this.QueryParams.cid = options.cid || '';
    // 有无query
    this.QueryParams.query = options.query || '';

    this.getGoodsList();
  },
  // 获取商品列表的数据
  async getGoodsList() {
    const res = await request({url: "/goods/search",data: this.QueryParams});
    // 获取总条数,计算总页数
    const total = res.data.message.total;
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    console.log(this.totalPages);
    // 对图片的http开头改造成https
    res.data.message.goods.forEach((v, i) => {
      v.goods_small_logo = v.goods_small_logo.replace(/http/, 'https')
    });
    this.setData({
      goodsList: [...this.data.goodsList ,...res.data.message.goods]
    })
    // 关闭下拉刷新的窗口，如果没有调用下拉刷新的窗口，直接关闭也不会报错
    wx.stopPullDownRefresh();
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
  },
  // 触底触发事件
  onReachBottom() {
    if(this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有下一页数据了'
      });
    }else {
      this.QueryParams.pagenum++;
      console.log(this.QueryParams.pagenum++);
      this.getGoodsList();
    }
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    // console.log('刷新');
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1;
    this.getGoodsList();
  }
})