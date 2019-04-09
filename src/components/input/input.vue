<template>
  <div :class="wrapClasses">
    <div :class="[prefixCls + '-group-prepend']" v-if="prepend" v-show="slotReady">
      <!-- 前置内容 -->
      <slot name="prepend"/>
    </div>
    <i
      class="c-ui-icon"
      :class="[
        'c-ui-icon-close-circle', 
        prefixCls + '-icon', 
        prefixCls + '-icon-clean', 
        prefixCls + '-icon-normal'
      ]"
      v-if="clearable && currentValue && !disabled"
      @click="handleClear"
    ></i>
    <!-- 清空输入框 -->
    <i
      class="c-ui-icon c-ui-icon-search"
      :class="[
        prefixCls + '-icon', 
        prefixCls + '-icon-normal', 
        prefixCls + '-search-icon'
      ]"
      v-else-if="search && enterButton === false"
      @click="handleSearch"
    ></i>
    <!-- 搜索模式输入框 -->
    <span class="c-ui-input-suffix" v-else-if="showSuffix">
      <slot name="suffix">
        <i class="c-ui-icon" :class="["c-ui-icon" - suffix]" v-if="suffix"></i>
      </slot>
    </span>
    <input
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

const prefixCls = "c-ui-input";

export default {
  name: "Input",
  mixins: [Emitter],
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
    size: {
      validator(val) {
        return ["small", "large", "default"].includes(val);
      },
      default: "default"
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
    clearable: {
      // 是否显示清空按钮
      type: Boolean,
      default: false
    },
    readonly: {
      // 是否只读
      type: Boolean,
      default: false
    },
    prefix: String, // 输入框前icon,
    suffix: String, // 输入框后icon,
    search: {
      //是否显示为搜索型输入框
      type: Boolean,
      default: false
    },
    enterButton: {
      // 为search后，是否有确认按钮，可设为按钮文字
      type: [Boolean, String],
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
      isOnComposition: false,
      prepend: false,
      showSuffix: false,
      prefixCls
    };
  },
  mounted() {
    this.slotReady = true;
  },
  computed: {
    wrapClasses() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-wrapper-${this.size}`]: !!this.size,
          [`${prefixCls}-type`]: this.type
        }
      ];
    }
  },
  methods: {
    handleEnter(e) {
      this.$emit("on-enter", e);
      if (this.search) {
        this.$emit("on-search", this.currentValue);
      }
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
      if (this.isOnComposition) {
        return;
      }
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
      if (val === this.currentValue) {
        return;
      }
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
    handleClear() {
      const e = { target: { value: "" } };
      this.$emit("input", "");
      this.setCurrentValue("");
      this.$emit("on-change", e);
    },
    handleSearch() {
      if (this.disabled) {
        return;
      }
      this.$refs.input.focus();
      this.$emit("on-search", this.currentValue);
    }
  },
  watch: {
    value(newVal) {
      this.setCurrentValue(newVal);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/mixins/input.scss";
.c-ui-input {
  display: inline-block;
  width: 100%;
  height: 32px;
  line-height: 1.5;
  padding: 4px 7px;
  font-size: 12px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  color: #515a6e;
  background-color: #fff;
  background-image: none;
  position: relative;
  cursor: text;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
  box-shadow 0.2s ease-in-out;
  &:hover {
    @include hover()
  }
}
</style>
