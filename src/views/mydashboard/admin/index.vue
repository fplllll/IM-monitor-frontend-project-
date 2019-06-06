<template>
  <div class="dashboard-editor-container">
    <github-corner style="position: absolute; top: 0px; border: 0; right: 0;"/>

    <panel-group :panel-group-data="panelGroupData"/>
    <el-row :gutter="64">
      <el-col :xs="12" :sm="12" :lg="8">
        <motor-card :card-data="cardData[0]" />
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8">
        <motor-card :card-data="cardData[1]"/>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8">
        <motor-card :card-data="cardData[2]"/>
      </el-col>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin-top:32px">
      <span class="card-title"> {{ $t('myDashboard.trend') }} </span>
      <el-divider style="margin: 5px 0 5px"/>
      <line-chart :line-chart-data="lineChartData"/>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <span class="card-title"> {{ $t('myDashboard.radarChart') }} </span>
          <el-divider style="margin: 5px 0 5px"/>
          <raddar-chart :radar-chart-data="radarChartData"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <span class="card-title"> {{ $t('myDashboard.warningBar') }} </span>
          <el-divider style="margin: 5px 0 5px"/>
          <pie-chart :pie-chart-data="pieChartData"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <span class="card-title"> {{ $t('myDashboard.compsBar') }} </span>
          <el-divider style="margin: 5px 0 5px"/>
          <bar-chart :bar-chart-data="barChartData"/>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;">
        <div class="chart-wrapper">
          <span class="card-title" style="text-align: center"> {{ $t('myDashboard.warningTable') }} </span>
          <el-divider style="margin: 5px 0 5px"/>
          <transaction-table :table-data="tableData"/>
        </div>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;">
        <div class="chart-wrapper">
          <span class="card-title" style="text-align: center"> {{ $t('myDashboard.warningCalendar') }} </span>
          <el-divider style="margin: 5px 0 5px"/>
          <WarningCalendar :calendar-data="warningCalendar" :top-waring-data="topWarningDay"/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
      <!--<todo-list/>-->
      <!--</el-col>-->
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card :server-statu-data="serverStatuData"/>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="18">
        <div class="chart-wrapper">
          <span class="card-title" style="text-align: center"> {{ $t('myDashboard.treeMap') }} </span>
          <el-divider style="margin: 5px 0 5px"/>
          <TreemapChart :tree-chart-data="TreeChartData"/>
        </div>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import WarningCalendar from './components/WarningCalendar'
import TreemapChart from './components/TreemapChart'
import MotorCard from './components/MotorCard'
import { get_trend, get_motor, get_warning, get_tablestatu, get_equipgroup } from '@/api/IM'

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
    WarningCalendar,
    TreemapChart, MotorCard
  },
  data() {
    return {
      lineChartData: [],
      panelGroupData: { excellent: 0, good: 0, moderate: 0, poor: 0 },
      radarChartData: [],
      pieChartData: [],
      barChartData: [],
      tableData: [],
      warningCalendar: [],
      topWarningDay: [],
      serverStatuData: {},
      TreeChartData: {},
      cardData: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // get_trend().then(response => {
      //   this.lineChartData = response.data
      // })
      // get_statunum().then(response => {
      //   this.panelGroupData = response.data
      // })
      // setTimeout(() => {
      //   get_radar().then(response => {
      //     this.radarChartData = response.data
      //   })
      // }, 500)
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      Promise.all([
        get_trend(1, { feature: 'thd', timeafter: encodeURIComponent('2016-01-01 00:00:00'), timebefore: encodeURIComponent('2016-05-01 00:00:00') }),
        get_trend(2, { feature: 'thd', timeafter: encodeURIComponent('2016-01-01 00:00:00'), timebefore: encodeURIComponent('2016-05-01 00:00:00') }),
        get_trend(3, { feature: 'thd', timeafter: encodeURIComponent('2016-01-01 00:00:00'), timebefore: encodeURIComponent('2016-05-01 00:00:00') }),
        get_motor({ group_by: 'statu' }),
        get_trend(1, { newest: true }), get_trend(2, { newest: true }), get_trend(3, { newest: true }),
        get_warning(null, { group_by: 'motor' }),
        get_motor({ group_by: 'comps' }),
        get_warning(null, { limit: 6 }),
        get_warning(null, { group_by: 'date' }),
        get_tablestatu(),
        get_equipgroup({ iftree: true })]).then(value => {
        this.lineChartData = [value[0].data, value[1].data, value[2].data]
        this.panelGroupData = value[3].data
        this.radarChartData = [value[4].data, value[5].data, value[6].data]
        this.pieChartData = value[7].data
        this.barChartData = value[8].data
        this.tableData = value[9].data
        this.warningCalendar = value[10].data
        this.topWarningDay = this.warningCalendar.sort(function(a, b) { return b[1] - a[1] }).slice(0, 5)
        this.serverStatuData = value[11].data
        this.TreeChartData = value[12].data
      })
      loading.close()
      // setTimeout(() => {
      //   get_indexbar().then(response => {
      //     this.barChartData = response.data
      //   })
      // }, 1500)
      // setTimeout(() => {
      //   get_warninglog().then(response => {
      //     this.tableData = response.data.slice(0, 6)
      //   })
      //   get_warningcalendar().then(response => {
      //     this.warningCalendar = response.data
      //     this.topWarningDay = this.warningCalendar.sort(function(a, b) { return b[1] - a[1] }).slice(0, 5)
      //   })
      // }, 2500)
      // setTimeout(() => {
      //   get_tablestatu().then(response => {
      //     this.serverStatuData = response.data
      //   })
      //   get_treemap().then(response => {
      //     this.TreeChartData = response.data
      //   })
      // }, 3000)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
    .el-divider--horizontal {
      margin: 5px 0 5px 0;
    }
  }
  .card-divider {
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
