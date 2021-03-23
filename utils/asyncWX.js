// 封装的showModal弹窗  
export const showModal = ({content}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (result) => {
        resolve(result)
      },
      fail: (err)=>{ reject(err) }
    });
  })
}
// promise 形式的showToast
export const showToast = ({title}) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{ reject(err) }
    });
  })
}
// promise形式的login
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout:10000,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{reject(err)},
      complete: ()=>{}
    });
  })
}

// promise 形式的微信小程序支付 pay为支付所需的参数
export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{reject(err)}
    });
  })
}