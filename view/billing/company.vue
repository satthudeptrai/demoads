<template>
  <div>
    <el-dialog
      class="dialog-type1"
      title="Thông tin doanh nghiệp"
      :visible.sync="dialogCompany"
      width="640px"
      :before-close="handleClose"
    >
      <div>
        <el-row :gutter="10">
          <el-form :model="formCompany">
            <el-col :lg="6" class="mt-10">
              <b>Tên doanh nghiệp</b>
            </el-col>
            <el-col :lg="18">
              <el-form-item>
                <el-input v-model="formCompany.name" size="medium" placeholder="Tên doanh nghiệp"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="6" class="mt-10">
              <b>Địa chỉ doanh nghiệp</b>
            </el-col>
            <el-col :lg="18">
              <el-row :gutter="12">
                <el-col :lg="24">
                  <el-form-item>
                    <el-input v-model="formCompany.address1" size="medium" placeholder="Địa chỉ đường phố 1"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="24">
                  <el-form-item>
                    <el-input v-model="formCompany.address2" size="medium" placeholder="Địa chỉ 2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="24">
                  <el-form-item>
                    <el-input v-model="formCompany.city" size="medium" placeholder="Tỉnh/ Thành phố hoặc thị trấn"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item>
                    <el-input v-model="formCompany.district" size="medium" placeholder="Tiểu bang, tỉnh hoặc vùng"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item>
                    <el-input v-model="formCompany.codeZip" size="medium" placeholder="Mã zip"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()" size="medium">Back</el-button>
        <el-button type="warning" @click="next()" size="medium">Lưu</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Company',
  props: {
    dialogCompany: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      formCompany: {
        name: '',
        address1: '',
        address2: '',
        city: '',
        district: '',
        codeZip: ''
      }
    }
  },
  methods: {
    handleClose () {
      this.close()
    },
    close () {
      this.$emit('closeCompany', { type: 1 })
    },
    next () {
      this.$emit('closeCompany', { type: 2 })
    }
  }
}
</script>

<style></style>
