// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品、商家投诉',
        isActive: false
      }
    ],
    chooseImgs: [],
    textVal: ''
  },
  UpLoadImgs: [],
  onShow: function () {

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
  // 点击加号选择图片
  handleChooseImg() {
    // 调用小程序内置选择图片api
    wx.chooseImage({
      // 同时选择图片的数量
      count: 9,
      // 选择图片的 原图 还是 压缩
      sizeType: ['original','compressed'],
      // 图片的来源 相册  相机
      sourceType: ['album','camera'],
      success: (result)=>{
        console.log(result);
        this.setData({
          // 将图片数组进行拼接
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });
  },
  // 点击自定义图片组件
  handleRemoveImg(e) {
    console.log(e);
    const {index} = e.currentTarget.dataset;
    let {chooseImgs} = this.data;
    // 删除元素
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },
  // 文本域的输入
  handleTextInput(e) {
    // console.log(e);
    this.setData({
      textVal: e.detail.value
    })
  },
  // 提交
  handleFormSubmit() {
    const {textVal, chooseImgs} = this.data;
    if(!textVal.trim()) {
      // 不合法
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true,
      });
      return
    }
    // 显示等待的图片
    wx.showLoading({
      title: '正在上传中',
      mask: true,
    });
    // 判断是否有要上传的图片
    if(chooseImgs.length != 0) {
      chooseImgs.forEach((v, i) => {
        // 准备上传到专门的服务器
        // 只能一张一张的传，所以需要遍历
        var upTask = wx.uploadFile({
          // 图片要上传到哪里
          url: 'https://img.coolcr.cn/index/api/api.html',
          // 被上传文件的路径
          filePath: v,
          // 上传文件的名称， 后台来获取文件
          name: "image",
          // 顺带的文本信息
          formData: {},
          success: (result)=>{
            console.log(result);
            // 因为这个图床已经开启了防盗，所以拿不到真正的url，这里将使用文本来模拟
            let url = result.data;
            this.UpLoadImgs.push(url);
            //所有的图片都上传成功后才触发
            if(i === chooseImgs.length - 1) {
              // 关闭正在上传的图片load
              wx.hideLoading();
  
              console.log('模拟：把文本的内容和外网的图片数组提交到后台去');
  
              // 提交成功后将重置页面
              this.setData({
                textVal: '',
                chooseImgs: []
              })
              // 返回上一个页面
              wx.navigateBack({
                delta: 1
              });
            }          
          }
        });
      })
    }else {
      // 关闭正在上传的图片load
      wx.hideLoading();
      console.log('没有图片，只是提交了文本');
      // 返回上一个页面
      wx.navigateBack({
        delta: 1
      });
    }
  }
})