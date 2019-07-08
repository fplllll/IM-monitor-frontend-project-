<template>
  <el-dropdown :show-timeout="100" trigger="click">
    <el-button plain>{{ !realtime_disabled?$t('realTime.unrefresh'):$t('realTime.refresh') }}
      <i class="el-icon-caret-bottom el-icon--right"/>
    </el-button>
    <el-dropdown-menu slot="dropdown" class="no-padding">
      <el-dropdown-item>
        <el-radio-group v-model="realtime_disabled" style="padding: 10px;" @change="handleFetchDataEvent">
          <el-radio :label="true" >{{ $t('realTime.refresh') }}</el-radio>
          <el-radio :label="false" >{{ $t('realTime.unrefresh') }}</el-radio>
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
