<script>
import { get_diagResult } from '@/api/IM'
import SymmetryAnalysis from '../sym-analysis/index'
import step1selection from '../sym-analysis/component/step1selection'
import step2packListTable from '../sym-analysis/component/step2packListTable'

const boxMapper = {
  0: 'warning',
  1: 'warning',
  2: 'success',
  3: 'warning'
}

export default {
  name: 'MotorFaultDiagnosis',
  components: {
    step2packListTable,
    step1selection
  },
  extends: SymmetryAnalysis,
  data() {
    return {
      activate: 0,
      motorformData: {
        motor: 1,
        datarange: ['2016-05-05 12:00:00', '2016-06-06 08:00:00']
      },
      packlist: [],
      result: {},
      pack_id: 0,
      patternMapper: {
        0: this.$t('diagnosis.BRB'),
        1: this.$t('diagnosis.BRM'),
        2: this.$t('diagnosis.HEALTH'),
        3: this.$t('diagnosis.RMAM')
      }
    }
  },
  methods: {
    handleRequestAnalyze() {
      if (this.motorformData.packID === null) {
        this.$alert('Please Select a Signal Pack', 'Error Request', {
          confirmButtonText: 'Get it',
          callback: action => {
            this.$message({
              type: 'info',
              message: `Guide: Select a Signal Pack`
            })
          }
        })
      } else {
        get_diagResult(this.motorformData.packID).then(response => {
          const fault_pattern = response.data.result
          this.$message({
            message: this.$t('diagnosis.resultPrefix') + this.patternMapper[fault_pattern],
            type: boxMapper[fault_pattern]
          })
        })
      }
    }
  }
}
</script>
