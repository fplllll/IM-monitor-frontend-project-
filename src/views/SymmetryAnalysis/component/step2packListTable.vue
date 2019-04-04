<template>
  <div class="table-container">
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

      <el-table-column
        property="time"
        sortable
        label="Collected Time"/>

      <el-table-column
        property="rpm"
        sortable
        label="Rotational Speed"/>

      <el-table-column
        property="id"
        label="Index in the database"/>

    </el-table>

    <div style="margin-top: 20px">
      <el-button @click="setCurrent(value[1])">选中第二行</el-button>
      <el-button @click="setCurrent()">取消选择</el-button>
    </div>

    <el-pagination
      :page-size="pagesize"
      :total="value.length"
      background
      style="margin-top: 20px"
      layout="prev, pager, next, sizes, total, jumper"
      @current-change="handlepgCurrentChange"
      @size-change="handleSizeChange"
    />

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
    }

  }
}
</script>

<style scoped>
  .table-container {
    padding: 32px 32px 32px;
  }
</style>
