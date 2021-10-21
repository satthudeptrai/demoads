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
        <div class="f-16 color-4"><b>Tạo mẫu</b></div>
      </div>
      <div class="color-4" style="padding: 0 20px;height: calc(100vh - 200px);overflow-y: auto;">
        <div class="f-18"><b>Lời chào</b></div>
        <div>Chào đón mọi người tham gia cuộc trò chuyện sau khi họ nhấn vào quảng cáo của bạn.</div>
        <el-select class="mt-6" v-model="type" placeholder="Select">
          <el-option label="Chỉ văn bản" :value="0"></el-option>
          <el-option label="Văn bản & hình ảnh" :value="1"></el-option>
          <el-option label="Văn bản & video" :value="2"></el-option>
        </el-select>
        <el-input
          class="mt-10"
          type="textarea"
          :autosize="{ minRows: 2}"
          placeholder='Nhập lời chào, như "Xin chào! Chúng tôi có thể giúp gì cho bạn?".'
          v-model="greeting">
        </el-input>
        <el-divider></el-divider>
        <div class="f-18"><b>Hành động của khách hàng</b></div>
        <div>Gợi ý câu hỏi hoặc câu trả lời để khách hàng nhấn vào hoặc sử dụng nút để chuyển mọi người đến trang web của bạn.</div>
        <el-select class="mt-6" v-model="action" placeholder="Select">
          <el-option label="Câu hỏi thường gặp" :value="0"></el-option>
          <el-option label="Câu trả lời nhanh" :value="1"></el-option>
          <el-option label="Nút" :value="2"></el-option>
          <el-option label="Không có" :value="3"></el-option>
        </el-select>
        <div v-show="action == 0">
          <div v-for="(item, index) in questions" :key="index" class="mt-10" style="border: solid 1px #ccc; padding: 20px 10px">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
              <b>Câu hỏi {{index + 1}}</b>
              <span v-show="questions.length > 1" class="f-14" style="color: #828282" @click="closeQuestion(index)">
                <i class="el-icon-close f-20"></i>
              </span>
            </div>
            <el-input
              class="mt-10"
              type="text"
              v-model="item.question"
              maxlength="80"
              show-word-limit
            >
            </el-input>
            <div class="mt-10"><b>Tin trả lời tự động  <span class="color-2">· Không bắt buộc</span></b></div>
            <el-input
              class="mt-10"
              type="textarea"
              :autosize="{ minRows: 2}"
              placeholder='Trả lời câu hỏi'
              v-model="item.reply">
            </el-input>
          </div>
          <el-button @click="addQuestion()" class="mt-10" size="medium" type="warning" icon="el-icon-plus">Thêm câu hỏi</el-button>
        </div>
        <div v-show="action == 1">
          <div v-for="(item, index) in quickQuestions" :key="index" class="mt-10" style="border: solid 1px #ccc; padding: 20px 10px">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
              <b>Câu trả lời nhanh {{index + 1}}</b>
              <span v-show="quickQuestions.length > 1" class="f-14" style="color: #828282" @click="closeQuickQuestion(index)">
                <i class="el-icon-close f-20"></i>
              </span>
            </div>
            <el-input
              class="mt-10"
              type="text"
              v-model="item.question"
              maxlength="80"
              show-word-limit
            >
            </el-input>
            <div class="mt-10"><b>Tin trả lời tự động  <span class="color-2">· Không bắt buộc</span></b></div>
            <el-input
              class="mt-10"
              type="textarea"
              :autosize="{ minRows: 2}"
              placeholder='Trả lời câu hỏi'
              v-model="item.reply">
            </el-input>
          </div>
          <el-button @click="addQuickQuestion()" class="mt-10" size="medium" type="warning" icon="el-icon-plus">Thêm câu hỏi</el-button>
        </div>
        <div v-show="action == 2">
          <div v-for="(item, index) in buttons" :key="index" class="mt-10" style="border: solid 1px #ccc; padding: 20px 10px">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
              <b>Nút {{index + 1}}</b>
              <span v-show="buttons.length > 1" class="f-14" style="color: #828282" @click="closeButton(index)">
                <i class="el-icon-close f-20"></i>
              </span>
            </div>
            <el-input
              class="mt-10"
              type="text"
              v-model="item.text"
              placeholder="Nhập văn bản cho nút của bạn"
              maxlength="20"
              show-word-limit
            >
            </el-input>
            <div class="mt-10"><b>Tin trả lời tự động  <span class="color-2">· Không bắt buộc</span></b></div>
            <el-input
              class="mt-10"
              type="text"
              placeholder='https://your-website.com/your-page'
              v-model="item.link">
            </el-input>
          </div>
          <el-button @click="addButton()" class="mt-10" size="medium" type="warning" icon="el-icon-plus">Thêm câu hỏi</el-button>
        </div>
        <div class="mt-10">
          <el-checkbox v-model="isSave">Lưu mẫu<i class="el-icon-info"></i></el-checkbox>
          <el-input
            class="mt-10"
            type="text"
            v-model="textSave"
            maxlength="80"
            show-word-limit
          >
          </el-input>
          <div v-show="textSave == ''" class="f-12" style="color: red">
            Vui lòng nhập tên mẫu
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium">Xem trước trong messenger</el-button>
        <el-button :disabled="textSave == ''" type="warning" @click="save()" size="medium">Lưu và hoàn tất</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import commonApi from '@/api/commonApi'
const common = new commonApi()
export default {
  name: 'messengerForm',
  props: {
    dialog: {
      required: true,
      type: Boolean
    }
  },
  computed: {},
  mounted() {},
  data () {
    return {
      type: 0,
      action: 0,
      isSave: true,
      greeting: 'Chào bạn! Chúng tôi có thể giúp gì cho bạn?',
      questions: [
        {
          question: '',
          reply: ''
        }
      ],
      quickQuestions: [
        {
          question: '',
          reply: '',
        }
      ],
      buttons: [
        {
          text: '',
          link: '',
        }
      ],
      textSave: 'Tin nhắn chào mừng',
    }
  },
  methods: {
    resetDialog() {
      this.type = 1
      this.greeting = 'Chào bạn! Chúng tôi có thể giúp gì cho bạn?'
    },
    handleClose () {
      this.$emit('closeMessengerForm', { type: 1 })
      this.resetDialog()
    },
    close () {
      this.$emit('closeMessengerForm', { type: 1 })
      this.resetDialog()
    },
    save () {
      this.$emit('closeMessengerForm', { type: 2, data: this.itemImg })
      this.resetDialog()
    },
    closeQuestion(index) {
      this.questions.splice(index, 1)
    },
    addQuestion() {
      const temp = {
        question: '',
        reply: ''
      }
      this.questions.push(temp)
    },
    closeQuickQuestion(index) {
      this.quickQuestions.splice(index, 1)
    },
    addQuickQuestion() {
      const temp = {
        question: '',
        reply: '',
      }
      this.quickQuestions.push(temp)
    },
    closeButton(index) {
      this.buttons.splice(index, 1)
    },
    addButton() {
      const temp = {
        text: '',
        link: '',
      }
      this.buttons.push(temp)
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
