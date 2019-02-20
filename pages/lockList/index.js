// pages/lockList/index.js
const order = ['red', 'yellow', 'blue', 'green', 'red'];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [
      {
        id: 1,
        name: '门锁1',
        lockSn: '2019012917170000',
        lockDev: '1BC8A420CA9CE2',
        certificate: ''
      },
      {
        id: 2,
        name: '门锁2',
        lockSn: '2019012917170001',
        lockDev: '1BC8A420CA9CE2'
      },
      {
        id: 3,
        name: '门锁3',
        lockSn: '2019012917170002',
        lockDev: '1BC8A420CA9CE2'
      }
    ]
  },
  // 删除门锁
  dellock: function (e) {
    const _this = this;
    wx.showToast({
      title: '删除成功！',
      icon: 'none',
      duration: 1000,
      success: function () {
        //刷新当前页面的数据
        _this.onLoad();
      }
    })
  },
  // 路径跳转
  jumpto: function (e) {
    if (!e.currentTarget.dataset.lockinfo) {
      wx.showToast({
        title: '门锁信息有误！',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/bluetooth/index?lockinfo='
        + JSON.stringify(e.currentTarget.dataset.lockinfo),
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