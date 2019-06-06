<template>
  <div class="result-container">
    <el-row :gutter="8">
      <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
      <!--<todo-list/>-->
      <!--</el-col>-->
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 6}" >
        <name-plate :pack_attribute="motor_detail" />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12" :xl="18" >
        <el-row>
          <div class="chart-wrapper">
            <el-tabs type="border-card" stretch>
              <el-tab-pane :label="$t('trend.UtabTitle')">
                <trendChart :trend-data="{rms: result.urms, max: result.umax_current,min: result.umin_current, x: result.time}"/>
              </el-tab-pane>
              <el-tab-pane :label="$t('trend.VtabTitle')">
                <trendChart :trend-data="{rms: result.vrms, max: result.vmax_current,min: result.vmin_current, x: result.time}"/>
              </el-tab-pane>
              <el-tab-pane :label="$t('trend.WtabTitle')">
                <trendChart :trend-data="{rms: result.wrms, max: result.wmax_current,min: result.wmin_current, x: result.time}"/>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-row>
        <el-row>
          <div class="chart-wrapper">
            <el-tabs type="border-card" stretch >
              <el-tab-pane :label="$t('trend.THDTitle')">
                <THDtrendChart :trend-data="{rms: result.uthd, max: result.vthd,min: result.wthd, x: result.time}"/>
              </el-tab-pane>
              <el-tab-pane :label="$t('trend.ImbalanceTitle')">
                <ImbalancetrendChart :trend-data="{y: result.imbalance, x: result.time}"/>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { get_pack_info } from '@/api/IM'
import NamePlate from '../../realtime/components/Nameplate'
import trendChart from './trendChart'
import THDtrendChart from './THDtrendChart'
import ImbalancetrendChart from './ImbalancetrendChart'
export default {
  name: 'SymmetryResult',
  components: {
    NamePlate, trendChart, THDtrendChart, ImbalancetrendChart
  },
  props: {
    motorid: {
      required: true,
      type: Number
    },
    result: {
      required: true,
      type: Object
    }

  },
  data() {
    return {
      id: null,
      motor_detail: {},
      pack_detail: { rpm: 0 }
    }
  },
  beforeDestroy() {
    // This line is very important!! Destory the interval event before the component be destoried.
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_pack_info(this.motorid, { pack_id: 1000 }).then(response => {
        this.motor_detail = response.data
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .result-container {
    padding: 32px 32px 5px;
    background-color: rgb(255, 255, 255);
    .chart-wrapper {
      background: #fff;
      padding: 0px 16px 0;
      margin-bottom: 16px;
    }
  }

</style>
