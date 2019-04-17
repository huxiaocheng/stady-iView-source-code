<template>
  <ul :class='classes' :style='styles'>
    <slot />
  </ul>
</template>

<script>
import { findComponentsDownward, findComponentsUpward } from '@/utils/assist';
import Emitter from '@/mixins/emitter';

const prefixCls = 'ivu-menu';

export default {
  name: 'Menu',
  mixins: [Emitter],
  props: {
    mode: {
      validator(val) {  // 排列方式
        return ['horizontal', 'vertical'].includes(val);
      },
      default: 'vertical'
    },
    theme: {
      validator(val) {  // 主题
        return ['light', 'dark', 'primary'].includes(val);
      },
      default: 'light'
    },
    activeName: {  // 激活的name项
      type: [String, Number]
    },
    openNames: { // 打开的name项
      type: Array,
      default() {
        return []
      }
    },
    accordion: { // 是否手风琴
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '240px'
    }
  },
  data() {
    return {
      currentActiveName: this.activeName,
      openedNames: []
    }
  },
  computed: {
    classes() {
      if(this.mode === 'vertical' && this.theme === 'primary') {
        this.theme = 'light';
      }
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.theme}`,
        {
          [`${prefixCls}-${this.mode}`]: !!this.mode
        }
      ]
    },
    styles() {
      const style = {};
      if(this.mode === 'vertical') {
        style.width = this.width;
      }
      return style;
    }
  },
  mounted() {
    this.updateActiveName();
    this.openedNames = [...this.openNames];
    this.updateOpened();
    this.$on('on-menu-item-select', name => {
      this.currentActiveName = name;
      this.$emit('on-select', name);
    })
  },
  methods: {
    updateActiveName() {
      if(this.currentActiveName === undefined) {
        this.currentActiveName = -1;
      }
      this.broadcast('Submenu', 'on-update-active-name', false);
      this.broadcast('MenuItem', 'on-update-active-name', this.currentActiveName);
    },
    updateOpenKeys(name) {
      if(this.accordion) {
        findComponentsDownward(this, 'Submenu').forEach(item => {
          item.opened = false;
        });
      }
      if(this.openedNames.includes(name)) {
        let currentSubmenu = null;
        findComponentsDownward(this, 'Submenu').forEach(item => {
          if(item.name === name) {
            currentSubmenu = item;
            item.opened = false;
          }
        });
        findComponentsUpward(currentSubmenu, 'Submenu').forEach(item => {
          item.opened = true;
        });
        findComponentsDownward(currentSubmenu, 'Submenu').forEach(item => {
          item.opened = false;
        });
      } else {
        if(this.accordion) {
          let currentSubmenu = null;
          findComponentsDownward(this, 'Submenu').forEach(item => {
            if(item.name === name) {
              currentSubmenu = item;
              item.opened = true;
            }
          });
          findComponentsUpward(currentSubmenu, 'Submenu').forEach(item => {
            item.opened = true;
          });
        } else {
          findComponentsDownward(this, 'Submenu').forEach(item => {
            if(item.name === name) {
              item.opened = true;
            }
          });
        }
      }
      const openedNames = findComponentsDownward(this, 'Submenu')
        .filter(item => item.opened)
        .map(item => item.name);
      this.openedNames = openedNames;
      this.$emit('on-open-change', openedNames);
    },
    updateOpened() {
      const items = findComponentsDownward(this, 'Submenu');
      if(items.length) {
        items.forEach(item => {
          if(this.openedNames.includes(item.name)) {
            item.opened = true;
          } else {
            item.opened = false;
          }
        })
      }
    },
    handleEmitSelectEvent(name) {
      this.$emit('on-select', name);
    }
  },
  watch: {
    openNames(names) {
      this.openedNames = names;
    },
    activeName(val) {
      this.currentActiveName = val;
    },
    currentActiveName() {
      this.updateActiveName();
    }
  }
}
</script>
