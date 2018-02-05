import * as Moment from '../utils/moment'
//默认语言包
import defaultsLocal from './lang'

const MONTH_VIEW_DAYS = 42
const MIN_YEAR = 1900
const MAX_YEAR = 2999

const getDateString = (year, month, date) => [year, Moment.fillZero(month), Moment.fillZero(date)].join('-')

export default {
  name: 'mo-date',
  props: {
    //默认值
    value: {},
    //最小日期
    min: {
      default: '1900-01-01'
    },
    //最大日期
    max: {
      default: '2999-12-31'
    },
    //允许自定义预言包传入，方便修改语言
    locals: {
      type: Object,
      default () {
        return defaultsLocal
      }
    },
    //格式化
    format : {
      type : String,
      default : 'yyyy-MM-dd'
    }
  },
  data() {
    const now = Moment.getDateMap(new Date())
    const today = getDateString(now.year, now.month, now.date)
    return {
      original: Object.create(null),
      date: Object.create(null),
      tab: 'date',
      lang: Object.assign({}, defaultsLocal, this.locals),
      today,
      minDate: Object.create(null),
      maxDate: Object.create(null)
    }
  },
  computed: {

    //返回当前日期面板数据
    dates() {
      const {
        year,
        month,
        date,
        $activeDate
      } = this.date
      const firstDay = Moment.getFirstDayInMonth(year, month - 1)
      const days = Moment.getDaysInMonth(year, month)
      let [i, array, lastMonth, lastYear, nextMonth, nextYear] = [0, [], month - 1, year, month + 1, year]
      const {
        minDate,
        maxDate
      } = this

      if (lastMonth < 1) {
        lastMonth = 12
        lastYear = year - 1
      }
      if (lastYear < MIN_YEAR) {
        lastYear = MIN_YEAR
      }

      if (nextMonth > 12) {
        nextMonth = 1
        nextYear = year + 1
      }

      if (nextYear > MAX_YEAR) {
        nextYear = MAX_YEAR
      }

      const lastMonthDays = Moment.getDaysInMonth(lastYear, lastMonth)

      const push = date => {
        date.fulldate = getDateString(date.year, date.month, date.date)
        date.isToday = !!(date.fulldate == this.today)
        date.week = Moment.getWeekByDate(date.year, date.month - 1, date.date)
        date.$date = Moment.parseDate(date.fulldate)
        date.actived = !!(date.fulldate == $activeDate)

        if ((date.fulldate < minDate.fulldate) || (date.fulldate > maxDate.fulldate)) {
          date.disabled = true
        }
        array.push(date)
      }

      // 上月部分
      for (i = 1; i < firstDay + 1; i++) {
        push({
          year: lastYear,
          month: lastMonth,
          date: lastMonthDays - firstDay + i,
          prevMonth: true,
        })
      }

      //当月部分
      for (i = 1; i < days + 1; i++) {
        push({
          year: year,
          month: month,
          date: i,
          currentMonth: true,
        })
      }

      //下月部分
      let len = firstDay + days,
        nextLen = MONTH_VIEW_DAYS - len
      if (len >= MONTH_VIEW_DAYS) {
        nextLen = len - MONTH_VIEW_DAYS
      }
      for (i = 0; i < nextLen; i++) {
        push({
          year: nextYear,
          month: nextMonth,
          date: i + 1,
          nextMonth: true
        })
      }

      return array
    },

    //获取10年
    tenYears() {
      const {
        year
      } = this.date
      if (!year)
        return []
      const lastChar = Number(year.toString().split('')[3])
      const years = []
      let start = year - lastChar
      let end = year + (9 - lastChar)
      while (end - start) {
        years.push(start)
        start++
      }
      years.push(end)
      return years.sort()
    },

    minYear() {
      return this.date.year === MIN_YEAR
    },

    maxYear() {
      return this.date.year === MAX_YEAR
    },

  },
  methods: {

    //设置初始值
    setValueMap() {
      if (this.value) {
        let value = this.value
        if (typeof value === 'string') {
          value = Moment.parseDateByFormat(value, this.format, this.lang)
        }
        const map = Moment.getDateMap(value)
        this.original = {...map}
        this.date = {...map}
      } else {
        this.original = Object.create(null)
        this.date = Moment.getDateMap(new Date())
      }

      //$开头的为当前初始值
      this.date.$year = this.date.$month = this.date.$date = this.date.$activeDate = ''
      if (this.value) {
        this.date.$year = this.date.year
        this.date.$month = this.date.month
        this.date.$date = this.date.date
        this.date.$activeDate = getDateString(this.date.$year, this.date.$month, this.date.$date)
      }

    },

    //设置最小最大值
    setMinMaxMap() {
      let {min, max} = this 
      if (min && typeof min === 'string') {
        min = Moment.parseDateByFormat(min, this.format, this.lang)
      }
      if (max && typeof max === 'string') {
        max = Moment.parseDateByFormat(max, this.format, this.lang)
      }

      const minDate = this.min ? Moment.parseDate(min) : 0
      const maxDate = this.max ? Moment.parseDate(max) : 0
      let minYear = MIN_YEAR,
        minMonth = 1,
        minDay = 1,
        maxYear = MAX_YEAR,
        maxMonth = 12,
        maxDay = 31
      if (minDate) {
        minYear = Math.max(minDate.getFullYear(), MIN_YEAR)
        minMonth = minDate.getMonth() + 1
        minDay = minDate.getDate()
      }

      if (maxDate) {
        maxYear = Math.max(maxDate.getFullYear(), MAX_YEAR)
        maxMonth = maxDate.getMonth() + 1
        maxDay = maxDate.getDate()
      }

      const _min = getDateString(minYear, minMonth, minDay)
      const _max = getDateString(maxYear, maxMonth, maxDay)
      this.minDate = {
        year: minYear,
        month: minMonth,
        date: minDay,
        fulldate: _min
      }
      this.maxDate = {
        year: maxYear,
        month: maxMonth,
        date: maxDay,
        fulldate: _max
      }
    },

    //上月
    prevMonth() {
      let {
        year,
        month
      } = this.date
      month--
      if (month <= 0) {
        month = 12
        year--
      }
      if (year < MIN_YEAR) {
        year = MIN_YEAR
      }
      this.date.year = year
      this.date.month = month
    },

    //下月
    nextMonth() {
      let {
        year,
        month
      } = this.date
      month++
      if (month > 12) {
        month = 1
        year++
      }
      if (year > MAX_YEAR) {
        year = MAX_YEAR
      }
      this.date.year = year
      this.date.month = month
    },

    //prev 1/10 year
    prevYear() {
      let {
        year
      } = this.date
      if (this.tab === 'year') {
        year -= 10
      } else {
        year--
      }
      if (year < MIN_YEAR) {
        year = MIN_YEAR
      }
      this.date.year = year
    },

    //next 1/10 year
    nextYear() {
      let {
        year
      } = this.date
      if (this.tab === 'year') {
        year += 10
      } else {
        year++
      }
      if (year < MIN_YEAR) {
        year = MIN_YEAR
      }
      this.date.year = year
    },

    /**
     * 指定年份是否禁用
     * @param {Number} year 
     */
    isDisabledYear(year) {
      const {
        minDate,
        maxDate
      } = this
      return year < minDate.year || year > maxDate.year
    },

    /**
     * 指定月份是否禁用
     * @param {Number} month 
     */
    isDisabledMonth(month) {
      const {
        minDate,
        maxDate
      } = this
      const date = getDateString(this.date.year, month, 1)
      return date < minDate.fulldate || date > maxDate.fulldate
    },

    //切换面板
    togglePanel (tab) {
      this.tab = tab
    },

    //设置年
    setYear (year) {
      if (this.isDisabledYear(year)) {
        return 
      }
      year = Number(Number(year))
      this.date.year = year
      this.date.$year = year
      this.togglePanel('month')
    },
    
    //设置月
    setMonth (month) {
      if (this.isDisabledMonth(month)) {
        return
      }
      month = Number(month)
      this.date.month = month 
      this.date.$year = this.date.year
      this.date.$month = month
      this.togglePanel('date')
    },

    //设置当前日期
    setDate (date) {
      if (date.disabled) {
        return
      }
      if (date.date == this.date.$date || date.date === this.date.date) {
        //由于默认值是今天，date值没有更新，这里曲线救国下
        this.date.date = this.date.$date = ''
      }
      this.date.date = this.date.$date = date.date
      this.date.year = this.date.$year = date.year
      this.date.month = this.date.$month = date.month
      this.date.$activeDate = getDateString(date.year, date.month, date.date)
      const activeDate = Moment.formatDate(this.date.$activeDate, this.format, this.lang)
      this.$emit('onChange', activeDate)
      this.$emit('input', activeDate)
     }
  },

  mounted() {
    this.setValueMap()
    this.setMinMaxMap()
  },

  watch: {
    value() {
      this.setValueMap()
    },
    locals() {
      this.lang = Object.assign({}, defaultsLocal, this.locals)
    },
    min() {
      this.setMinMaxMap()
    },
    max() {
      this.setMinMaxMap()
    }
  }
}
