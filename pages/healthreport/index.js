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
          diffweight: 1,
          strength: 74,
          diffstrength: 5
        },
        exerciseNow: {
          nowStep: 6081,
          nowRanking: 12,
          nowStep1: 9612,
          step1name: '李子轩',
          nowStep2: 7831,
          step2name: '王可言',
          nowStep3: 7224,
          step3name: '夏月彤',
        },
        exercise: {
          nowStep: 37681,
          nowRanking: 34,
          nowStep1: 73964,
          step1name: '王可言',
          nowStep2: 70123,
          step2name: '李子轩',
          nowStep3: 69234,
          step3name: '高成名',
        },
        advice: {
          strength: '高',
          sports: '总运动市场超过80%的同学，继续保持燃脂心率时间较短，增加运动强度',
          bodyType: '偏瘦',
          meal: 'BMI偏低，建议家长督促学生吃饭。运动量较大，增加蛋白质摄入。身高增长较快，增加高钙食品'
        }
      }
    })
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