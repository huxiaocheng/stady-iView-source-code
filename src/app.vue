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
    <cSwitch v-model="switchVal">
      <span slot="open">开</span>
      <span slot="close">关</span>
    </cSwitch>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <cIcon type="ios-paper" size="30" color="red"/>
    <cSelect v-model="model1" style="width:300px" placement="top-start">
      <cOption
        v-for="item in cityList"
        :value="item.value"
        :key="item.value"
        @on-select-selected="handleSelectItem"
      />
    </cSelect>
    <cButton icon="ios-paper">小按钮</cButton>
    <Button icon="ios-paper">小按钮</Button>
    <br>
    <CMenu mode="vertical" @on-select='handleSelect' @on-open-change='handleSelectOpen'>
      <CMenuItem name="2">
        <cIcon type="ios-paper"/>内容管理
      </CMenuItem>
      <CMenuItem name="1">
        <cIcon type="ios-people"/>用户管理
      </CMenuItem>
      <CSubmenu name="3">
        <template slot="title">
          <cIcon type="ios-stats"/>统计分析
        </template>
        <CMenuGroup title="使用">
          <CMenuItem name="3-1">新增和启动</CMenuItem>
          <CMenuItem name="3-2">活跃分析</CMenuItem>
          <CMenuItem name="3-3">时段分析</CMenuItem>
        </CMenuGroup>
        <CMenuGroup title="留存">
          <CMenuItem name="3-4">用户留存</CMenuItem>
          <CMenuItem name="3-5">流失用户</CMenuItem>
        </CMenuGroup>
      </CSubmenu>
      <CMenuItem name="4">
        <cIcon type="ios-construct"/>综合设置
      </CMenuItem>
    </CMenu>
  </div>
</template>

<script>
import cInput from "@/components/input";
import cRadio from "@/components/radio";
import cRadioGroup from "@/components/radio-group";
import cCheckbox from "@/components/checkbox";
import cCheckboxGroup from "@/components/checkbox-group";
import cSwitch from "@/components/switch";
import cOption from "@/components/option";
import cSelect from "@/components/select";
import cIcon from "@/components/icon";
import cButton from "@/components/button";
import {CMenu,CSubmenu,CMenuGroup,CMenuItem} from '@/components/menu';

export default {
  data() {
    return {
      theme1: 'light',
      optionValue: "hello",
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
    handleSelect(name) {
      console.log('select',name);
    },
    handleSelectItem(value) {
      console.log(value);
    },
    handleSelectOpen(name) {
      console.log('open',name);
    }
  },
  components: {
    cInput,
    cRadio,
    cRadioGroup,
    cCheckbox,
    cCheckboxGroup,
    cSwitch,
    cSelect,
    cOption,
    cIcon,
    cButton,
    CMenu,
    CSubmenu,
    CMenuGroup,
    CMenuItem
  }
};
</script>

<style lang="scss" scoped>
</style>