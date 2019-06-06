<template>
  <div class="result-container">
    <el-row :gutter="8">
      <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
      <!--<todo-list/>-->
      <!--</el-col>-->
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 6}" >
        <el-row>
          <name-plate :pack_attribute="motor_detail" />
        </el-row>

      </el-col>
      <el-col :xs="24" :sm="24" :lg="12" :xl="18" >
        <el-row>
          <el-card class="box-card">
            <div class="chart-wrapper">
              <h3 class="chart-title">{{ $t('realTime.threePhaseSpec') }}</h3>
              <FFTtiemline :three_phase_data="{ uspec : result.ufft ,vspec : result.vfft,wspec : result.wfft}"/>
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="box-card" style="margin-top: 10px">
            <div class="chart-wrapper">
              <h3 class="chart-title">{{ $t('harmonic.harmonicComp') }}</h3>
              <harmonic-bar :harmonic_data="{ u: result.uharmonics ,v: result.vharmonics, w: result.wharmonics}"/>
            </div>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" >
        <el-card class="box-card" style="margin-top: 10px">
          <div class="chart-wrapper">
            <harmonic-gauge :height="'300px'" :gauge-data="{u: result.uthd,v:result.vthd,w:result.wthd}" />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" >
        <el-card class="box-card" style="margin-top: 10px">
          <HarmonicTable />
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin: 20px auto">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
        <el-button type="info" icon="el-icon-back" @click="handlePrev"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { get_pack_info } from '@/api/IM'
import NamePlate from '../../realtime/components/Nameplate'
import FFTtiemline from '../../realtime/components/FFTTimeline'
import HarmonicBar from './harmonicBar'
import harmonicGauge from './harmonicGauge'
import HarmonicTable from './harmonicTable'
export default {
  name: 'HarmonicResult',
  components: {
    HarmonicBar, NamePlate, FFTtiemline, harmonicGauge, HarmonicTable
  },
  props: {
    motorid: {
      required: true,
      type: Number
    },
    result: {
      required: true,
      type: Object
    },
    pack_id: {
      required: true,
      type: Number
    }

  },
  data() {
    return {
      id: null,
      motor_detail: {},
      pack_detail: {}
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_pack_info(this.motorid, { pack_id: this.pack_id }).then(response => {
        this.motor_detail = response.data
      })
    },
    handlePrev() {
      this.$emit('handlePrev')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .result-container {
    padding: 32px 32px 32px;
    background-color: rgb(255, 255, 255);
    .chart-wrapper {
      background: #fff;
      padding: 0px 16px 0;
      margin-bottom: 16px;
    }
  }

</style>
