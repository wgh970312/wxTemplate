export default {
  data: {
    info: 'this is t2 page'
  },
  onLoad: function(){
    console.log('t2', this)
  },
  methods: {
    clickPage(){
      wx.showToast({
        title: '你点击了page2'
      })
      this.setData({
        info: '你已经点击过了page2'
      })
    }
  }
}