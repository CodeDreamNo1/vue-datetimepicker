<template>
  <div class="mo-datepicker">
    <mo-picker v-model="show">
      <label class="mo-datepicker__toggle" slot="toggle">
        <input type="text" class="mo-input" v-model.trim="time" />
      </label>
      <div class="mo-datepicker__picker">
        <div class="mo-datepicker__body">
          <mo-time v-model="time" @onChange="onChange" v-if="show"/>
        </div>
        <div class="mo-datepicker__foot">
          <button type="button" class="mo-btn mo-btn--text" @click.stop="cancel">取消</button>
          <button type="button" class="mo-btn mo-btn--plain" @click.stop="ensure">确定</button>
        </div>
      </div>
    </mo-picker>
  </div>
</template>
<script>
  import MoPicker from '../picker/'
  import MoTime from './Time'
  export default {
    name: 'mo-timepicker',
    components: {
      MoPicker,
      MoTime
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
        time: this.value,
      }
    },
    methods: {
      cancel() {
        this.show = false
        this.time = this.value
      },
      ensure() {
        if (!this.time) {
          const now = new Date()
          this.time = [now.getHours(), now.getMinutes(), now.getSeconds()].join(':')
        }
        this.$emit('input', this.time)
        this.show = false
      },
      onChange(time) {
        this.time = time
      }
    },
    watch : {
      value () {
        this.time = this.value
      },
      show () {
        if (!this.show) {
          this.cancel()
        }
      }
    }
  }

</script>

