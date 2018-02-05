import * as Moment from '../utils/moment'

const TIME_REG = /^(\d{1,2})(\:(\d{1,2}))?(\:(\d{1,2}))?$/
export default {
  name : 'mo-time',
  props : {
    value : {},
    //格式化
    format : {
      type : String,
      default : 'hh:mm:ss'
    }
  },
  data () {
    return {
      time : {
        hour : '',
        minute : '',
        second : ''
      }
    }
  },
  methods : {
    fillZero : Moment.fillZero,
    setValue () {
      let [hour, minute, second] = ['', '', '']
      if (this.value) {
        if (typeof this.value === 'string') {
          const match = this.value.match(TIME_REG)
          if (match) {
            hour = Number(match[1] || 0)
            minute = Number(match[3] || 0)
            second = Number(match[5] || 0)
          }
        } else {
          try {
            const map = Moment.getDateMap(this.value)
            hour = map.hour
            minute = map.minute
            second = map.second
          } catch (e) { }
        }
        hour = hour > 0 ? (hour >= 24 ? 23 : hour) : 0
        minute = minute > 0 ? (minute >= 59 ? 59 : minute) : 0
        second = second > 0 ? (second >= 59 ? 59 : second) : 0
      }
      this.time = {
        hour,
        minute,
        second 
      }
      this.scroll()
    },
    setTime (type, value) {
      this.time[type] = Number(value)
      const now = new Date()
      this.time['hour'] =  this.time['hour'] === '' ?  now.getHours() : this.time['hour']
      this.time['minute'] =  this.time['minute'] === '' ? now.getMinutes() : this.time['minute']
      this.time['second'] =  this.time['second'] === '' ? now.getSeconds() : this.time['second']
      const time = [Moment.fillZero(this.time.hour), Moment.fillZero(this.time.minute), Moment.fillZero(this.time.second)].join(':')
      const activeTime = Moment.formatDate(`1900-01-01 ${time}`, this.format)
      this.$emit('onChange', activeTime)
      this.$emit('input', activeTime)
      this.scroll(type)
    },
    scroll(exclude) {
      const {hour, minute, second} = this.time
      const {hour : $hour, minute : $minute, second : $second} = this.$refs
      const height = ($hour || $minute || $second).querySelector('li').offsetHeight || 30
      exclude !== 'hour' && $hour && ($hour.scrollTop = (hour - 2) * height)
      exclude !== 'minute' && $minute && ($minute.scrollTop = (minute - 2) * height)
      exclude !== 'second' && $second && ($second.scrollTop = (second - 2) * height)
    },
  },
  mounted () {
    this.setValue()
  },
  watch : {
    value () {
      this.setValue()
    }
  }
}