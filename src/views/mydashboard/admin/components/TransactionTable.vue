<template>
  <el-table :data="tableData" style="width: 100%;padding-top: 5px;">
    <el-table-column :label="$t('myDashboard.warningTabDescription')" min-width="180">
      <template slot-scope="scope">
        {{ scope.row.description | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column :label="$t('myDashboard.warningTabMotorID')" width="100" align="center">
      <template slot-scope="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column :label="$t('myDashboard.warningTabTime')" width="180" align="center">
      <template slot-scope="scope">
        {{ scope.row.cr_time | dateTimeFilter }}
      </template>
    </el-table-column>
    <el-table-column :label="$t('myDashboard.warningTabSeverity')" width="100" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.severity | tagFilter"> {{ scope.row.severity }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  filters: {
    tagFilter(status) {
      const statustagMap = {
        Serious: 'success',
        Attention: 'danger'
      }
      return statustagMap[status]
    },
    statusFilter(status) {
      const statusMap = {
        0: 'Attention',
        1: 'Serious'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 60) + '...'
    }
  },
  props: {
    tableData: {
      type: Array,
      required: true
    }
  }
}
</script>
