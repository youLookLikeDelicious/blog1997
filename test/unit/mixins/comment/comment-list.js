import CommentList from '~/mixins/comment/comment-mixin'

// eslint-disable-next-line camelcase
const root_id = 9
describe('test comment mixin', () => {
  it('test', async () => {
    function Mixin () {

    }
    const $initFormula = jest.fn()
    const $axios = {
      get: jest.fn()
        .mockReturnValueOnce(Promise.resolve({ data: { data: '' } }))
        .mockReturnValueOnce(Promise.resolve({ data: { data: [{ root_id }] } }))
    }
    const records = [1, 2, 3]

    const wrappedMixin = Object.assign(
      {},
      CommentList.methods,
      { $axios, $initFormula, commented: 10, records }
    )

    Mixin.prototype = wrappedMixin

    const instance = new Mixin()
    // 1、测试删除 level = 1的评论
    instance.deleteComment({ level: 1, commentIndex: 1, affectRows: 1 })
    expect(instance.commented).toBe(9)
    expect(instance.records).toEqual(expect.arrayContaining([1, 3]))
    // 2、测试删除level !== 1的评论
    instance.records = [
      {
        id: root_id,
        replies: [
          { id: 3 },
          { id: 2 }
        ]
      }
    ]
    instance.deleteComment({ level: 2, commentIndex: 0, affectRows: 1, commentId: 2 })
    expect(instance.commented).toBe(8)
    expect(instance.records[0].replies.length).toBe(1)
    expect(instance.records[0].replies[0].id).toBe(3)

    // 测试 追加 回复
    // 1、无返回结果
    instance.getMoreReply({ rootId: 'rootId', offset: 'offset' })
    expect(instance.$axios.get).toHaveBeenCalledWith(`comment/reply/rootId/offset`)

    // 2、有返回结果
    await instance.getMoreReply({ rootId: 'rootId', offset: 'offset' })
    expect(instance.records[0].replies.length).toBe(2)
    expect(instance.records[0].replies[1].root_id).toBe(root_id)

    // 3、isNew = true
    instance.appendReply([{ root_id, id: 'station 3' }], true)
    expect(instance.commented).toBe(9)
    expect(instance.records[0].replies.length).toBe(3)
    expect(instance.records[0].replies[2].id).toBe('station 3')
  })
})
