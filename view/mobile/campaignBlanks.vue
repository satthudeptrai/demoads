<template>
  <div>
    <el-dialog
        class="dialog-type2"
        :visible.sync="isShowBlank"
        :fullscreen="true"
        :show-close="false">
        <div slot="title" class="ver-align">
            <i @click="close()" class="fas fa-angle-left mr-25 f-20"></i>
            <div class="f-16">Chiến dịch</div>
        </div>
        <div class="flex-between mt-14 pb-14" style="box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);">
            <div class="ml-16">
                {{ item.status ? 'Active' : 'Inactive' }}
            </div>
            <div class="mr-16">
                <el-switch
                    v-model="item.status"
                    active-color="#FF5F0B">
                </el-switch>
            </div>
        </div>
        <div class="mt-16 ml-18 mr-19 color-5">
            <div class="flex-between" style="align-items: start;">
                <div style="display: flex">
                    <i class="fas fa-folder mr-10 color-2" style="line-height: 150%;"></i>
                    <div class="f-16" style="width: 268px">
                        <b class="color-1">Chiến dịch 1</b>
                        <div style="word-break: break-word;">Xây dựng hệ thống marketing khép kín cho nhà hàng</div>
                        <div style="display: flex" class="mt-8">
                            <i class="fas fa-border-all mr-11" style="line-height: 150%;"></i>
                            <div>
                                <div class="f-16"><b class="color-1">1 Ad set</b></div>
                                <div style="display: flex" class="mt-8">
                                    <i class="fas fa-border-all mr-11" style="line-height: 150%;"></i>
                                    <div>
                                        <div class="f-16"><b class="color-1">1 Ad</b></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div><i class="fas fa-pen"></i></div>
            </div>
            <div class="flex-between mt-16" style="align-items: start;">
                <div style="display: flex">
                    <i class="fas fa-warehouse mr-10 color-2" style="line-height: 150%;"></i>
                    <div class="f-16" style="width: 268px">
                        <div class="color-1 mb-2">
                            <b>Special Ad Category</b>
                        </div>
                        <div style="word-break: break-word;">None</div>
                    </div>
                </div>
                <div><i class="fas fa-pen"></i></div>
            </div>
            <div class="flex-between mt-16" style="align-items: start;">
                <div style="display: flex">
                    <i class="fas fa-newspaper mr-10 color-2" style="line-height: 150%;"></i>
                    <div class="f-16" style="width: 268px">
                        <div class="color-1 mb-2">
                            <b>Budger and Schedule</b>
                        </div>
                        <div style="word-break: break-word;">None</div>
                    </div>
                </div>
                <div><i class="fas fa-pen"></i></div>
            </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'blanks',
  props: {
    isShowBlank: {
      required: true,
      type: Boolean,
      default: false
    },
    itemCampaign: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      item: {
        isTrue: false,
        name: '',
        status: true,
        title1: '',
        number1: null,
        title2: '',
        number2: null,
        title3: '',
        number3: null,
        linkImg: ''
      }
    }
  },
  watch: {
    itemCampaign (value) {
      this.item = JSON.parse(JSON.stringify({ ...value }))
    }
  },
  methods: {
    close () {
      this.$emit('closeBlank', { data: this.item })
    }
  }
}
</script>

<style>

</style>
