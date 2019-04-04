<template>
  <div class="result-container">
    <el-row :gutter="8">
      <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
      <!--<todo-list/>-->
      <!--</el-col>-->
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 6}" >
        <name-plate :motor_attribute="motor_detail" :pack_attribute="{ time: result.time,sampling_rate: result.sampling_rate,id:result.id }" />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12" :xl="18" >
        <div class="chart-wrapper">
          <h3 class="chart-title">DQ Component</h3>
          <dqChart :dq-chart-data="{ d: result.data.d, q: result.data.q}"/>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="chart-wrapper">
        <h3 class="chart-title">Original Three Phase Signal</h3>
        <three-phase :three_phase_data="{ uphase: {signal: result.data.A} , vphase: {signal: result.data.B},wphase: {signal: result.data.C}}"/>
      </div>
    </el-row>

  </div>
</template>

<script>
import { get_motors } from '@/api/IM'
import NamePlate from '../../realtime/components/Nameplate'
import dqChart from './dqChart'
import ThreePhase from '../../realtime/components/ThreePhase'
export default {
  name: 'SymmetryResult',
  components: {
    NamePlate, dqChart, ThreePhase
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
      motor_detail: [{ name: '' }],
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
      get_motors({ id: this.motorid }).then(response => {
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
      padding: 16px 16px 0;
      margin-bottom: 16px;
    }
  }

</style>
