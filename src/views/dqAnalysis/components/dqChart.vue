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
      default: '830px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    dqChartData: {
      type: Object,
      required: true,
      default: function() {
        return { d: [], q: [] }
      }
    }

  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {
    'dqChartData'() {
      this.setChart()
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el, 'macarons')
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    generateChartData() {
      var data = []
      for (var i = 0; i < this.dqChartData.q.length; i++) {
        data.push([this.dqChartData.d[i], this.dqChartData.q[i]])
      }
      return data
    },
    setChart() {
      var max = 1.2 * Math.max.apply(null, this.dqChartData.d).toFixed(2)
      var min = 1.2 * Math.min.apply(null, this.dqChartData.d).toFixed(2)
      this.chart.setOption({
        xAxis: {
          max: max,
          min: min,
          name: 'D component',
          nameTextStyle: {
            fontSize: 15,
            fontWeight: 'bold'
          },
          nameLocation: 'center',
          type: 'value',
          axisTick: {
            inside: true
          },
          axisLabel: {
            inside: true
          }
        },
        grid: {
          top: '1%'
        },
        yAxis: {
          max: max,
          min: min,
          name: 'Q component',
          nameLocation: 'center',
          nameTextStyle: {
            fontSize: 15,
            fontWeight: 'bold'
          },
          axisTick: {
            inside: true
          },
          axisLabel: {
            inside: true
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        series: [{
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          symbolSize: 3,
          data: this.generateChartData(),
          type: 'line',
          large: true
        }]
      })
    }
  }
}
</script>
