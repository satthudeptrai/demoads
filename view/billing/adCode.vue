<template>
  <div>
    <el-dialog
      class="dialog-type1"
      title="Nhập mã tín dụng quảng cáo"
      :visible.sync="dialogAdCode"
      width="640px"
      :before-close="handleClose"
    >
      <div>
        <el-form label-position="left" label-width="112px" :model="formAdCode" class="from-type1">
          <el-form-item label="Nhập mã tín dụng quảng cáo">
            <el-input v-model="formAdCode.code" size="medium"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()" size="medium">Back</el-button>
        <el-button type="warning" @click="next()" size="medium">Xác nhận</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AdCode',
  props: {
    dialogAdCode: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      formAdCode: {
        code: ''
      }
    }
  },
  methods: {
    handleClose () {
      this.close()
    },
    close () {
      this.$emit('closeAdCode', { type: 1 })
    },
    next () {
      this.$emit('closeAdCode', { type: 2 })
    }
  }
}
</script>

<style></style>
