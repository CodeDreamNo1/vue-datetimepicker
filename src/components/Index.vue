<template>
  <div class="hello">
   <mo-date />
  </div>
</template>

<script>
import MoDate from './datetime/Date'
export default {
  name: 'HelloWorld',
  components : {
    MoDate
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
