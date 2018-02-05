import fecha from './fecha'


/**
 * 补零
 * @param  {Number} number  被操作数
 * @param  {Number} figures 位数
 * @returns {String}  
 */
const fillZero = (number, figures = 2) => {
  let str = String(number)
  const chars = str.length
  const diff = figures - chars
  let zero = ''
  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      zero += '0'
    }
  }
  return zero + str
}


/**
 * 获取一个日期实例
 * @param  {Any} date
 * @return {Object}
 */
const parseDate = date => {
  //Date Object
  if (date instanceof Date)
    return date

  //Number
  if (/^\d+$/.test(date))
    return new Date(parseInt(date, 10))

  if (typeof date !== 'string') {
    return new Date()
  }  

  date = date.trim()
    .replace(/\.\d+/, '')
    .replace(/-/g, '/')
    .replace(/T/, ' ')
    .replace(/Z/, ' UTC')
    .replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2')
  return new Date(date)
}


const isDate = date => {
  if (date === null || date === void 0) return false
  if (isNaN(parseDate(date).getTime())) return false
  return true
}


const toDate = function(date) {
  return isDate(date) ? new Date(date) : null
}

const formatDate = function(date, format, i18n) {
  date = toDate(date)
  if (!date) return ''
  return fecha.format(date, format || 'yyyy-MM-dd', i18n)
}

const parseDateByFormat = function(string, format, i18n) {
  return fecha.parse(string, format || 'yyyy-MM-dd', i18n)
}



/**
 * 获取一个日期map对象
 * @param {Any} date 
 */
const getDateMap = date => {
  date = parseDate(date)
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    millisecond: date.getMilliseconds()
  }
}

/**
 * 获取每月的1号是星期几
 * @param {Number} year 
 * @param {Number} month
 * @returns {Number} 
 */
const getFirstDayInMonth = (year, month) => new Date(year, month, 1).getDay()


/**
 * 获取指定月份有多少天
 * @param  {Number} year  
 * @param  {Number} month 
 * @return {Number}     
 */
const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate()


/**
 * 根据日期获取星期
 * @param {Number} year 
 * @param {Number} month 
 * @param {Number} day
 * @returns {Number} 
 */
const getWeekByDate = (year, month, day) => new Date(year, month, day).getDay()


export {
  fillZero,
  parseDate,
  getDateMap,
  getFirstDayInMonth,
  getDaysInMonth,
  getWeekByDate,
  formatDate,
  parseDateByFormat
}
