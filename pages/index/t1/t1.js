const app = getApp();

export default {
  data: {
    info: '这是t1页面'
  },
  methods: {
    bindViewTap(){
      wx.showToast({
        title: '这个方法只在t1页面才能出现',
        icon: 'none'
      })
    }
  }
}