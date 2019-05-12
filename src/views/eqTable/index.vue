<template>
  <div>
    <div class="app-container">
      <!--<div style="margin-bottom:20px;">-->
      <!--<el-button type="primary" size="small" style="margin:0 0 20px 0;">-->
      <!--<a href="https://github.com/PanJiaChen/vue-element-admin/tree/master/src/components/TreeTable" target="_blank">{{ $t('eqtable.treeMap') }}</a>-->
      <!--</el-button>-->

      <!--&lt;!&ndash;<div class="option-item">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-tag>Expand All</el-tag>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-switch&ndash;&gt;-->
      <!--&lt;!&ndash;v-model="defaultExpandAll"&ndash;&gt;-->
      <!--&lt;!&ndash;active-color="#13ce66"&ndash;&gt;-->
      <!--&lt;!&ndash;inactive-color="#ff4949"&ndash;&gt;-->
      <!--&lt;!&ndash;/>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash; the expand function is not supported when using original tree table provided by element-ui 2.8/&ndash;&gt;-->
      <!--</div>-->

      <el-table
        :data="tableData"
        :row-class-name="tableRowClassName"
        style="width: 100%;margin-bottom: 20px;"
        border
        row-key="name">
        <el-table-column :label="$t('eqTable.index')" type="index" width="100" align="center"/>
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column type="expand" align="center" width="55" >
          <template slot-scope="scope">
            <el-tag type="info">
              {{ scope.row.memo }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('eqTable.name')" prop="name"/>
        <el-table-column :label="$t('eqTable.sn')" align="center">
          <template slot-scope="scope">
            <svg-icon icon-class="sn"/> {{ scope.row.sn || 'Not recorded yet' }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('eqTable.healthIndicator')"
          width="210">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.health_indicator+'Point'" effect="dark" placement="left">
              <div class="processContainer">
                <div
                  :style="{ width:(scope.row.health_indicator||0)*1.5 +'px',
                            background:computeHI(scope),
                            marginLeft:scope.row.children?0:50 +'px' }"
                  class="process"
                >
                  <span style="display:inline-block" />
                </div>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('eqTable.admin')"
          align="center">
          <template slot-scope="scope">
            <svg-icon icon-class="user"/>  {{ matchUsername(scope) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('eqTable.statu')"
          align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.statu | statuTagFilter">{{ scope.row.statu | statuTxtFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('eqTable.lrTime')">
          <template slot-scope="scope">
            <svg-icon icon-class="time"/>  {{ scope.row.lr_time| dateTimeFilter }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('eqTable.operation')" align="center" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="editItem(scope.row)">{{ $t('eqTable.edit') }}</el-button>
            <el-button type="primary" size="mini" style="margin-left: 0" @click="retrieveDetail(scope)" >{{ $t('eqTable.retrieve') }}</el-button>
            <router-link :to="'/motor/realtime/'+scope.row.id">
              <el-button v-if="scope.row.children?true:false" type="danger" size="mini" >{{ $t('eqTable.realTime') }}</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <el-dialog :visible.sync="dialogFormVisible" :title="$t('eqTable.dialogTitle')">
      <el-form :model="tempItem" label-width="100px" style="width:600px">
        <el-form-item :label="$t('eqTable.dialogName')">
          <el-input v-model.trim="tempItem.name" placeholder="Name" />
        </el-form-item>
        <el-form-item :label="$t('eqTable.dialogLRtime')">
          <el-date-picker
            v-model="tempItem.lr_time"
            :picker-options="pickerOptions1"
            type="datetime"
            placeholder="Select a Date Time"
            align="right"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('eqTable.dialogCancleButton') }}</el-button>
        <el-button type="primary" @click="updateItem">{{ $t('eqTable.dialogConfirmButton') }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { get_motors, patch_repair_time } from '@/api/IM'

export default {
  filters: {
    statuTxtFilter(status) {
      const statusMap = {
        0: 'Excellent',
        1: 'Good',
        2: 'Moderate',
        3: 'Poor',
        4: 'Offline'
      }
      return statusMap[status]
    },
    statuTagFilter(status) {
      const statusMap = {
        0: 'success',
        1: '',
        2: 'warning',
        3: 'danger',
        4: 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      defaultExpandAll: true,
      tableData: [],
      tempItem: {},
      dialogFormVisible: false,
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get_motors().then(response => {
        this.tableData = response.data
      })
    },
    editItem(row) {
      this.tempItem = Object.assign({}, row)
      this.dialogFormVisible = true
    },
    async updateItem() {
      const eqtypeMap = {
        0: 'motors',
        1: 'bearings',
        2: 'rotors',
        3: 'stators'
      }
      await this.$refs.TreeTable.updateTreeNode(this.tempItem)
      patch_repair_time(eqtypeMap[this.tempItem.equip_type], this.tempItem.id, { lr_time: this.tempItem.lr_time })
      this.dialogFormVisible = false
    },
    addMenuItem(row, type) {
      if (type === 'children') {
        this.$refs.TreeTable.addChild(row, { name: 'child', timeLine: this.randomNum() })
      }
      if (type === 'brother') {
        this.$refs.TreeTable.addBrother(row, { name: 'brother', timeLine: this.randomNum() })
      }
    },
    deleteItem(row) {
      this.$refs.TreeTable.delete(row)
    },
    selectChange(val) {
      console.log(val)
    },
    randomNum() {
      // return 1~100
      const max = 100
      const min = 1
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    computeHI(scope) {
      const row = scope.row
      if (row.statu === 4) {
        return 'rgba(255,255,255,.5)'
      } else if (row.health_indicator >= 85) {
        return '#83f6c4'
      } else if (row.health_indicator >= 75) {
        return '#3a8ee6'
      } else if (row.health_indicator >= 65) {
        return '#fdff92'
      } else if (row.health_indicator <= 60) {
        return '#ff8774'
      }
    },
    matchUsername(scope) {
      const row = scope.row
      if (!row._parent) {
        return row.admin.username
      } else {
        return row.admin.username === row._parent.admin.username ? "Following Parent's admin" : row.admin.username
      }
    },
    retrieveDetail(scope) {
      const row = scope.row
      const message = Object.keys(row.detail)
        .map(i => {
          return `<p>${i}: ${row.detail[i]}</p>`
        })
        .join('')
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: message,
        type: 'success'
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.children === undefined) {
        return 'warning-row'
      } else if (row.children) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>

<style>
  .el-table .warning-row {
    background: #ffffff;
  }

  .el-table .success-row {
    background: #edfaff;
  }
</style>
