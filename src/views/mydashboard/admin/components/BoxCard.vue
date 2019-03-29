<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header">
      <img src="https://fpimages.withfloats.com/actual/5c1e2114c2bb000001beb5e9.jpg">
    </div>
    <div style="position:relative;">
      <pan-thumb :image="avatar" class="panThumb"/>
      <mallki class-name="mallki-text" text="Induction Motor Monitoring"/>
      <div style="padding-top:35px;" class="progress-item">
        <span>Table Count</span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="normalized_count"/>
      </div>
      <div class="progress-item">
        <span>Table volume</span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="normalized_volume" color="rgba(142, 113, 199, 0.7)"/>
      </div>
      <div class="progress-item">
        <span>CPU usage</span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="serverStatuData.cpu_statu" status="success"/>
      </div>
      <div class="progress-item">
        <span>Memory usage</span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="serverStatuData.memory_statu" status="exception"/>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  components: { PanThumb, Mallki },
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    serverStatuData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ]),
    normalized_count: function() {
      // `this` 指向 vm 实例
      return Number((this.serverStatuData.table_count / 4096 * 100).toFixed(1))
    },
    normalized_volume: function() {
      // `this` 指向 vm 实例
      if (this.serverStatuData.table_volume) {
        return Number((Number(this.serverStatuData.table_volume.replace(/MB/, '')) / 2048 * 100).toFixed(1))
      } else {
        return 0
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .panThumb {
    z-index: 100;
    height: 70px!important;
    width: 70px!important;
    position: absolute!important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none!important;
    /deep/ .pan-info {
      box-shadow: none!important;
    }
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}
</style>
