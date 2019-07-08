<template>
  <el-table
    :data="tableData"
    stripe
    border
    highlight-current-row
    style="width: 100%">
    <el-table-column
      :label="$t('harmonic.component')"
      prop="component"/>
    <el-table-column :label="$t('harmonic.column')">
      <el-table-column
        :label="$t('harmonic.MainHarmonic')">
        <el-table-column
          :label="$t('harmonic.Order')"
          prop="order"/>
        <el-table-column
          :label="$t('harmonic.contribution')"
          prop="contribution"/>
      </el-table-column>
      <el-table-column :label="$t('harmonic.OptionalHarmonics')">
        <el-table-column
          :label="$t('harmonic.Order')"
          prop="orders"
        />
        <el-table-column
          :label="$t('harmonic.cum_contribution')"
          prop="cum_contribution"
        />
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        component: this.$t('harmonic.ShaftBearing'),
        order: '2',
        contribution: '55%',
        orders: '2,4,3,5',
        cum_contribution: '86%'
      }, {
        component: this.$t('harmonic.StatorWinding'),
        order: '3',
        contribution: '61%',
        orders: '3,5,2,4',
        cum_contribution: '95%'
      }, {
        component: this.$t('harmonic.ShellandBearing'),
        order: '4',
        contribution: '41%',
        orders: '4,2,3,5',
        cum_contribution: '82%'
      }, {
        component: this.$t('harmonic.Airgapeccentricity'),
        order: '5',
        contribution: '59%',
        orders: '5,3,4,2',
        cum_contribution: '93%'
      }, {
        component: this.$t('harmonic.UnbalancedShaft'),
        order: '7',
        contribution: '53%',
        orders: '7,10,9,8,6',
        cum_contribution: '91%'
      }, {
        component: this.$t('harmonic.Bearingforeignmatter'),
        order: '8',
        contribution: '35%',
        orders: '8,7,9,10,6',
        cum_contribution: '95%'
      }, {
        component: this.$t('harmonic.BrokenConnector'),
        order: '9',
        contribution: '33%',
        orders: '9,8,7,10,6',
        cum_contribution: '92%'
      }, {
        component: this.$t('harmonic.BeltSystem'),
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
