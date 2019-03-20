<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { get_indexbar } from '@/api/IM'

const animationDuration = 6000

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
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
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
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        // title: {
        //   text: 'Motor Component statistic',
        //   left: 'center',
        //   textStyle: {
        //     fontSize: 14,
        //     fontFamily: 'Arial',
        //     color: '#000000'
        //   }
        // },
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
        series: []
      })
      this.fetchData()
    },
    fetchData() {
      get_indexbar().then(response => {
        const data = response.data
        this.chart.setOption({
          series: [{
            name: 'rotor',
            type: 'bar',
            stack: 'vistors',
            barWidth: '40%',
            data: [data[0].rotor, data[1].rotor, data[2].rotor],
            animationDuration
          }, {
            name: 'stator',
            type: 'bar',
            stack: 'vistors',
            barWidth: '40%',
            data: [data[0].stator, data[1].stator, data[2].stator],
            animationDuration
          }, {
            name: 'bearing',
            type: 'bar',
            stack: 'vistors',
            barWidth: '40%',
            data: [data[0].bearing, data[1].bearing, data[2].bearing],
            animationDuration
          }]
        })
      })
    }
  }
}
</script>
