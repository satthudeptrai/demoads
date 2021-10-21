<template>
  <div>
    <el-drawer
      class="drawer-style1"
      :visible.sync="showDraw"
      direction="btt"
      :with-header="false"
      size="472px"
      :wrapperClosable="false"
    >
      <div class="mt-4">
        <div class="icon-mobile1"></div>
      </div>
      <div class="ml-16 mr-16">
        <div
          class="mt-8"
          style="display: flex; box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1); height: 40px"
        >
          <i @click="close()" class="el-icon-close bold f-20"></i>
          <div style="text-align: center; width: 304px">
            <b class="f-16">Ngày đặt sẵn</b>
          </div>
        </div>
        <div class="radio-type4 color-1">
          <el-radio-group v-model="dateValue" key-value="id" @change="choose()">
            <el-radio v-for="item in dateList" :key="item.id" :label="item">
              <div>{{ item.label }}</div>
              <div class="f-12 color-5 mt-3">{{ item.value }}</div>
            </el-radio>
          </el-radio-group>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
const day = new Date()
const yesterday = new Date()
const day7 = new Date()
const day30 = new Date()
const startWeek = new Date()
const endWeek = new Date()
const startMonth = new Date()
const endMonth = new Date()
yesterday.setDate(day.getDate() - 1)
day7.setDate(day.getDate() - 7)
day30.setDate(day.getDate() - 30)
startWeek.setDate(day.getDate() - day.getDay())
endWeek.setDate(startWeek.getDate() + 6)
startMonth.setDate(1)
endMonth.setMonth(day.getMonth() + 1)
endMonth.setDate(0)
export default {
  name: 'chooseDate',
  props: {
    showDraw: {
      required: true,
      type: Boolean,
      default: false
    },
    value: {
      required: true,
      type: Object
    }
  },
  watch: {
    value (val) {
      this.dateValue = val
    }
  },
  data () {
    return {
      dateValue: {
        id: null,
        label: '',
        value: ''
      },
      dateList: [
        {
          id: 1,
          label: 'Trọn đời',
          value: ''
        },
        {
          id: 2,
          label: 'Hôm nay',
          value: day.getDate() + ' tháng ' + (day.getMonth() + 1)
        },
        {
          id: 3,
          label: 'Hôm qua',
          value: yesterday.getDate() + ' tháng ' + (yesterday.getMonth() + 1)
        },
        {
          id: 4,
          label: '7 ngày qua',
          value: day7.getDate() + ' tháng ' + (day7.getMonth() + 1) + ' - ' + day.getDate() + ' tháng ' + (day.getMonth() + 1)
        },
        {
          id: 5,
          label: '30 ngày qua',
          value: day30.getDate() + ' tháng ' + (day30.getMonth() + 1) + ' - ' + day.getDate() + ' tháng ' + (day.getMonth() + 1)
        },
        {
          id: 6,
          label: 'Tuần này',
          value: startWeek.getDate() + ' tháng ' + (startWeek.getMonth() + 1) + ' - ' + endWeek.getDate() + ' tháng ' + (endWeek.getMonth() + 1)
        },
        {
          id: 7,
          label: 'Tháng này',
          value: startMonth.getDate() + ' tháng ' + (startMonth.getMonth() + 1) + ' - ' + endMonth.getDate() + ' tháng ' + (endMonth.getMonth() + 1)
        },
        {
          id: 8,
          label: 'Khoảng ngày tùy chỉnh',
          value: ''
        }
      ]
    }
  },
  methods: {
    close () {
      this.$emit('closeDrawDate', { type: 1 })
    },
    choose () {
      this.$emit('closeDrawDate', { type: 2, value: this.dateValue })
    }
  }
}
</script>

<style></style>
