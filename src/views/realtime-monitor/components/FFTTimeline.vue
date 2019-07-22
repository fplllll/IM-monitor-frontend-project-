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
    three_phase_data: {
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
    'three_phase_data'() {
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
    generate_timevector() {
      var data = []
      for (var i = 0; i < this.three_phase_data.uspec.length; i++) {
        data.push((i * (10240 / 4096)).toFixed(1))
      }
      return data
    },
    compute_harmonic() {
      var max = Math.max.apply(null, this.three_phase_data.uspec)
      return this.three_phase_data.uspec.indexOf(max)
    },
    setChart() {
      const basic_markline = this.compute_harmonic()
      console.log(basic_markline)
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
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },

        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['U phase', 'V phase', 'W phase']
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 20
          }
        ],
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
          markLine: {
            label: {
              show: false
            },
            symbol: 'circle',
            lineStyle: {
              color: '#6c6c6c'
            },
            data: [{ name: '1X', xAxis: basic_markline }, { name: '2X', xAxis: basic_markline * 2 }, { name: '3X', xAxis: basic_markline * 3 },
              { name: '4X', xAxis: basic_markline * 4 }, { name: '5X', xAxis: basic_markline * 5 }, { name: '6X', xAxis: basic_markline * 6 }] },

          smooth: true,
          symbol: 'none',
          sampling: 'average',
          type: 'line',
          data: this.three_phase_data.uspec,
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
          type: 'line',
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
          data: this.three_phase_data.vspec,
          largeThreshold: 2000,
          animation: false,

          animationDuration: 4000,
          animationEasing: 'quadraticIn'

        },
        {
          name: 'W phase',
          smooth: true,
          symbol: 'none',
          type: 'line',
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
          data: this.three_phase_data.wspec,
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
