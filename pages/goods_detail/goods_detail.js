// pages/goods_detail/goods_detail.js
import { request } from "../../request/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false
  },
  // 定义一个全局的轮播图片
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length-1];
    const {goods_id} = currentPage.options;

    
    // console.log(goods_id);
    this.getGoodsDetail(goods_id);
  },
  async getGoodsDetail(goods_id) {
    const  goodsObj = await request({url:"/goods/detail", data: {goods_id}});
    console.log(goodsObj);
    // 将轮播图图片的http开头的改成https
    goodsObj.data.message.pics.forEach((v, i) => {
      v.pics_mid = v.pics_mid.replace(/http/, 'https');
    });
    // 将goods_small_logo的http改成https
    goodsObj.data.message.goods_small_logo = goodsObj.data.message.goods_small_logo.replace(/http/, 'https');
    
    this.GoodsInfo = goodsObj.data.message;
    // 获取缓存中的商品数组
    let collect = wx.getStorageSync('collect') ||　[];
    // 判断是否已经被收藏
    let isCollect = collect.some( v => v.goods_id === this.GoodsInfo.goods_id);


    this.setData({
      goodsObj: {
        goods_name: goodsObj.data.message.goods_name,
        goods_price: goodsObj.data.message.goods_price,
        // iphone部分手机不识别webp图片格式
        // 所以要进行修改 .webp => .jpg
        goods_introduce: goodsObj.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.data.message.pics
      },
      isCollect
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
  // 加入购物车
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
      this.GoodsInfo.checked=true;
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
  },
  // 点击收藏按钮
  handleCollect() {
    let isCollect = false;
    let collect = wx.getStorageSync('collect') || [];
    let index = collect.findIndex( v => v.goods_id === this.GoodsInfo.goods_id );
    if(index !== -1) {
      // 能找到
      collect.splice(index, 1); // 取消收藏
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true,
      });
    }else {
      // 没有收藏
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true,
      });
    }
    // 存入缓存
    wx.setStorageSync('collect', collect);
    // 给data中的isCollect设置
    this.setData({
      isCollect
    })
  },
  // 立即购买
  handleBuy() {
    console.log('购买');
    let buynow = [];
    
    this.GoodsInfo.num = 1;
    this.GoodsInfo.checked=true;
    buynow.push(this.GoodsInfo);
    // 直接覆盖掉上一次立即购买的东西
    wx.setStorageSync("buynow", buynow);
    wx.navigateTo({
      url: '/pages/pay/pay',
    });
  }
})