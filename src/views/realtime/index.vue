<template>
  <div class="motorrealtime-container">
    <sticky :class-name="'sub-navbar '+StickyForm.status">
      <IsRealTime v-model="StickyForm.realtime_disabled" @handleFetchDataEvent="toggleIntervalEvent"/>
      <!--<Location v-model="StickyForm.location" />-->
      <MotorID v-model="StickyForm.motor" />
      <router-link :to="'/motor/realtime/'+StickyForm.motor">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" >{{ $t('realTime.change') }}</el-button>
      </router-link>
    </sticky>
    <el-row :gutter="8">
      <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
      <!--<todo-list/>-->
      <!--</el-col>-->
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 6}" style="margin-bottom:30px;">
        <name-plate :motor_attribute="motor_detail" :pack_attribute="pack_detail" />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12" :xl="18">
        <el-row>
          <div class="chart-wrapper">
            <span class="card-title"> {{ $t('realTime.threePhase') }} </span>
            <el-divider/>
            <three-phase :three_phase_data="threePhaseData"/>
          </div>
        </el-row>
        <el-row>
          <div class="chart-wrapper">
            <span class="card-title"> {{ $t('realTime.threePhaseSpec') }} </span>
            <el-divider/>
            <FFTTimeline
              :three_phase_data="threePhaseData"/>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <span class="card-title"> {{ $t('realTime.gaugeTitle') }} </span>
          <el-divider/>
          <gauge-chart :gauge-data="gaugeData"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <parameter-table :table_data="parameterData"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import ThreePhase from './components/ThreePhase'
import { get_motor_realtime, get_motors } from '@/api/IM'
import NamePlate from './components/Nameplate'
import FFTTimeline from './components/FFTTimeline'
import { IsRealTime, Location, MotorID } from './components/Dropdown'
import GaugeChart from './components/GaugeChart'
import ParameterTable from './components/ParameterTable'

const defaultSticky = {
  status: 'draft',
  location: ['a-platform'],
  realtime_disabled: false,
  motor: 1
}

export default {
  name: 'RealTime',
  components: {
    ThreePhase, NamePlate, FFTTimeline, GaugeChart, ParameterTable,
    Sticky, IsRealTime, Location, MotorID

  },
  data() {
    return {
      id: null,
      threePhaseData: { ufft: [0] },
      motor_detail: [{ name: '' }],
      pack_detail: { rpm: 0 },
      gaugeData: {},
      StickyForm: Object.assign({}, defaultSticky),
      loading: false,
      parameterData: [],
      intervalid1: null
    }
  },
  beforeDestroy() {
    this.toggleIntervalEvent(false)
    // This line is very important!! Destory the interval event before the component be destoried.
  },
  created() {
    this.id = this.$route.params && this.$route.params.id
    this.fetchData()
    this.toggleIntervalEvent(this.StickyForm.realtime_disabled)
    this.StickyForm.motor = Number(this.id)
  },
  methods: {
    fetchData() {
      get_motor_realtime(this.id).then(response => {
        this.threePhaseData = response.data.threephase
        this.pack_detail = response.data.pack
        this.gaugeData = {
          rms: [response.data.feature.ufeature.rms,
            response.data.feature.vfeature.rms,
            response.data.feature.wfeature.rms],
          rpm: response.data.pack.rpm,
          psf: [response.data.threephase.uphase.frequency,
            response.data.threephase.vphase.frequency,
            response.data.threephase.wphase.frequency]
        }
        var _t_tabledata = []
        for (const x of [response.data.threephase.uphase, response.data.threephase.vphase, response.data.threephase.wphase]) {
          _t_tabledata.push({ UA: x.amplitude, UW: x.frequency, UP: x.initial_phase })
        }
        this.parameterData = _t_tabledata
      })
      get_motors({ id: this.id }).then(response => {
        this.motor_detail = response.data
      })
    },
    toggleIntervalEvent(value) {
      if (value) {
        this.intervalid1 = setInterval(() => {
          this.fetchData()
        }, 5000)
      } else {
        clearInterval(this.intervalid1)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .motorrealtime-container {
    padding: 0 32px 32px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
    .el-divider--horizontal {
      margin: 5px 0 5px 0;
    }
  }
</style>
