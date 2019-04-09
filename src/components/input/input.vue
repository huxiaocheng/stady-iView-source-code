<template>
  <div>
    <input type="text" class='input test' placeholder="input ..."/>
    <Input type="date"/>
  </div>
</template>

<script>
export default {
  props: {
    type: { // 类型
      validator(val) {
        return ["text", "password", "url", "email", "date", "number", "tel"].includes(val);
      },
      default: "text"
    },
    value: [String, Number], //绑定的值
    placeholder: { //占位符
      type: String,
      default: ''
    },
    clearable: { // 是否显示清空按钮
      type: Boolean,
      default: false
    },
    readonly: { // 是否只读
      type: Boolean,
      default: false
    },
    prefix: String, // 输入框前icon,
    suffix: String, // 输入框后icon,
    search: { //是否显示为搜索型输入框
      type: Boolean,
      default: false
    },
    enterButton: { // 为search后，是否有确认按钮，可设为按钮文字
      type: [Boolean, String],
      default: false
    },
    autofocus: { // 是否聚焦
      type: Boolean,
      default: false
    },
    autocomplete: { // 是否自动完成
      validator(val) {
        return ['off', 'on'].includes(val);
      },
      default: 'off'
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin input() {
  display: inline-block;
  width: 100%;
  border: 1px solid green;
  &::-webkit-input-placeholder {
    color: red;
  };
  &.test {
    /* background: #888; */
  }
  /* &:hover {
    border-color: red;
  } */
  &:disabled {
    background: #888;
  }
}
.input {
  @include input();
}
</style>
