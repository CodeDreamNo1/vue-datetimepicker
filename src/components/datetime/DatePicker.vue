<template>
  <div class="mo-datepicker">
    <mo-picker v-model="show">
      <label class="mo-datepicker__toggle" slot="toggle">
        <input type="text" class="mo-input" v-model.trim="date" />
      </label>
      <div class="mo-datepicker__picker">
        <div class="mo-datepicker__body">
          <mo-date v-model="date" @onChange="onChange" />
        </div>
        <div class="mo-datepicker__foot">
          <button type="button" class="mo-btn mo-btn--text" @click.stop="cancel">取消</button>
          <button type="button" class="mo-btn mo-btn--plain" @click.stop="ensure">确实</button>
        </div>
      </div>
    </mo-picker>
  </div>
</template>
<script>
  import MoPicker from '../picker/'
  import MoDate from './Date'
  export default {
    name: 'mo-datepicker',
    components: {
      MoPicker,
      MoDate
    },
    props: {
      //默认值
      value: [String, Number, Date],

      //最小日期
      min: [String, Number, Object],

      //最大日期
      max: [String, Number, Object],
    },
    data() {
      return {
        show: false,
        date: this.value,
        original : this.value
      }
    },
    methods: {
      cancel() {
        this.show = false
        this.date = this.value
      },
      ensure() {
        if (!this.date) {
          this.date = new Date()
        }
        this.$emit('input', this.date)
        this.show = false
      },
      onChange(date) {
        this.date = date
      }
    },
    watch : {
      value () {
        this.date = this.value
      },
      show () {
        if (!this.show) {
          this.cancel()
        }
      }
    }
  }

</script>

