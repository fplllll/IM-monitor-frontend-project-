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
      <img style="margin-top: 20px  " src="../../../assets/motor/ABB MOTOR.jpg">
    </div>

    <div class="bottom clearfix">
      <md-list style="font-family: 'Helvetica Neue'">
        <md-subheader style="font-weight:bold;font-size: 25px">
          {{ motor_attribute[0].name | stringFilter }}-{{ motor_attribute[0].sn }}
        </md-subheader>
        <hr>
        <md-list-item>
          <md-icon>av_timer</md-icon>
          <span class="md-list-item-text">Updated Time : {{ pack_attribute.time }}</span>
        </md-list-item>

        <md-list-item>
          <md-icon>shutter_speed</md-icon>
          <span class="md-list-item-text">Sampling Rate : {{ pack_attribute.sampling_rate }}</span>
        </md-list-item>

        <md-list-item>
          <md-icon class="md-size-10" md-src="/src/icons/svg/id.svg" />
          <span class="md-list-item-text">Signal Pack ID : {{ pack_attribute.id }}</span>
        </md-list-item>

        <md-list-item>
          <md-icon style="color: #d66732">error</md-icon>
          <span class="md-list-item-text" style="font-weight: bold; color: #d66732">Statu : {{ motor_attribute[0].statu | statuTxtFilter }}</span>
        </md-list-item>

        <hr>

        <md-list-item>
          <md-avatar class="md-avatar-icon md-accent" style="background: #ffffb6">>
            <md-icon class="md-size-10" md-src="/src/icons/svg/motor.svg" />
          </md-avatar>

          <span class="md-list-item-text">Motor Detail</span>

          <md-button class="md-icon-button md-list-action" @click="retrieveDetail(1)">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <md-avatar class="md-avatar-icon md-accent" style="background: #cdf0ff">>
            <md-icon class="md-size-10" md-src="/src/icons/svg/stator.svg" />
          </md-avatar>

          <span class="md-list-item-text">Stator Detail</span>

          <md-button class="md-icon-button md-list-action" @click="retrieveDetail(2)">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <md-avatar class="md-avatar-icon md-accent" style="background: #9affca">>
            <md-icon class="md-size-2x" md-src="/src/icons/svg/rotor.svg" />
          </md-avatar>

          <span class="md-list-item-text">Rotor Detail</span>

          <md-button class="md-icon-button md-list-action" @click="retrieveDetail(3)">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <md-avatar class="md-avatar-icon md-accent" style="background: #ffc5f8">>
            <md-icon class="md-size-15" md-src="/src/icons/svg/Bearing.svg" />
          </md-avatar>

          <span class="md-list-item-text">Bearing Detail</span>

          <md-button class="md-icon-button md-list-action" @click="retrieveDetail(4)">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>
      </md-list>
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
    pack_attribute: {
      type: Object,
      required: true
    },
    motor_attribute: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      },
      progressdata: {
        volume: 0,
        count: 0,
        cpu: 0,
        memory: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  methods: {
    retrieveDetail(index) {
      var detail
      switch (index) {
        case 1: detail = this.motor_attribute[0].detail
          break
        case 2: detail = this.motor_attribute[0].children[3].detail
          break
        case 3: detail = this.motor_attribute[0].children[2].detail
          break
        case 4: detail = {
          DrivenEnd: this.motor_attribute[0].children[1].detail,
          NonDrivenEnd: this.motor_attribute[0].children[0].detail
        }
          break
        default:
      }
      const message = Object.keys(detail)
        .map(i => {
          return `<p>${i}: ${JSON.stringify(detail[i])}</p>`
        })
        .join('')
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: message,
        type: 'success'
      })
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
    height: 100%;
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
  .md-list {
    width: 100%;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(#000, .0);
  }
}
</style>

