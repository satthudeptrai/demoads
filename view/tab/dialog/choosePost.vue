<template>
  <div>
    <el-dialog
      top="10px"
      class="dialog2"
      :visible.sync="dialog"
      width="1024px"
      append-to-body
      :before-close="handleClose"
    >
      <div slot="title" class="f-16 ver-align">
        <div class="mr-15"><b>Chọn bài viết</b></div>
      </div>
      <div style="margin: 0 16px">
        <div class="ver-align">
          <div :class="['ver-align', 'btn-type4', tabActive == 1 ? 'is-active' : '']">
            <i class="fab fa-facebook-square f-20 mr-6"></i>
            <b>Facebook</b>
          </div>
          <div style="cursor: not-allowed" :class="['ver-align', 'btn-type4', 'ml-8', tabActive == 2 ? 'is-active' : '']">
            <i class="fab fa-instagram f-20 mr-6"></i>
            <b>Instagram</b>
          </div>
          <div style="cursor: not-allowed" :class="['ver-align', 'btn-type4', 'ml-8', tabActive == 3 ? 'is-active' : '']">
            <i class="far fa-handshake f-20 mr-6"></i>
            <b>Nội dung có thương hiệu</b>
          </div>
        </div>
        <div>
          <div class="f-14">Lọc theo</div>
          <div class="ver-align">
            <el-select style="width: auto;" class="mr-6" size="small" v-model="filterChoose" placeholder="Select">
              <el-option label="Tất cả các loại bài viết" :value="1"></el-option>
              <el-option label="Bài viết đã đăng" :value="2"></el-option>
              <el-option label="Bài viết quảng cáo" :value="3"></el-option>
              <el-option label="Bài viết đã lên lịch" :value="4"></el-option>
            </el-select>
            <el-input size="small" clearable placeholder="ID bài viết, hình ảnh, video hoặc từ khóa khác" v-model="filterText"></el-input>
          </div>
          <div class="mt-5">
            <el-checkbox v-model="invalidPost">Chỉ bài viết hợp lệ</el-checkbox>
          </div>
        </div>
        <el-table
          :data="listPostFilter"
          style="width: 100%"
          height="calc(100vh - 300px)"
          highlight-current-row
          @current-change="handleCurrentChange"
          border
          stripe>
          <el-table-column
            label="Bài viết trên Facebook"
            min-width="300">
            <template slot-scope="scope">
              <div style="display: flex">
                <img src="http://t0.gstatic.com/images?q=tbn:ANd9GcRFeEyjhx-ROjtGKdJKQ5sjT0FwiqeXvwwvBoBhyrH_alu9BYM&s" style="width: 74px; height: 74px;" alt="">
                <div class="ml-20" style="flex-direction: column; display: flex; justify-content: space-between;">
                  <div>
                    {{ scope.row.data.object_story_spec.message ? scope.row.data.object_story_spec.message : 'Bài viết này không có văn bản' }}
                  </div>
                  <div class="ver-align">
                    <div class="mr-55">
                      <i class="far fa-thumbs-up f-20 mr-6"></i> 1
                    </div>
                    <div class="mr-55">
                      <i class="far fa-comment-alt f-20 mr-6"></i> 1
                    </div>
                    <div>
                      <i class="fas fa-share f-20 mr-6"></i> 1
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="_id"
            label="ID bài viết"
            width="200">
          </el-table-column>
        </el-table>
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
  name: 'choosePost',
  props: {
    dialog: {
      required: true,
      type: Boolean
    },
    idPage: {
      required: true,
      type: String
    }
  },
  computed: {
    gUserId() {
      return this.$store.getters.userId
    },
    listPost() {
      return this.$store.getters.listPost
    },
    listPostFilter() {
      if(this.idPage == '') {
        return []
      }
      return this.listPost.filter(i => i._id.includes(this.filterText) && i.data.object_story_spec.page_id == this.idPage)
    }
  },
  mounted() {
    common.callApi({
      type: "GET",
      data_type: "adcreatives",
      skip: 0,
      limit: 20
    }).then(reps => {
      if(reps.code == 200 && reps.data) {
        this.$store.dispatch('setListPost', reps.data)
      }
    }).catch((error) => {
      this.catchError(error)
    })
  },
  data () {
    return {
      itemPost: {},
      tabActive: 1,
      filterChoose: 1,
      filterText: '',
      invalidPost: false
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.itemPost = val
    },
    resetDialog() {
      this.itemPost = {}
    },
    handleClose () {
      this.$emit('closeChoosePost', { type: 1 })
    },
    close () {
      this.$emit('closeChoosePost', { type: 1 })
    },
    save () {
      this.$emit('closeChoosePost', { type: 2, data: this.itemPost._id })
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
