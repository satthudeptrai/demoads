<template>
  <div class="row-button">
    <el-button type="success" size="small" @click="showDialogCam">
      <i class="el-icon-plus"></i>
      Tạo
    </el-button>
    <el-dropdown split-button trigger="click" size="small" id="copy-btn">
      <img src="../../../icon/svg/copy.svg" alt="">
      Sao chép
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item>Action 4</el-dropdown-item>
        <el-dropdown-item>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown split-button trigger="click" size="small">
      <img src="../../../icon/svg/edit.svg" alt="">
      Chỉnh sửa
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item>Action 4</el-dropdown-item>
        <el-dropdown-item>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown trigger="click" size="small">
      <el-button size="small">
        Khác<i class="el-icon-caret-bottom"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item>Action 4</el-dropdown-item>
        <el-dropdown-item>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <div>
      Xem thiết lập
      <el-switch
        v-model="checkStatus"
        active-color="#e7f1fe"
        inactive-color="#ffffff"
      >
      </el-switch>
    </div>

    <el-dropdown trigger="click" size="small">
      <el-button size="small">
        <img src="../../../icon/svg/col.svg" alt="">
        Cột {{ colValue }}<i class="el-icon-caret-bottom"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item>Action 4</el-dropdown-item>
        <el-dropdown-item>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown trigger="click" size="small">
      <el-button size="small">
        <img src="../../../icon/svg/data.svg" alt="">
        Số liệu chia nhỏ: {{ dataValue }}<i class="el-icon-caret-bottom"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item class="sub1">
          ac
          <ul class="sub11">
            <li>a1</li>
            <li>a1</li>
            <li>a1</li>
            <li>a1</li>
            <li>a1</li>
          </ul>
        </el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item>Action 4</el-dropdown-item>
        <el-dropdown-item>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown trigger="click" size="small">
      <el-button size="small" style="line-height: 18px;">
        Báo cáo<i class="el-icon-caret-bottom"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item>Action 4</el-dropdown-item>
        <el-dropdown-item>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog title="" :visible.sync="dialogCam" :before-close="close" width="600px">
      <el-tabs type="card">
        <el-tab-pane label="Tạo chiến dịch mới">
            <h3>Chọn mục tiêu chiến dịch</h3>
            <el-link type="warning">Tìm hiểu thêm</el-link>
            <el-radio-group v-model="radioCam" style="width: 100%;">
                <el-row :gutter="5" class="groupCam">
                    <el-col :span="8">
                        <code>Nhận thức</code>
                        <el-radio :label="1">Nhận thức về<br>thương hiệu</el-radio>
                        <el-radio :label="2">Số người tiếp nhận</el-radio>
                    </el-col>
                    <el-col :span="8">
                        <code>Cân nhắc</code>
                        <el-radio :label="3">Lưu lượng truy cập</el-radio>
                        <el-radio :label="4">Tương tác</el-radio>
                        <el-radio :label="5">Số lượng cài đặt ứng<br>dụng</el-radio>
                        <el-radio :label="6">Số lượt xem video</el-radio>
                        <el-radio :label="7">Tìm hiểu khách<br>hàng tiềm năng</el-radio>
                        <el-radio :label="8">Tin nhắn</el-radio>
                    </el-col>
                    <el-col :span="8">
                        <code>Chuyển đổi</code>
                        <el-radio :label="9">Chuyển đổi</el-radio>
                        <el-radio :label="10">Doanh số theo doanh<br>mục</el-radio>
                        <el-radio :label="11">Lượt ghé thăm cửa<br>hàng</el-radio>
                    </el-col>
                </el-row>
            </el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="Sử dụng chiến dịch có sẵn">
            <div>
                <div class="title-cam"><i class="el-icon-folder"></i>Chiến dịch</div>
                <div style="margin-left: 20px">
                    <el-select v-model="campaign" placeholder="Chọn chiến dịch" size="medium" value-key="code" @change="chooseCam" clearable>
                        <el-option
                        v-for="item in listCam"
                        :key="item.code"
                        :value="item"
                        :label="item.name">
                        {{ item.name }}.{{ item.status }}.{{ item.code }}
                        </el-option>
                    </el-select>
                    <div v-show="campaign && campaign.code">
                        <div class="title-cam"><i class="el-icon-menu"></i>Nhóm quảng cáo</div>
                        <div style="margin-left: 20px">
                            <el-row :gutter="5">
                                <el-col :span="8">
                                    <el-select v-model="groupAdvertisement" placeholder="" size="medium">
                                        <el-option :label="`Tạo nhóm quảng cáo`" :value="1"></el-option>
                                        <el-option :label="`Dùng nhóm quảng cáo hiện có`" :value="2"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="16">
                                    <el-input placeholder="Đặt tên cho nhóm quảng cáo này" v-model="groupAdvertisementName" size="medium"></el-input>
                                </el-col>
                            </el-row>
                            <div class="title-cam"><i class="el-icon-bank-card"></i>Quảng cáo</div>
                            <div style="margin-left: 20px">
                                <el-row :gutter="5">
                                    <el-col :span="8">
                                        <el-select v-model="advertisement" placeholder="" size="medium">
                                            <el-option :label="`Tạo quảng cáo`" :value="1"></el-option>
                                            <el-option :label="`Bỏ qua quảng cáo`" :value="2"></el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="16">
                                        <el-input placeholder="Đặt tên cho nhóm quảng cáo này" v-model="advertisementName" size="medium"></el-input>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">Hủy</el-button>
        <el-button type="primary" @click="submit">Tiếp tục</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'rowBtn',
  props: {

  },
  data () {
    return {
      colValue: 'Tương tác',
      checkStatus: false,
      dataValue: '',
      dialogCam: false,
      radioCam: '',
      campaign: {},
      groupAdvertisement: 1,
      advertisement: 1,
      groupAdvertisementName: '',
      advertisementName: '',
      listCam: [
        {
          code: '11111111111111',
          name: 'Chiến dịch mới',
          status: 'Mới'
        },
        {
          code: '22222222222222',
          name: 'Chiến dịch mới',
          status: 'Mới'
        },
        {
          code: '33333333333333',
          name: 'Chiến dịch mới',
          status: 'Mới'
        }
      ]
    }
  },
  methods: {
    showDialogCam () {
      this.dialogCam = true
    },
    close () {
      this.dialogCam = false
    },
    submit () {
      this.dialogCam = false
      this.$store.dispatch('setShowDraw', true)
    },
    chooseCam () {

    }
  }
}
</script>

