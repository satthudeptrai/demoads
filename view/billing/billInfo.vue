<template>
  <div>
    <el-dialog
      class="dialog-type1"
      title="Thêm thông tin thanh toán"
      :visible.sync="dialogBill"
      width="640px"
      :before-close="handleClose"
    >
      <div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
          <b class="f-16">Vị trí và đơn vị tiền tệ</b>
          <span class="f-14" style="color: #FF5F0B; cursor: pointer;" @click="openCal()">
            Chỉnh sửa
          </span>
        </div>
        <div class="f-16">Việt Nam, Đồng Việt Nam (VND)</div>
        <el-divider></el-divider>
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
          <b class="f-16">Thông tin thuế và thông tin doanh nghiệp</b>
          <span class="f-14" style="color: #FF5F0B; cursor: pointer;" @click="openCompany()">
            Chỉnh sửa
          </span>
        </div>
        <div class="f-16">Không bắt buộc - Thêm mã số thuế hoặc địa chỉ</div>
        <el-divider></el-divider>
        <div class="f-16 mb-16"><b>Thêm phương thức thanh toán</b></div>
        <div>
          <el-radio-group v-model="paymentType">
            <el-radio :label="1" class="mb-16">Thẻ tín dụng hoặc thẻ ghi nợ</el-radio> <br>
            <el-radio :label="2">Tín dụng quảng cáo</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()" size="medium">Đóng</el-button>
        <el-button type="warning" @click="next()" size="medium">Tiếp tục</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'BillInfo',
  props: {
    dialogBill: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      paymentType: 1
    }
  },
  methods: {
    handleClose () {
      this.close()
    },
    close () {
      this.$emit('closeBillInfo', { type: 0 })
    },
    next () {
      this.$emit('closeBillInfo', { type: this.paymentType })
    },
    openCal () {
      this.$emit('closeBillInfo', { type: 3 })
    },
    openCompany () {
      this.$emit('closeBillInfo', { type: 4 })
    }
  }
}
</script>

<style></style>
