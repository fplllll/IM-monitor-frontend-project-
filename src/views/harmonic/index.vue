<script>
import { get_harmpack } from '@/api/IM'
import step1selection from '../SymmetryAnalysis/component/step1selection'
import step2packListTable from '../SymmetryAnalysis/component/step2packListTable'
import step3result from './components/step3result'
import SymmetryAnalysis from '../SymmetryAnalysis/index'

export default {
  name: 'SymmetryAnalysis',
  components: {
    step2packListTable,
    step1selection,
    step3result
  },
  extends: SymmetryAnalysis, // inherit from SymmetryAnalysis Component, need to rewrite analysis request method as bellow, as well as the page of step 3 to present result
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
        get_harmpack(this.motorformData.motor, this.$refs.table.currentRow.id).then(response => {
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
