<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Description" min-width="180">
      <template slot-scope="scope">
        {{ scope.row.description | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Motor" width="100" align="center">
      <template slot-scope="scope">
        {{ scope.row.motor.name }}
      </template>
    </el-table-column>
    <el-table-column label="Found time" width="180" align="center">
      <template slot-scope="scope">
        {{ scope.row.c_day | dateTimeFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Severity" width="100" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.severity | tagFilter"> {{ scope.row.severity | statusFilter }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { get_warninglog } from '@/api/IM'

export default {
  filters: {
    tagFilter(status) {
      const statustagMap = {
        0: 'success',
        1: 'danger'
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
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_warninglog().then(response => {
        this.list = response.data.slice(0, 6)
      })
    }
  }
}
</script>
