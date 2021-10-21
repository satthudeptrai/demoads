<template>
  <el-dialog
    class="dialog-type2"
    :visible.sync="isShowDialog"
    :fullscreen="true"
    :show-close="false"
  >
    <div slot="title" class="flex-between parent">
      <div class="ver-align" @click="showMenu1 = !showMenu1">
        <i @click="close(1)" class="fas fa-angle-left mr-25 f-20"></i>
        <div class="f-16">
          Chiến dịch mới
          <i class="fas fa-caret-down ml-8"></i>
        </div>
      </div>
      <i @click="showMenu2 = !showMenu2" class="fas fa-ellipsis-v mr-24 f-20"></i>
      <div v-show="showMenu1" class="child bg-2 dropdown-type1">
        <div class="mt-16 mb-7">
          <div class="level level-1">
            <img src="@/icon/svg/campain.svg" alt="">
            <div class="ml-10">Chiến dịch 1</div>
          </div>
          <div class="level level-2">
            <img src="@/icon/svg/adGroup.svg" alt="">
            <div class="ml-10">Nhóm quảng cáo 1</div>
          </div>
          <div class="level level-3">
            <img src="@/icon/svg/ads.svg" alt="">
            <div class="ml-10">Quảng cáo 1</div>
          </div>
        </div>
      </div>
      <div v-show="showMenu2" class="child bg-2 dropdown-type2">
        <div class="ml-12">
          <div>Ta</div>
        </div>
      </div>
    </div>
    <div class="mt-18 ml-16 mr-16">
      <campaign v-if="tab == 1" />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="dialogVisible = false">Đóng</el-button>
      <el-button class="ml-12" size="medium" type="warning" @click="dialogVisible = false">Tiếp tục</el-button>
    </div>
  </el-dialog>
</template>

<script>
import campaign from './campaign'
export default {
  name: 'create',
  props: {
    isShowDialog: {
      required: true,
      type: Boolean,
      default: false
    }
  },
  components: { campaign },
  data () {
    return {
      tab: 1,
      showMenu1: false,
      showMenu2: false
    }
  },
  methods: {
    close(type) {
      this.$emit('closeCreate', { type: type })
    }
  }
}
</script>

<style>

</style>
