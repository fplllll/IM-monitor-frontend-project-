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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    calendarData: {
      type: Array,
      required: true
    },
    topWaringData: {
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
    'calendarData'() {
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
        backgroundColor: '#ffffff',

        // title: {
        //   top: '30%',
        //   text: 'Warning\n\nCalendar',
        //   right: '3%',
        //   textStyle: {
        //     fontFamily: 'Helvetica Neue',
        //     fontWeight: 'bold',
        //     fontSize: 18
        //   },
        //   textAlign: 'center'
        // },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '40%',
          right: '6%',
          data: ['Warning Numbers', 'Top 5 Warning Day'],
          textStyle: {
            fontFamily: 'Helvetica Neue'
          },
          orient: 'vertical'
        },
        calendar: [{
          top: 25,
          right: '25%',
          range: ['2019-01-01', '2019-06-30'],
          cellSize: ['auto', 20],
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
          right: '25%',
          range: ['2019-07-01', '2019-12-31'],
          cellSize: ['auto', 18],
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
        series: [
          {
            name: 'Warning Numbers',
            type: 'scatter',
            coordinateSystem: 'calendar',
            data: this.calendarData,
            symbolSize: function(val) {
              return val[1] * 10
            },
            itemStyle: {
              normal: {
                color: '#e2f426'
              }
            }
          },
          {
            name: 'Warning Numbers',
            type: 'scatter',
            coordinateSystem: 'calendar',
            calendarIndex: 1,
            data: this.calendarData,
            symbolSize: function(val) {
              return val[1] * 10
            },
            itemStyle: {
              normal: {
                color: '#e2f426'
              }
            }
          },
          {
            name: 'Top 5 Warning Day',
            type: 'effectScatter',
            coordinateSystem: 'calendar',
            calendarIndex: 1,
            data: this.topWaringData,
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
            name: 'Top 5 Warning Day',
            type: 'effectScatter',
            coordinateSystem: 'calendar',
            data: this.topWaringData,
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
    }
  }

}
</script>

<style scoped>

</style>
