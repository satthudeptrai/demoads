<template>
  <div>
    <el-dialog
      v-loading="isLoading"
      title="Thẻ tín dụng hoặc thẻ ghi nợ"
      :visible.sync="dialogCad"
      width="640px"
      :before-close="handleClose"
    >
      <div>
        <el-form :model="formCad" :rules="rules" ref="cadForm" class="form-type2">
          <el-row>
            <el-col :span="6">
              <b>Chi tiết thẻ</b>
            </el-col>
            <el-col :span="18">
              <el-row :gutter="12">
                <el-col :span="24">
                  <el-form-item>
                    <el-input v-model="formCad.name" placeholder="Tên trên thẻ" size="medium"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item>
                    <el-select class="select-type1" v-model="formCad.numberCar" placeholder="Số thẻ" size="medium">
                      <img slot="prefix" src="../../icon/svg/card.svg" alt="">
                      <el-option
                        v-for="item in numberCardList"
                        :key="item.code"
                        :label="item.code"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="date">
                    <el-input v-model="formCad.date" placeholder="MM/YY" size="medium"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <el-input v-model="formCad.cvv" placeholder="CVV" size="medium"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()" size="medium">Back</el-button>
        <el-button type="warning" @click="next()" size="medium">Lưu</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import commonApi from '@/api/commonApi'
const common = new commonApi()
export default {
  name: 'creditAndDebit',
  props: {
    dialogCad: {
      required: true,
      type: Boolean
    }
  },
  computed: {
    itemAds () {
      return this.$store.getters.itemAd
    },
    gUserId () {
      return this.$store.getters.userId
    },
    idAds() {
      return this.$store.getters.idAds
    }
  },
  data () {
    var checkDate = (rule, value, callback) => {
      const vali = /^\d{1,2}\/{1}\d{1,4}$/g
      if (!vali.test(value)) {
        callback(new Error('Chưa nhập chính xác định dạng'))
      } else {
        const month = value.split('/')[0]
        if (month <= 0 || month > 12) {
          callback(new Error('Sai tháng'))
        } else {
          callback()
        }
      }
    }
    return {
      isLoading: false,
      formCad: {
        name: '',
        numberCard: '',
        date: '',
        cvv: ''
      },
      numberCardList: [
        {
          code: '11111111111111'
        },
        {
          code: '22222222222222'
        }
      ],
      rules: {
        date: [
          { validator: checkDate, trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  methods: {
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
    handleClose () {
      this.close()
    },
    close () {
      this.$emit('closeCad', { type: 1 })
    },
    next () {
      this.isLoading = true
      if(this.idAds) {
        common.callApi({
          param: this.idAds,
          data: this.itemAds,
          method: 'POST',
          version: 'v10.0'
        }).then(reps => {
          if(reps.code == 200) {
            if(reps.data && reps.data.success) {
              this.$emit('closeCad', { type: 2 })
              this.$message({
                message: 'Sửa quảng cáo thành công',
                type: 'success'
              });
            }
          }
        }).catch((error) => {
            this.catchError(error)
        })
          .finally(() => {
            this.isLoading = false
          });
      } else {
        common.callApi({
          param: this.gUserId + '/ads',
          data: this.itemAds,
          method: 'POST',
          version: 'v10.0'
        }).then(reps => {
          if(reps.code == 200) {
            if(reps.data && reps.data.id) {
              this.$emit('closeCad', { type: 2 })
              this.$message({
                message: 'Tạo quảng cáo thành công',
                type: 'success'
              });
            } 
            // if(reps.data.error) {
            //   if(reps.data.error.error_user_msg) {
            //     this.$message.error(reps.data.error.error_user_msg);
            //   }
            //   if(reps.data.error.code == 80004) {
            //     this.$message.error('Đã có quá nhiều cuộc gọi đến tài khoản quảng cáo này. Chờ một chút và thử lại');
            //   }
            // }
          }
        }).catch((error) => {
            this.catchError(error)
        })
          .finally(() => {
            this.isLoading = false
          });
      }
    }
  }
}
</script>

<style></style>
