<template>
  <div class="container">
    <Select v-model="model1" style="width: 200px">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{item.label}}</Option>
    </Select>
    {{model1}}
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      model1: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
}
</style>
