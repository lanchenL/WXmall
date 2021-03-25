// { request }是解构的方式
import { request }  from '../../request/index';
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 分类导航
    catesList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function(options){
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  },
  getSwiperList() {
    request({
      url: '/home/swiperdata'
    })
    .then((result) => {
      result.data.message.forEach(v => v.navigator_url = v.navigator_url.replace(/main/, 'goods_detail'));
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  getCateList() {
    request({
      url: '/home/catitems'
    })
    .then((result) => {
      this.setData({
        catesList: result.data.message
      })
    })
  },
  getFloorList() {
    request({
      url: '/home/floordata'
    })
    .then((result) => {
      // console.log(result);
      // result.data.message.forEach( v => {
      //   v.product_list = v.product_list.forEach(value => {
      //     value.navigator_url = value.navigator_url.replace(/goods_list/, 'goods_list/goods_list')
      //   })
      // })
      const length = result.data.message.length;
      let message = result.data.message;
     for (let k = 0; k < length; k++) {
       let product_list = message[k].product_list;
       product_list.forEach( (v, i)  => {
        v.navigator_url = v.navigator_url.replace(/goods_list/, 'goods_list/goods_list')
       })
     }
      this.setData({
        floorList: message
      })
    })
  }
});