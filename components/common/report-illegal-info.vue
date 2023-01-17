<template>
  <dialogSlot width="54rem" :height="height" :title="title">
    <div class="report-illegal-article">
      <ul class="report-illegal-reason">
        <li v-for="(reason, index) in reasons" :key="index">
          <label><input v-model="reportModel.reason" name="reason" :value="reason" type="radio">{{ reason }}</label>
        </li>
      </ul>
      <textarea v-model="reportModel.content" class="illegal-report-textarea" placeholder="是什么让您忍受到如此地步（选填）" />
      <div>
        <a href="/" class="submit-btn color-white float-right" @click.prevent @click="report">提交</a>
      </div>
    </div>
  </dialogSlot>
</template>

<script>
import dialogSlot from '~/slot/dialog/dialog'
import { reportIllegalInfo } from '~/api/system'
import reportType from '~/config/const/mailbox-map/index'
import { reportReason } from '~/config/const/report-illegal-info/index'

export default {
  name: 'ReportIllegalInfo',
  components: {
    dialogSlot
  },
  data () {
    return {
      reportModel: {
        reason: '',
        content: ''
      },
      reasons: '',
      title: '',
      height: '28rem'
    }
  },
  computed: {
    reportFor () {
      return this.$store.state.reportIllegalInfo.for
    }
  },
  created () {
    switch (this.reportFor) {
      case 'article':
        this.reasons = reportReason.forArticle
        this.title = '举报文章'
        this.height = '28rem'
        this.reportModel.reason = this.reasons[0]
        break
      case 'comment':
        this.reasons = reportReason.forComment
        this.title = '举报评论'
        this.height = '40rem'
        this.reportModel.reason = this.reasons[0]
        break
    }
  },
  methods: {
    /**
     * 提交举报信息
     */
    report () {
      const postData = {}
      postData.sender = this.$currentUser().id
      postData.receiver = 0
      postData.type = this.reportFor
      postData.content = `${this.$store.state.reportIllegalInfo.preDefinedContent},${this.reportModel.reason},${this.reportModel.content}`
      postData.reported_id = this.$store.state.reportIllegalInfo.reportedId

      reportIllegalInfo(postData)
        .then(() => {
          this.$children[0].close()
        })
    }
  }
}
</script>

<style lang="scss">
.report-illegal-article{
  padding: 1rem 2rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  textarea{
    margin: 2rem auto;
    padding: .7rem .3rem;
    width: 100%;
    height: 45%;
    outline: none;
    display: block;
    box-sizing: border-box;
  }
}
.report-illegal-reason{
    list-style: none;
    width: 52rem;
    box-sizing: border-box;
    li{
        width: 15rem;
        height: 3rem;
        box-sizing: border-box;
        display: inline-block;
        padding: .7rem 1.2rem .7rem 0;
        input{
            display: inline;
            margin-right: .3rem;
        }
    }
}
</style>
