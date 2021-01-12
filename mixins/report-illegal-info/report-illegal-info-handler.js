export default {
  methods: {
    /**
     * 鼠标移入举报容器事件
     * @param $event {window.event}
     */
    showReportBtn ($event) {
      // 如果用户没有登陆，不显示
      if (!this.$currentUser()) {
        return
      }
      // 获取warning按钮
      const warningBtn = $event.target.querySelector('.icofont-warning')
      if (warningBtn.style.display !== 'inline') {
        warningBtn.style.display = 'inline'
      }
    },
    /**
     * 鼠标移除举报容器事件
     * @param $event {window.event}
     */
    hidReportBtn ($event) {
      if (!this.$currentUser()) {
        return
      }
      const warningBtn = $event.target.querySelector('.icofont-warning')
      if (warningBtn.style.display !== 'none') {
        warningBtn.style.display = 'none'
      }
    }
  }
}
