// const F2 = require('@antv/f2-canvas')
// import F2 from '@antv/wx-f2';

let chart = null;
let nowdata = [];
let nowdata2 = [];

function initChart(canvas, width, height, F2) { // 使用 F2 绘制图表
  if (!nowdata || !nowdata.length) return;
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.source(nowdata, {
    sales: {
      tickCount: 5
    }
  });
  chart.legend('type', {
    position: 'bottom',
    align: 'center',
    itemWidth: null,
    marker: {
      radius: 5
    },
    nameStyle: {
      fontSize: '17',
      fill: 'rgb(114, 116, 132)'
    }
  });
  chart.tooltip({
    showItemMarker: true,
    itemMarkerStyle: {
      radius: 3
    },
    crosshairsStyle: {
      stroke: '#EEFF43',
      lineWidth: 1
    },
    alwaysShow: false,
    // custom: true,
    onShow(ev) {
      /*
      const { items } = ev;
      items[0].name = items[0].title;
      items[0].value = '步数平均值:' + items[0].value;
      */
    },
    // onChange: function (ev) {
    //   const query = wx.createSelectorQuery();
    //   const customTooltip = query.select('custom-tooltip');
    //   console.log(customTooltip)
    //   if (!customTooltip) return;
    //   const { items } = ev;
    //   customTooltip.innerHTML = `<p>${items[0].name}: ${items[0].value}</p><p>${items[1].name}: ${items[1].value}</p>`;
    //   query.exec()
    // },
    // onHide: function() {
    //   const query = wx.createSelectorQuery();
    //   const customTooltip = query.select('custom-tooltip');
    //   customTooltip.style.display = 'none';
    //   query.exec()
    // }
  });
  chart.axis('year', {
    grid: {
      lineDash: null
    },
    label: function() {
      const cfg = {
        fill: '#ffffff',
        fontSize: 14
      };
      return cfg;
    }
  });
  chart.axis('sales', {
    grid: {
      lineDash: null,
      stroke: 'rgb(114, 116, 132)',
      lineWidth: 1
    },
    label: function () {
      const cfg = {
        fill: 'rgb(114, 116, 132)',
        fontSize: 14
      };
      return cfg;
    }
  });
  chart.line().shape('smooth').position('year*sales').color('type', ['#7593FF', '#FF9859']).style('type');
  chart.render();
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    numberList: [{
      imgPath: '/assets/icon/heart-rate.png',
      number: 64,
      title: '平均心率'
    }, {
      imgPath: '/assets/icon/footprint.png',
      number: 17828,
      title: '平均步数'
    }, {
      imgPath: '/assets/icon/situp.png',
      number: 72,
      title: '平均强度'
    }],
    heartBad: {
      imgPath: '/assets/icon/heartBroken.png',
      count: 1
    },
    opts: {
      onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    nowdata = [
      { year: '1', sales: 6, type: '步数平均值' },
      { year: '2', sales: 4, type: '步数平均值' },
      { year: '3', sales: 3, type: '步数平均值' },
      { year: '4', sales: 4, type: '步数平均值' },
      { year: '5', sales: 10, type: '步数平均值' },
      { year: '6', sales: 11, type: '步数平均值' },
      { year: '7', sales: 9, type: '步数平均值' },
      { year: '1', sales: 4, type: '心率平均值' },
      { year: '2', sales: 7, type: '心率平均值' },
      { year: '3', sales: 8, type: '心率平均值' },
      { year: '4', sales: 4, type: '心率平均值' },
      { year: '5', sales: 6, type: '心率平均值' },
      { year: '6', sales: 15, type: '心率平均值' },
      { year: '7', sales: 21, type: '心率平均值' }
    ];
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