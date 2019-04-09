<template>
  <div class="container">
    <cInput />
  </div>
</template>

<script>
import cInput from '@/components/input';

export default {
  data() {
    return {};
  },
  components: {
    cInput
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
}
</style>
