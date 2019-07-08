<template>
  <!--<el-card class="box-card-component" style="margin-left:8px;">-->

  <!--<ul class="list-icons">-->
  <!--<li><svg-icon icon-class="time"/><time class="time"> {{ pack_attribute.time }} </time></li>-->
  <!--<li><svg-icon icon-class="time"/> Sampling Rate: {{ pack_attribute.sampling_rate }}</li>-->
  <!--<li><svg-icon icon-class="time"/> Signal Pack ID: {{ pack_attribute.id }}</li>-->
  <!--<li><svg-icon icon-class="time"/> Integer molestie lorem at massa </li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--</el-card>-->
  <el-card class="box-card-component" >
    <div slot="header" class="box-card-header">
      <!--<model-obj-->
      <!--v-loading="model_loading"-->
      <!--:light="light"-->
      <!--:rotation="rotation"-->
      <!--:height="300"-->
      <!--src="static/Winch.obj"-->
      <!--@on-load="onLoad"-->
      <!--/>-->
      <img style="margin-top: 20px  " src="../../../assets/motor/ABB MOTOR.jpg">
    </div>
    <div style="font-weight:bold;font-size: 25px; margin-top: 18px; text-align: center">
      {{ pack_attribute.name }}-{{ pack_attribute.sn }}
    </div>
    <el-divider style="margin-top: 5px; margin-bottom: 5px"/>
    <ul class="md-list md-theme-default" style="font-family:Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif">
      <li class="md-list-item">
        <div class="md-list-item-default md-list-item-container md-button-clean">
          <div class="md-list-item-content md-ripple md-disabled">
            <i class="el-icon-time md-icon md-icon-font md-theme-default"/>
            <span class="md-list-item-text">{{ $t('realTime.updateTime') }} : {{ pack_attribute.time | dateTimeFilter }}</span>
          </div>
        </div>
      </li>
      <li class="md-list-item">
        <div class="md-list-item-default md-list-item-container md-button-clean">
          <div class="md-list-item-content md-ripple md-disabled">
            <i class="el-icon-loading md-icon md-icon-font md-theme-default"/>
            <span class="md-list-item-text">{{ $t('realTime.samplingRate') }} : 20480 </span>
          </div>
        </div>
      </li>
      <li class="md-list-item">
        <div class="md-list-item-default md-list-item-container md-button-clean">
          <div class="md-list-item-content md-ripple md-disabled">
            <i class="el-icon-info md-icon md-icon-font md-theme-default"/>
            <span class="md-list-item-text">{{ $t('realTime.packID') }} : {{ pack_attribute.id }}</span>
          </div>
        </div>
      </li>
      <li class="md-list-item">
        <div class="md-list-item-default md-list-item-container md-button-clean">
          <div class="md-list-item-content md-ripple md-disabled">
            <svg-icon icon-class="star" class="md-icon md-icon-font md-theme-default" />
            <span class="md-list-item-text">{{ $t('realTime.statu') }} : {{ pack_attribute.statu }}</span>
          </div>
        </div>
      </li>
      <el-divider class="el-divider--horizontal"/>
      <li class="md-list-item">
        <div class="md-list-item-default md-list-item-container md-button-clean">
          <div class="md-list-item-content md-ripple md-disabled">
            <el-avatar class="md-avatar md-avatar-icon md-accent md-theme-default" style="background-color: #ffffb6">
              <svg-icon icon-class="motor" class="md-icon md-icon-font md-theme-default" style="color: #000000"/>
            </el-avatar>
            <span class="md-list-item-text">{{ $t('realTime.motorDetail') }}</span>
            <el-button class="md-icon-button md-list-action" type="info" icon="el-icon-chat-line-square" circle @click="retrieveDetail(0)"/>
          </div>
        </div>
      </li>
      <li class="md-list-item">
        <div class="md-list-item-default md-list-item-container md-button-clean">
          <div class="md-list-item-content md-ripple md-disabled">
            <el-avatar class="md-avatar md-avatar-icon md-accent md-theme-default" style="background-color: #cdf0ff">
              <svg-icon icon-class="stator" class="md-icon md-icon-font md-theme-default" style="color: #000000"/>
            </el-avatar>
            <span class="md-list-item-text">{{ $t('realTime.statorDetail') }}</span>
            <el-button class="md-icon-button md-list-action" type="info" icon="el-icon-chat-line-square" circle @click="retrieveDetail(3)"/>
          </div>
        </div>
      </li>
      <li class="md-list-item">
        <div class="md-list-item-default md-list-item-container md-button-clean">
          <div class="md-list-item-content md-ripple md-disabled">
            <el-avatar class="md-avatar md-avatar-icon md-accent md-theme-default" style="background-color: #9affca">
              <svg-icon icon-class="rotor" class="md-icon md-icon-font md-theme-default" style="color: #000000; height: 48px; width: 48px;"/>
            </el-avatar>
            <span class="md-list-item-text">{{ $t('realTime.rotorDetail') }}</span>
            <el-button class="md-icon-button md-list-action" type="info" icon="el-icon-chat-line-square" circle @click="retrieveDetail(2)"/>
          </div>
        </div>
      </li>
      <li class="md-list-item">
        <div class="md-list-item-default md-list-item-container md-button-clean">
          <div class="md-list-item-content md-ripple md-disabled">
            <el-avatar class="md-avatar md-avatar-icon md-accent md-theme-default" style="background-color: #ffc5f8">
              <svg-icon icon-class="bearing" class="md-icon md-icon-font md-theme-default" style="color: #000000"/>
            </el-avatar>
            <span class="md-list-item-text">{{ $t('realTime.bearingDetail') }}</span>
            <el-button class="md-icon-button md-list-action" type="info" icon="el-icon-chat-line-square" circle @click="retrieveDetail(3)"/>
          </div>
        </div>
      </li>
    </ul>
  </el-card>
</template>

<script>
import { get_related_info } from '@/api/IM'
export default {
  // components: {
  //   ModelObj: resolve => {
  //     setTimeout(function() {
  //       require(['@/components/three/model-obj.vue'], resolve)
  //     }, 1500)
  //   } // lazy loading
  // },
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
    pack_attribute: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      model_loading: true,
      light: [{
        type: 'AmbientLight',
        color: 0xffffff,
        intensity: 100000 }],
      rotation: {
        x: 0,
        y: 0,
        z: 0
      }
    }
  },
  methods: {
    retrieveDetail(index) {
      get_related_info(this.$route.params.id, index).then(res => {
        let message
        if (res.data instanceof Array) {
          message = res.data.map(item => {
            return Object.keys(item).map(key => {
              return `<p>${key}:${item[key]}</p>`
            }).join('')
          }).join('')
        } else if (res.data instanceof Object) {
          message = Object.keys(res.data)
            .map(i => {
              return `<p>${i}:${res.data[i]}</p>`
            })
            .join('')
        }
        this.$notify({
          title: 'Success',
          dangerouslyUseHTMLString: true,
          message: message,
          type: 'success'
        })
      })
    },
    onLoad() {
      this.rotate()
      this.model_loading = false
    },
    rotate() {
      this.rotation.y += 0.01
      requestAnimationFrame(this.rotate)
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
    height: 300px;
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
    /*position: absolute;*/
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
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
  .time {
    font-size: 18px;
    color: #999;
    text-align: right;
  }

  .bottom {
    margin-top: 5px;
    line-height: 12px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
    .el-divider--horizontal {
      display: block;
      height: 1px;
      width: 100%;
      margin: 5px 0;
    }
}
</style>

