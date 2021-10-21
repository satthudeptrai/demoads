<template>
  <el-drawer
    class="drawer-style1"
    :visible.sync="showDraw"
    direction="btt"
    :with-header="false"
    size="406px"
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
          <b class="f-16">Trang</b>
        </div>
      </div>
      <div class="radio-type4 color-1" style="overflow: auto; height: 350px">
        <el-radio-group v-model="pageValue" key-value="id" @change="choose()">
          <el-radio v-for="item in listPage" :key="item.id" :label="item">
            <div class="ver-align">
              <img
                style="width: 32px; height: 32px; border-radius: 50%"
                :src="item.linkImg"
                alt=""
              />
              <div class="ml-12">{{ item.name }}</div>
            </div>
          </el-radio>
        </el-radio-group>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'choosePage',
  props: {
    showDraw: {
      required: true,
      type: Boolean,
      default: false
    },
    value: {
      required: true,
      type: Object
    },
    listPage: {
      required: true,
      type: Array
    }
  },
  watch: {
    value (val) {
      this.pageValue = val
    }
  },
  data () {
    return {
      pageValue: {
        id: null,
        name: '',
        linkImg: ''
      }
    }
  },
  methods: {
    close () {
      this.$emit('closeDrawPage', { type: 1 })
    },
    choose () {
      this.$emit('closeDrawPage', { type: 2, value: this.pageValue })
    }
  },
  mounted () {
    this.pageValue = this.listPage[0]
  }
}
</script>

<style></style>
