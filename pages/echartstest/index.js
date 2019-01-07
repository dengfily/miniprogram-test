import * as echarts from '../../tools/ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  const option = {
    color: ['#7593FF', '#FF9859'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 20,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [1, 2, 3, 4, 5, 6, 7],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        // axisTick: { show: false },
        // axisLine: {
        //   lineStyle: {
        //     color: '#999'
        //   }
        // },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '步数平均值',
        type: 'bar',
        data: [6, 4, 3, 4, 10, 11, 9],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
      {
        name: '心率平均值',
        type: 'bar',
        stack: '总量',
        data: [4, 7, 8, 4, 6, 15, 21],
        itemStyle: {
          // emphasis: {
          //   color: '#32c5e9'
          // }
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

function initLineChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  const option = {
    color: ['#7593FF', '#FF9859'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'cross'        // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 55,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [1, 2, 3, 4, 5, 6, 7],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          color: '#666'
        },
        axisTick: {
          show: false
        },
        max: 25,
        min: 0,
        boundaryGap: [0.2, 0.2]
      },
      {
        type: 'value',
        axisLabel: {
          color: '#666'
        },
        axisTick: {
          show: false
        },
        max: 25,
        min: 0,
        boundaryGap: [0.2, 0.2]
      }
    ],
    series: [
      {
        name: '步数平均值',
        type: 'line',
        xAxisIndex: 0,
        yAxisIndex: 1,
        symbol: 'none',
        smooth: true,
        data: [6, 4, 3, 4, 10, 11, 9],
      },
      {
        name: '心率平均值',
        type: 'line',
        symbol: 'none',
        smooth: true,
        data: [4, 7, 8, 4, 6, 15, 21],
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/echartstest/index',
      success: function () {
        console.log('shared success...')
      },
      fail: function () {
        console.log('shared fail...')
      }
    }
  },
  data: {
    ec: {
      onInit: initChart
    },
    ecLine: {
      onInit: initLineChart
    }
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  }
});
