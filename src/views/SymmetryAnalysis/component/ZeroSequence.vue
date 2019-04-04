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
      default: '200px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    zeroSequenceData: {
      type: Object,
      required: true
    }

  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {
    'zeroSequenceData'() {
      this.setChart()
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el, 'macarons')
    this.setChart()
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
    generate_timevector() {
      var data = []
      for (var i = 0; i < this.zeroSequenceData.real.length; i++) {
        data.push((i / 20480).toFixed(2))
      }
      return data
    },
    setChart() {
      this.chart.setOption({
        xAxis: {
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
          },
          data: this.generate_timevector()
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true,
          feature: {
            // magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },

        yAxis: {
          axisTick: {
            show: false
          },
          min: -0.3,
          max: 0.3
        },
        legend: {
          data: ['Real Part', 'Imag Part']
        },
        series: [{
          name: 'Real Part',
          itemStyle: {
            normal: {
              color: '#000000',
              lineStyle: {
                color: '#000000',
                width: 2,
                type: 'solid'
              },
              areaStyle: {
                color: '#fae0dc'
              }
            }

          },
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          type: 'line',
          data: this.zeroSequenceData.real,
          animationDuration: 4000,
          animationEasing: 'quadraticIn',
          largeThreshold: 2000,
          large: true,
          animation: false

        },
        {
          name: 'Imag Part',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          type: 'line',
          itemStyle: {
            normal: {
              color: '#000000',
              lineStyle: {
                color: '#000000',
                width: 2,
                type: 'dashed'
              },
              areaStyle: {
                color: '#d9f8fa'
              }
            }
          },
          data: this.zeroSequenceData.imag,
          largeThreshold: 2000,
          large: true,
          animation: false,

          animationDuration: 4000,
          animationEasing: 'quadraticIn'

        }]
      })
    }
  }
}
</script>
