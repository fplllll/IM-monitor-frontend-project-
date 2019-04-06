<template>
  <div class="result-container">
    <el-row :gutter="8">
      <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
      <!--<todo-list/>-->
      <!--</el-col>-->
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 6}" >
        <el-row>
          <name-plate :motor_attribute="motor_detail" :pack_attribute="{ time: result.time,sampling_rate: result.sampling_rate,id:result.id }" />
        </el-row>

      </el-col>
      <el-col :xs="24" :sm="24" :lg="12" :xl="18">
        <el-row>
          <div class="chart-wrapper">
            <h3 class="chart-title">Three Phase Spectrum</h3>
            <FFTtiemline :three_phase_data="{ uphase: {spec : result.data.ufft} ,vphase: {spec : result.data.vfft},wphase: {spec : result.data.wfft}}"/>
          </div>
        </el-row>
        <el-row>
          <div class="chart-wrapper">
            <h3 class="chart-title">Harmonics Component</h3>
            <harmonic-bar :harmonic_data="{ u: result.data.uharmonic ,v: result.data.vharmonic, w: result.data.wharmonic}"/>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" >
        <div class="chart-wrapper">
          <harmonic-gauge :height="'300px'" :gauge-data="{u: result.data.uthd,v:result.data.vthd,w:result.data.wthd}" />
        </div>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" >
        <HarmonicTable />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { get_motors } from '@/api/IM'
import NamePlate from '../../realtime/components/Nameplate'
import FFTtiemline from '../../realtime/components/FFTTimeline'
import HarmonicBar from './harmonicBar'
import harmonicGauge from './harmonicGauge'
import HarmonicTable from './harmonicTable'
export default {
  name: 'HarmonicResult',
  components: {
    HarmonicBar, NamePlate, FFTtiemline, harmonicGauge, HarmonicTable
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
    padding: 32px 32px 32px;
    background-color: rgb(243, 243, 243);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 16px;
    }
  }

</style>
