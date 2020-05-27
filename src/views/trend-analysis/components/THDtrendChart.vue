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
      default: '1100px'
    },
    height: {
      type: String,
      default: '400px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    trendData: {
      type: Object,
      required: true,
      default: function() {
        return {}
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
    'trendData'() {
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
    setChart() {
      this.chart.setOption({

        xAxis: {
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
          },
          data: this.trendData.x
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
            type: 'cross'
          },
          padding: [5, 10]
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 100
          }
        ],

        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['U THD', 'V THD', 'W THD']
        },
        series: [{
          name: 'U THD',
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2
              }
            }
          },
          markLine: { data: [{ name: '50Hz', type: 'average' }] },
          markPoint: {
            label: {
              formatter: function(value) {
                return (value.value * 100).toFixed(2) + '%'
              }
            },
            data: [{ name: 'max', type: 'max' }, { name: 'min', type: 'min' }] },
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          large: true, type: 'line',
          data: this.trendData.rms,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }, {
          name: 'V THD',
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2
              }
            }
          },
          markLine: { data: [{ name: '50Hz', type: 'average' }] },
          markPoint: {
            label: {
              formatter: function(value) {
                return (value.value * 100).toFixed(2) + '%'
              }
            },
            data: [{ name: 'max', type: 'max' }, { name: 'min', type: 'min' }] },
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          large: true, type: 'line',
          data: this.trendData.max,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }, {
          name: 'W THD',
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2
              }
            }
          },
          markLine: { data: [{ name: '50Hz', type: 'average' }] },
          markPoint: {
            label: {
              formatter: function(value) {
                return (value.value * 100).toFixed(2) + '%'
              }
            },
            data: [{ name: 'max', type: 'max' }, { name: 'min', type: 'min' }] },
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          large: true, type: 'line',
          data: this.trendData.min,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }]
      })
    }

  }
}
</script>
