//app.js
import { wxToPromise } from './utils/util';

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: ({ code }) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(code)
      }
    })
    this.loginState = new Promise((resolve, reject)=>{
      wxToPromise(wx.getSetting).then(({ authSetting })=>{
        if (authSetting['scope.userInfo']){
          return wxToPromise(wx.getUserInfo);
        }else{
          return Promise.reject({ step: 2, errMsg: '用户未授权' })
        }
      }).then(({ userInfo })=>{
        this.globalData.userInfo = userInfo;
        this.globalData.role = Math.random() > 0.5 ? 1 : 2;
        resolve();
      }).catch(err=>{
        reject(err);
      })
    })
    this.loginState.then(res=>{}, err=>{})
  },
  loginState: null,
  globalData: {
    userInfo: null,
    role: null
  }
})