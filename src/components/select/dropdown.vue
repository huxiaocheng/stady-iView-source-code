<template>
  <div class="c-ui-select-dropdown" :class="className" :style="styles">
    <slot/>
  </div>
</template>

<script>
import { getStyle, findComponentUpward } from "@/utils/assist";
import { transferIndex, transferIncrease } from "@/utils/transfer-queue";
import Popper from "popper.js";

export default {
  props: {
    className: {
      type: String
    }
  },
  data() {
    return {
      popper: null,
      width: "",
      tIndex: this.handleGetIndex()
    };
  },
  computed: {
    styles() {
      const style = {};
      if (this.width) {
        style.minWidth = `${this.width}px`;
      }
      return style;
    }
  },
  mounted() {
    if (this.$parent.$options.name === "Select") {
      this.width = parseInt(getStyle(this.$parent.$el, "width"));
    }
    this.tIndex = this.handleGetIndex();
  },
  methods: {
    update() {
      if (this.props) {
        this.$nextTick(() => {
          this.popper.update();
        });
      } else {
        this.$nextTick(() => {
          this.popper = new Popper(this.$parent.$refs.reference, this.$el, {
            placement: 'buttom-start',
            modifiers: {
              computeStyle: {
                gpuAcceleration: false
              },
              preventOverflow: {
                boundariesElement: "window"
              }
            },
            onCreate: () => {
              this.resetTransformOrigin();
              this.$nextTick(this.popper.update());
            },
            onUpdate: () => {
              this.resetTransformOrigin();
            }
          });
        });
      }
    },
    resetTransformOrigin() {
      if (!this.popper) return;

      let x_placement = this.popper.popper.getAttribute("x-placement");
      let placementStart = x_placement.split("-")[0];
      let placementEnd = x_placement.split("-")[1];
      const leftOrRight = x_placement === "left" || x_placement === "right";
      if (!leftOrRight) {
        this.popper.popper.style.transformOrigin =
          placementStart === "bottom" ||
          (placementStart !== "top" && placementEnd === "start")
            ? "center top"
            : "center bottom";
      }
    },
    handleGetIndex() {
      transferIncrease();
      return transferIndex;
    }
  },
  beforeDestroy() {
    if (this.popper) {
      this.popper.destroy();
    }
  }
};
</script>

<style lang="scss" scoped>
.c-ui-select-dropdown {
  overflow: auto;
  margin: 5px 0;
  padding: 5px 0;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 900;
}
</style>

