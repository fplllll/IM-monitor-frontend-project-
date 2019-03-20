<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { get_warningcalendar } from '@/api/IM'

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
        backgroundColor: '#ffffff',

        title: {
          top: '30%',
          text: 'Warning\n\nCalendar',
          right: 10,
          textStyle: {
            color: '#909399',
            fontFamily: 'Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: 20
          },
          textAlign: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '60%',
          right: 10,
          data: ['Warning count', 'Top 5'],
          textStyle: {
            color: '#000000'
          }
        },
        calendar: [{
          top: 25,
          left: '10%',
          range: ['2019-01-01', '2019-06-30'],
          splitLine: {
            show: true,
            lineStyle: {
              color: '#5e5a5f',
              width: 3,
              type: 'solid'
            }
          },
          yearLabel: {
            formatter: '{start}  1st',
            textStyle: {
              color: '#fff'
            }
          },
          itemStyle: {
            normal: {
              color: '#77d8ff',
              borderWidth: 1,
              borderColor: '#807a81'
            }
          }
        }, {
          top: 200,
          left: '10%',
          range: ['2019-07-01', '2019-12-31'],
          splitLine: {
            show: true,
            lineStyle: {
              color: '#5e5a5f',
              width: 3,
              type: 'solid'
            }
          },
          yearLabel: {
            formatter: '{start}  1st',
            textStyle: {
              color: '#fff'
            }
          },
          itemStyle: {
            normal: {
              color: '#77d8ff',
              borderWidth: 1,
              borderColor: '#807a81'
            }
          }
        }],
        series: []
      })
      this.fetchData()
    },
    fetchData() {
      get_warningcalendar().then(response => {
        const data = response.data
        this.chart.setOption({
          series: [
            {
              name: 'Warning count',
              type: 'scatter',
              coordinateSystem: 'calendar',
              data: data,
              symbolSize: function(val) {
                return val[1] * 2
              },
              itemStyle: {
                normal: {
                  color: '#f4e925'
                }
              }
            },
            {
              name: 'Warning count',
              type: 'scatter',
              coordinateSystem: 'calendar',
              calendarIndex: 1,
              data: data,
              symbolSize: function(val) {
                return val[1] * 2
              },
              itemStyle: {
                normal: {
                  color: '#f4e925'
                }
              }
            },
            {
              name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'calendar',
              calendarIndex: 1,
              data: data.sort(function(a, b) {
                return b[1] - a[1]
              }).slice(0, 5),
              symbolSize: function(val) {
                return val[1] * 10
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              itemStyle: {
                normal: {
                  color: '#f45440',
                  shadowBlur: 10,
                  shadowColor: '#333'
                }
              },
              zlevel: 1
            },
            {
              name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'calendar',
              data: data.sort(function(a, b) {
                return b[1] - a[1]
              }).slice(0, 5),
              symbolSize: function(val) {
                return val[1] * 10
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              itemStyle: {
                normal: {
                  color: '#f45440',
                  shadowBlur: 10,
                  shadowColor: '#333'
                }
              },
              zlevel: 1
            }
          ]

        })
      })
    }
  }

}
</script>

<style scoped>

</style>
