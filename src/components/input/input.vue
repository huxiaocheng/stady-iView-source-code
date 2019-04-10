<template>
  <div :class="wrapClasses">
    <input
      :class="inputClasses"
      :autocomplete="autocomplete"
      ref="input"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :value="currentValue"
      :number="number"
      :autofocus="autofocus"
      @keyup.enter="handleEnter"
      @keyup="handleKeyup"
      @keydown="handleKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @input="handleInput"
      @compositionstart="handleComposition"
      @compositionend="handleComposition"
    >
  </div>
</template>

<script>
import { findComponentUpward } from "@/utils/assist";
import Emitter from "@/mixins/emitter";
import AutoFocus from '@/mixins/autoFocus';

const prefixCls = "c-ui-input";

export default {
  name: "Input",
  mixins: [Emitter, AutoFocus],
  props: {
    type: {
      // 类型
      validator(val) {
        return [
          "text",
          "password",
          "url",
          "email",
          "date",
          "number",
          "tel"
        ].includes(val);
      },
      default: "text"
    },
    value: [String, Number], //绑定的值
    placeholder: {
      //占位符
      type: String,
      default: ""
    },
    number: {
      // 转为number
      type: Boolean,
      default: false
    },
    disabled: {
      // 禁用
      type: Boolean,
      default: false
    },
    readonly: {
      // 是否只读
      type: Boolean,
      default: false
    },
    autofocus: {
      // 是否聚焦
      type: Boolean,
      default: false
    },
    autocomplete: {
      // 是否自动完成
      validator(val) {
        return ["off", "on"].includes(val);
      },
      default: "off"
    }
  },
  data() {
    return {
      slotReady: false,
      currentValue: this.value,
      isOnComposition: false
    };
  },
  mounted() {
    this.slotReady = true;
    if(this.autofocus) {
      this.autoFocus('input');
    }
  },
  computed: {
    wrapClasses() {
      return [`${prefixCls}-wrapper`];
    },
    inputClasses() {
      return [`${prefixCls}`];
    }
  },
  methods: {
    handleEnter(e) {
      this.$emit("on-enter", e);
    },
    handleKeyup(e) {
      this.$emit("on-keyup", e);
    },
    handleKeydown(e) {
      this.$emit("on-keydown", e);
    },
    handleFocus(e) {
      this.$emit("on-focus", e);
    },
    handleBlur(e) {
      this.$emit("on-blur", e);
      if (
        !findComponentUpward(this, [
          "DatePicker",
          "TimePicker",
          "Cascader",
          "Search"
        ])
      ) {
        this.dispatch("FromItem", "on-form-blur", this.currentValue);
      }
    },
    handleComposition(e) {
      if (e.type === "compositionstart") {
        this.isOnComposition = true;
      }
      if (e.type === "compositionend") {
        this.isOnComposition = false;
        this.handleInput(e);
      }
    },
    handleInput(e) {
      if (this.isOnComposition) { return; }

      let value = e.target.value;
      if (this.number && value !== "") {
        value = Number.isNan(Number(value)) ? value : Number(value);
      }
      this.$emit("input", value);
      this.setCurrentValue(value);
      this.$emit("on-change", e);
    },
    handleChange(e) {
      this.$emit("on-input-change", e);
    },
    setCurrentValue(val) {
      if (val === this.currentValue) { return; }
      this.currentValue = val;
      if (
        !findComponentUpward(this, [
          "DatePicker",
          "TimePicker",
          "Cascader",
          "Search"
        ])
      ) {
        this.dispatch("FormItem", "on-form-change", val);
      }
    },
  },
  watch: {
    value(newVal) {
      this.setCurrentValue(newVal);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/index";

.c-ui-input-wrapper {
  display: inline-block;
  width: 100%;
  position: relative;
  vertical-align: middle;
  line-height: normal;
  border-radius: $btn-border-radius;
  overflow: hidden;
  .c-ui-input {
    @include input();
    @include placeholder();
    &:hover {
      @include hover();
    }
    &:focus {
      @include active();
    }
    &:disabled {
      @include disabled();
    }
  }
}
</style>
