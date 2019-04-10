<template>
  <label>
    <input
      type="radio"
      :disabled="disabled"
      :checked="currentValue"
      :name="groupName"
      @change="handleChange"
    >
    <slot>{{ label }}</slot>
  </label>
</template>

<script>
import { findComponentUpward } from "@/utils/assist";
import Emitter from "@/mixins/emitter";

export default {
  name: "Radio",
  mixins: [Emitter],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    label: {
      type: [String, Number],
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      currentValue: this.value,
      group: false,
      groupName: this.name,
      parent: findComponentUpward(this, "RadioGroup")
    };
  },
  mounted() {
    if (this.parent) {
      this.group = true;
      if (!this.name || this.name === this.parent.name) {
        this.groupName = this.parent.name;
      }
    }

    if (this.group) {
      this.parent.updateValue();
    } else {
      this.updateValue();
    }
  },
  methods: {
    updateValue() {
      this.currentValue = this.value === true;
    },
    handleChange(e) {
      if (this.disabled) return;

      const checked = e.target.checked;
      this.currentValue = checked;
      this.$emit("input", checked);
      if (this.group) {
        if (this.label !== undefined) {
          this.parent.change({
            value: this.label,
            checked: this.value
          });
        }
      } else {
        this.$emit("on-change", checked);
        this.dispatch("FormItem", "on-form-change", checked);
      }
    }
  },
  watch: {
    value() {
      this.updateValue();
    }
  }
};
</script>

<style lang="scss" scoped></style>
