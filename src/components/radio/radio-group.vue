<template>
  <div :name='name'>
    <slot />
  </div>
</template>

<script>
import { findComponentsDownward } from '@/utils/assist';
import Emitter from "@/mixins/emitter";

let seed = 0;
const now = Date.now();
const getUuid = () => `i-ui-radio-group_${now}_${seed}`;

export default {
  name: 'RadioGroup',
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    name: {
      type: String,
      default: getUuid
    }
  },
  data() {
    return {
      currentValue: this.value,
      children: []
    }
  },
  methods: {
    updateValue() {
      this.childrens = findComponentsDownward(this, 'Radio');
      if(this.childrens.length > 0) {
        this.childrens.forEach(child => {
          child.currentValue = this.currentValue === child.label;
          child.group = true;
        })
      }
    },
    change(data) {
      this.currentValue = data.value;
      this.updateValue();
      this.$emit('input', data.value);
      this.$emit('on-change',data.value);
      this.dispatch('FormItem', 'on-form-change', data.value);
    }
  },
  watch: {
    value() {
      if(this.currentValue !== this.value) {
        this.currentValue = this.value;
        this.$nextTick(() => {
          this.updateValue();
        })
      }
    }
  }
}
</script>