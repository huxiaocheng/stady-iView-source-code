<template>
  <label>
    <span>
      <input 
        v-if='group'
        type="checkbox"
        v-model='model'
        :disabled='disabled'
        :value='label'
        :name='name'
        @change='change'
      >
      <input 
        v-else
        type="checkbox"
        :disabled='disabled'
        :checked='currentValue'
        @change='change'
      >
    </span>
    <slot>
      <span v-if='showSlot'>{{ label }}</span>
    </slot>
  </label>
</template>

<script>
import { findComponentUpward } from '@/utils/assist';
import Emitter from '@/mixins/emitter';

export default {
  name: 'Checkbox',
  mixins: [Emitter],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Boolean, String, Number],
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: [String, Number, Boolean]
    }
  },
  data() {
    return {
      currentValue: this.value,
      model: [],
      parent: findComponentUpward(this, 'CheckboxGroup'),
      group: false,
      showSlot: true
    }
  },
  mounted() {
    if(this.parent) {
      this.group = true;
    }
    if(this.group) {
      this.parent.updateModel(true);
    } else {
      this.updateModel();
      this.showSlot = this.$slots.default !== undefined;
    }
  },
  methods: {
    change(e) {
      if(this.disabled) return;

      const checked = e.target.checked;
      this.currentValue = checked;
      this.$emit('input', checked);
      if(this.group) {
        this.parent.change(this.model);
      } else {
        this.$emit('on-change', checked);
        this.dispatch('FromItem', 'on-form-change', checked);
      }
    },
    updateModel() {
      this.currentValue = this.value === true;
    }
  },
  watch: {
    value() {
      this.updateModel();
    }
  }
}
</script>
