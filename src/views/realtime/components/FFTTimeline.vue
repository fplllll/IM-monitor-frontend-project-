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
      for (var i = 0; i < this.three_phase_data.uphase.spec.length; i++) {
        data.push((i * (10240 / this.three_phase_data.uphase.spec.length)).toFixed(1))
      }
      return data
    },
    settlChart() {
      this.chart.setOption({
        baseOption: {
          timeline: {
            inverse: true,
            playInterval: 1000,
            right: null,
            left: 0,
            top: 20,
            bottom: 20,
            width: 55,
            symbolSize: 15,
            height: null,
            axisType: 'category',
            orient: 'vertical',
            autoPlay: true,
            controlStyle: {
              size: 10,
              color: '#bbb'
            },
            itemStyle: {
              normal: {
                color: '#04a5f1'
              }
            },
            checkpointStyle: {
              color: '#bbb',
              borderColor: '#777',
              borderWidth: 2
            },
            label: {
              position: -20,
              fontFamily: 'Helvetica Neue',
              fontWeight: 'bold',
              fontSize: 14
            },
            emphasis: {
              label: {
                color: '#04a5f1',
                fontSize: 18
              },
              checkpointStyle: {
                color: '#04a5f1'
              },
              controlStyle: {
                color: '#04a5f1'
              },
              itemStyle: {
                color: '#04a5f1'
              }
            },
            data: ['U', 'V', 'W']
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
          xAxis: {
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            boundaryGap: false,
            axisTick: {
              show: false
            },
            data: this.generate_timevector()
          },
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 15,
              end: 25
            }
          ],
          grid: {
            left: 70,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          series: [
            { name: 'Spectrum', type: 'line' }
          ]
        },
        options: [
          {
            title: { text: 'U phase' },
            series: [
              {
                symbol: 'none',
                sampling: 'average',
                data: this.three_phase_data.uphase.spec,
                large: true,
                largeThreshold: 2000,
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
                }
              }
            ]
          },
          {
            title: { text: 'V phase' },
            series: [
              {
                symbol: 'none',
                sampling: 'average',
                data: this.three_phase_data.vphase.spec,
                large: true,
                largeThreshold: 2000,
                itemStyle: {
                  normal: {
                    color: '#3888fa',
                    lineStyle: {
                      color: '#3888fa',
                      width: 2
                    },
                    areaStyle: {
                      color: '#fae0dc'
                    }
                  }

                }
              }
            ]
          },
          {
            title: { text: 'W phase' },
            series: [
              {
                symbol: 'none',
                sampling: 'average',
                data: this.three_phase_data.wphase.spec,
                largeThreshold: 2000,
                large: true,
                itemStyle: {
                  normal: {
                    color: '#26fa24',
                    lineStyle: {
                      color: '#26fa24',
                      width: 2
                    },
                    areaStyle: {
                      color: '#fae0dc'
                    }
                  }

                }
              }
            ]
          }
        ]
      })
    }
  }

}
</script>
