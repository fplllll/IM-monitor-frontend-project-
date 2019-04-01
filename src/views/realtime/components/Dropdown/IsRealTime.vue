<template>
  <el-dropdown :show-timeout="100" trigger="click">
    <el-button plain>{{ !realtime_disabled?'即时刷新已关闭':'即使刷新' }}
      <i class="el-icon-caret-bottom el-icon--right"/>
    </el-button>
    <el-dropdown-menu slot="dropdown" class="no-padding">
      <el-dropdown-item>
        <el-radio-group v-model="realtime_disabled" style="padding: 10px;" @change="handleFetchDataEvent">
          <el-radio :label="true" >即时刷新</el-radio>
          <el-radio :label="false" >关闭即时刷新</el-radio>
        </el-radio-group>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    realtime_disabled: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    handleFetchDataEvent() {
      this.$emit('handleFetchDataEvent', this.value)
    }
  }
}
</script>
