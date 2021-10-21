<template>
  <div>
    <el-dialog
      class="dialog-type1"
      title="Vị trí và đơn vị tiền tệ"
      :visible.sync="dialogCal"
      width="640px"
      :before-close="handleClose"
    >
      <div>
        <el-form label-position="left" label-width="118px" :model="formCal" class="from-type1">
          <el-form-item label="Quốc gia khu vực">
            <el-select v-model="formCal.country" placeholder="Quốc gia khu vực" size="medium">
              <el-option
                v-for="item in listCountry"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Đơn vị tiền tệ">
            <el-select v-model="formCal.currency" placeholder="Đơn vị tiền tệ" size="medium">
              <el-option
                v-for="item in listCurrency"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Múi giờ">
            <el-select v-model="formCal.timeZone" placeholder="Múi giờ" size="medium">
              <el-option
                v-for="item in listTimeZone"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
            <div class="f-12" style="color: #828282">Dùng cho ngày và giờ trên bảng kê chi tiết.</div>
          </el-form-item>
        </el-form>
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
  name: 'CurrencyAndLocation',
  props: {
    dialogCal: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      formCal: {
        country: '',
        currency: '',
        timeZone: ''
      },
      listCountry: [
        {
          id: 1,
          name: 'Việt Nam'
        },
        {
          id: 2,
          name: 'Nhật'
        },
        {
          id: 3,
          name: 'Trung Quốc'
        }
      ],
      listCurrency: [
        {
          id: 1,
          name: 'VND'
        },
        {
          id: 2,
          name: 'Yên'
        },
        {
          id: 3,
          name: 'NDT'
        }
      ],
      listTimeZone: [
        {
          id: 1,
          label: '(GMT -08:00) Giờ Thái Bình Dương'
        }
      ]
    }
  },
  methods: {
    handleClose () {
      this.close()
    },
    close () {
      this.$emit('closeCal', { type: 1 })
    },
    next () {
      this.$emit('closeCal', { type: 2 })
    }
  }
}
</script>

<style></style>
