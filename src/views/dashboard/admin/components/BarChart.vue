<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 8000

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
    barChartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    'barChartData'() {
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
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 30,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['Motor#1', 'Motor#2', 'Motor#3'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          max: '10'
        }],
        series: [{
          name: 'rotor',
          type: 'bar',
          stack: 'vistors',
          barWidth: '40%',
          data: [this.barChartData[0].rotors, this.barChartData[1].rotors, this.barChartData[2].rotors],
          animationDuration
        }, {
          name: 'stator',
          type: 'bar',
          stack: 'vistors',
          barWidth: '40%',
          data: [this.barChartData[0].stators, this.barChartData[1].stators, this.barChartData[2].stators],
          animationDuration
        }, {
          name: 'bearing',
          type: 'bar',
          stack: 'vistors',
          barWidth: '40%',
          data: [this.barChartData[0].bearings, this.barChartData[1].bearings, this.barChartData[2].bearings],
          animationDuration
        }]
      })
    }
  }
}
</script>
