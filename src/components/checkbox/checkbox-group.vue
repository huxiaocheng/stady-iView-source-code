<template>
  <div>
    <slot />
  </div>
</template>

<script>
import Emitter from '@/mixins/emitter';
import { findComponentsDownward } from '@/utils/assist';

export default {
  name: 'CheckboxGroup',
  mixins: [Emitter],
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentValue: this.value,
      childrens: []
    }
  },
  methods: {
    updateModel(update) {
      this.childrens = findComponentsDownward(this, 'Checkbox');
      if(this.childrens.length > 0) {
        this.childrens.forEach(child => {
          const { value } = this;
          child.model = value;
          if(update) {
            child.currentValue = value.includes(child.label);
            child.group = true;
          }
        })
      }
    },
    change(data) {
      this.currentValue = data;
      this.$emit('input', data);
      this.$emit('on-change', data);
      this.dispatch('FormItem', 'on-from-change', data);
    }
  },
  watch: {
    value() {
      this.updateModel(true);
    }
  }
}
</script>
