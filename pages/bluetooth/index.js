const util = require('../../utils/util.js');
const CryptoJS = require('../../tools/crypto/index.js').CryptoJS;
const app = getApp()
// const serviceId = "00002A00-0000-1000-8000-00805F9B34FB"
// const characteristicId = "00002A00-0000-1000-8000-00805F9B34FB"
Page({
  data: {
    isready: false,
    searchingstatus: false,
    deviceList: [],
    primarySize: 'default',
    plain: false,
    loading: false,
    disabled: false,
    isbluetooth: false,
    lockinfo: {},
    iscamera: false,
    codeinfo: {},
    pubinfo: {
      testdata: [0x01, 0x02, 0x03], //测试数据
      aesKey: [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01], //AES测试密钥
      aes_iv: [0x83, 0xAE, 0x00, 0xB1, 0xFE, 0xD9, 0x19, 0x34, 0x0A, 0xC7, 0x33, 0x14, 0x3C, 0xC7, 0x50, 0x6F], // AES向量
    },
    secrityinfo: {},
    isPub: false,
    isSecrity: false
  },
  // 控制蓝牙开关
  switchBlueTooth: function() {
    const _this = this;
    _this.setData({
      isready: !_this.data.isready,
    });
    if (_this.data.isready) {
      // 初始化
      wx.openBluetoothAdapter({
        success: function(res) {
          console.log('初始化蓝牙适配器成功');
          // 监听状态变化
          wx.onBluetoothAdapterStateChange(function(state){
            console.log('蓝牙适配器状态发生变化', state);
            _this.setData({
              isready: state.available,
              searchingstatus: state.discovering,
            });;
          });
          // 发现蓝牙设备
          wx.onBluetoothDeviceFound(function (obj) {
            if (obj.devices
              && obj.devices[0].name
              && obj.devices[0].name.indexOf('LOCK') > -1) {
              console.log('发现门锁蓝牙设备', obj.devices[0].name, obj.devices);
              console.log('广播数据段中的 ManufacturerData 数据段: ', util.ab2hex(obj.devices[0].advertisData))
              _this.setData({
                deviceList: [...obj.devices],
                advertisData: util.ab2hex(obj.devices[0].advertisData)
              });
              _this.setData({
                searchingstatus: true
              })
              _this.searchbluetooth();
            }
          });
        },
        fail: function(res) {
          console.log('初始化蓝牙适配器失败');
          wx.showToast({
            title: '请检查手机蓝牙是否打开',
            icon: 'none',
            duration: 1000,
            success: function (succ) {
              _this.setData({
                isready: false,
                searchingstatus: false,
              })
            }
          });
        },
      })
    } else {
      // 关闭低功耗蓝牙设备（BLE）的连接
      wx.closeBLEConnection({
        deviceId: _this.data.connectedDeviceId,
        success: function(res) {},
        complete: function(res) {
          console.log('closeBLEConnection complete: ', res);
          _this.setData({
            deviceconnected: false,
            connectedDeviceId: '',
          });
        }
      });
      // 关闭蓝牙模块
      wx.closeBluetoothAdapter({
        success: function(res) {
          _this.setData({
            deviceconnected: false,
            connectedDeviceId: '',
          });
        },
      });
    }
  },
  // 搜索蓝牙
  searchbluetooth: function () {
    const _this = this;
    if (!_this.data.searchingstatus) {
      // 搜索附近的蓝牙外围设备
      wx.startBluetoothDevicesDiscovery({
        success: function (res) {
          console.log("开始搜索附近蓝牙设备", res);
          _this.setData({
            searchingstatus: !_this.data.searchingstatus
          });
        }
      })
    } else {
      // 停止搜索蓝牙设备
      wx.stopBluetoothDevicesDiscovery({
        success: function (res) {
          console.log("停止蓝牙搜索", res);
        }
      })
    }
  },
  // 连接蓝牙设备
  connectTO: function (e) {
    const _this = this;
    const deviceId = e.currentTarget.id;
    this.setData({
      connectedDeviceId: e.currentTarget.id
    })
    if (_this.data.deviceconnected) {
      // 停用低功耗蓝牙设备特征值变化时的notify功能
      wx.notifyBLECharacteristicValueChange({
        state: false, // 停用notify 功能
        deviceId: deviceId,
        serviceId: _this.data.service_id,
        characteristicId: _this.data.notify_id,
        success: function (res) {
          console.log("停用notify 功能");
        }
      })
      // 关闭低功耗蓝牙设备（BLE）的连接
      wx.closeBLEConnection({
        deviceId: e.currentTarget.id,
        complete: function (res) {
          console.log("断开设备", res);
          _this.setData({
            deviceconnected: false,
            connectedDeviceId: "",
            receivedata: ""
          })
        }
      })
    } else {
      wx.showLoading({
        title: '连接蓝牙设备中...',
      })
      // 连接低功耗蓝牙设备
      wx.createBLEConnection({
        deviceId: deviceId,
        timeout: 100000,
        success: function (res) {
          wx.hideLoading();
          wx.showToast({
            title: '连接成功',
            icon: 'success',
            duration: 1000
          });
          console.log("连接设备成功", res);
          _this.setData({
            deviceconnected: true,
            connectedDeviceId: deviceId
          })
          // 获取serviceId
          wx.getBLEDeviceServices({
            deviceId: deviceId,//搜索设备获得的蓝牙设备 id
            success: function (res) {
              console.log('获取所有服务： ', res);
              for (let i = 0; i < res.services.length; i++) {
                if (res.services[i].uuid) {
                  _this.getCharacteristics(deviceId, res.services[i].uuid);
                }
              }
            },
            fail(res) {
              console.log('获取serviceId失败', res);
            }
          })
        },
        fail: function (res) {
          wx.hideLoading()
          wx.showToast({
            title: '连接设备失败',
            icon: 'success',
            duration: 1000
          })
          console.log("连接设备失败", res);
          _this.setData({
            connected: false
          });
        }
      })
      // 停止搜寻附近的蓝牙外围设备
      wx.stopBluetoothDevicesDiscovery({
        success: function (res) {
          console.log("停止蓝牙搜索", res);
        }
      })
    }
  },
  //获取特征值
  getCharacteristics: function (deviceId, service_id) {
    const _this = this;
    wx.getBLEDeviceCharacteristics({
      deviceId: deviceId,//搜索设备获得的蓝牙设备 id
      serviceId: service_id,//服务ID
      success: function (res) {
        console.log('device特征值:', res);
        let notify_id = '';
        for (let i = 0; i < res.characteristics.length; i++) {
          let charc = res.characteristics[i];
          if (charc.properties.indicate) {
            _this.setData({ indicate_id: charc.uuid });
            console.log('indicate_id:', _this.data.indicate_id);
            _this.listenChange(service_id, charc.uuid);
          }
          if (charc.properties.write) {
            _this.setData({ write_id: charc.uuid, service_id });
            console.log('写write_id:', _this.data.write_id);
          }
          if (charc.properties.read) {
            _this.setData({ read_id: charc.uuid });
            console.log('读read_id:', _this.data.read_id);
          }
          if (charc.properties.notify) {
            notify_id = charc.uuid;
            _this.setData({ notify_id: charc.uuid, service_id });
            console.log('可notify:', _this.data.notify_id);
            _this.listenChange(service_id, charc.uuid);
          }
        }
        // _this.sendData(); // 通过密钥加密数据，发送数据
      }
    });
  },
  // 监听特征值变化
  listenChange: function (service_id, id) {
    // 启用低功耗蓝牙设备特征值变化时的notify功能
    // 可监听低功耗蓝牙设备的特征值变化
    const { connectedDeviceId } = this.data;
    const obj = {
      deviceId: connectedDeviceId,
      serviceId: service_id,
      characteristicId: id
    }
    console.log('obj: ', obj);
    wx.notifyBLECharacteristicValueChange({
      state: true, // 启用 notify 功能
      deviceId: connectedDeviceId,
      serviceId: service_id,
      characteristicId: id,
      success: function (res) {
        console.log("开启监听成功：", res);
        wx.onBLECharacteristicValueChange(function (res) {
          console.log('characteristic has changed', res);
        })
      },
      fail: function (res) {
        console.log("开启监听失败:", res);
      }
    })
  },
  // 蓝牙开门
  openDoor: function () {
    const { connectedDeviceId } = this.data;
    const { service_id, write_id } = this.data;
    const pubkey = util.getPubkey(); // 手机端公钥
    const result = [];
    pubkey.map(key => {
      result.push(key.toString(16));
    })
    const nowpubkey = result.join('');
    const value = util.str2ab(`EE000015${nowpubkey}`);
    console.log('pubkey: ', nowpubkey);
    console.log('write value 16: ', `EE000015${nowpubkey}`);
    console.log('write value ArrayBuffer: ', value);
    // 写特征值
    wx.writeBLECharacteristicValue({
      deviceId: connectedDeviceId,
      serviceId: service_id,
      characteristicId: write_id,
      value: value,
      success: function (res) {
        console.log('writeBLECharacteristicValue success', res);
      },
      fail: function (res) {
        console.log('writeBLECharacteristicValue fail', res);
      },
    })
  },
  // 发送加密后的数据
  sendData: function () {
    const pubkey = util.getPubkey(); // 手机端公钥
    const result = this.getSecurityKey();
    const { pubinfo } = this.data;
    pubinfo.result = [...result];
    this.setData({
      pubinfo,
      isPub: true,
      isSecrity: false,
    });
    console.log('加密后的数据: ', result);
  },
  // 解密
  handDecrypt: function () {
    const { secrityinfo, pubinfo } = this.data;
    const { aesKey, aes_iv, result } = pubinfo;
    const aesOpts = {
      asBytes: true,
      mode: new CryptoJS.mode.CFB(),
      iv: aes_iv
    }
    const result2 = CryptoJS.AES.decrypt(result, aesKey, aesOpts);
    secrityinfo.result = result2;
    this.setData({
      secrityinfo,
      isPub: false,
      isSecrity: true,
    });
    console.log('解密后的数据: ', result2);
  },
  // 加密密钥数据
  getSecurityKey: function () {
    const { aesKey, aes_iv, testdata } = this.data.pubinfo;
    // 测试加密
    const aesOpts = {
      asBytes: true,
      mode: new CryptoJS.mode.CFB(),
      iv: aes_iv
    }
    const data = [...testdata];
    const result = CryptoJS.AES.encrypt(data, aesKey, aesOpts);
    return result;
  },
  startbluetooth: function () {
    this.setData({
      isbluetooth: !this.data.isbluetooth
    })
  },
  // 检查是否授权相机
  toCheckSetting: function () {
    const _this = this;
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.camera" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.camera']) {
          wx.authorize({
            scope: 'scope.camera',
            success() {
              // 用户已经同意小程序使用相机功能，后续调用 wx.createCameraContext 接口不会弹窗询问
              _this.startCamera();
            }
          })
        }
        _this.startCamera();
      }
    })
  },
  // 打开相机扫描二维码
  startCamera: function () {
    const _this = this;
    _this.setData({
      iscamera: true,
    })
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res);
        _this.setData({
          src: res.tempImagePath
        })
      },
    })
  },
  // 打开相机出错
  error(e) {
    console.log(e.detail)
  },
  // 扫描二维码成功回调
  scancode(e) {
    console.log('scancode info: ', e);
    const result = e.detail.result;
    const obj = {
      codeinfo: {
        dev: util.getQueryString(result, 'd'),
        imei: util.getQueryString(result, 'IMEI')
      },
      iscamera: false
    }
    this.setData(obj)
  },
  // 清除设备列表
  clearDevice: function () {
    this.setData({
      deviceList: [],
    })
  },
  // 获取用户身份信息
  handleClick: function () {
    const _this = this;
    wx.login({
      success(res) {
        console.log(res);
        if (res.code) {
          // 发起网络请求，获取session_key
          wx.request({
            method: "GET",
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              js_code: res.code,
              appid: 'wx1f63e6ddb1e618fc',
              secret: '3102500f38047ba23a356656eef642bc',
              grant_type: 'authorization_code'
            },
            header: {
              'content-type': 'application/json' // 默认值  
            },
            success: (res) => {
              console.log('session_key: ', res);
              _this.setData({
                loginInfo: res.data
              })
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail(res) {
        console.log(res);
      }
    });
    
  },
  // 授权同意、获取用户手机号
  getUserPhone: function (e) {
    const _this = this;
    console.log(e);
    setTimeout(function () {
      wx.checkSession({
        success: function () {
          if (!e.detail.encryptedData) {
            console.log(e.detail.errMsg);
            return;
          }
          console.log(e.detail.errMsg)
          console.log(e.detail.iv)
          console.log(e.detail.encryptedData)

          const ency = e.detail.encryptedData;
          const iv = e.detail.iv;
          const sessionk = _this.data.loginInfo.session_key;

          if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
            _this.setData({
              modalstatus: true
            });
          } else {//同意授权

            const WXBizDataCrypt = require('../../utils/WXBizDataCrypt.js');
            const pc = new WXBizDataCrypt('wx1f63e6ddb1e618fc', sessionk)
            const data = pc.decryptData(ency, iv)
            console.log('解密后 data: ', data);
          }
        },
        fail: function () {
          console.log("session_key 已经失效，需要重新执行登录流程");
          _this.wxlogin(); //重新登录
        }
      });
    }, 2000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      lockinfo: JSON.parse(options.lockinfo)
    })

    // const pubkey = util.getPubkey(); // 手机端公钥
    // const result = [];
    // pubkey.map(key => {
    //   result.push(key.toString(16));
    // })
    // const nowpubkey = result.join('');
    // const value = util.str2ab(`EE000015${nowpubkey}`);
    // console.log('pubkey: ', nowpubkey);
    // console.log('write value 16: ', `EE000015${nowpubkey}`);
    // console.log('write value ArrayBuffer: ', value);
  }
})