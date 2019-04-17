<template>
  <component 
    :is="tagName"
    :class='classes'
    :disabled='disabled'
    @click='handleClickLink'
    v-bind='tagProps'
  >
    <cIcon :type='icon' v-if='icon'/>
    <span v-if='showSlot'>
      <slot/>
    </span>
  </component>
</template>

<script>
import UrlLink from '@/mixins/link';
import cIcon from '@/components/icon';

const prefixCls = 'c-ui-btn';

export default {
  name: 'Button',
  mixins: [UrlLink],
  props: {
    type: {
      validator(val) {
        return ['default', 'primary', 'success', 'warning', 'error'].includes(val);
      },
      default: 'default'
    },
    shape: {
      validator(val) {
        return val === 'circle' || val === '';
      },
      default: ''
    },
    long: {
      type: Boolean,
      default: false
    },
    ghost: {
      type: Boolean,
      default: false
    },
    htmlType: {
      validator(val) {
        return ['button', 'submit', 'reset'].includes(val);
      },
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showSlot: true
    }
  },
  mounted() {
    this.showSlot = this.$slots.default !== undefined;
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.type}`,
        {
          [`${prefixCls}-long`]: this.long,
          [`${prefixCls}-${this.shape}`]: this.shape !== '',
          [`${prefixCls}-${this.ghost}`]: this.ghost
        }
      ]
    },
    tagName() {
      return this.to === '' ? 'button' : 'a';
    },
    tagProps() {
      if(this.to === '') {
        const { htmlType } = this;
        return {
          type: htmlType
        }
      } else {
        const {linkUrl, target} = this;
        return {
          href: linkUrl,
          target
        }
      }
    }
  },
  methods: {
    handleClickLink(e) {
      this.$emit('click', e);
      const openInNewWindow = event.ctrlKey || event.metaKey;

      this.handleCheckClick(e, openInNewWindow);
    }
  },
  components: {
    cIcon
  }
}
</script>

<style lang="scss" scoped>
.c-ui-btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    outline: none;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    user-select: none;
    padding: 5px 15px 6px 15px;
    font-size: 12px;
    border-radius: 4px;
    transition: 
      color .2s linear,
      background-color .2s linear,
      border .2s linear,
      opacity .2s linear,
      box-shadow .2s linear;
    color: #515a6e;
    background-color: #fff;
    border-color: #dcdee2;
    &:active {
      border: none;
    }
    &:hover {
      border: 1px solid #2d8cf0;
      color: #2d8cf0;
      opacity: .7;
    }
    &.c-ui-btn-default {
      background: #fff;
      color: #2d8cf0;
      border: 1px solid #2d8cf0;
    }
    &.c-ui-btn-primary {
      background: #2d8cf0;
      color: #fff;
      border: 1px solid #2d8cf0;
    }
    &.c-ui-btn-success {
      background: #19be6b;
      color: #fff;
      border: 1px solid #19be6b;
    }
    &.c-ui-btn-warning {
      background: #f90;
      color: #fff;
      border: 1px solid #f90;
    }
    &.c-ui-btn-error {
      background: #ed4014;
      color: #fff;
      border: 1px solid #ed4014;
    }
    &.c-ui-btn-long {
      width: 100%;
    }
    &.c-ui-btn-circle {
      border-radius: 15px;
    }
}
</style>
