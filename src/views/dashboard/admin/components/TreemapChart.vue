<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 3000

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
      default: '445px'
    },
    treeChartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    'treeChartData'() {
      this.setChart()
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el, 'macarons')
    this.setChart()
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
    setChart() {
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          },
          right: 'auto'
        },
        series: [
          {
            type: 'tree',
            data: [this.treeChartData],

            top: '10%',
            left: '20%',
            bottom: '1%',
            right: '20%',

            symbolSize: 16,
            symbol: 'emptyCircle',
            label: {
              normal: {
                position: 'top',
                verticalAlign: 'middle',
                align: 'center',
                fontSize: 14,
                fontFamily: 'Microsoft YaHei',
                fontWeight: 'bolder',
                distance: 10
              }
            },

            leaves: {
              label: {
                normal: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left'
                }
              }
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#d2dcf9' // 0% 处的颜色
                }, {
                  offset: 1, color: '#77c3f4' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              borderColor: '#807a81'
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ],
        animationDuration: animationDuration
      })
    }
  }
}
</script>
