<template>
  <el-table
    :data="tableData"
    stripe
    border
    highlight-current-row
    style="width: 100%">
    <el-table-column
      prop="component"
      label="Component"/>
    <el-table-column label="Harmonics">
      <el-table-column
        label="Main Harmonic">
        <el-table-column
          label="Order"
          prop="order"/>
        <el-table-column
          label="Contribution"
          prop="contribution"/>
      </el-table-column>
      <el-table-column label="Optional Harmonics">
        <el-table-column
          prop="orders"
          label="Orders"/>
        <el-table-column
          prop="cum_contribution"
          label="Cumulated Contribution"/>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        component: 'Shaft Bearing',
        order: '2',
        contribution: '55%',
        orders: '2,4,3,5',
        cum_contribution: '86%'
      }, {
        component: 'Stator Wingding',
        order: '3',
        contribution: '61%',
        orders: '3,5,2,4',
        cum_contribution: '95%'
      }, {
        component: 'Shell and Bearing',
        order: '4',
        contribution: '41%',
        orders: '4,2,3,5',
        cum_contribution: '82%'
      }, {
        component: 'Air gap eccentricity',
        order: '5',
        contribution: '59%',
        orders: '5,3,4,2',
        cum_contribution: '93%'
      }, {
        component: 'Unbalanced Shaft',
        order: '7',
        contribution: '53%',
        orders: '7,10,9,8,6',
        cum_contribution: '91%'
      }, {
        component: 'Bearing foreign matter',
        order: '8',
        contribution: '35%',
        orders: '8,7,9,10,6',
        cum_contribution: '95%'
      }, {
        component: 'Broken Connector',
        order: '9',
        contribution: '33%',
        orders: '9,8,7,10,6',
        cum_contribution: '92%'
      }, {
        component: 'Belt System',
        order: '10',
        contribution: '30%',
        orders: '10,7,8,9,6',
        cum_contribution: '93%'
      }
      ]
    }
  }
}
</script>
