<template>
  <el-dropdown :hide-on-click="false" :show-timeout="100" trigger="click">
    <el-button plain>
      站点({{ location.length }})
      <i class="el-icon-caret-bottom el-icon--right"/>
    </el-button>
    <el-dropdown-menu slot="dropdown" class="no-border">
      <el-checkbox-group v-model="location" style="padding: 5px 15px;">
        <el-checkbox v-for="item in locationsOptions" :label="item.key" :key="item.key">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      locationsOptions: [
        { key: 'a-platform', name: '站点A' },
        { key: 'b-platform', name: '站点B' },
        { key: 'c-platform', name: '站点C' }
      ]
    }
  },
  computed: {
    location: {
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
