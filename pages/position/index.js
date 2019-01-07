Page({

  /**
   * 页面的初始数据
   */
  data: {
    person: '',
    nowActive: '校外',
    info: {
      "longitude": '104.059257',
      "latitude": '30.544875',
      "scale": '15',
      "enableZoom": true,
      "enableRotate": true
    },
    polyline: [{
      points: [{
        longitude: 104.062541,
        latitude: 30.545572
      }, {
        longitude: 104.044658,
        latitude: 30.546525
      }, {
        longitude: 104.045610,
        latitude: 30.534267
      }],
      color: '#4C90FF',
      width: 4
    }]
  },
  controltap() {
    console.log('refresh...')
  },
  regionchange(e) {
    // console.log(e.type)
    const mapContext = wx.createMapContext('positionMap', this);
    mapContext.getCenterLocation({
      success: function(res) {
        // console.log(res)
      }
    })
  },
  // 改变校内外状态
  changeTab: function(e) {
    if (this.data.nowActive === e.currentTarget.dataset.type) return;
    this.setData({
      nowActive: e.currentTarget.dataset.type,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    _this.setData({
      person: '张三丰'
    })
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log('当前经纬度： ', longitude, latitude)
        const { info } = _this.data;
        info.longitude = longitude;
        info.latitude = latitude;
        _this.setData({
          info,
        })
        const mapContext = wx.createMapContext('positionMap', _this);
        mapContext.moveToLocation();
      }
    })
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userLocation']) {
    //       wx.authorize({
    //         scope: 'scope.userLocation',
    //         success() {
    //           // 用户已经同意小程序使用地图选择功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           wx.chooseLocation({
    //             success: function (res) {
    //               console.log('location: ', res)
    //             }
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
    // wx.chooseLocation({
    //   success: function (res) {
    //     console.log('location: ', res)
    //   }
    // })
  },
  // 地图点击事件
  // handleMapClick: function(e) {
  //   console.log(e)
  // },

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