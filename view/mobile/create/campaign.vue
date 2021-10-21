<template>
  <div class="color-1">
    <div>
        Bản nháp
        <el-switch
            class="ml-8"
            v-model="isDraft"
            active-color="#FF5F0B">
        </el-switch>
    </div>
    <div class="box-style3">
        <div class="mb-12 f-16">Tên chiến dịch</div>
        <el-input size="medium" placeholder="Tên chiến dịch" v-model="campaign.name"></el-input>
    </div>
    <div class="box-style3">
        <div class="mb-8 f-16">Hạng mục quảng cáo đặc biệt</div>
        <div class="f-12 color-5 fw-400">
            Theo yêu cầu, bạn phải tuyên bố xem quảng cáo của mình có liên quan đến vấn đề xã hội, bầu cử hoặc chính trị hay không.
            <el-link type="warning" class="f-12"> Tìm hiểu thêm</el-link>
        </div>
    </div>
    <div class="box-style3">
      <div class="mb-12 f-16">Chi tiết chiến dịch</div>
      <div class="color-5"><b>Cách mua</b></div>
      <div class="mt-2">
        <el-select v-model="campaign.typeBuy" size="medium">
          <el-option :label="`Đấu giá`" :value="1"> </el-option>
        </el-select>
      </div>
      <div class="color-5 mt-12"><b>Mục tiêu chiến dịch</b></div>
      <el-radio-group v-model="campaign.radioCam">
        <el-row class="mt-8 radio-cam">
          <el-col :span="24">
            <div class="f-12 mb-13 color-2">Nhận thức</div>
          </el-col>
          <el-col :span="24">
            <el-radio :label="1">Nhận thức về<br />thương hiệu</el-radio>
          </el-col>
          <el-col :span="24">
            <el-radio :label="2">Số người tiếp nhận</el-radio>
          </el-col>

          <el-col :span="24">
            <div class="f-12 mb-13 mt-13 color-2">Cân nhắc</div>
          </el-col>
          <el-col :span="12">
            <el-radio :label="3">Lưu lượng truy<br />cập</el-radio>
          </el-col>
          <el-col :span="12">
            <el-radio :label="6">Số lượt xem video</el-radio>
          </el-col>
          <el-col :span="12">
            <el-radio :label="4">Tương tác</el-radio>
          </el-col>
          <el-col :span="12">
            <el-radio :label="7">Tìm hiểu khách<br />hàng tiềm năng</el-radio>
          </el-col>
          <el-col :span="12">
            <el-radio :label="5">Số lượng cài đặt<br />ứng dụng</el-radio>
          </el-col>
          <el-col :span="12">
            <el-radio :label="8">Tin nhắn</el-radio>
          </el-col>

          <el-col :span="24">
            <div class="f-12 mb-13 mt-13 color-2">Chuyển đổi</div>
          </el-col>
          <el-col :span="24">
            <el-radio :label="9">Chuyển đổi</el-radio>
          </el-col>
          <el-col :span="24">
            <el-radio :label="10">Doanh số theo doanh<br />mục</el-radio>
          </el-col>
          <el-col :span="24">
            <el-radio :label="11">Lượt ghé thăm cửa<br />hàng</el-radio>
          </el-col>
        </el-row>
      </el-radio-group>
      <div class="posi-bt1 mt-41">
        <div>
          <img src="@/icon/svg/loa.svg" alt="">
        </div>
        <div class="f-18 mt-8" style="padding: 8px 0 8px 0"><b>Nhận thức về thương hiệu</b></div>
        <div class="color-2" style="line-height: 120%;">Hiển thị quảng cáo cho những người có<br>nhiều khả năng nhớ đến quảng cáo nhất.</div>
      </div>
    </div>
    <div class="box-style3">
        <div class="mb-8 f-16">Thử nghiệm A/B</div>
        <div class="f-12 color-5 fw-400">
            Thử nghiệm các chiến dịch, nhóm quảng cáo và quảng cáo với nhau để xem chiến lược nào mang lại kết quả tốt nhất. Số người tiếp cận tiềm năng sẽ được chia cho các bên để có kết quả chính xác hơn.
            <el-link type="warning" class="f-12"> Tìm hiểu thêm</el-link>
        </div>
    </div>
    <div class="box-style3 mb-16">
        <div class="mb-8 f-16">Tối ưu hóa ngân sách chiến dịch</div>
        <div class="f-12 color-5 fw-400">
            Thử nghiệm các chiến dịch, nhóm quảng cáo và quảng cáo với nhau để xem chiến lược nào mang lại kết quả tốt nhất. Số người tiếp cận tiềm năng sẽ được chia cho các bên để có kết quả chính xác hơn.
            <el-link type="warning" class="f-12"> Tìm hiểu thêm</el-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'campaign',
  data () {
    return {
      isDraft: true,
      campaign: {
        name: '',
        typeBuy: 1,
        radioCam: null
      }
    }
  }
}
</script>

<style>

</style>
