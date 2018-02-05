let zIndex = 19900206

const getZIndex = () => ++zIndex

/**
 * 获取元素计算后的样式
 * @param {Element} el
 * @returns {Object} 
 */
const getStyles = el => el.ownerDocument.defaultView.getComputedStyle(el, null)

/**
 * 获取元素的rect信息
 * @param {Element} el 
 * @returns {Object} 
 */
const getRect = function (el) {
  const rect = el.getBoundingClientRect()
  const win = el.ownerDocument.defaultView
  rect.offset = {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  }
  return rect
}


/**
 * 获取隐藏元素的rect信息
 * @param {Element} el 
 * @returns {Object} 
 */
const getHideElSize = el => {
  const {
    display,
    visibility,
    position,
    zIndex
  } = getStyles(el)
  el.style.display = 'block'
  el.style.visibility = 'hidden'
  el.style.position = 'absolute'
  el.style.zIndex = -1
  const width = el.offsetWidth, height = offset.offsetHeight
  el.style.display = display
  el.style.visibility = visibility
  el.style.position = position
  el.style.zIndex = zIndex
  return {
    width,
    height
  }
}





export default {
  name: 'mo-picker',
  props: {
    value : Boolean,
    event: {
      type: String,
      default: 'click'
    },
    margin: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      visible: false,
      handlers: {
        toggleEvent: null,
        outerClickEvent: null
      }
    }
  },
  methods: {
    show() {
      const {
        toggle,
        picker
      } = this.$refs
      const toggleRect = getRect(toggle)
      let top, left
      top = toggleRect.offset.top + toggleRect.height + this.margin
      left = toggleRect.offset.left
      picker.style.cssText += `position:absolute;top:${top}px;left:${left}px;z-index:${getZIndex()};`
      this.visible = true
      this.$emit('show')
      this.$emit('input', true)
    },
    hide() {
      this.visible = false
      this.$emit('hide')
      this.$emit('input', false)
    }
  },
  mounted() {
    document.body.appendChild(this.$refs.picker)
    this.handlers.toggleEvent = event => this.visible ? this.hide() : this.show()
    this.handlers.outerClickEvent = event => {
      const target = event.target
      for (let k in this.$refs) {
        if (this.$refs[k] && (target === this.$refs[k] || this.$refs[k].contains(target))) {
          return
        }
      }
      this.hide()
    }

    this.$nextTick(() => {
      this.$refs.toggle.addEventListener(this.event, this.handlers.toggleEvent)
      document.addEventListener('click', this.handlers.outerClickEvent)
      window.addEventListener('resize', this.hide)
    })
  },

  watch : {
    value () {
      this.value ? this.show() : this.hide()
    }
  }


}
