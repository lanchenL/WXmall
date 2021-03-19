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
      this.setData({
        floorList: result.data.message
      })
    })
  }
});