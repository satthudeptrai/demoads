<template>
  <div>
    <el-card shadow="always">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px">
        <div class="f-16">
          <i class="fas fa-minus-circle" style="color: #EB5757"></i>
          <b>Đang xác minh thay đổi của bạn</b>
        </div>
        <el-button @click="isShow1 = !isShow1" size="mini">
          <i class="fas fa-angle-up"></i>
        </el-button>
      </div>
      <div v-show="isShow1">
        <div>
          Thẻ quay vòng của bạn 5 chưa có trang đích. Vui lòng nhập URL trang web cho từng thẻ trong quảng cáo quay vòng. (#1443135)
        </div>
        <el-button size="medium" class="mt-12">Chỉnh sửa</el-button>
      </div>
    </el-card>
    <div class="ver-align mt-19 mb-18">
      <el-switch
        class="mr-12"
        v-model="isPreview"
        active-color="#FF5F0B">
      </el-switch>
      Bản xem trước đang bật
    </div>
    <el-card shadow="always">
      <div class="title-campaign f-16"><b>10 vị trí quảng cáo</b></div>
      <el-row :gutter="16" class="mt-12">
        <el-col :span="12" class="bg-1">
          <div style="display: flex" class="ml-16 mt-16">
            <i class="fab fa-facebook f-24"></i>
            <div class="ml-8">
              <b class="color-2">Facebook</b>
              <div class="f-16">Nguồn cấp</div>
            </div>
          </div>
          <div class="bg-2" style="margin: 12px 16px 11px 16px; height: 407px;">
            <div class="ver-align" style="flex-direction: column; text-align: center;">
              <i class="fas fa-image mt-44"></i>
              <div class="mt-15">Vui lòng chọn phương<br>tiện cho quảng cáo</div>.
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <el-row :gutter="16" class="mt-16">
            <el-col :span="24" class="mb-7"><b>Bảng tin</b></el-col>
            <el-col :span="8">
              <div style="height: 100px; border: soild; border: solid 1px #FF5F0B;"></div>
            </el-col>
            <el-col :span="8">
              <div style="height: 100px; border: soild; border: solid 1px #FF5F0B;"></div>
            </el-col>
            <el-col :span="8">
              <div style="height: 100px; border: soild; border: solid 1px #FF5F0B;"></div>
            </el-col>
            <el-col :span="24" class="dialog-type1">
              <el-divider style="margin: 16px 0"></el-divider>
            </el-col>
            <el-col :span="24" class="mb-7"><b>Tin</b></el-col>
            <el-col :span="8">
              <div style="height: 100px; border: soild; border: solid 1px #FF5F0B;"></div>
            </el-col>
            <el-col :span="8">
              <div style="height: 100px; border: soild; border: solid 1px #FF5F0B;"></div>
            </el-col>
            <el-col :span="8">
              <div style="height: 100px; border: soild; border: solid 1px #FF5F0B;"></div>
            </el-col>
            <el-col :span="24" class="dialog-type1">
              <el-divider style="margin: 16px 0"></el-divider>
            </el-col>
            <el-col :span="24" class="mb-7"><b>Trong luồng</b></el-col>
            <el-col :span="8">
              <div style="height: 100px; border: soild; border: solid 1px #FF5F0B;"></div>
            </el-col>
            <el-col :span="8">
              <div style="height: 100px; border: soild; border: solid 1px #FF5F0B;"></div>
            </el-col>
            <el-col :span="8">
              <div style="height: 100px; border: soild; border: solid 1px #FF5F0B;"></div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'tabAdRight',
  data () {
    return {
      isShow1: true,
      isPreview: true
    }
  }
}
</script>

<style></style>
