<template>
  <div :class="classes">
    <div ref="reference" :class="selectionCls" @click="toggleMenu">
      <input type="hidden" :name='name' :value='currentValue'>
      <select-head 

      />
    </div>
    <Drop
      :class="dropdownCls"
      v-show="dropVisible"
      :placement="placement"
      ref="dropdown"
      :data-transfer="transfer"
      :transfer="transfer"
    >
      <ul v-show="showNotFoundLabel">
        <li>{{localeNotFoundText}}</li>
      </ul>
      <ul :class='prefixCls + "-dropdown-list"'>
        <functional-options>
          
        </functional-options>
      </ul>
    </Drop>
  </div>
</template>

<script>
import Emitter from "@/mixins/emitter";
import SelectHead from './select-head';
import Drop from './dropdown';
import FunctionalOptions from './functional-options';

export default {
  name: "Select",
  mixins: [Emitter],
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
    clearable: { // 清除按钮
      type: Boolean,
      default: false
    },
    placeholder: String,
    notFoundText: String, // 没有信息时的文字
    transfer: { // 弹出窗至于body内
      type: Boolean,
      default: false
    },
    placement: { // 弹出框位置
      validator(val) {
        return [
          "top",
          "buttom",
          "top-start",
          "buttom-start",
          "top-end",
          "buttom-end"
        ].includes(val);
      }
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  methods: {

  },
  components: {
    Drop,
    SelectHead,
    FunctionalOptions
  }
};
</script>