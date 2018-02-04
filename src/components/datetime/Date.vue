<template>
  <div class="mo-date">
    <div class="mo-date__head">
      <a class="head-btn" :class="{'mo-date--disabled' : minYear}" @click.stop="prevYear">
        <i class="mo-icon-arrow-left"></i>
      </a>
      <a class="head-btn" :class="{'mo-date--disabled' : minYear && date.month === 1}" @click.stop="prevMonth" v-show="tab === 'date'">
        <i class="mo-icon-left"></i>
      </a>
      <div class="head-labels">
        <a class="head-label" v-if="tab === 'year'" @click="togglePanel('date')">
          {{tenYears[0]}}{{lang.unit.year}} - {{tenYears[9]}}{{lang.unit.year}}
        </a>
        <a class="head-label" v-else @click="togglePanel('year')">
          {{date.year}}{{lang.unit.year}}
        </a>
        <a class="head-label" v-show="tab === 'date'" @click="togglePanel('month')">
          {{date.month}}{{lang.unit.month}}
        </a>
      </div>
      <a class="head-btn" :class="{'mo-date--disabled' : maxYear && date.month === 12}" @click.stop="nextMonth" v-show="tab === 'date'">
        <i class="mo-icon-right"></i>
      </a>
      <a class="head-btn" :class="{'mo-date--disabled' : maxYear}" @click.stop="nextYear">
        <i class="mo-icon-arrow-right"></i>
      </a>
    </div>
    <div class="mo-date__body">
      <!-- year panel -->
      <div class="mo-date__pane" v-show="tab === 'year'">
        <ul class="mo-date__row mo-date__years">
          <li class="mo-date__col mo-date__year" :class="{'mo-date--actived' : year === date.$year, 'mo-date--disabled' : isDisabledYear(year)}" v-for="year in tenYears" :key="year" @click="setYear(year)">
            <span>{{year}}{{lang.unit.year}}</span>
          </li>
        </ul>
      </div>
      <!-- month panel -->
      <div class="mo-date__pane" v-show="tab === 'month'">
        <ul class="mo-date__row mo-date__months">
          <li class="mo-date__col mo-date__month" :class="{'mo-date--actived' : date.year === date.$year && (index+1) === date.$month,  'mo-date--disabled' : isDisabledMonth(index+1)}" v-for="(month, index) in lang.months" :key="month" @click="setMonth(index+1)">
          <span>{{month}}</span>
        </li>
        </ul>
      </div>
      <!-- date panel -->
      <div class="mo-date__pane" v-show="tab === 'date'">
        <ul class="mo-date__row mo-date__weeks">
          <li class="mo-date__col mo-date__week" v-for="(week, index) in lang.weeks" :key="index">
            <span>{{week}}</span>
          </li>
        </ul>
        <ul class="mo-date__row mo-date__dates">
          <li class="mo-date__col mo-date__date" v-for="(date, index) in dates" :key="index" :class="{'date-prev' : date.prevMonth, 'date-next' : date.nextMonth , 'date-today' : date.isToday,'mo-date--actived' : date.actived, 'mo-date--disabled' : date.disabled}" @click="setDate(date)">
            <span>{{date.date}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import DateMixins from './mixins/date'
  export default {
    mixins: [DateMixins]
  }

</script>

