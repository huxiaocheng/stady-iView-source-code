<template>
  <div :class="classes" v-click-outside.capture="onClickOutside">
    <div ref="reference" :class="selectionCls" @click="toggleMenu" @mouseleave="handleMouseLeave" @mouseenter='handleMouseEnter'>
      <input type="hidden" :name="name" :value="currentValue">
      <span :class="tagTextCls">{{currentValue || '请选择'}}</span>
      <i :class='clearValue' @click.stop='handleClear' ref='icon'>x</i>
    </div>
    <Dropdown v-show="dropVisible" ref="dropdown">
      <ul v-if="showNotFoundLabel">
        <li>{{notFoundText}}</li>
      </ul>
      <ul :class='prefixCls + "-dropdown-list"'>
        <slot/>
      </ul>
    </Dropdown>
  </div>
</template>

<script>
import Emitter from "@/mixins/emitter";
import { directive as clickOutside } from "v-click-outside-x";
import Dropdown from "./dropdown";

const prefixCls = "c-ui-select";

export default {
  name: "Select",
  mixins: [Emitter],
  directives: { clickOutside },
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: String,
    clearable: {
      // 清除按钮
      type: Boolean,
      default: false
    },
    placeholder: String,
    notFoundText: {
      // 没有信息时的文字
      type: String,
      default: "no more..."
    }
  },
  data() {
    return {
      currentValue: this.value,
      dropVisible: false,
      prefixCls
    };
  },
  created() {
    this.$on("on-select-selected", this.selectItem);
  },
  computed: {
    classes() {
      return [`${prefixCls}`];
    },
    selectionCls() {
      return [
        `${prefixCls}-selection`,
        {
          [`${prefixCls}-selection-open`]: this.dropVisible
        }
      ];
    },
    tagTextCls() {
      return [
        `${prefixCls}-tag-text`,
        {
          [`${prefixCls}-tag-value`]: this.currentValue !== ''
        }
      ]
    },
    clearValue() {
      return [
        `${prefixCls}-arrow`,
        {
          [`${prefixCls}-arrow-show`]: this.currentValue !== '' && this.dropVisible
        }
      ]
    },
    showNotFoundLabel() {
      return this.$slots.default === undefined ? true : false;
    }
  },
  methods: {
    handleMouseLeave() {
      this.$refs.icon.classList.remove('c-ui-select-arrow-show');
    },
    handleMouseEnter() {
      if(this.currentValue !== '') {
        this.$refs.icon.classList.add('c-ui-select-arrow-show');
      }
    },
    selectItem(value) {
      this.$emit("input", value);
      this.currentValue = value;
      this.dropVisible = false;
    },
    handleClear() {
      this.currentValue = '';
      this.$refs.icon.classList.remove('c-ui-select-arrow-show');
    },
    onClickOutside() {
      this.dropVisible = false;
    },
    toggleMenu() {
      this.dropVisible = !this.dropVisible;
    }
  },
  watch: {
    value(newVal) {
      this.currentValue = newVal;
    }
  },
  components: {
    Dropdown
  }
};
</script>

<style lang="scss" scoped>
.c-ui-select {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  vertical-align: middle;
  color: #515a6e;
  font-size: 14px;
  line-height: normal;
  .c-ui-select-selection {
    display: block;
    height: 32px;
    position: relative;
    box-sizing: border-box;
    outline: 0;
    user-select: none;
    cursor: pointer;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdee2;
    transition: all 0.2s ease-in-out;
    &.c-ui-select-selection-open {
      border-color: #57a3f3;
      box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
    }
    &:hover {
      border-color: #57a3f3;
    }
    .c-ui-select-arrow {
      position: absolute;
      top: 50%;
      display: none;
      font-style: normal;
      background: #888;
      width: 14px;
      height: 14px;
      line-height: 14px;
      text-align: center;
      color: #fff;
      border-radius: 50%;
      right: 8px;
      transform: translateY(-50%);
      font-size: 14px;
      transition: all .2s ease-in-out;
      &.c-ui-select-arrow-show {
        display: block;
        transition: all .3s;
      }
    }
    .c-ui-select-tag-text {
      display: block;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-left: 8px;
      color: #ccc;
      padding-right: 24px;
      &.c-ui-select-tag-value {
        color: #515a6e
      }
    }
  }
}
</style>
