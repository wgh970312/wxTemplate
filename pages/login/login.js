//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    options: null,
    isLogin: false
  },
  onLoad: function (options) {
    if(options){
      this.setData({ options })
    }
    wx.showLoading({
      title: '正在登录',
    })
    app.loginState.then(res=> {
      wx.hideLoading();
      this.gotoPage();
    }).catch(err=> {
      wx.hideLoading();
      console.log(err)
      this.setData({
        isLogin: true
      })
    })
  },
  getUserInfo: function (e) {
    let userInfo = e.detail.userInfo
    if(userInfo){
      app.globalData.userInfo = userInfo;
      app.globalData.role = Math.random() > 0.5 ? 1 : 2;
      this.gotoPage()
    }else{
      wx.showToast({
        title: '您已拒绝授权',
        icon: 'none'
      })
    }
  },
  gotoPage(){
    let { redirect, options } = this.data.options;
    redirect = redirect || '/pages/index/index';
    if (options) {
      options = JSON.parse(options);
      let s = '?';
      for (let i in options) {
        redirect = `${redirect}${s}${i}=${options[i]}`; /* path?a=1&b=2 */
        s = '&';
      }
    }
    wx.reLaunch({ url: redirect })
  }
})
