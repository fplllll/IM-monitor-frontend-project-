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
              <el-tab-pane :label=" 'U' + $t('envelope.figureTitle')">
                <trendChart :trend-data="{raw: result.u, env: result.uenvelope}"/>
                <spectrum-chart :chart-data="{spectrum : result.ufft}"/>
              </el-tab-pane>
              <el-tab-pane :label=" 'V' + $t('envelope.figureTitle')">
                <trendChart :trend-data="{raw: result.v, env: result.venvelope}"/>
                <spectrum-chart :chart-data="{spectrum : result.vfft}"/>
              </el-tab-pane>
              <el-tab-pane :label=" 'W' + $t('envelope.figureTitle')">
                <trendChart :trend-data="{raw: result.w, env: result.wenvelope}"/>
                <spectrum-chart :chart-data="{spectrum : result.wfft}"/>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin: 20px auto">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
        <el-button type="info" icon="el-icon-back" @click="handlePrev"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get_pack_info } from '@/api/IM'
import NamePlate from '../../realtime/components/Nameplate'
import trendChart from './trendChart'
import SpectrumChart from './SpectrumChart'

export default {
  name: 'SymmetryResult',
  components: {
    SpectrumChart,
    NamePlate, trendChart
  },
  props: {
    motorid: {
      required: true,
      type: Number
    },
    result: {
      required: true,
      type: Object
    },
    pack_id: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      id: null,
      motor_detail: {},
      pack_detail: {}
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_pack_info(this.motorid, { pack_id: this.pack_id }).then(response => {
        this.motor_detail = response.data
      })
    },
    handlePrev() {
      this.$emit('handlePrev')
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
