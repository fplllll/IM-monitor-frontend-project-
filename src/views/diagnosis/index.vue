<template>
  <div class="step-container">
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
        <el-steps :active="activate" finish-status="success">
          <el-step title="Select a Motor and Data Range"/>
        </el-steps>
      </el-col>
    </el-row>
    <el-row :gutter="8" class="main-wrapper" type="flex" justify="center" align="middle">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}" align="center">
        <transition name="el-fade-in-linear">
          <step1selection v-if="activate === 0" v-model="motorformData" />
        </transition>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="{span: 6}" :sm ="{span: 6}" :md="{span: 6}" :lg="{span: 6}" :xl="{span: 6}" align="center">
        <el-button v-if="!(activate === 0)" type="info" @click="prev">{{ $t('symmetry.previousBtn') }}</el-button>
        <div v-if="activate===0">
          <el-button type="primary" >{{ $t('symmetry.packlistBtn') }}</el-button> {{ $t('symmetry.helptext1') }}
          <el-button type="primary" @click="directlyAnalyze">{{ $t('symmetry.diranalysisBtn') }}</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get_diagResult } from '@/api/IM'
import step1selection from '../SymmetryAnalysis/component/step1selection'

const boxMapper = {
  0: 'warning',
  1: 'warning',
  2: 'success',
  3: 'warning'
}

export default {
  name: 'MotorFaultDiagnosis',
  components: {
    step1selection
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
      result: {},
      packID: 0,
      patternMapper: {
        0: this.$t('diagnosis.BRB'),
        1: this.$t('diagnosis.BRM'),
        2: this.$t('diagnosis.HEALTH'),
        3: this.$t('diagnosis.RMAM')
      }
    }
  },
  beforeDestroy() {
    // This line is very important!! Destory the interval event before the component be destoried.
  },
  created() {
    // this.fetchData()
  },
  methods: {
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
        get_diagResult(this.$refs.table.currentRow.id).then(response => {
          this.result = response.data
          this.activate++
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
        get_diagResult(this.motorformData.packID).then(response => {
          const fault_pattern = response.data.result
          this.$message({
            message: this.$t('diagnosis.resultPrefix') + this.patternMapper[fault_pattern],
            type: boxMapper[fault_pattern]
          })
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
