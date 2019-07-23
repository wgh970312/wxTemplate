//logs.js
// const util = require('../../utils/util.js')
import { formatTime } from '../../utils/util';

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return formatTime(new Date(log))
      })
    })
  }
})
