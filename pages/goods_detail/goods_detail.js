// pages/goods_detail/goods_detail.js
import { request } from "../../request/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    // console.log(goods_id);
    this.getGoodsDetail(goods_id);
  },
  async getGoodsDetail(goods_id) {
    const  goodsObj = await request({url:"/goods/detail", data: {goods_id}});
    console.log(goodsObj);
    this.setData({
      goodsObj
    })
  }
  
})