Page({
  data: {
    menuSelect: null,
    imgUrl: '/assets/icon/icon_down.png',
    isopen: false,
    menuContent: [{
      role: '管理员',
      permissions: [1, 2, 3, 4, 5, 6, 7]
    }, {
      role: '校长',
      permissions: [1, 2, 3, 4, 5, 6, 7]
    }, {
      role: '班主任',
      permissions: [1, 2, 3, 4, 5, 6, 7]
    }, {
      role: '家长',
      permissions: [1, 2, 3, 4, 5, 6, 7]
    }, {
      role: '教职工',
      permissions: [1, 2, 3, 4, 5, 6, 7]
    }],
    itemList: [
      {
        id: 1,
        iconPath: '/assets/icon/overview/icon_attendance_gray.png',
        title: '课程考勤',
        // linkPath: '/pages/attendance/index',
        linkPath: ''
      },
      {
        id: 2,
        iconPath: '/assets/icon/overview/icon_attendance_gray.png',
        title: '进出校考勤',
        linkPath: '/pages/lockList/index'
      },
      {
        id: 3,
        iconPath: '/assets/icon/overview/icon_attendance_gray.png',
        title: '学生健康',
        linkPath: '/pages/heartrate/index'
      },
      {
        id: 4,
        iconPath: '/assets/icon/overview/icon_attendance_gray.png',
        title: '课程调整',
        linkPath: ''
      },
      {
        id: 5,
        iconPath: '/assets/icon/overview/icon_attendance_gray.png',
        title: '课表相关',
        linkPath: ''
      },
      {
        id: 6,
        iconPath: '/assets/icon/overview/icon_attendance_gray.png',
        title: '人员定位',
        linkPath: '/pages/position/index'
      },
      {
        id: 7,
        iconPath: '/assets/icon/overview/icon_attendance_gray.png',
        title: '图表分析',
        linkPath: '/pages/column/index'
      },
      {
        id: 8,
        iconPath: '/assets/icon/overview/icon_attendance_gray.png',
        title: '产品介绍',
        linkPath: '/pages/productinfo/index'
      },
      {
        id: 9,
        iconPath: '/assets/icon/man.png',
        title: '个人中心',
        linkPath: '/pages/userCenter/index'
      } // 凑足3的倍数
    ]
  },
  onLoad: function () {
    this.setData({
      menuSelect: '管理员',
    })
  },
  // 点击展示/隐藏下拉框
  handleDrop: function () {
    this.setData({
      isopen: !this.data.isopen,
    })
  },
  // 选择角色
  handleSelect: function (e) {
    this.setData({
      isopen: false,
      menuSelect: e.currentTarget.dataset.role,
    })
  },
  // 点击卡片跳转页面
  linkto: function(e) {
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
  }
})