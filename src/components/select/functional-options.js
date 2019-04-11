export default {
  functional: true,
  props: {
    options: {
      type: Array,
      default:() => []
    },
    slotOptions: {
      type: Array,
      default:() => []
    },
    slotUpdateHook: {
      type: Function,
      default:() => {}
    }
  },
  render(h, { props, parent }) {
    if (props.slotOptions !== parent.$slots.default) {
      props.slotUpdateHook();
    }
    return props.options;
  }
};
