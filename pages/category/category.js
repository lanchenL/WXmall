import { request }  from '../../request/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [], // 左边菜单的数据
    rightContent: [],  // 右边菜单的数据
    currentIndex: 0,   // 用于识别哪个菜单被选中
    scrollTop: 0  // 自动回到顶部的位置
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //当数据量比较大的时候，我们需要存储数据
    // 没有旧数据的时候，才会发送新的请求,有旧的数据并且没有过期就直接用
    const Cates = wx.getStorageSync("cates");
    if(!Cates) {
      //获取菜单的所有数据
      this.getCates();
    }else {
      // 有旧的数据，判断时间过期没有
      if(Date.now() - Cates.time > 1000 * 60) {  // 一分钟更新数据一次
        this.getCates();
      }else {
        // 使用旧数据
        this.Cates = Cates.data;
        // 获取左边大菜单的数据
        let leftMenuList = this.Cates.map(v => v.cat_name);
        // 右边数据的列表
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }

    
  },
  async getCates() {
    // request({
    //   url: '/categories'
    // })
    // .then((res) => {
    //   this.Cates = res.data.message;
    //   // 把接口的数据存起来
    //   wx.setStorageSync("cates", {
    //     time: Date.now(),
    //     data: this.Cates
    //   });
    //   // 获取左边大菜单的数据
    //   let leftMenuList = this.Cates.map(v => v.cat_name);
    //   // 右边数据的列表
    //   let rightContent = this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    const res = await request({ url: '/categories'  });
    this.Cates = res.data.message;
    // 把接口的数据存起来
    wx.setStorageSync("cates", {
      time: Date.now(),
      data: this.Cates
    });
    // 获取左边大菜单的数据
    let leftMenuList = this.Cates.map(v => v.cat_name);
    // 右边数据的列表
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0  // 自动回到顶部的位置
    })
  }
})