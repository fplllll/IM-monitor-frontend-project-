<template>
  <el-card class="box-card" shadow="always">
    <el-form ref="form" :model="form" label-position="top" label-width="80px">
      <el-form-item label="Slip Ratio">
        <el-slider
          v-model="form.slip"
          :step="0.001"
          :min="0"
          :max="0.01"
          show-input/>
      </el-form-item>
      <el-form-item label="Sideband Energy : Level 1" class="lv1">
        <el-slider
          v-model="form.sideband_lv1"
          :step="0.1"
          :max="10"
          show-input
          range
        />
      </el-form-item>
      <el-form-item label="Sideband Energy : Level 2">
        <el-slider
          v-model="form.sideband_lv1"
          :step="0.1"
          :max="10"
          show-input
          range
        />
      </el-form-item>
      <el-form-item label="Sideband Energy : Level 3">
        <el-slider
          v-model="form.sideband_lv1"
          :step="0.1"
          :max="10"
          show-input
          range
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'RotorConfig',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        sideband_lv1: [0, 0.2, 1.58, 3.16]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    border-radius: 20px;
    border: 10px solid #c2c6cd;
    .lv1 {
      .el-slider__bar {
        background-color: #3c763d;
      }
    }
  }
</style>

