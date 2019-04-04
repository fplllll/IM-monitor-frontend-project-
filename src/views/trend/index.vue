<template>
  <div class="step-container">
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
        <el-steps :active="activate" finish-status="success">
          <el-step title="Select a Motor and Data Range"/>
          <el-step title="Motor Feature Trend Presentation"/>
        </el-steps>
      </el-col>
    </el-row>
    <el-row :gutter="8" class="main-wrapper" type="flex" justify="center" align="middle">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}" align="center">
        <transition name="el-fade-in-linear">
          <step1selection v-if="activate === 0" v-model="motorformData" />
          <step2-presentation v-if="activate === 1" :motorid="motorformData.motor" :result="result" />
        </transition>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="{span: 6}" :sm ="{span: 6}" :md="{span: 6}" :lg="{span: 6}" :xl="{span: 6}" align="center">
        <el-button v-if="!(activate === 0)" type="info" @click="prev">Previous Step</el-button>
        <div v-if="activate===0">
          <el-button type="primary" @click="requestFeatureTrend">Get Motor Feature Trend</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get_feature_trend } from '@/api/IM'
import step1selection from './components/step1selection'
import step2Presentation from './components/step2presentation'
export default {
  name: 'SymmetryAnalysis',
  components: {
    step2Presentation,
    step1selection
  },
  data() {
    return {
      activate: 0,
      motorformData: {
        motor: 1,
        datarange: ['2016-05-05 12:00:00', '2016-06-06 08:00:00']
      },
      packlist: [],
      result: [],
      packID: 0
    }
  },
  beforeDestroy() {
    // This line is very important!! Destory the interval event before the component be destoried.
  },
  created() {
    // this.fetchData()
  },
  methods: {
    requestFeatureTrend() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      get_feature_trend(this.motorformData).then(response => {
        if (response.data.length === 0) {
          this.$alert('There is no data in the date range', 'Request Error', {
            confirmButtonText: 'Ok'
          })
          loading.close()
        } else {
          const arr = response.data
          this.result = {
            time_vector: arr.map(x => { return x.time }),
            urms: arr.map(x => { return x.data.ufeature.rms }),
            vrms: arr.map(x => { return x.data.vfeature.rms }),
            wrms: arr.map(x => { return x.data.wfeature.rms }),
            uthd: arr.map(x => { return x.data.ufeature.thd }),
            vthd: arr.map(x => { return x.data.vfeature.thd }),
            wthd: arr.map(x => { return x.data.wfeature.thd }),
            umax: arr.map(x => { return x.data.ufeature.max_current }),
            vmax: arr.map(x => { return x.data.vfeature.max_current }),
            wmax: arr.map(x => { return x.data.wfeature.max_current }),
            umin: arr.map(x => { return x.data.ufeature.min_current }),
            vmin: arr.map(x => { return x.data.vfeature.min_current }),
            wmin: arr.map(x => { return x.data.wfeature.min_current }),
            n_rms: arr.map(x => { return x.data.symfeature.n_sequence_rms }),
            p_rms: arr.map(x => { return x.data.symfeature.p_sequence_rms }),
            z_rms: arr.map(x => { return x.data.symfeature.z_sequence_rms }),
            imbalance: arr.map(x => { return x.data.symfeature.imbalance })
          }
          loading.close()
          this.activate++
        }
      })
    },
    prev() {
      this.activate--
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .step-container {
    padding: 32px 32px 32px;
    background-color: rgb(255, 255, 255);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  .main-wrapper {
      margin-bottom:5px;
    }

</style>
