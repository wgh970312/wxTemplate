function getPageInstance() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

/** 
 * 身份验证
 * @param page 页面对象
 * @param runOnload 是否在登录完成后再运行onload,默认false
 */
export function identityFilter(page, runOnload = false) {
  let _onShow;
  if(page.onShow){
    _onShow = page.onShow;
  }
  // if( page.onShow )
  page.onShow = function(){
    let currentInstance = getPageInstance();
    if(getApp().globalData.userInfo){
      if(_onShow){
        _onShow.call(currentInstance);
      }
    }else{
      let url = `/pages/login/login?redirect=/${currentInstance.route}`;
      if (Object.keys(currentInstance.options).length !== 0) {
        url += `&options=${JSON.stringify(currentInstance.options)}`
      }
      wx.redirectTo({ url });
    }
  }
  
  /**
   * onLoad中的数据是否要在登录完成后执行
   */
  if(page.onLoad && runOnload){
    let _onLoad = page.onLoad;
    page.onLoad = function(opt){
      let currentInstance = getPageInstance();
      if (getApp().globalData.userInfo){
        _onLoad.call(currentInstance, opt)
      }
    }
  }
  return page;
}