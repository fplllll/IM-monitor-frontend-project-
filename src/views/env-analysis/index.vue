<script>
import { get_envelope } from '@/api/IM'
import step3result from './components/Step3Result'
import step1selection from '../sym-analysis/component/step1selection'
import step2packListTable from '../sym-analysis/component/step2packListTable'
import SymmetryAnalysis from '../sym-analysis/index'

export default {
  name: 'SymmetryAnalysis',
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
        get_envelope(this.motorformData.motor, this.$refs.table.currentRow.id).then(response => {
          this.result = response.data
          this.pack_id = this.$refs.table.currentRow.id
          this.activate++
          loading.close()
        })
      }
    }
    // directlyAnalyze() {
    //   if (this.motorformData.packID === null) {
    //     this.$alert('Please Select a Signal Pack', 'Error Request', {
    //       confirmButtonText: 'Get it',
    //       callback: action => {
    //         this.$message({
    //           type: 'info',
    //           message: `Guide: Select a Signal Pack`
    //         })
    //       }
    //     })
    //   } else {
    //     get_envelope(this.motorformData.packID).then(response => {
    //       this.result = response.data
    //       this.activate = this.activate + 2
    //       this.motorformData.motor = response.data.motor
    //     })
    //   }
    // },
  }
}
</script>

