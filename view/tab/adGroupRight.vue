<template>
  <div>
    <el-card shadow="always">
      <div class="title-campaign"><b>Xác định đối tượng</b></div>
      <el-row :gutter="21" style="display: flex;">
        <el-col :span="12">
          <div style="position: relative;">
            <img src="../../icon/svg/image1.svg" alt="" style="width: 100%;" />
            <div class="f-12 color-2" style="position: absolute;bottom: 0;left: 0;">Cụ thể</div>
            <div class="f-12 color-2" style="position: absolute;bottom: 0;right: 0;">Rộng</div>
          </div>
        </el-col>
        <el-col :span="12" class="flex-between">
          Lựa chọn đối tượng khá rộng
        </el-col>
      </el-row>
      <div class="f-12 mt-28">Số người tiếp cận tiềm năng: 60.000.000 người</div>
    </el-card>
    <el-card shadow="always">
      <div class="title-campaign"><b>Kết quả hàng ngày ước tính</b></div>
      <div class="mt-16">Số người tiếp cận</div>
      <div class="f-20 mt-6"><b>3,0K - 8,6K</b></div>
      <el-progress
        class="progress1 mt-6"
        :percentage="percentage"
        :color="customColor"
        :show-text="false"
        :stroke-width="10">
      </el-progress>
      <div class="f-12 mt-28">Độ chính xác của ước tính dựa trên các yếu tố như dữ liệu chiến dịch đã qua, ngân sách bạn đã nhập và dữ liệu thị trường. Các số được cung cấp để mang lại cho bạn ý tưởng về hiệu quả cho ngân sách của mình, nhưng đó chỉ là ước tính và không bảo đảm kết quả.</div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'tabAdGroupRight',
  data () {
    return {
      percentage: 20,
      customColor: '#FF5F0B'
    }
  }
}
</script>

<style></style>
