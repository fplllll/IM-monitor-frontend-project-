<template>
  <div class="symmetry-container">
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
        <el-steps :active="activate" finish-status="success">
          <el-step :title="$t('symmetry.step1')" icon="el-icon-edit"/>
          <el-step :title="$t('symmetry.step2')" icon="el-icon-tickets"/>
          <el-step :title="$t('symmetry.step3')" icon="el-icon-s-help"/>
        </el-steps>
      </el-col>
    </el-row>
    <el-row :gutter="8" class="main-wrapper" type="flex" justify="center" align="middle">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}" align="center">
        <transition name="el-fade-in-linear">
          <step1selection v-if="activate === 0" :value="motorformData" @handleSetPackListData="handleSetPackListData"/>
          <step2pack-list-table v-if="activate === 1" ref="table" :value="packlist" @handlePrev="prev" @handleRequestAnalyze="handleRequestAnalyze"/>
          <step3result v-if="activate ===2 " :motorid="motorformData.motor" :result="result" :pack_id="pack_id" @handlePrev="prev"/>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get_packs, get_sympack } from '@/api/IM'
import step1selection from './component/step1selection'
import step2packListTable from './component/step2packListTable'
import step3result from './component/step3result'

export default {
  name: 'SymmetryAnalysis',
  components: {
    step2packListTable,
    step1selection,
    step3result
  },
  data() {
    return {
      activate: 0,
      motorformData: {
        motor: 2,
        datarange: ['2016-05-05 12:00:00', '2016-06-06 08:00:00']
      },
      packlist: [],
      result: {},
      pack_id: 0
    }
  },
  beforeDestroy() {
    // This line is very important!! Destory the interval event before the component be destoried.
  },
  created() {
    // this.fetchData()
  },
  methods: {
    handleSetPackListData() {
      get_packs(this.motorformData).then(response => {
        this.packlist = response.data
        this.next()
      })
    },
    handleRequestAnalyze() {
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
        get_sympack(this.motorformData.motor, this.$refs.table.currentRow.id).then(response => {
          this.result = response.data
          this.pack_id = this.$refs.table.currentRow.id
          this.activate++
          loading.close()
        })
      }
    },
    prev() {
      this.activate--
    },
    next() {
      this.activate++
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .symmetry-container {
    padding: 32px 32px 32px;
    background-color: rgb(255, 255, 255);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  .main-wrapper {
      margin-bottom:30px;
    }

</style>
