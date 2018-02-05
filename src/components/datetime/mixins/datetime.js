import * as Moment from '../utils/moment'

//默认语言包
import defaultsLocal from './lang'

export default {
  props: {
    value: {},
    min: {},
    max: {},
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    //允许自定义预言包传入，方便修改语言
    locals: {
      type: Object,
      default () {
        return defaultsLocal
      }
    },
    //格式化
    format: {
      type: String,
      default: 'yy-MM-dd HH:mm:ss'
    }
  },
  data() {
    return {
      datetime: '',
      date: '',
      time: '',
      originalDate: '',
      originalTime: '',
      minDate: '',
      maxDate: '',
      show: false,
      timeShow: false,
      lang: Object.assign({}, defaultsLocal, this.locals),
    }
  },
  methods: {
    moment() {
      const map = this.getDateObj(new Date())
      this.date = this.originalDate = map.date
      this.time = this.originalTime = map.time
      this.ensure()
    },
    ensure() {
      if (this.disabled) {
        this.show = false
        return
      }
      if (!this.date || !this.time) {
        const map = this.getDateObj(new Date())
        if (!this.date) {
          this.date = this.originalDate = map.date
        }
        if (!this.time) {
          this.time = this.originalTime = map.time
        }
      }
      const datetime = Moment.formatDate(this.date + ' ' + this.time, this.format, this.lang)
      this.$emit('input', datetime)
      this.show = false
    },
    timeCancel() {
      this.time = this.originalTime
      this.timeShow = false
    },

    timeEnsure() {
      this.originalTime = this.time
      this.timeShow = false
    },

    getDateObj(value) {
      if (!value) {
        return
      }
      let date = '',
        time = '',
        datetime = ''
      try {
        if (typeof value === 'string') {
          value = Moment.parseDateByFormat(value, this.format, this.lang)
        }

        const map = Moment.getDateMap(value)
        date = [map.year, Moment.fillZero(map.month), Moment.fillZero(map.date)].join('-')
        time = [Moment.fillZero(map.hour), Moment.fillZero(map.minute), Moment.fillZero(map.second)].join(':')
        datetime = Moment.formatDate(date + ' ' + time, this.format, this.lang)
      } catch (e) {
        throw new Error(e)
      }
      return {
        date,
        time,
        datetime
      }
    },

    setValue() {
      const map = this.getDateObj(this.value)
      if (map) {
        this.date = this.originalDate = map.date
        this.time = this.originalTime = map.time
      }

      if (this.minDate && this.date < this.minDate) {
        this.date = this.minDate
      }
      if (this.maxDate && this.date > this.maxDate) {
        this.date = this.maxDate
      }
      this.datetime = Moment.formatDate(this.date + ' ' + this.time, this.format, this.lang)
    },

    setMinMax() {
      if (this.min) {
        const map = this.getDateObj(this.min)
        this.minDate = map.date
      }
      if (this.max) {
        const map = this.getDateObj(this.max)
        this.maxDate = map.date
      }
    },
    onTimeHide() {
      if (!this.timeShow) {
        this.timeCancel()
      }
    },
    onTimeShow() {

    },
    onDateTimeChange() {
      if (this.readonly || this.disabled)
        return
      const datetime = this.getDateObj(this.datetime)
      this.datetime = datetime.datetime
      this.date = datetime.date
      this.time = datetime.time
      this.ensure()
    }
  },
  mounted() {
    this.setMinMax()
    this.setValue()
  },
  watch: {
    value() {
      this.setValue()
    },
    min() {
      this.setMinMax()
    },
    max() {
      this.setMinMax()
    },
    date() {
      //originalDate暂时没有取消操作，和date保持一致即可
      this.originalDate = this.date
      if (this.date && !this.time) {
        const map = this.getDateObj(new Date())
        this.time = this.originalTime = map.time
      }
    },
    time() {
      if (this.time && !this.date) {
        const map = this.getDateObj(new Date())
        this.date = this.originalDate = map.date
      }
    },
    show() {
      this.timeShow = false
    },
    locals() {
      this.lang = Object.assign({}, defaultsLocal, this.locals)
    },
  }
}
