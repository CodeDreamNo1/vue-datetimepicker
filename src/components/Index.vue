<template>
  <div class="hello">
    <div class="demo">
      <mo-date />
    </div>
     <div class="demo">
      <mo-date-picker v-model="date" />
    </div>
    <div class="demo">
      <mo-time />
    </div>
    <div class="demo">
        <mo-time-picker />
      </div>
      <div class="demo">
          <mo-datetime-picker v-model="today" :min="minDate"/>
        </div>
  </div>
</template>

<script>
import MoDate from './datetime/Date'
import MoDatePicker from './datetime/DatePicker'
import MoTime from './datetime/Time'
import MoTimePicker from './datetime/TimePicker'
import MoDatetimePicker from './datetime/DateTimePicker'
export default {
  name: 'Demo',
  components : {
    MoDate,
    MoDatePicker,
    MoTime,
    MoTimePicker,
    MoDatetimePicker
  },
  data () {
    return {
      date : '2018-02-05',
      msg: 'Welcome to Your Vue.js App',
      today : '123',
      minDate : new Date()
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.demo {
  width: 25%;
  display: inline-block;
  padding: 50px;
  vertical-align: top;
}
</style>

