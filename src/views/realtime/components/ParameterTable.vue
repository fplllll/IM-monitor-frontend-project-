<template>
  <el-table
    :data="table_data"
    :row-class-name="tableRowClassName"
    :height="315"
    style="width: 100%; font-size: 16px;">
    <el-table-column label="Parameters of each phase" align="center">
      <el-table-column label="Phase" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.$index | indexMapper }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Amplitude (A)" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.UA.toFixed(2) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Frequency (Hz)" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.UW.toFixed(2) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Initial Phase (°)" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.UP.toFixed(2) }}</span>
        </template>
      </el-table-column>
    </el-table-column>

  </el-table>
</template>

<style>
  .el-table .U-row {
    background: oldlace;
    text-align: center;
  }

  .el-table .V-row {
    background: #d9eaf9;
  }

  .el-table .W-row {
    background: #e1f9dd;
  }

</style>

<script>
export default {
  filters: {
    indexMapper(status) {
      const statusMap = {
        0: 'Phase U',
        1: 'Phase V',
        2: 'Phase W'
      }
      return statusMap[status]
    }
  },
  props: {
    table_data: {
      type: Array,
      required: true
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'U-row'
      } else if (rowIndex === 1) {
        return 'V-row'
      }
      return 'W-row'
    }
  }
}

</script>
