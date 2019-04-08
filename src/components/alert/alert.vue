<template>
  <transition name="fade">
    <div v-if="!closed" :class="wrapClasses">
      <span :class="iconClasses" v-if="showIcon">
        <slot name="icon">
          <Icon :type="iconType" />
        </slot>
      </span>
      <span :class="messageClasses">
        <slot/>
      </span>
      <span :class="descClasses">
        <slot name="desc"></slot>
      </span>
      <a :class="closeClasses" v-if="closable" @click="close">
        <slot name="close">
          <Icon type="ios-close" />
        </slot>
      </a>
    </div>
  </transition>
</template>

<script>
/*
  可接受的配置包括类型只能是"success", "info", "warning", "error"其中之一，
  是否显示关闭当前Alert的按钮，是否显示类型与之对应的icon图标，是否显示为
  banner模式。
*/
import Icon from "@/components/icon";

const prefixCls = "ivu-alert";

export default {
  name: "Alert",
  components: {
    Icon
  },
  props: {
    type: {
      validator(val) {
        return ["success", "info", "warning", "error"].includes(val);
      },
      default: "info"
    },
    closable: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    banner: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      closed: false,
      desc: false
    };
  },
  mounted() {
    this.desc = this.$slots.desc !== undefined;
  },
  computed: {
    wrapClasses() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.type}`,
        {
          [`${prefixCls}-with-icon`]: this.showIcon,
          [`${prefixCls}-with-desc`]: this.desc,
          [`${prefixCls}-with-banner`]: this.banner
        }
      ];
    },
    messageClasses() {
      return `${prefixCls}-message`;
    },
    descClasses() {
      return `${prefixCls}-desc`;
    },
    closeClasses() {
      return `${prefixCls}-close`;
    },
    iconClasses() {
      return `${prefixCls}-icon`;
    },
    iconType() {
      let type = "";

      switch (this.type) {
        case "success":
          type = "ios-checkmark-circle";
          break;
        case "info":
          type = "ios-information-circle";
          break;
        case "warning":
          type = "ios-alert";
          break;
        case "error":
          type = "ios-close-circle";
          break;
      }
      if (this.desc) {
        type += "-outline";
      }
      return type;
    }
  },
  methods: {
    close(e) {
      this.closed = true;
      this.$emit("on-close", e);
    }
  }
};
</script>