<template>
  <div class="result-container">
    <el-row :gutter="8">
      <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
      <!--<todo-list/>-->
      <!--</el-col>-->
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 6}" >
        <name-plate :pack_attribute="motor_detail" />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12" :xl="18">
        <el-row>
          <el-card class="box-card" style="margin-top: 10px">
            <h3 class="chart-title">{{ $t('symmetry.posChartTitle') }}</h3>
            <sym-three-phase :height="'250px'" :three_phase_data="{ A: result.pAp_real,B: result.pBp_real,C: result.pCp_real}"/>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="box-card" style="margin-top: 10px">
            <h3 class="chart-title">{{ $t('symmetry.negChartTitle') }}</h3>
            <sym-three-phase :height="'250px'" :three_phase_data="{ A: result.pAn_real,B: result.pBn_real,C: result.pCn_real}"/>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="box-card" style="margin-top: 10px">
            <h3 class="chart-title">{{ $t('symmetry.zeroChartTitle') }}</h3>
            <zero-sequence :height="'250px'" :zero-sequence-data="{ real: result.zero_real, imag: result.zero_imag}"/>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 8}" :xl="{span: 8}">
        <el-card class="box-card" style="margin-top: 10px">
          <h3 class="chart-title">{{ $t('symmetry.uploarChartTitle') }}</h3>
          <PolarFigure
            :ploar-chart-data="{ positive_real : result.pAp_real ,
                                 negative_real: result.pAn_real ,
                                 positive_imag : result.pAp_imag ,
                                 negative_imag: result.pAn_imag ,}" />
        </el-card>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 8}" :xl="{span: 8}">
        <el-card class="box-card" style="margin-top: 10px">
          <h3 class="chart-title">{{ $t('symmetry.vploarChartTitle') }}</h3>
          <PolarFigure
            :ploar-chart-data="{ positive_real : result.pBp_real ,
                                 negative_real: result.pBn_real ,
                                 positive_imag : result.pBp_imag ,
                                 negative_imag: result.pBn_imag ,}" />
        </el-card>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 8}" :xl="{span: 8}">
        <el-card class="box-card" style="margin-top: 10px">
          <h3 class="chart-title">{{ $t('symmetry.wploarChartTitle') }}</h3>
          <PolarFigure
            :ploar-chart-data="{ positive_real : result.pCp_real ,
                                 negative_real: result.pCn_real ,
                                 positive_imag : result.pCp_imag ,
                                 negative_imag: result.pCn_imag ,}" />
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
import SymThreePhase from './SymThreePhase'
import { get_pack_info } from '@/api/IM'
import NamePlate from '../../realtime-monitor/components/Nameplate'
import ZeroSequence from './ZeroSequence'
import PolarFigure from './PolarFigure'

export default {
  name: 'SymmetryResult',
  components: {
    SymThreePhase, NamePlate, ZeroSequence, PolarFigure
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
      pack_detail: { rpm: 0 }
    }
  },
  beforeDestroy() {
    // This line is very important!! Destory the interval event before the component be destoried.
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
    padding: 32px 32px 5px;
    background-color: rgb(255, 255, 255);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 16px;
    }
  }

</style>
