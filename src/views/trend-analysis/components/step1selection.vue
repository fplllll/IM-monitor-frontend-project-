<template>
  <el-form :model="value" label-width="100px" style="width:600px;" align="left">
    <el-form-item :label="$t('symmetry.formName')">
      <el-radio-group v-model="value.motor" >
        <el-radio
          v-for="item in motorOption"
          :key="item.key"
          :label="item.key"> {{ item.name }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="$t('symmetry.dateRange')">
      <el-date-picker
        v-model="value.datarange"
        :picker-options="pickerOptions2"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
        value-format="yyyy-MM-dd HH:mm:ss"/>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Step1selection',
  props: {
    value: {
      required: true,
      type: Object
    }
  },
  data() {
    return {

      motorOption: [
        { key: 1, name: 'Motor#1' },
        { key: 2, name: 'Motor#2' },
        { key: 3, name: 'Motor#3' }
      ],
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
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
  }
}
</script>

<style scoped>
</style>
