<template>
  <i :class='classes' :style='styles' />
</template>

<script>
const prefixCls = 'c-ui-icon';

export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
      default: ''
    },
    size: [Number, String],
    color: String
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`, 
        {
          [`${prefixCls}-${this.type}`]: this.type !== ''
        }
      ]
    },
    styles() {
      const style = {};
      if(this.size) {
        style['font-size'] = `${this.size}px`;
      }
      if(this.color) {
        style.color = this.color;
      }
      return style;
    }
  }
}
</script>