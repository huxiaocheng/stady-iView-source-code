<template>
  <div class="container">
    <cInput v-model="msg"/>
    <!-- <Input /> -->
    <RadioGroup v-model="animal">
      <Radio label="金斑蝶">
        <Icon type="logo-android"></Icon>
        <span>Android2</span>
      </Radio>
      <Radio label="爪哇犀牛"></Radio>
      <Radio label="印度黑羚"></Radio>
    </RadioGroup>
    <cRadioGroup v-model="radioGroupVal">
      <cRadio label="金斑蝶2">
        <Icon type="logo-android"></Icon>
        <span>Android2</span>
      </cRadio>
      <cRadio label="radio-2"/>
    </cRadioGroup>
    <cCheckboxGroup v-model="checkboxValues">
      <cCheckbox label="checkbox1">
        <Icon type="logo-facebook"></Icon>
        <span>Facebook</span>
      </cCheckbox>
      <cCheckbox label="checkbox2"></cCheckbox>
      <cCheckbox label="checkbox3"></cCheckbox>
    </cCheckboxGroup>
    <cCheckbox v-model="checkboxValue" label='asd'></cCheckbox>
    <br>
    {{checkboxValues.length > 0 ? checkboxValues : ''}}
    <br>
    {{checkboxValue}}
  </div>
</template>

<script>
import cInput from "@/components/input";
import cRadio from "@/components/radio";
import cRadioGroup from "@/components/radio-group";
import cCheckbox from "@/components/checkbox";
import cCheckboxGroup from "@/components/checkbox-group";

export default {
  data() {
    return {
      checkboxValue: true,
      checkboxValues: ["checkbox2"],
      msg: "hello1",
      radioVal: false,
      radioGroupVal: 1,
      animal: "金斑蝶"
    };
  },
  methods: {
    handleClick() {
      this.msg = "world";
    }
  },
  components: {
    cInput,
    cRadio,
    cRadioGroup,
    cCheckbox,
    cCheckboxGroup
  }
};
</script>

<style lang="scss" scoped>
</style>