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
      <cRadio label='金斑蝶2'>
        <Icon type="logo-android"></Icon>
        <span>Android2</span>
      </cRadio>
      <cRadio label='radio-2'/>
    </cRadioGroup>
    {{radioGroupVal}}
  </div>
</template>

<script>
import cInput from "@/components/input";
import cRadio from "@/components/radio";
import cRadioGroup from "@/components/radio-group";

export default {
  data() {
    return {
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
    cRadioGroup
  }
};
</script>

<style lang="scss" scoped>
</style>