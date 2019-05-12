<template>
  <el-table
    :data="table_data"
    :row-class-name="tableRowClassName"
    :height="315"
    style="width: 100%; font-size: 16px;">
    <el-table-column :label="$t('realTime.tabTitle')" align="center">
      <el-table-column label="Phase" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.$index | indexMapper }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('realTime.amplitude')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.UA.toFixed(2) + 'A' }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('realTime.frequency')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.UW.toFixed(2) +'Hz' }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('realTime.initialPhase')" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row | initalPhaseFormatter }}</span>
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
    },
    initalPhaseFormatter(row) {
      const value = row.UP
      if (row.UA < 0) {
        return ((((value) / (2 * Math.PI) - Math.floor((value) / (2 * Math.PI))) * 360) - 180).toFixed(2) + '°'
      } else { return ((value / (2 * Math.PI) - Math.floor(value / (2 * Math.PI))) * 360).toFixed(2) + '°' }
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
