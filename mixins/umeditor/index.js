export default {
  data () {
    return {
      editorContent: ''
    }
  },
  methods: {
    /**
         * 设置富文本的内容
         * @param {string} str
         */
    setEditorContent (str) {
      this.editorContent = str
    }
  }
}
