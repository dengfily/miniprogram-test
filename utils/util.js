const CryptoJS = require('../tools/crypto/index.js').CryptoJS;

// 格式化时间
const formatTime = date => {
  if (!date) {
    return '';
  }
  if (typeof date !== "object") {
    date = new Date(date);
  }
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function checkBikesComplete(items) {
  let a1 = []; // 已经走完备案流程
  let a11 = []; //只填了车牌
  let a12 = []; //有车牌 有照片
  let a2 = []; //未备案
  let a3 = []; // 所有车
  for (let i = 0, len = items.length; i < len; i++) {
    let item = items[i];
    item.registerTime = formatTime(item.registerTime).split(' ')[0];
    item.purchaseTime = formatTime(item.purchaseTime).split(' ')[0];
    item.label1 = item.license && item.frameNumber  ? "车牌:" + item.license : "车架:" + item.frameNumber ;    
    item.label2 = !item.license && item.frameNumber ? "车牌:--" : "车架:" + item.frameNumber;
    //&& item.imei && item.receiptPictures && item.receiptPictures[0] && item.ownerPictures && item.ownerPictures[0] && item.afterPictures && item.afterPictures[0] && item.registerNodeId && item.registerNodeName
    if (item.license) {
      item.complete = true;
      item.licenselabel = "车牌:" + (item.license || '--');
      if (item.ownerPictures && item.ownerPictures[0]){
        item.hasPicture=true;
        a12.push(item);
      }else{
        a11.push(item);
      }
    } else {
      item.frameNumberlabel = "车架:" + (item.frameNumber || '--');
      item.label = "车架：  " + item.frameNumber;
      item.complete = false;
      a2.push(item);
    }
  }
  a1 = a12.concat(a11);
  a3 = a1.concat(a2);
  return {
    a1,
    a11,
    a12,
    a2,
    a3
  };
}

function fetchBirthdayFromIdCard(value = '') {
  const reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  if (reg.test(value)) {
    let date = value.substr(6, 8);
    let y = date.substr(0, 4);
    let m = date.substr(4, 2);
    let d = date.substr(6, 2);
    return `${y}-${m}-${d}`;
  } else {
    return '';
  }
}

// 获取url地址上的某个参数值
function getQueryString(url, name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  const search = url.split('?')[1];
  const r = search.match(reg);
  if (r != null) return unescape(r[2]); return null;
}

// 获取手机端公钥
function getPubkey() {
  const dh = CryptoJS.DH.createDiffieHellman();
  const pubkey = dh.generateKeys();
  return pubkey;
}

// ArrayBuffer转16进度字符串
function ab2hex(buffer) {
  const hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('')
}

// 16进制字符串转ArrayBuffer
function str2ab(hex) {
  const typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
    return parseInt(h, 16)
  }))
  const buffer = typedArray.buffer;
  return buffer;
}

module.exports = {
  formatTime: formatTime,
  checkBikesComplete: checkBikesComplete,
  fetchBirthdayFromIdCard: fetchBirthdayFromIdCard,
  getQueryString: getQueryString,
  getPubkey: getPubkey,
  ab2hex: ab2hex,
  str2ab: str2ab,
}