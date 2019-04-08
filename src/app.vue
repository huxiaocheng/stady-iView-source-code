<template>
  <div class="container">
<input
  @input='handleInput'
  @compositionstart='handleComposition'
  @compositionend='handleComposition'
/>
  </div>
</template>
<script>
export default {
data() {
  return {
    isOnComposition: false
  };
},
methods: {
  handleComposition(e) {
    if(e.type === 'compositionstart') {
      this.isOnComposition = true;
    }
    if(e.type === 'compositionend') {
      this.isOnComposition = false;
      this.handleInput();
    }
  },
  handleInput() {
    if(this.isOnComposition) return;
  }
}
};
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
}
</style>
