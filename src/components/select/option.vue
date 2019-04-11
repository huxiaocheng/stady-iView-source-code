<template>
  <li :class="classes" @click.stop="select" @mousedown.prevent>
    <slot>{{showLabel}}</slot>
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
    label: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    const Select = findComponentUpward(this, "Select");
    if (Select) {
      this.autoComplete = Select.autoComplete;
    }
  },
  data() {
    return {
      searchLabel: "",
      autoComplete: false
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-selected`]: this.selected && !this.autoComplete
        }
      ];
    },
    showLabel() {
      return this.label || this.value;
    }
  },
  methods: {
    select() {
      if (this.disabled) return;

      this.dispatch("Select", "on-select-selected", {
        value: this.value,
        label: this.label
      });
      this.$emit("on-select-selected", {
        value: this.value,
        label: this.label
      });
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
  transition: background .2s ease-in-out;
  &:hover {
    background: #eee;
  }
}
</style>
