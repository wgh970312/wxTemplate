//index.js
import { identityFilter } from '../../utils/auth';
import t1 from './t1/t1';
import t2 from './t2/t2';
//获取应用实例
const app = getApp()
let instance;

Page(identityFilter({
  data: {
    role: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (opt) {
    let role = app.globalData.role;
    let userInfo = app.globalData.userInfo;
    instance = role === 1 ? t1 : t2;
    console.log(role)
    this.setData({ role, userInfo, ...instance.data });
    instance.methods && Object.assign(this, instance.methods)
    instance.onLoad && instance.onLoad.call(this);
  }
}, true))