<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-1">
          <svg-icon icon-class="star" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Excellent motor</div>
          <count-to :start-val="0" :end-val="statu_num['Excellent']" :duration="3000" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-2">
          <svg-icon icon-class="component" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Good motor</div>
          <count-to :start-val="0" :end-val="statu_num['Good']" :duration="3000" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-3">
          <svg-icon icon-class="example" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Moderate motor</div>
          <count-to :start-val="0" :end-val="statu_num['Moderate']" :duration="3200" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-4">
          <svg-icon icon-class="statu" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Poor motor</div>
          <count-to :start-val="0" :end-val="statu_num['Poor']" :duration="3600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <!--<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">-->
    <!--<div class="card-panel" @click="handleSetLineChartData('shoppings')">-->
    <!--<div class="card-panel-icon-wrapper icon-shopping">-->
    <!--<svg-icon icon-class="shopping" class-name="card-panel-icon" />-->
    <!--</div>-->
    <!--<div class="card-panel-description">-->
    <!--<div class="card-panel-text">Offline motor</div>-->
    <!--<count-to :start-val="0" :end-val="statu_num['Offline']" :duration="3600" class="card-panel-num"/>-->
    <!--</div>-->
    <!--</div>-->
    <!--</el-col>-->
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { get_statunum } from '@/api/IM'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      statu_num: {
        Excellent: 0,
        Good: 0,
        Moderate: 0,
        Poor: 0,
        Offline: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    fetchData() {
      this.listLoading = true
      get_statunum().then(response => {
        this.statu_num = response.data
      })
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-1 {
         background: #20c91d;
      }
      .icon-2 {
        background: #36a3f7;
      }
      .icon-3 {
        background: #f4ae3a;
      }
      .icon-4 {
        background: #bf1f1d
      }
    }
    .icon-1 {
      color: #20c91d;
    }
    .icon-2 {
      color: #36a3f7;
    }
    .icon-3 {
      color: #f4ae3a;
    }
    .icon-4 {
      color: #bf1f1d
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
