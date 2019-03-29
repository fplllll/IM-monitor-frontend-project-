<template>
  <div class="motorrealtime-container">
    <sticky :class-name="'sub-navbar '+postForm.status">
      <CommentDropdown v-model="postForm.comment_disabled" />
      <PlatformDropdown v-model="postForm.platforms" />
      <SourceUrlDropdown v-model="postForm.source_uri" />
      <el-button v-loading="loading" style="margin-left: 10px;" type="success" >切换</el-button>
    </sticky>
    <el-row :gutter="8">
      <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
      <!--<todo-list/>-->
      <!--</el-col>-->
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 6}" style="margin-bottom:30px;">
        <name-plate :motor_attribute="motor_detail" :pack_attribute="pack_detail" />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12" :xl="18">
        <el-row>
          <div class="chart-wrapper">
            <three-phase :three_phase_data="threePhaseData"/>
          </div>
        </el-row>
        <el-row>
          <div class="chart-wrapper">
            <FFTTimeline
              :three_phase_data="threePhaseData"/>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <r-p-m-gauge :gauge-data="gaugeData"/>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import ThreePhase from './components/ThreePhase'
import { get_motor_realtime, get_motors } from '@/api/IM'
import NamePlate from './components/Nameplate'
import FFTTimeline from './components/FFTTimeline'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './components/Dropdown'
import { validURL } from '@/utils/validate'
import RPMGauge from './components/RPMGauge'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0
}

export default {
  name: 'RealTime',
  components: {
    ThreePhase, NamePlate, FFTTimeline, RPMGauge,
    Sticky, CommentDropdown, PlatformDropdown, SourceUrlDropdown

  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      id: null,
      threePhaseData: { ufft: [0] },
      motor_detail: [{ name: '' }],
      pack_detail: { rpm: 0 },
      gaugeData: {},
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {}
    }
  },
  created() {
    this.id = this.$route.params && this.$route.params.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_motor_realtime(this.id).then(response => {
        this.threePhaseData = response.data.threephase
        this.pack_detail = response.data.pack
        this.gaugeData.rms = [
          response.data.feature.ufeature.rms,
          response.data.feature.vfeature.rms,
          response.data.feature.wfeature.rms]

        this.gaugeData.rpm = response.data.pack.rpm
        this.gaugeData.psf = [
          response.data.threephase.uphase.frequency,
          response.data.threephase.vphase.frequency,
          response.data.threephase.wphase.frequency]
      })
      get_motors({ id: this.id }).then(response => {
        this.motor_detail = response.data
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .motorrealtime-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
</style>
