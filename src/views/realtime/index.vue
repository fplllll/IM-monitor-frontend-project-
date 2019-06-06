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
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <name-plate :pack_attribute="pack_detail" />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="18" :xl="18">
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
              :three_phase_data="threePhaseSpec"/>
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
import { get_pack, get_trend } from '@/api/IM'
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
      threePhaseData: {},
      threePhaseSpec: {},
      pack_detail: {},
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
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      get_pack(this.id, { newest: true }).then(res => {
        this.pack_detail = { rpm: res.data.rpm, name: res.data.name, sn: res.data.sn, id: this.pack_detail.id = res.data.id, time: res.data.time, statu: res.data.statu, sampling_rate: res.data.sampling_rate }

        this.threePhaseData = { usignal: res.data.usignal, vsignal: res.data.vsignal, wsignal: res.data.wsignal }

        this.threePhaseSpec = { uspec: res.data.ufft, vspec: res.data.vfft, wspec: res.data.wfft }

        this.parameterData = [{ amp: res.data.uamp, freq: res.data.ufreq, ip: res.data.uip }, { amp: res.data.vamp, freq: res.data.vfreq, ip: res.data.vip }, { amp: res.data.wamp, freq: res.data.wfreq, ip: res.data.wip }]
        get_trend(this.id, { newest: true }).then(res2 => {
          this.gaugeData = { urms: res2.data.urms, vrms: res2.data.vrms, wrms: res2.data.wrms, freq: res2.data.frequency, rpm: res.data.rpm }
        })
        loading.close()
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
