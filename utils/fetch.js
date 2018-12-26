const fetch = function({
  url,
  method = 'GET',
  data,
  loadingText='加载中...',
  success
}) {
  const app = getApp();
  if (!url) {
    tip = '请求地址为空';
    wx.showToast({
      title: 'tip ',
      icon: 'none'
    });
    return new Promise((resolve, reject) => {
      reject({
        data: '1000',
        message: '请求地址为空'
      })
    });
  }

  const parms = {
    ...data,
    originCasUser: app.globalData.username,
    shopId: app.globalData.apiInfo.shopId,
  }

  const promise = new Promise((resolve, reject) => {
    wx.showLoading({
      title: loadingText,
    })
    wx.request({
      header: app.globalData.apiInfo.header,
      method: method,
      url: url,
      data: parms,
      fail:function(res){
      },
      success: (res) => {
        let result = res.data;
        wx.hideLoading();
        const {
          code,
          message,
          data
        } = result;
        if (code !== 0) {
          wx.showToast({
            title: message || '返回失败！',
            icon: 'none'
          });
          reject(result);
        }
        if (code === 0) {
          resolve(data);
        }
      }
    })
  });
  return promise;
}


export default fetch;