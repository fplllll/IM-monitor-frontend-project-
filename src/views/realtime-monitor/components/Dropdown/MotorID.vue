<template>
  <el-select v-model="motor" placeholder="请选择">
    <el-option
      v-for="item in motorOption"
      :key="item.key"
      :label="item.name"
      :value="item.key"/>
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      default: () => [],
      type: Number
    }
  },
  data() {
    return {
      motorOption: [
        { key: 1, name: 'Motor#1' },
        { key: 2, name: 'Motor#2' },
        { key: 3, name: 'Motor#3' }
      ]
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
