<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { get_trend } from '@/api/IM'

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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }

  },
  data() {
    return {
      chart: null,
      sidebarElm: null,
      chartData: []
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.initChart()
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
    setOptions() {
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({

        xAxis: {
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
          },
          data: []
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
            start: 80,
            end: 100
          },
          {
            type: 'inside',
            xAxisIndex: [0],
            start: 80,
            end: 100
          }
        ],

        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['Motor#1', 'Motor#2', 'Motor#3']
        },
        series: []
      })
      this.chart.showLoading()
      this.fetchData()
      this.chart.hideLoading()
    },
    fetchData() {
      get_trend().then(response => {
        const data = response.data
        this.chart.setOption({
          xAxis: {
            data: data[0].trend.time
          },
          series: [{
            name: 'Motor#1', itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: data[0].trend.trend,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: 'Motor#2',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: data[1].trend.trend,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          },
          {
            name: 'Motor#3',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#26fa24',
                lineStyle: {
                  color: '#26fa24',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: data[2].trend.trend,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }]
        })
      })
    }
  }
}
</script>
