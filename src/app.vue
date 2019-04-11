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
    <cCheckbox v-model="checkboxValue" label="asd"></cCheckbox>
    <cSwitch v-model="switchVal" @on-change="switchChange">
      <span slot="open">开</span>
      <span slot="close">关</span>
    </cSwitch>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <Select v-model="model1" style="width:200px" placement='bottom-end'>
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <cOption :value='optionValue'/>
  </div>
</template>

<script>
import cInput from "@/components/input";
import cRadio from "@/components/radio";
import cRadioGroup from "@/components/radio-group";
import cCheckbox from "@/components/checkbox";
import cCheckboxGroup from "@/components/checkbox-group";
import cSwitch from "@/components/switch";
import cOption from '@/components/option';

export default {
  data() {
    return {
      optionValue: 'hello',
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      model1: "",
      switchVal: false,
      checkboxValue: true,
      checkboxValues: ["checkbox2"],
      msg: "hello1",
      radioVal: false,
      radioGroupVal: 1,
      animal: "金斑蝶",
      switch1: false
    };
  },
  methods: {
    switchChange(value) {
      console.log(value);
    }
  },
  components: {
    cInput,
    cRadio,
    cRadioGroup,
    cCheckbox,
    cCheckboxGroup,
    cSwitch,
    cOption
  }
};
</script>

<style lang="scss" scoped>
</style>