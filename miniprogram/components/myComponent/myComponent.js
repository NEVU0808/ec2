Component({
  // 组件的属性列表
  properties: {
    // 接收外部传入的属性
    title: {
      type: String,
      value: '默认标题'
    },
    count: {
      type: Number,
      value: 0
    }
  },

  // 组件的初始数据
  data: {
    // 内部数据
    message: '这是组件内部数据',
    showContent: true
  },

  // 组件的方法列表
  methods: {
    // 点击事件处理函数
    handleClick() {
      // 触发自定义事件，通知父组件
      this.triggerEvent('click', {
        count: this.data.count + 1
      });
    },

    // 切换内容显示状态
    toggleContent() {
      this.setData({
        showContent: !this.data.showContent
      });
    }
  },

  // 生命周期函数
  lifetimes: {
    attached() {
      // 组件实例进入页面节点树时执行
      console.log('组件已挂载');
    },
    detached() {
      // 组件实例被从页面节点树移除时执行
      console.log('组件已卸载');
    }
  }
});