// 全局注册F2
import F2 from '@antv/wx-f2'; // 注：也可以不引入， initChart 方法已经将 F2 传入，如果需要引入，注意需要安装 @antv/wx-f2 依赖

let chart = null;

function initChart(canvas, width, height, F2) { // 使用 F2 绘制图表
  const data = [
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
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.legend('type', {
    align: 'center',
    itemWidth: null,
    nameStyle: {
      fontSize: '14',
      fill: 'rgb(114, 116, 132)'
    }
  });

  chart.source(data, {
    sales: {
      tickCount: 5
    }
  });
  chart.tooltip({
    showItemMarker: true,
    crosshairsStyle: {
      stroke: '#EEFF43',
      lineWidth: 1
    },
    alwaysShow: false
  });
  chart.interval().position('year*sales').color('type', ['#7593FF', '#FF9859']).adjust({
    type: 'dodge',
    marginRatio: 0.1 // 设置分组间柱子的间距
  });
  chart.render();
  return chart;
}

function initLineChart(canvas, width, height, F2) {
  const data = [
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
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.legend('type', {
    align: 'center',
    itemWidth: null,
    nameStyle: {
      fontSize: '14',
      fill: 'rgb(114, 116, 132)'
    }
  });

  chart.source(data, {
    sales: {
      tickCount: 5
    }
  });
  chart.tooltip({
    showItemMarker: true,
    crosshairsStyle: {
      stroke: '#EEFF43',
      lineWidth: 1
    },
    alwaysShow: false
  });
  chart.line().shape('smooth').position('year*sales').color('type', ['#7593FF', '#FF9859']);
  chart.render();
  return chart;
}

Page({
  data: {
    opts: {
      onInit: initChart
    },
    optsline: {
      onInit: initLineChart
    }
  },

  onReady() {
  }
});