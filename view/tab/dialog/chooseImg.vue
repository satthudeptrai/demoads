<template>
  <div>
    <el-dialog
      class="dialog2"
      :visible.sync="dialog"
      width="1024px"
      top="20px"
      append-to-body
      :before-close="handleClose"
    >
      <div slot="title" class="f-16 ver-align">
        <div class="f-16 color-4"><b>Chọn hình ảnh</b></div>
      </div>
      <div style="padding: 0 20px;height: calc(100vh - 190px)">
        <div class="flex-between">
          <div class="ver-align">
              <div class="btn-type3 bg-1 mr-15">
                 <div><i class="el-icon-plus"></i></div>
                 <div>Tải lên</div>
              </div>
              <div class="btn-type3 bg-1">
                <div><i class="el-icon-plus"></i></div>
                <div>Hình ảnh trong tài khoản</div>
                <div><i class="el-icon-caret-bottom ml-15"></i></div>
                <div></div>
              </div>
          </div>
          <div>
            <el-input
              placeholder="Tìm kiếm"
              size="mini"
              style="width: 265px"
              v-model="search">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        </div>
        <div class="mt-20 ver-align" style="flex-wrap: wrap;">
            <div v-for="(item, index) in listImg" :key="index" class="mr-10">
              <img :src="item.link" style="width: 130px; heigth: 130px" alt="">
              <div style="text-align: center;">{{ item.name }}</div>
            </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()" size="medium">Hủy</el-button>
        <el-button type="warning" @click="save()" size="medium">Áp dụng</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import commonApi from '@/api/commonApi'
const common = new commonApi()
export default {
  name: 'chooseImg',
  props: {
    dialog: {
      required: true,
      type: Boolean
    }
  },
  computed: {
    gUserId() {
      return this.$store.getters.userId
    },
    listImg() {
        return this.$store.getters.listImg
    }
  },
  mounted() {},
  data () {
    return {
      search: '',
      itemImg: {},
    }
  },
  methods: {
    resetDialog() {
      this.itemImg = {}
    },
    handleClose () {
      this.$emit('closeChooseImg', { type: 1 })
    },
    close () {
      this.$emit('closeChooseImg', { type: 1 })
    },
    save () {
      this.$emit('closeChooseImg', { type: 2, data: this.itemImg })
    },
    catchError(error) {
      if(error.response.data.code == 403) {
        if (error.response.data.message.error_user_msg) {
          this.$message.error(error.response.data.message.error_user_msg);
        }
        else if(!error.response.data.message.error_user_msg && error.response.data.message.message) {
          this.$message.error(error.response.data.message.message);
        }
        else if(error.response.data.message == "REQUIRE_AUTHORIZATION") {
          this.$router.push({ name: 'login' })
        }
      }
    },
  }
}
</script>

<style></style>
