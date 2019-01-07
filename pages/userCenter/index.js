Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      info: {
        imgPath: '/assets/icon/man.png',
        username: '张睿哲',
        datetime: this.getDateTime(1541347200000),
        normal: {
          height: 158,
          weight: 47,
          strength: 74,
          heartrate: 51,
          bmi: 23,
          sleep: '8h23m',
          ropeskipping: 120,
          situps: 60,
          step: 7632,
          calorie: 72
        }
      }
    })
  },
  // 跳转健康报告页面
  toHealthReport: function(e) {
    wx.navigateTo({
      url: '/pages/healthreport/index',
    });
  },
  // 获取时间字符串
  getDateTime: function(time) {
    const nowTime = new Date(time);
    const year = nowTime.getFullYear();
    const month = nowTime.getMonth() + 1;
    const day = nowTime.getDate();
    return `${year}-${month}-${day <10 ? `0${day}` : day}`;
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