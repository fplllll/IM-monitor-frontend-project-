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
      default: '300px'
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
    setChart() {
      this.chart.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '转速',
            type: 'gauge',
            center: ['20%', '55%'], // 默认全局居中
            radius: '80%',
            min: 0,
            max: 100,
            endAngle: 45,
            splitNumber: 5,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 8,
                color: [[1, '#8ffbef']]

              }
            },
            axisTick: { // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: { // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 5
            },
            title: {
              fontWeight: 'bolder',
              offsetCenter: [0, '100%']

            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontSize: 18,
              fontWeight: 'bolder'
            },
            data: [
              { value: this.gaugeData.freq.toFixed(2), name: 'Frequency' },
              { value: this.gaugeData.freq, name: 'x1000 r/min' },
              { value: this.gaugeData.freq, name: 'x1000 r/min' }
            ]
          },
          {
            title: {
              fontWeight: 'bolder',
              fontSize: 20,
              offsetCenter: [0, '80%']

            },
            name: 'RPM',
            type: 'gauge',
            min: 0,
            max: 5000,
            radius: '100%',
            axisLine: {
              show: true,
              lineStyle: {
                color: [[1, '#bf81c2']],
                width: 10
              }
            },
            data: [{ value: this.gaugeData.rpm, name: 'RPM' }]
          },
          {
            name: 'U Phase RMS',
            type: 'gauge',
            center: ['80%', '50%'], // 默认全局居中
            radius: '80%',
            min: 0,
            max: 0.3,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 8,
                color: [[1, '#ff5e93']]
              }
            },
            axisTick: { // 坐标轴小标记
              splitNumber: 5,
              length: 10, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              formatter: function(v) {
                switch (v) {
                  case 0 : return 'Low'
                  case 0.15 : return 'U-Rms'
                  case 0.3 : return 'High'
                }
              }
            },
            splitLine: { // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              offsetCenter: [0, '115%'],
              fontWeight: 'bolder'
            },
            detail: {
              show: false
            },
            data: [{ value: this.gaugeData.urms, name: '3 Phase RMS' }]
          },
          {
            name: 'V phase RMS',
            type: 'gauge',
            center: ['80%', '50%'], // 默认全局居中
            radius: '80%',
            min: 0,
            max: 0.3,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 8,
                color: [[1, '#7ac0fa']]
              }
            },
            axisTick: { // 坐标轴小标记
              show: false
            },
            axisLabel: {
              formatter: function(v) {
                switch (v) {
                  case 0 : return 'Low'
                  case 0.15 : return 'V-Rms'
                  case 0.3 : return 'High'
                }
              }
            },
            splitLine: { // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: this.gaugeData.vrms, name: 'V-RMS' }]
          },
          {
            name: 'W phase RMS',
            type: 'gauge',
            center: ['80%', '50%'], // 默认全局居中
            radius: '80%',
            min: 0,
            max: 0.3,
            startAngle: 35,
            endAngle: -35,
            splitNumber: 2,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 8,
                color: [[1, '#8bfa9e']]

              }
            },
            axisTick: { // 坐标轴小标记
              show: false
            },
            axisLabel: {
              formatter: function(v) {
                switch (v) {
                  case 0 : return 'Low'
                  case 0.15 : return 'W-Rms'
                  case 0.3 : return 'High'
                }
              }
            },
            splitLine: { // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: this.gaugeData.wrms, name: 'W-RMS' }]
          }
        ]
      })
    }
  }
}
</script>

