import reportIllegalHandlerMixin from '~/mixins/report-illegal-info/report-illegal-info-handler'

describe('test report illegal info handler', () => {
  it('test', () => {
    function Mixin () {

    }
    const $currentUser = jest.fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
    const wrappedMixin = Object.assign({}, reportIllegalHandlerMixin.methods, { $currentUser })
    Mixin.prototype = Object.create(wrappedMixin)
    /**
     * mock event
     */
    const el = { style: { display: 'block' } }
    const $event = {
      target: {
        querySelector: jest.fn(() => el)
      }
    }
    const instance = new Mixin()

    // 测试 showReportBtn方法
    instance.showReportBtn($event)
    expect($event.target.querySelector).not.toHaveBeenCalled()
    expect(el.style.display).toBe('block')
    instance.showReportBtn($event)
    expect($event.target.querySelector).toHaveBeenCalledWith('.icofont-warning')
    expect(el.style.display).toBe('inline')
    instance.showReportBtn($event)
    expect($event.target.querySelector.mock.calls.length).toBe(2)
    
    // 测试hidReportBtn方法
    instance.hidReportBtn($event)
    expect($event.target.querySelector.mock.calls.length).toBe(2)
    expect(el.style.display).toBe('inline')
    instance.hidReportBtn($event)
    expect($event.target.querySelector.mock.calls.length).toBe(3)
    expect(el.style.display).toBe('none')
    instance.hidReportBtn($event)
    expect($event.target.querySelector.mock.calls.length).toBe(4)
  })
})
