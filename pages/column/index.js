Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [
      {
        id: 1,
        name: 'wx-f2',
        linkPath: '/pages/f2test/index'
      },
      // {
      //   id: 2,
      //   name: 'wx-charts',
      //   linkPath: '/pages/f2test/index'
      // },
      {
        id: 2,
        name: 'echarts',
        linkPath: '/pages/echartstest/index'
      }
    ]
  },

  // 路径跳转
  jumpto: function(e) {
    if (!e.currentTarget.dataset.path || !e.currentTarget.dataset.path.length) {
      wx.showToast({
        title: '暂未开放',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.path,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})