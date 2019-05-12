<template>
  <div class="step-container">
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
        <el-steps :active="activate" finish-status="success">
          <el-step :title="$t('symmetry.step1')"/>
          <el-step :title="$t('trend.step3')"/>
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
        <el-button v-if="!(activate === 0)" type="info" @click="prev">{{ $t('symmetry.previousBtn') }}</el-button>
        <div v-if="activate===0">
          <el-button type="primary" @click="requestFeatureTrend">{{ $t('trend.analysisBtn') }}</el-button>
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
          this.result = response.data
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
