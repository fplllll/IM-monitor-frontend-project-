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
      default: '442px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    harmonic_data: {
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
    'harmonic_data'() {
      this.settlChart()
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
    generate_timevector() {
      var data = []
      for (var i = 0; i < this.harmonic_data.u.length; i++) {
        data.push((i + 2).toString() + 'th Harmonic')
      }
      return data
    },
    settlChart() {
      this.chart.setOption({
        xAxis: {
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          type: 'category',
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
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          show: true,
          orient: 'horizontal',
          left: 'right',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },

        yAxis: {
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: function(value, index) {
              return (value * 100).toFixed(2) + '%'
            }
          }
        },
        legend: {
          data: ['U phase', 'V phase', 'W phase']
        },
        series: [{
          name: 'U phase',
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              },
              areaStyle: {
                color: '#fae0dc'
              }
            }

          },
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          type: 'bar',
          data: this.harmonic_data.u,
          animationDuration: 4000,
          animationEasing: 'quadraticIn',
          largeThreshold: 2000,
          large: true,
          animation: false

        },
        {
          name: 'V phase',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          large: true,
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#d9f8fa'
              }
            }
          },
          data: this.harmonic_data.v,
          largeThreshold: 2000,
          animation: false,

          animationDuration: 4000,
          animationEasing: 'quadraticIn'

        },
        {
          name: 'W phase',
          smooth: true,
          symbol: 'none',
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#26fa24',
              lineStyle: {
                color: '#26fa24',
                width: 2
              },
              areaStyle: {
                color: '#deffdf'
              }
            }
          },
          data: this.harmonic_data.w,
          animation: false,
          animationDuration: 4000,
          largeThreshold: 2000,
          large: true,
          animationEasing: 'quadraticIn',
          sampling: 'average'

        }]
      })
    }
  }

}
</script>
