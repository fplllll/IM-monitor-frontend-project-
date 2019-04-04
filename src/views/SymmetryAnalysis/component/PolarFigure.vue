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
      default: '400px'
    },
    PloarChartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      convertedPloarData: {
        positive: [],
        negative: []
      }
    }
  },
  watch: {
    'PloarChartData'() {
      this.conver2polarAxis()
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
    conver2polarAxis() {
      for (var i = 0; i < this.PloarChartData.positive_real.length; i++) {
        var real = this.PloarChartData.positive_real[i]
        var imag = this.PloarChartData.positive_imag[i]
        var theta
        if (real < 0) {
          theta = Math.atan(imag / real) + Math.PI
        } else {
          theta = Math.atan(imag / real)
        }
        this.convertedPloarData.positive.push(
          [Math.sqrt(Math.pow(real, 2) + Math.pow(imag, 2)),
            theta * 180 / Math.PI])
        real = this.PloarChartData.negative_real[i]
        imag = this.PloarChartData.negative_imag[i]
        if (real < 0) {
          theta = Math.atan(imag / real) + Math.PI
        } else {
          theta = Math.atan(imag / real)
        }
        this.convertedPloarData.negative.push(
          [Math.sqrt(Math.pow(real, 2) + Math.pow(imag, 2)),
            theta * 180 / Math.PI])
      }
    },
    setChart() {
      this.chart.setOption({
        legend: {
          data: ['Positive', 'Negative']
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        polar: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
        },
        series: [{
          coordinateSystem: 'polar',
          name: 'Positive',
          type: 'line',
          data: this.convertedPloarData.positive,
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          animationDuration: 1000,
          animationEasing: 'quadraticIn',
          large: true
        },
        {
          coordinateSystem: 'polar',
          name: 'Negative',
          type: 'line',
          data: this.convertedPloarData.negative,
          smooth: true,
          animationDuration: 1000,
          animationEasing: 'quadraticIn',
          symbol: 'none',
          sampling: 'average',
          large: true
        }]

      })
    }
  }
}
</script>
