<template>
  <el-dialog
    class="dialog-type2"
    :visible.sync="isShowDialog"
    :fullscreen="true"
    :show-close="false"
  >
    <div slot="title" class="flex-between">
      <i @click="close(1)" class="fas fa-angle-left f-20"></i>
      <div class="f-16">Đặt tên cho chiến dịch</div>
      <i @click="close(2)" class="fas fa-angle-right mr-24 f-20"></i>
    </div>
    <div
      style="margin-left: 18.4px; margin-top: 20.8px; word-break: break-word;"
      class="ver-start color-1 mr-15"
    >
      <div style="margin-right: 10.4px">
        <img src="@/icon/svg/campain.svg" alt="" />
      </div>
      <div>
        <div><b>Chiến dịch</b></div>
        <div class="f-12 color-2 parent">
          Bao gồm tùy chọn tối ưu hóa ngân sách và mục tiêu chiến dịch.
          <div class="child" style="border-bottom: 1px solid #E0E0E0;border-left: 1px solid #E0E0E0;width: 15px; height: 101px; top: 12px; left: -20px"></div>
        </div>
        <div class="mt-7">
          <el-input
            size="medium"
            placeholder="Đặt tên cho chiến dịch này"
            v-model="campaign.name"
          >
          </el-input>
        </div>
        <div class="ver-start mt-20">
          <div style="margin-right: 10.4px">
            <img src="@/icon/svg/adGroup.svg" alt="" />
          </div>
          <div>
            <div><b>Nhóm quảng cáo</b></div>
            <div class="f-12 color-2 parent">
              <div class="child" style="border-bottom: 1px solid #E0E0E0;border-left: 1px solid #E0E0E0;width: 15px; height: 139px; top: 17px; left: -20px"></div>
              Xác định đối tượng, vị trí quảng cáo, lịch chạy và mức chi tiêu.
            </div>
            <div class="mt-7">
              <el-select
                v-model="campaign.adGroup.type"
                placeholder=""
                size="medium"
              >
                <el-option :label="`Tạo nhóm quảng cáo`" :value="1"></el-option>
                <el-option
                  :label="`Dùng nhóm quảng cáo hiện có`"
                  :value="2"
                ></el-option>
              </el-select>
              <el-input
                class="mt-8"
                size="medium"
                placeholder="Đặt tên cho nhóm quảng cáo này"
                v-model="campaign.adGroup.name"
              >
              </el-input>
            </div>
            <div class="ver-start mt-20">
              <div style="margin-right: 10.4px">
                <img src="@/icon/svg/ads.svg" alt="" />
              </div>
              <div>
                <div><b>Quảng cáo</b></div>
                <div class="f-12 color-2">
                  Xác định đối tượng, vị trí quảng cáo, lịch chạy và mức chi tiêu.
                </div>
                <div class="mt-7">
                  <el-select
                    v-model="campaign.adGroup.ad.type"
                    placeholder=""
                    size="medium"
                  >
                    <el-option
                      :label="`Tạo quảng cáo`"
                      :value="1"
                    ></el-option>
                    <el-option
                      :label="`Dùng quảng cáo hiện có`"
                      :value="2"
                    ></el-option>
                  </el-select>
                  <el-input
                    class="mt-8"
                    size="medium"
                    placeholder="Đặt tên cho quảng cáo này"
                    v-model="campaign.adGroup.ad.name"
                  >
                  </el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'nameCampaign',
  props: {
    isShowDialog: {
      required: true,
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      campaign: {
        name: '',
        adGroup: {
          type: 1,
          name: '',
          ad: {
            type: 1,
            name: ''
          }
        }
      }
    }
  },
  methods: {
    close (type) {
      this.$emit('closeNameCampaign', { type: type })
    }
  }
}
</script>

<style></style>
