<template>
  <div class = "std-container">
    <el-tabs tab-position="left" class="tab-container">
      <el-tab-pane>
        <span slot="label" class = "tab-label">
          <i class="el-icon-loading"/>
          Rotor Configuration</span>
        <rotor-config/>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" class = "tab-label">
          <i class="el-icon-aim"/>
          Stator Configuration</span>
        <rotor-config/>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" class = "tab-label">
          <svg-icon icon-class="bearing"/>
          Bearing Configuration</span>
        <rotor-config/>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" class = "tab-label">
          <svg-icon icon-class="symmentry"/>
          Power Configuration</span>
        <rotor-config/>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
import RotorConfig from './components/RotorConfig'
export default {
  name: 'DiagStandardInedx',
  components: {
    RotorConfig
  },
  data() {
    return {
      tabPosition: 'left'
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .std-container {
    padding: 32px;
    .tab-container{
      font-size: 18px;
    }
    .tab-label{
      font-weight: bold;
      font-size: 16px;

    }
  }
  </style>

