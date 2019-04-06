<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '220px'
    },
    gaugeData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    'gaugeData'() {
      this.setChart()
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el, 'macarons')
    this.setChart()

    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    setChart() { // 中间
      var center1 = ['50%', '60%']
      var radius1 = ['100%', '45%', '75%']
      // 左边
      var center2 = ['20%', '65%']
      var radius2 = ['80%', '55%', '55%']
      // 邮编
      var center3 = ['80%', '65%']
      var radius3 = ['80%', '55%', '55%']

      this.chart.setOption({
        tooltip: {
          show: true
        },
        series: [{
          type: 'gauge',
          center: center1, // 默认全局居中
          radius: radius1[0],
          splitNumber: 10, // 刻度数量
          min: 0,
          max: 100,
          startAngle: 200,
          endAngle: -20,

          axisLine: {
            show: true,
            lineStyle: {
              width: 2,
              shadowBlur: 0,
              color: [
                [1, '#000000']
              ]
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#000000',
              width: 1
            },
            length: 8,
            splitNumber: 5
          },
          splitLine: {
            show: true,
            length: 12,
            lineStyle: {
              color: '#000000'
            }
          },
          axisLabel: {
            distance: 8,
            textStyle: {
              color: '#000000',
              fontSize: '12'
              // fontWeight:"bold"
            }
          },
          pointer: { // 仪表盘指针
            show: 0
          },
          detail: {
            formatter: function(value, index) {
              return 'V-THD ' + (value * 100).toFixed(2) + '%'
            },
            textStyle: {
              color: '#000000',
              fontSize: '18',
              fontWeight: 'normal'
            }
          },
          data: [{
            name: '',
            value: this.gaugeData.v
          }]
        },
        {
          startAngle: 200,
          endAngle: -20,
          name: '剩余电量',
          type: 'gauge',
          center: center1, // 默认全局居中
          radius: radius1[1],
          min: 0,
          max: 100,
          splitNumber: 0,
          axisLine: { // 坐标轴线
            lineStyle: {
              color: [
                [0.66, '#000000'],
                [1, '#000000']
              ], // 属性lineStyle控制线条样式
              width: 4
            }
          },
          axisLabel: { // 坐标轴小标记
            textStyle: { // 属性lineStyle控制线条样式
              fontWeight: 'bolder',
              fontSize: 16,
              color: 'rgba(30,144,255,0)'
            }
          },
          splitLine: { // 分隔线
            length: 10, // 属性length控制线长
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
              width: 0,
              color: '#000000'
            }
          },
          pointer: { // 分隔线 指针
            color: '#000000',
            width: 0,
            length: 230
          },
          detail: {
            show: false
          }

        },
        {
          name: '剩余电量',
          type: 'gauge',
          startAngle: 200,
          endAngle: -20,
          radius: radius1[2],
          center: center1, // 默认全局居中
          min: 0,
          max: 100,

          axisLine: {
            show: false,
            lineStyle: {
              width: 10,
              shadowBlur: 0,
              color: [
                [0.2, '#9CD6CE'],
                [0.4, '#7CBB55'],
                [0.6, '#DDBD4D'],
                [0.8, '#E98E2C'],
                [1, '#E43F3D']
              ]
            }
          },
          axisTick: {
            show: false

          },
          splitLine: {
            show: false,
            length: 20

          },

          axisLabel: {
            show: false
          },
          pointer: {
            show: true,
            width: 7
          },
          detail: {
            show: false,
            offsetCenter: [0, 0],
            textStyle: {
              fontSize: 30
            }
          },
          itemStyle: {
            normal: {
              color: '#000000'

            }
          },
          data: [{
            name: '',
            value: this.gaugeData.v
          }]
        },
        {
          type: 'gauge',
          center: center2, // 默认全局居中
          radius: radius2[0],
          splitNumber: 5, // 刻度数量
          min: 0,
          max: 100,
          startAngle: 200,
          endAngle: 60,

          axisLine: {
            show: true,
            lineStyle: {
              width: 2,
              shadowBlur: 0,
              color: [
                [1, '#000000']
              ]
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#000000',
              width: 1
            },
            length: 7,
            splitNumber: 5
          },
          splitLine: {
            show: true,
            length: 12,
            lineStyle: {
              color: '#000000'
            }
          },
          axisLabel: {
            distance: 8,
            textStyle: {
              color: '#000000',
              fontSize: '12'
              // fontWeight:"bold"
            }
          },
          pointer: { // 仪表盘指针
            show: 0
          },
          detail: {
            formatter: function(value, index) {
              return 'U-THD ' + (value * 100).toFixed(2) + '%'
            },
            textStyle: {
              color: '#000000',
              fontSize: '16',
              fontWeight: 'normal'
            }
          },
          data: [{
            name: '',
            value: this.gaugeData.u
          }]
        },
        {
          startAngle: 200,
          endAngle: 60,
          name: '电压',
          type: 'gauge',
          center: center2, // 默认全局居中
          radius: radius2[1],
          min: 0,
          max: 100,
          splitNumber: 0,
          axisLine: { // 坐标轴线
            lineStyle: {
              color: [
                [0.66, '#dddddd'],
                [1, '#dddddd']
              ], // 属性lineStyle控制线条样式
              width: 2
            }
          },
          axisLabel: { // 坐标轴小标记
            textStyle: { // 属性lineStyle控制线条样式
              fontWeight: 'bolder',
              fontSize: 16,
              color: 'rgba(30,144,255,0)'
            }
          },
          splitLine: { // 分隔线
            length: 10, // 属性length控制线长
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
              width: 0,
              color: '#000000'
            }
          },
          pointer: { // 分隔线 指针
            color: '#000000',
            width: 0,
            length: 230
          },
          detail: {
            show: false
          }

        },
        {
          name: '电压',
          type: 'gauge',
          startAngle: 200,
          endAngle: 60,
          center: center2, // 默认全局居中
          radius: radius2[2],
          min: 0,
          max: 100,
          axisLine: {
            show: false,
            lineStyle: {
              width: 7,
              shadowBlur: 0,
              color: [
                [0.2, '#9CD6CE'],
                [0.4, '#7CBB55'],
                [0.6, '#DDBD4D'],
                [0.8, '#E98E2C'],
                [1, '#E43F3D']
              ]
            }
          },
          axisTick: {
            show: false

          },
          splitLine: {
            show: false,
            length: 20

          },

          axisLabel: {
            show: false
          },
          pointer: {
            show: true,
            width: 5
          },
          detail: {
            show: false,
            offsetCenter: [0, 0],
            textStyle: {
              fontSize: 30
            }
          },
          itemStyle: {
            normal: {
              color: '#e2dfe0'

            }
          },
          data: [{
            name: '',
            value: this.gaugeData.u
          }]
        },
        {
          type: 'gauge',
          center: center3, // 默认全局居中
          radius: radius3[0],
          splitNumber: 5, // 刻度数量
          min: 0,
          max: 100,
          startAngle: 120,
          endAngle: -20,

          axisLine: {
            show: true,
            lineStyle: {
              width: 2,
              shadowBlur: 0,
              color: [
                [1, '#000000']
              ]
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#000000',
              width: 1
            },
            length: 7,
            splitNumber: 5
          },
          splitLine: {
            show: true,
            length: 12,
            lineStyle: {
              color: '#000000'
            }
          },
          axisLabel: {
            distance: 8,
            textStyle: {
              color: '#000000',
              fontSize: '12'
              // fontWeight:"bold"
            }
          },
          pointer: { // 仪表盘指针
            show: 0
          },
          detail: {
            formatter: function(value, index) {
              return 'W-THD ' + (value * 100).toFixed(2) + '%'
            },
            textStyle: {
              color: '#000000',
              fontSize: '16',
              fontWeight: 'normal'
            }
          },
          data: [{
            name: '',
            value: this.gaugeData.w
          }]
        },
        {
          startAngle: 120,
          endAngle: -20,
          name: '电流',
          type: 'gauge',
          center: center3, // 默认全局居中
          radius: radius3[1],
          min: 0,
          max: 100,
          splitNumber: 0,
          axisLine: { // 坐标轴线
            lineStyle: {
              color: [
                [0.66, '#dddddd'],
                [1, '#dddddd']
              ], // 属性lineStyle控制线条样式
              width: 2
            }
          },
          axisLabel: { // 坐标轴小标记
            textStyle: { // 属性lineStyle控制线条样式
              fontWeight: 'bolder',
              fontSize: 16,
              color: 'rgba(30,144,255,0)'
            }
          },
          splitLine: { // 分隔线
            length: 10, // 属性length控制线长
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
              width: 0,
              color: '#000000'
            }
          },
          pointer: { // 分隔线 指针
            color: '#000000',
            width: 0,
            length: 230
          },
          detail: {
            show: false
          }

        },
        {
          name: '电流',
          type: 'gauge',
          startAngle: 120,
          endAngle: -20,
          center: center3, // 默认全局居中
          radius: radius3[2],
          min: 0,
          max: 100,
          axisLine: {
            show: false,
            lineStyle: {
              width: 7,
              shadowBlur: 0,
              color: [
                [0.2, '#9CD6CE'],
                [0.4, '#7CBB55'],
                [0.6, '#DDBD4D'],
                [0.8, '#E98E2C'],
                [1, '#E43F3D']
              ]
            }
          },
          axisTick: {
            show: false

          },
          splitLine: {
            show: false,
            length: 20

          },

          axisLabel: {
            show: false
          },
          pointer: {
            show: true,
            width: 5
          },
          detail: {
            show: false,
            offsetCenter: [0, 0],
            textStyle: {
              fontSize: 30
            }
          },
          itemStyle: {
            normal: {
              color: '#e2dfe0'

            }
          },
          data: [{
            name: '',
            value: this.gaugeData.w
          }]
        }
        ]
      })
    }
  }
}
</script>

