// pages/cart/cart.js
import {showModal, showToast, requestPayment} from "../../utils/asyncWX";
import {request} from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow: function () {
    let cart = wx.getStorageSync('cart') || [];
    
    // 使用every数组方法，会遍历数组中的每一个元素，只有每一个元素都满足设定的条件才会返回true（空数组的返回值也是true），有一个不满足的话直接返回false。对应some（）方法
    console.log(cart);
    const address = wx.getStorageSync('address');
    cart = cart.filter( v => v.checked);
    
    let totalPrice = 0;
    let totalNum = 0;
    // 进行价格和数量的计算
    cart.forEach( v => {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },
  // 点击支付
  async handleOrderPay() {
    try {
      // 1、判断缓存中是否有token
      const token = wx.getStorageSync('token');
      // 2、判断
      if(!token) {
        wx.navigateTo({
          url: '/pages/auth/auth',
          
        });
        return
      }
      // 拿到自己定义的虚拟token或者使用别人的token进行测试
      console.log('存在token');
      // 3、 创建订单
      // 3.1 准备请求头参数
      // const header = {Authorization: token};
      // 3.2 准备请求体参数
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      const cart = this.data.cart;
      let goods = [];
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      const orderParams = {order_price, consignee_addr, goods}; // 请求体参数
      console.log('orderParams', orderParams);
      // 4、 准备发送请求 创建订单 获取订单的编号
      const res = await request({url: "/my/orders/create", method: "post", data: orderParams});
      const {order_number} = res.data.message;
      console.log('order_number',order_number);
      // 5、 发起预支付操作
      const res1 = await request({url: "/my/orders/req_unifiedorder", method: "post", data: {order_number}});
      const {pay} = res1.data.message;
      console.log('pay', pay);

      // 6、 发起微信支付   因为在这里就要显示二维码了，但是不是自己账号的token，就导致了二维码无法显示，就会出错
      const res2 = await requestPayment(pay);
      
      // 7、 查询后台的订单状态
      const res3 = await request({url: "/my/orders/chkOrder", method: "post", data: {order_number}});
      console.log('支付结果(支付成功或者失败的返回值)', res3);
      await showToast({title: '支付成功'})
      // 8、手动删除缓存中已经支付过的商品订单了
      let newCart = wx.getStorageSync('cart');  // 因为之前的cart都是被处理过了的
      newCart = newCart.filter(v => !v.checked);
      wx.setStorageSync('cart', newCart);
      // 9、 支付成功了 跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/order',
      });
      } catch (error) {
        console.log(error);
        await showToast({title: '支付失败'})
    }
  }
})