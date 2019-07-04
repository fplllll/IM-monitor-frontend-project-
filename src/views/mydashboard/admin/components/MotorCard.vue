<template>
  <div class="card-container">
    <el-card :body-style="{ padding: '0px' }">
      <div slot="header" class="clearfix">
        <span class="card-title">{{ cardData.name + '-' + cardData.sn }}</span>
      </div>
      <el-row :gutter="5">
        <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}">
          <img src="/src/assets/motor/ABB MOTOR.jpg" class="image">
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="position: relative">
          <div class="progress-group">
            <div class="progress-item">
              <span class="indice-text">{{ $t('myDashboard.healthIndicator') }}</span>
              <el-progress :text-inside="false" :stroke-width="18" :percentage="Number((cardData.health_indicator).toFixed(2))" style="font-size: 8px"/>
            </div>
            <div class="progress-item">
              <span class="indice-text">{{ $t('myDashboard.thd') }}</span>
              <el-progress :text-inside="false" :stroke-width="18" :percentage="Number((cardData.uthd*100).toFixed(2))"/>
            </div>
            <div class="progress-item">
              <span class="indice-text">{{ $t('myDashboard.imbalance') }}</span>
              <el-progress :text-inside="false" :stroke-width="18" :percentage="Number((cardData.imbalance*100).toFixed(2))" color="rgba(142, 113, 199, 0.7)" />
            </div>
            <div class="progress-item">
              <span class="indice-text">{{ $t('myDashboard.frequency') }}</span>
              <el-tooltip :content="(cardData.ufrequency).toFixed(2) + 'Hz' " class="item" effect="light" placement="right">
                <el-progress :text-inside="false" :stroke-width="18" :percentage="Number((cardData.ufrequency).toFixed(2))" color="#67C23A" />
              </el-tooltip>
            </div>
            <div class="progress-item">
              <span class="indice-text">{{ $t('myDashboard.amplitude') }}</span>
              <el-tooltip :content="(cardData.uamplitude).toFixed(2) + 'A' " class="item" effect="light" placement="right">
                <el-progress :text-inside="false" :stroke-width="18" :percentage="Number(Math.abs((cardData.uamplitude/0.5*100)).toFixed(2))" color="#F56C6C" style="margin-bottom: 10px"/>
              </el-tooltip>
            </div>
          </div>

        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object,
      required: true,
      default() {
        return (
          { 'name': 'Motor#',
            'sn': '',
            'health_indicator': 0,
            'uthd': 0,
            'imbalance': 0,
            'uamplitude': 0,
            'ufrequency': 0 }
        )
      }
    }
  },
  data() {
    return {
      currentDate: new Date()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >

  .card-container {
    .time {
      font-size: 13px;
      color: #999;
    }

    .image {
      width: 80%;
      display: block;
      padding: 10px;  }
    .progress-group {
      padding: 10px;
    }
    .progress-item {
      margin-bottom: 10px;
      font-size: 12px ;
    }
    .el-card__header {
      padding: 10px 20px;
      border-bottom: 1px solid #EBEEF5;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    .indice-text {
      color: rgba(0, 0, 0, 0.75);
    }
    .el-progress__text {
      font-size: 12px !important;
      color: #484848;
      display: inline-block;
      vertical-align: middle;
      margin-left: 10px;
      line-height: 1;
    }
  }
</style>

