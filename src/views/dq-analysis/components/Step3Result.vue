<template>
  <div class="result-container">
    <el-row :gutter="50">
      <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
      <!--<todo-list/>-->
      <!--</el-col>-->
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 6}" :lg="{span: 6}" :xl="{span: 6}" >
        <name-plate :pack_attribute="motor_detail" />
      </el-col>
      <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18" >
        <el-card class="box-card">
          <h3 class="chart-title">{{ $t('dqanalysis.dqDQComponent') }}</h3>
          <dqChart :dq-chart-data="{ d: result.d, q: result.q}"/>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card class="box-card" style="margin-top: 10px">
        <h3 class="chart-title">{{ $t('dqanalysis.threephase') }}</h3>
        <three-phase :three_phase_data="three_phase_data"/>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="box-card" style="margin-top: 10px">
        <h3 class="chart-title">{{ $t('dqanalysis.envelope') }}</h3>
        <spectrum-chart :width="'100%'" :chart-data="{ spectrum: envelope}"/>
      </el-card>
    </el-row>
    <el-row style="margin: 20px auto">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
        <el-button type="info" icon="el-icon-back" @click="handlePrev"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get_pack_info, get_tsignal } from '@/api/IM'
import NamePlate from '../../realtime-monitor/components/Nameplate'
import dqChart from './dqChart'
import ThreePhase from '../../realtime-monitor/components/ThreePhase'
import SpectrumChart from '../../env-analysis/components/SpectrumChart'
export default {
  name: 'SymmetryResult',
  components: {
    NamePlate, dqChart, ThreePhase, SpectrumChart
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
      pack_detail: {},
      three_phase_data: {},
      envelope: []
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

      get_tsignal(this.motorid, { pack_id: this.pack_id }).then(response => {
        this.three_phase_data = { usignal: response.data.u, vsignal: response.data.v, wsignal: response.data.w }
        var data = []
        for (var i = 0; i < this.result.q.length; i++) {
          data.push(Math.sqrt(Math.pow(this.result.d[i], 2) + Math.pow(this.result.q[i], 2)))
        }
        this.envelope = data
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
      padding: 16px 16px 0;
      margin-bottom: 16px;
    }
  }

</style>
