<template>
  <div>
    <div class="app-container">
      <div style="margin-bottom:20px;">
        <el-button type="primary" size="small" style="margin:0 0 20px 0;">
          <a href="https://github.com/PanJiaChen/vue-element-admin/tree/master/src/components/TreeTable" target="_blank">Documentation</a>
        </el-button>

        <div class="option-item">
          <el-tag>Expand All</el-tag>
          <el-switch
            v-model="defaultExpandAll"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </div>
      </div>
      <tree-table
        ref="TreeTable"
        :data="tableData"
        :default-expand-all="defaultExpandAll"
        :columns="columns"
        border
        default-children="children"
        @selection-change="selectChange"
      >

        <template slot="selection">
          <el-table-column type="selection" align="center" width="55" />
        </template>

        <template slot="pre-column" slot-scope="{scope}">
          <el-table-column type="expand" width="55" >
            <el-tag type="info">
              Fixing bugs... The expand function can not work for now.
            </el-tag>
          </el-table-column>
        </template>

        <template slot="health_indicator" slot-scope="{scope}">

          <el-tooltip :content="scope.row.health_indicator+'Point'" effect="dark" placement="left">
            <div class="processContainer">
              <div
                :style="{ width:(scope.row.health_indicator||0)*1.5 +'px',
                          background:computeHI(scope),
                          marginLeft:scope.row._level * 50+'px' }"
                class="process"
              >
                <span style="display:inline-block" />
              </div>
            </div>
          </el-tooltip>

        </template>

        <template slot="admin" slot-scope="{scope}">
          <svg-icon icon-class="user"/>  {{ matchUsername(scope) }}
        </template>

        <template slot="statu" slot-scope="{scope}">
          <el-tag :type="scope.row.statu | statuTagFilter">{{ scope.row.statu | statuTxtFilter }}</el-tag>
        </template>

        <template slot="lr_time" slot-scope="{scope}">
          <svg-icon icon-class="time"/>  {{ scope.row.lr_time| dateTimeFilter }}
        </template>

        <template slot="append" slot-scope="{scope}">
          <el-button
            size="mini"
            type="primary"
            @click="addMenuItem(scope.row,'brother')"
          >Append Brother
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="addMenuItem(scope.row,'children')"
          >Append Child
          </el-button>
        </template>

        <template slot="operation" slot-scope="{scope}">
          <el-button size="mini" type="success" @click="editItem(scope.row)">Edit</el-button>
          <el-button type="primary" size="mini" @click="retrieveDetail(scope)">Retrieve</el-button>
          <router-link :to="'/motor/realtime/'+scope.row.id">
            <el-button v-if="scope.row._level===1?false:true" type="danger" size="mini" >Real Time</el-button>
          </router-link>
        </template>
      </tree-table>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" title="Edit">
      <el-form :model="tempItem" label-width="100px" style="width:600px">
        <el-form-item label="Name">
          <el-input v-model.trim="tempItem.name" placeholder="Name" />
        </el-form-item>
        <el-form-item label="DateTime">
          <el-date-picker
            v-model="tempItem.lr_time"
            :picker-options="pickerOptions1"
            type="datetime"
            placeholder="Select a Date Time"
            align="right"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateItem">Confirm</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import TreeTable from './components/index'
import { get_motors, patch_repair_time } from '@/api/IM'

export default {
  components: { TreeTable },
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
      columns: [
        {
          label: 'ID',
          key: 'id',
          width: 50
        },
        {
          label: 'Name',
          key: 'name',
          align: 'left',
          expand: true
        },
        {
          label: 'Serial Number',
          key: 'sn'
        },
        {
          label: 'Last Repair',
          key: 'lr_time'
        },
        {
          label: 'Health Indicator',
          key: 'health_indicator'
        },
        {
          label: 'Statu',
          key: 'statu',
          width: 120
        },
        {
          label: 'Admin',
          key: 'admin'
        },
        {
          label: 'Operation',
          key: 'operation',
          width: 360
        }
      ],
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
    }
  }
}
</script>
