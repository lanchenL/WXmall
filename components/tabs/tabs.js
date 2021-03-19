Component({
  data: {},
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },
  methods: {
    // 点击事件
    handleItemTap(e) {
      // 获取索引
      const {index} = e.currentTarget.dataset;
      // 将事件传给父组件，并触发父组件的处理方法
      this.triggerEvent("tabsItemChange", {index});
    }
  }
})