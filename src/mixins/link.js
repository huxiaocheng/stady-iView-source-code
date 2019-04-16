export default {
  props: {
    to: {
      type: [Object, String],
      default: ''
    },
    target: {
      validator(val) {
        return ['_blank', '_self', '_parent', '_top'].includes(val);
      },
      default: '_self'
    }
  },
  computed: {
    linkUrl() {
      return typeof this.to === 'string' ? this.to : null;
    }
  },
  methods: {
    handleClick(new_window = false) {
      if (new_window) {
        window.open(this.to);
      } else {
        if (this.$router) {
          this.$router.push(this.to);
        } else {
          window.location.href = this.to;
        }
      }
    },
    handleCheckClick(e, new_window = false) {
      if(this.to) {
        if(this.target === '_blank') {
          return;
        } else {
          e.preventDefault();
          this.handleClick(new_window);
        }
      }
    }
  }
}