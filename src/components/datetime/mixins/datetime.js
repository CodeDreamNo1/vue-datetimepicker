import * as Moment from './moment'

export default {
  props: {
    value: {},
    min: {},
    max: {},
    readonly : {
      type : Boolean,
      default : true
    },
    disabled : Boolean
  },
  data() {
    return {
      datetime : '',
      date: '',
      time: '',
      originalDate : '',
      originalTime : '',
      minDate : '',
      maxDate : '',
      show: false,
      timeShow: false
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
      if (!this.date || !this.time) {
        const map = this.getDateObj(new Date())
        if (!this.date) {
          this.date = this.originalDate = map.date
        }
        if (!this.time) {
          this.time = this.originalTime = map.time
        }
      }
      this.$emit('input', this.date + ' ' + this.time)
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

    getDateObj (value) {
      if (!value) {
        return
      }
      let date = '', time = '', datetime = ''
      try {
        const map = Moment.getDateMap(value)
        date = [map.year, Moment.fillZero(map.month), Moment.fillZero(map.date)].join('-')
        time = [Moment.fillZero(map.hour),Moment.fillZero(map.minute),Moment.fillZero(map.second)].join(':')
        datetime = date + ' ' + time
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
        this.datetime = map.datetime
      }
    },

    setMinMax () {
      if (this.min) {
        const map = this.getDateObj(this.min)
        this.minDate = map.date
      }
      if (this.max) {
        const map = this.getDateObj(this.max)
        this.maxDate = map.date
      }
    },
    onTimeHide () {
      if (!this.timeShow) {
        this.timeCancel()
      }
    },
    onTimeShow () {

    }
  },
  mounted () {
    this.setValue()
  },
  watch : {
    value () {
      this.setValue()
    },
    min () {
      this.setMinMax()
    },
    max () {
      this.setMinMax()
    },
    date () {
      //originalDate暂时没有取消操作，和date保持一致即可
      this.originalDate = this.date
      if (this.date && !this.time) {
        const map = this.getDateObj(new Date())
        this.time = this.originalTime = map.time
      }
    },
    time () {
      if (this.time && !this.date) {
        const map = this.getDateObj(new Date())
        this.date = this.originalDate = map.date
      }
    },
    show () {
      this.timeShow = false
    }
  }
}