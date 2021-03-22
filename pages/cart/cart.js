// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow: function () {
    let cart = wx.getStorageSync('cart') || [];
    
    // 使用every数组方法，会遍历数组中的每一个元素，只有每一个元素都满足设定的条件才会返回true（空数组的返回值也是true），有一个不满足的话直接返回false。对应some（）方法
    console.log(cart);
    const address = wx.getStorageSync('address');
    this.setCart(cart);
    this.setData({
      address,
    })
  },
  // 点击获取地址的点击事件,调用小程序内置的api来获取,wx-chooseAddress
  handleChooseAddress() {
    
    wx.chooseAddress({
      success: (result)=>{
        // 存到缓存中
        wx.setStorageSync('address', result);
      },
      fail: (err)=>{
        console.log(err);
      }
    });
  },
  // 复选框改变时
  handleItemChange(e) {
    
    const goods_id = e.currentTarget.dataset.id;
    console.log(goods_id);
    // 获取到购物车中的商品对象
    let {cart} = this.data;
    // 找到被修改的商品id
    let index = cart.findIndex( v => v.goods_id === goods_id);
    // 取反状态
    cart[index].checked = !cart[index].checked;
    // 把数据重新设回到data中
    // 保存到缓存
    this.setCart(cart);
    
  },
  // 进行相应的封装，设置购物车的状态，并设置计算价格、总数等
  setCart(cart) {
    console.log('复选框',cart);
    let totalPrice = 0;
    let totalNum = 0;
    let allChecked = true;
    // 进行价格和数量的计算
    cart.forEach( v => {
      if(v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }else {
        allChecked = false;
      }
    })
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync('cart', cart);
  },
  // 商品的全选功能
  handleItemAllCheck() {
    // 获取data中的数据
    let {cart, allChecked} = this.data;
    // 取反
    allChecked = !allChecked;
    // 循环修改data中的数据
    cart.forEach( v => v.checked = allChecked);
    // 设置回data和缓存
    if(cart.length) {
      this.setCart(cart);
    }else {
      this.setData({allChecked})
    }
  },
  // 计算点击+ -时商品的数量
  handleItemNumEdit(e) {
    console.log(e.currentTarget.dataset);
    const {id, operation} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex( v => v.goods_id === id );
    cart[index].num += operation;
    // 设置回data和缓存
    this.setCart(cart); 
  }
})