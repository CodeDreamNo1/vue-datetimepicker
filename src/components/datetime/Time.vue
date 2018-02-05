<template>
  <div class="mo-time">
    <div class="mo-time__head"></div>
    <div class="mo-time__body">
      <div class="mo-time__row">
        <ul class="mo-time__col mo-time__items mo-scroller" ref="hour">
          <li class="mo-time__item" :class="{'mo-time--actived' : h-1 === time.hour}" v-for="h in 24" @click="setTime('hour', h-1)">{{fillZero(h - 1)}}</li>
        </ul>
        <ul class="mo-time__col mo-time__items mo-scroller" ref="minute">
          <li class="mo-time__item" :class="{'mo-time--actived' : m-1 === time.minute}" v-for="m in 60" @click="setTime('minute', m-1)">{{fillZero(m - 1)}}</li>
        </ul>
        <ul class="mo-time__col mo-time__items mo-scroller" ref="second">
          <li class="mo-time__item" :class="{'mo-time--actived' : s-1 === time.second}" v-for="s in 60" @click="setTime('second', s-1)">{{fillZero(s - 1)}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import TimeMixin from './mixins/time'
  export default {
    mixins: [TimeMixin]
  }
</script>