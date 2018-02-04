<template>
  <div class="hello">
    <div class="demo">
      <mo-date />
    </div>
     <div class="demo">
      <mo-date-picker v-model="date" />
    </div>
  </div>
</template>

<script>
import MoDate from './datetime/Date'
import MoDatePicker from './datetime/DatePicker'
export default {
  name: 'Demo',
  components : {
    MoDate,
    MoDatePicker
  },
  data () {
    return {
      date : '2018-02-05',
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.demo {
  padding: 50px;
}
</style>

