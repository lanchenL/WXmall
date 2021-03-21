// pages/goods_detail/goods_detail.js
import { request } from "../../request/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  // 定义一个全局的轮播图片
  GoodsInfo: {},
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
    // console.log(goodsObj);
    goodsObj.data.message.pics.forEach((v, i) => {
      v.pics_mid = v.pics_mid.replace(/http/, 'https')
    });
    this.GoodsInfo = goodsObj.data.message;
    this.setData({
      goodsObj: {
        goods_name: goodsObj.data.message.goods_name,
        goods_price: goodsObj.data.message.goods_price,
        // iphone部分手机不识别webp图片格式
        // 所以要进行修改 .webp => .jpg
        goods_introduce: goodsObj.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.data.message.pics
      }
    })
  },
  // 当顶点击轮播图图片实现预览功能
  handlePreviewImage(e) {
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  handleCartAdd() {
    console.log('购物车',this.GoodsInfo);
    // 获取缓存中的购物车数据，没有时为[]
    let cart = wx.getStorageSync("cart") || [];
    console.log('cart',cart);
    let index = cart.findIndex( v  => v.goods_id === this.GoodsInfo.goods_id)
    console.log(index);

    if(index === -1) {
      // 第一次加入购物车
      this.GoodsInfo.num = 1;
      cart.push(this.GoodsInfo);
    }else {
      // 已经有了购物车数据
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    });
  }
})