<style>
.title-cam {
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}
.title-cam i {
    font-size: 20px;
    margin-right: 5px;
}
.row-button {
  display: inline-flex;
  align-items: center;
  margin: 5px 0;
  width: 100%;
  justify-content: space-between;
}
.row-button .el-button-group {
  display: flex;
}
.row-button .el-button {
  padding: 9px 10px 9px 10px !important;
  display: flex !important;
  font-size: 14px !important;
  align-items: center !important;
  line-height: 16px !important;
}
.row-button .el-button img{
  margin-right: 10.8px;
}
.row-button .el-button span{
  display: flex !important;
  align-items: center !important;
}
.row-button .el-switch__core {
  border: solid 0.5px blue !important;
}
.row-button .el-switch__core::after {
  background-color: black !important;
}
.row-button .is-checked .el-switch__core::after {
  background-color: blue !important;
}
.row-button .el-icon-caret-bottom {
  margin-left: 5px !important;
}
.sub1 {
  position: relative;
}
.sub1 .sub11 {
  position: absolute;
  display: none;
  top: 0;
  right: 75px;
  width: 50px;
  background-color: #ffffff;
}
.sub1:hover .sub11 {
  display: block;
}
.groupCam .el-radio {
    padding: 10px 0px;
    display: flex;
}
.groupCam .el-radio .el-radio__label {
    display: block;
}
#copy-btn .el-button{
  padding: 7px 10px 7px 10px !important;
}
</style>
