<template>
  <div class="mo-picker-wrap">
    <div class="mo-picker__toggle" ref="toggle">
      <slot name="toggle"></slot>
    </div>
    <div class="mo-picker" ref="picker" v-show="visible">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Picker from './picker'
export default {
  mixins : [Picker]
}
</script>
