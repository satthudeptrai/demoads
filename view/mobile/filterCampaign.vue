<template>
  <el-drawer
    class="drawer-style1"
    :visible.sync="showDraw"
    direction="btt"
    :with-header="false"
    size="472px"
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
          <b class="f-16">Lọc chiến dịch</b>
        </div>
      </div>
      <div class="radio-type5 color-1">
        <el-radio-group v-model="filterValue" key-value="id" @change="choose()">
          <el-radio v-for="item in filterList" :key="item.id" :label="item">
            {{ item.value }}
          </el-radio>
        </el-radio-group>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'filterCampaign',
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
      this.filterValue = val
    }
  },
  data () {
    return {
      filterValue: {
        id: null,
        value: 'Bộ lọc'
      },
      filterList: [
        {
          id: 1,
          value: 'Hoạt động'
        },
        {
          id: 2,
          value: 'Đã lên lịch'
        },
        {
          id: 3,
          value: 'Đang xét duyệt'
        },
        {
          id: 4,
          value: 'Không được phê duyệt'
        },
        {
          id: 5,
          value: 'Hoàn tất'
        },
        {
          id: 6,
          value: 'Đã hoàn tất gần đây'
        },
        {
          id: 7,
          value: 'Không hoạt động'
        },
        {
          id: 8,
          value: 'Không phân phối'
        },
        {
          id: 9,
          value: 'Đã xóa'
        }
      ]
    }
  },
  methods: {
    close () {
      this.$emit('closeDrawFilter', { type: 1 })
    },
    choose () {
      this.$emit('closeDrawFilter', { type: 2, value: this.filterValue })
    }
  }
}
</script>

<style></style>
