import wxValidate from 'utils/wxValidate'
const VERSION = '1.1.5';
const ENV = 'rd'; // release ; rd ; at 
let API_KEY = '';
let BASE_URL = '';
let OASISAPP = ''; //上传图片
let OASIS = ''; // 登录获取cookie

if (ENV === 'rd') {
  API_KEY = '26390ceadf0a476081758a122c25323d';
  BASE_URL = 'https://lvzhouapi.h3c.com/iotrd';
  OASISAPP = 'https://oasisrdapp.h3c.com'; //上传图片
  OASIS = 'https://oasisrd.h3c.com'; // 登录获取cookie
}


//版本,环境变了就重新登录
if (wx.getStorageSync('ENV') !== ENV) {
  console.log('环境改变')
  wx.clearStorageSync();
  wx.setStorageSync('ENV', ENV)
}
App({
  onLaunch: function() {
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        confirmText: '立即重启',
        confirmColor: "#FF7E31",
        success: function(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
    // 不获取shopId 换成城市对应shopId
    // this.getShopId();
    this.getBrandAndColorList();
    console.log(`VERSION:${VERSION}`);
    console.log(`ENV:${ENV}`);
  },
  getShopId: function() {
    const _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${BASE_URL}/iotelectricbikerecord/shopid`,
      header: {
        apikey: API_KEY
      },
      success: res => {
        wx.hideLoading();
        const {
          code,
          data
        } = res.data;
        if (code === 0 && data.shopId) {
          let shopId = data.shopId;
          _this.globalData.apiInfo.shopId = shopId;
        } else {
          wx.showModal({
            title: '提示',
            content: '获取场景失败，请联系系统管理员！',
            showCancel: false,
            confirmText: '重新获取',
            success: function() {
              wx.reLaunch({
                url: '/pages/login/login',
              });
              _this.getShopId();
            }
          })
        }
      },
    })
  },
  getBrandAndColorList: function() {
    // 品牌
    wx.request({
      url: `${BASE_URL}/iotelectricbikerecord/getbiketypebycategory`,
      header: {
        apikey: API_KEY
      },
      data: {
        category: "bikeBrand"
      },
      success: res => {
        if (res.data.code === 0) {
          this.globalData.brands = res.data.data;
        } else {
          wx.showToast({
            title: '获取品牌失败。',
            icon: 'none'
          })
        }
      },
    });
    // 颜色
    wx.request({
      url: `${BASE_URL}/iotelectricbikerecord/getbiketypebycategory`,
      header: {
        apikey: API_KEY
      },
      data: {
        category: "bikeColor"
      },
      success: res => {
        if (res.data.code === 0) {
          this.globalData.colors = res.data.data;
        } else {
          wx.showToast({
            title: '获取颜色失败。',
            icon: 'none'
          })
        }
      },
    })
  },
  globalData: {
    version: VERSION,
    env: ENV,
    region: [],
    username: null,
    currentBikeOwnerPhone: null,
    brands: [],
    colors: [],
    initialApikey: API_KEY,
    apiInfo: {
      header: {
        apikey: API_KEY||wx.getStorageSync('apikey'),
        cookie: wx.getStorageSync('cookie')||''
      },
      baseUrl: BASE_URL,
      oasisapp: OASISAPP,
      oasis: OASIS,
      shopId: wx.getStorageSync('shopId'),
    },
    temp: {}
  },
  wxValidate: (rules, messages) => new wxValidate(rules, messages),
})