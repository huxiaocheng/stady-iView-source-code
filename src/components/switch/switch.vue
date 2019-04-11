<template>
  <span
    :class='wrapClasses'
    @click.prevent='toggle'
  >
    <input type="hidden" :name='name' :value='currentValue'>
    <span :class='innerClasses'>
      <slot name='open' v-if='currentValue === true' />
      <slot name='close' v-if='currentValue === false'/>
    </span>
  </span>
</template>

<script>
import Emitter from '@/mixins/emitter';

const prefixCls = 'c-ui-switch';

export default {
  name: 'cSwitch',
  mixins: [ Emitter ],
  props: {
    value: {
      type: Boolean,
      defaule: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  computed: {
    wrapClasses() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-checked`]: this.currentValue,
          [`${prefixCls}-disabled`]: this.disabled,
        }
      ]
    },
    innerClasses() {
      return `${prefixCls}-inner`;
    }
  },
  methods: {
    toggle() {
      if(this.disabled) return;

      const checked = this.currentValue === true ? false : true;
      this.currentValue = checked;
      this.$emit('input', checked);
      this.$emit('on-change', checked);
      this.dispatch('FormItem', 'on-form-change', checked);
    }
  },
  watch: {
    value(newVal) {
      this.currentValue = newVal;
    }
  }
}
</script>

<style lang="scss" scoped>
.c-ui-switch {
  display: inline-block;
  width: 44px;
  height: 22px;
  line-height: 20px;
  border-radius: 22px;
  vertical-align: middle;
  border: 1px solid #ccc;
  background-color: #ccc;
  position: relative;
  cursor: pointer;
  user-select: none;
  transition: all .2s ease-in-out;
  .c-ui-switch-inner {
    color: #fff;
    font-size: 12px;
    position: absolute;
    left: 23px;
  }
  &:active {
    &::after {
      width: 24px;
    }
  }
  &.c-ui-switch-checked {
    background: #2d8cf0;
    border-color: #2d8cf0;
    &::after {
      left: 23px;
      width: 18px;
    }
    .c-ui-switch-inner {
      left: 5px;
    }
  }
  &.c-ui-switch-disabled {
    opacity: .5;
    cursor: not-allowed;
    &::after{
      cursor: not-allowed;
    }
  }
  &::after {
    content: "";
    position: absolute;
    left: 1px;
    top: 1px;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background-color: #fff;
    cursor: pointer;
    transition: left .2s ease-in-out,width .2s ease-in-out;
  }
}

</style>
