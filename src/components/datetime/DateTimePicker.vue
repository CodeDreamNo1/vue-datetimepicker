<template>
  <div class="mo-datetime-picker">
    <mo-picker v-model="show">
      <label class="mo-datetime-picker__toggle" slot="toggle">
        <input type="text" class="mo-input" :readonly="readonly" v-model.trim.lazy="datetime" :disabled="disabled" @change="onDateTimeChange">
      </label>
      <div class="mo-datetime-picker__picker">
        <div class="mo-datetime-picker__head">
          <label class="date-label">
            <input type="text" class="mo-input" v-model="date" readonly :placeholder="lang.selectDate">
          </label>
          <mo-picker class="time-label" v-model="timeShow" @hide="onTimeHide" @show="onTimeShow">
            <label slot="toggle">
              <input type="text" class="mo-input" v-model="time" readonly :placeholder="lang.selectTime">
            </label>
            <div class="mo-timepicker" @click.stop>
              <div class="mo-timepicker__body">
                <mo-time v-model="time" v-if="timeShow"/>
              </div>
              <div class="mo-timepicker__foot">
                <button type="button" class="mo-btn mo-btn--text" @click.stop="timeCancel">{{lang.cancel}}</button>
                <button type="button" class="mo-btn mo-btn--plain" @click.stop="timeEnsure">{{lang.ensure}}</button>
              </div>
            </div>
          </mo-picker>
        </div>
        <div class="mo-datetime-picker__body">
          <mo-date v-model="date" :min="minDate" :max="maxDate" v-if="show"/>
        </div>
        <div class="mo-datetime-picker__foot">
          <button type="button" class="mo-btn mo-btn--text" @click.stop="moment">{{lang.now}}</button>
          <button type="button" class="mo-btn mo-btn--plain" @click.stop="ensure">{{lang.ensure}}</button>
        </div>
      </div>
    </mo-picker>
  </div>
</template>

<script>
  import DateTimeMixin from './mixins/datetime'
  import MoPicker from '../picker/'
  import MoDate from './Date'
  import MoTime from './Time'
  export default {
    name: 'mo-datetime-picker',
    components: {
      MoPicker,
      MoDate,
      MoTime
    },
    mixins : [DateTimeMixin]
  }
</script>