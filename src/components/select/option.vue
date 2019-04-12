<template>
  <li :class="classes" @click.stop="select">
    <slot>{{value}}</slot>
  </li>
</template>

<script>
import Emitter from "@/mixins/emitter";
import { findComponentUpward } from "@/utils/assist";

const prefixCls = "c-ui-select-item";

export default {
  name: "Option",
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-selected`]: this.selected
        }
      ];
    }
  },
  methods: {
    select() {
      if (this.disabled) return;

      this.dispatch("Select", "on-select-selected", this.value);
      this.$emit("on-select-selected", this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.c-ui-select-item {
  margin: 0;
  line-height: normal;
  padding: 7px 16px;
  clear: both;
  color: #515a6e;
  font-size: 12px !important;
  white-space: nowrap;
  list-style: none;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: #eee;
  }
}
</style>
