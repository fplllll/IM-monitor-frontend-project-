<template>
  <div class="step-container">
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
        <el-steps :active="activate" finish-status="success">
          <el-step :title="$t('symmetry.step1')"/>
          <el-step :title="$t('symmetry.step2')"/>
          <el-step :title="$t('')"/>
        </el-steps>
      </el-col>
    </el-row>
    <el-row :gutter="8" class="main-wrapper" type="flex" justify="center" align="middle">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}" align="center">
        <transition name="el-fade-in-linear">
          <step1selection v-if="activate === 0" v-model="motorformData" />
          <step2pack-list-table v-if="activate === 1" ref="table" v-model="packlist" :value="packlist" />
          <Step3Result v-if="activate ===2 " :motorid="motorformData.motor" :result="result"/>
        </transition>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="{span: 6}" :sm ="{span: 6}" :md="{span: 6}" :lg="{span: 6}" :xl="{span: 6}" align="center">
        <el-button v-if="!(activate === 0)" type="info" @click="prev">Previous Step</el-button>
        <div v-if="activate===0">
          <el-button type="primary" @click="fetchData">Get Pack list</el-button> or directly
          <el-button type="primary" @click="directlyAnalyze">Analyze</el-button> a signal pack.
        </div>
        <el-button v-if="activate === 1" type="primary" @click="requestAnalyzing">Request Analyzing</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get_packs, get_envelope } from '@/api/IM'
import step1selection from '../SymmetryAnalysis/component/step1selection'
import Step2packListTable from '../SymmetryAnalysis/component/step2packListTable'
import Step3Result from './Step3Result'
export default {
  name: 'SymmetryAnalysis',
  components: {
    Step2packListTable,
    step1selection,
    Step3Result
  },
  data() {
    return {
      activate: 0,
      motorformData: {
        motor: 1,
        datarange: ['2016-05-05 12:00:00', '2016-06-06 08:00:00'],
        packID: null
      },
      packlist: [],
      result: {}
    }
  },
  beforeDestroy() {
    // This line is very important!! Destory the interval event before the component be destoried.
  },
  created() {
    // this.fetchData()
  },
  methods: {
    fetchData() {
      get_packs(this.motorformData).then(response => {
        this.packlist = response.data
        this.activate++
      })
    },
    requestAnalyzing() {
      if (this.$refs.table.currentRow === null) {
        this.$alert('Please Select a Signal Pack', 'Error Request', {
          confirmButtonText: 'Get it',
          callback: action => {
            this.$message({
              type: 'info',
              message: `Guide: Select a Signal Pack`
            })
          }
        })
      } else {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        get_envelope(this.$refs.table.currentRow.id).then(response => {
          this.result = response.data
          this.activate++
          loading.close()
        })
      }
    },
    directlyAnalyze() {
      if (this.motorformData.packID === null) {
        this.$alert('Please Select a Signal Pack', 'Error Request', {
          confirmButtonText: 'Get it',
          callback: action => {
            this.$message({
              type: 'info',
              message: `Guide: Select a Signal Pack`
            })
          }
        })
      } else {
        get_envelope(this.motorformData.packID).then(response => {
          this.result = response.data
          this.activate = this.activate + 2
          this.motorformData.motor = response.data.motor
        })
      }
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
