<template>
  <li :class='classes' @click.stop='select' @mousedown.prevent>
    <slot>{{showLabel}}</slot>
  </li>
</template>

<script>

export default {
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    label: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showLabel() {
      return this.label || this.value;
    }
  }
}
</script>