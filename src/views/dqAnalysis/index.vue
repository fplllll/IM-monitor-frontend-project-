
<script>
import SymmetryAnalysis from '../SymmetryAnalysis/index'
import step1selection from '../SymmetryAnalysis/component/step1selection'
import step2packListTable from '../SymmetryAnalysis/component/step2packListTable'
import step3result from './components/Step3Result'
import { get_dqpack } from '@/api/IM'
export default {
  name: 'DqAnalysis',
  components: {
    step2packListTable,
    step1selection,
    step3result
  },

  extends: SymmetryAnalysis,
  methods: {
    handleRequestAnalyze() {
      if (this.$refs.table.currentRow === null) {
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
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        get_dqpack(this.motorformData.motor, this.$refs.table.currentRow.id).then(response => {
          this.result = response.data
          this.pack_id = this.$refs.table.currentRow.id
          this.activate++
          loading.close()
        })
      }
    }
  }
}
</script>

