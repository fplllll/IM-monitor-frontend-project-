<template>
  <div class="table-container">
    <el-form>
      <el-form-item>
        <el-table
          ref="singleTable"
          :data="value.slice((currpage - 1) * pagesize, currpage * pagesize)"
          highlight-current-row
          border
          stripe
          @current-change="handleCurrentChange">

          <el-table-column
            sortable
            type="index"/>

          <el-table-column :label="$t('symmetry.timeColumn')" sortable>
            <template slot-scope="scope">
              {{ scope.row.time | dateTimeFilter }}
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('symmetry.rpmColumn')"
            property="rpm"
            sortable/>
          <el-table-column
            :label="$t('symmetry.dbindexColumn')"
            property="id"/>

        </el-table>
      </el-form-item>
      <el-form-item>
        <el-pagination
          :page-size="pagesize"
          :total="value.length"
          background
          style="margin-top: 20px"
          layout="prev, pager, next, sizes, total, jumper"
          @current-change="handlepgCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="info" icon="el-icon-back" @click="handlePrev"/>
        <el-button type="primary" icon="el-icon-data-analysis" @click="handleRequestAnalyze">{{ $t('symmetry.analysisBtn') }}</el-button>
        <!--<el-button @click="setCurrent()">取消选择</el-button>-->
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: 'Step2packListTable',
  props: {
    value: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      currentRow: null,
      list: [],
      pagesize: 10,
      currpage: 1
    }
  },
  computed: {
    motor: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    handlepgCurrentChange(cpage) {
      this.currpage = cpage
    },
    handleSizeChange(psize) {
      this.pagesize = psize
    },
    handleRequestAnalyze() {
      this.$emit('handleRequestAnalyze')
    },
    handlePrev() {
      this.$emit('handlePrev')
    }
  }
}
</script>

<style scoped>
  .table-container {
    padding: 32px 32px 0px;
  }
</style>
