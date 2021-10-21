<template>
  <div class="row-button">
    <el-button
      type="success"
      size="small"
      @click="showDialogCam"
      style="border-radius: 4px;"
      class="mr-10"
    >
      <i class="el-icon-plus"></i>
      Tạo
    </el-button>
    <!-- <el-dropdown split-button trigger="click" size="small" class="btn-type2">
      <img src="../../../icon/svg/copy.svg" alt="" />
      Sao chép
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item disabled><b>Sao chép</b></el-dropdown-item>
        <el-dropdown-item>Sao chép nhanh</el-dropdown-item>

        <el-dropdown-item disabled><b>Bộ nhớ tạm</b></el-dropdown-item>
        <el-dropdown-item>Sao chép</el-dropdown-item>
        <el-dropdown-item>Xem mục đã sao chép</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->

    <el-dropdown
      split-button
      trigger="click"
      size="small"
      class="btn-type2 edit"
      @command="editCommand"
      @click="edit"
    >
      <img src="../../../icon/svg/edit.svg" alt="" />
      Chỉnh sửa
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item disabled><b>Chung</b></el-dropdown-item>
        <el-dropdown-item command="delete">Xóa</el-dropdown-item>
        <el-dropdown-item>Bật</el-dropdown-item>
        <el-dropdown-item>Tắt</el-dropdown-item>
        <el-dropdown-item>Tên</el-dropdown-item>
        <el-dropdown-item>Tìm và thay</el-dropdown-item>
        <el-dropdown-item disabled
          ><b>Tối ưu hóa ngân sách chiến dịch</b></el-dropdown-item
        >
        <el-dropdown-item>Ngân sách chiến dịch</el-dropdown-item>
        <el-dropdown-item disabled><b>Chi tiết chiến dịch</b></el-dropdown-item>
        <el-dropdown-item>Giới hạn chi tiêu của chiến dịch</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!-- <el-dropdown trigger="click" size="small">
      <el-button disabled size="small">
        Khác<i class="el-icon-caret-bottom"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Hoàn nguyên</el-dropdown-item>
        <el-dropdown-item>Xem bộ nhớ tạm</el-dropdown-item>
        <el-dropdown-item>Thử nghiệm A/B</el-dropdown-item>
        <el-dropdown-item disabled><b>Nhập/ Xuất</b></el-dropdown-item>
        <el-dropdown-item>Xuất mục đã chọn</el-dropdown-item>
        <el-dropdown-item>Xuất tất cả</el-dropdown-item>
        <el-dropdown-item>Tùy chỉnh bản xuất</el-dropdown-item>
        <el-dropdown-item>Nhập hàng loạt quảng cáo</el-dropdown-item>
        <el-dropdown-item>Tải mẫu xuống excel</el-dropdown-item>
        <el-dropdown-item>Thẻ chiến dịch</el-dropdown-item>
        <el-dropdown-item disabled><b>Quy tắc tự động</b></el-dropdown-item>
        <el-dropdown-item>tạo quy tắc mới</el-dropdown-item>
        <el-dropdown-item>Áp dụng quy tắc có sẵn</el-dropdown-item>
        <el-dropdown-item>Quản lý quy tắc</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->

    <!-- <div>
      Xem thiết lập
      <el-switch
        v-model="checkStatus"
        active-color="#e7f1fe"
        inactive-color="#ffffff"
      >
      </el-switch>
    </div> -->

    <!-- <el-dropdown trigger="click" size="small">
      <el-button size="small">
        <img src="../../../icon/svg/col.svg" alt="" />
        Cột {{ listCol[colValue - 1].title.substr(0, 24)
        }}<i class="el-icon-caret-bottom"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <div class="colDropItem">
            <el-radio-group v-model="colValue">
              <el-radio
                v-for="item in listCol"
                :key="item.value"
                :label="item.value"
              >
                <div v-html="item.label"></div>
              </el-radio>
            </el-radio-group>
          </div>
          <hr />
        </el-dropdown-item>
        <el-dropdown-item>Tùy chính cột</el-dropdown-item>
        <el-dropdown-item>Đặt làm mặc định</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->

    <!-- <el-dropdown trigger="click" size="small">
      <el-button size="small">
        <img src="../../../icon/svg/data.svg" alt="" />
        Số liệu chia nhỏ: {{ dataValue }}<i class="el-icon-caret-bottom"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item class="sub1" id="sub1">
          <div class="flex-between">
            Theo thời gian
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="sub11">
            <el-radio-group v-model="dataSplit1">
              <el-radio
                v-for="item in listByTime"
                :key="item.value"
                :label="item.value"
              >
                <div v-html="item.label"></div>
              </el-radio>
            </el-radio-group>
          </div>
        </el-dropdown-item>
        <el-dropdown-item class="sub1" id="sub2">
          <div class="flex-between">
            Theo phân phối
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="sub21">
            <el-radio-group v-model="dataSplit2">
              <el-radio
                v-for="item in listByDistribution"
                :key="item.value"
                :label="item.value"
              >
                <div v-html="item.label"></div>
              </el-radio>
            </el-radio-group>
          </div>
        </el-dropdown-item>
        <el-dropdown-item class="sub1" id="sub3">
          <div class="flex-between">
            Theo hành động
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="sub31">
            <el-radio-group v-model="dataSplit3">
              <el-radio
                v-for="item in listByAction"
                :key="item.value"
                :label="item.value"
              >
                <div v-html="item.label"></div>
              </el-radio>
            </el-radio-group>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->

    <!-- <el-dropdown trigger="click" size="small">
      <el-button size="small" style="line-height: 18px;">
        Báo cáo<i class="el-icon-caret-bottom"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Xuất dữ liệu bảng</el-dropdown-item>
        <el-dropdown-item>Tạo báo cáo tùy chỉnh</el-dropdown-item>
        <el-dropdown-item>Chia sẻ liên kết</el-dropdown-item>
        <el-dropdown-item disabled><b>Báo cáo tiêu chuẩn</b></el-dropdown-item>
        <el-dropdown-item>Quảng cáo</el-dropdown-item>
        <el-dropdown-item>Nhóm quảng cáo</el-dropdown-item>
        <el-dropdown-item>Độ tuổi và giới tính</el-dropdown-item>
        <el-dropdown-item class="sub1" id="sub4">
          <div class="flex-between">
            Tất cả
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="sub41">
            <div class="item"><b>Cơ bản</b></div>
            <div class="item">Tất cả các cấp độ</div>
            <div class="item">Chiến dịch</div>
            <div class="item">Nhóm quảng cáo</div>
            <div class="item">Quảng cáo</div>
            <div class="item">Mục tiêu</div>
            <div class="item">Độ tuổi và giới tính</div>
            <div class="item"><b>Nhân khẩu học</b></div>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->

    <el-dialog
      id="create-campaign"
      :visible.sync="dialogCam"
      :before-close="close"
      width="640px"
    >
      <div slot="title">
        <div id="title">
          <div
            :class="{ item: true, 'mr-21': true, active: tab == 1 }"
            @click="tab = 1"
          >
            Tạo chiến dịch mới
          </div>
          <div :class="{ item: true, active: tab == 2 }" @click="tab = 2">
            Sử dụng chiến dịch có sẵn
          </div>
        </div>
      </div>
      <div id="body-dialog">
        <div v-show="tab == 1">
          <div id="title">Chọn mục tiêu chiến dịch</div>
          <el-radio-group v-model="itemCampaign.objective" style="width: 100%;">
            <el-row :gutter="5" class="groupCam">
              <el-col :span="8">
                <div class="f-12 mb-12 color-2">Nhận thức</div>
                <el-radio disabled :label="`BRAND_AWARENESS`">Nhận thức về<br />thương hiệu</el-radio>
                <el-radio disabled :label="`REACH`">Số người tiếp nhận</el-radio>
              </el-col>
              <el-col :span="8">
                <div class="f-12 mb-12 color-2">Cân nhắc</div>
                <el-radio disabled :label="`LINK_CLICKS`">Lưu lượng truy cập</el-radio>
                <el-radio disabled :label="`INTERACTIVE`">Tương tác</el-radio>
                <el-radio disabled :label="`APP_INSTALLS`">Số lượng cài đặt ứng<br />dụng</el-radio>
                <el-radio disabled :label="`VIDEO_VIEWS`">Số lượt xem video</el-radio>
                <el-radio disabled :label="`LEAD_GENERATION`"
                  >Tìm hiểu khách<br />hàng tiềm năng</el-radio
                >
                <el-radio :label="`MESSAGES`">Tin nhắn</el-radio>
              </el-col>
              <el-col :span="8">
                <div class="f-12 mb-12 color-2">Chuyển đổi</div>
                <el-radio :label="`CONVERSIONS`">Chuyển đổi</el-radio>
                <el-radio disabled :label="`PRODUCT_CATALOG_SALES`">Doanh số theo doanh<br />mục</el-radio>
                <el-radio disabled :label="`LOCAL_AWARENESS`">Lượt ghé thăm cửa<br />hàng</el-radio>
              </el-col>
            </el-row>
          </el-radio-group>
          <div class="extend">
            <div class="extend1">
              <img src="../../../icon/svg/loa.svg" alt="" />
              <div>{{ sologan1 }}</div>
              <div>{{ sologan2 }}</div>
            </div>
            <div v-show="itemCampaign.objective == 'INTERACTIVE'">
              <div>Loại tương tác<i class="el-icon-info"></i></div>
              <el-radio-group class="radio-group" v-model="interactive">
                <el-radio :label="`POST_ENGAGEMENT`" class="mt-12">
                  Tương tác với bài viết
                </el-radio>
                <el-radio :label="`PAGE_LIKES`" class="mt-12">
                  Lượt thích Trang
                </el-radio>
                <el-radio :label="`EVENT_RESPONSES`" class="mt-12">
                  Phản hồi sự kiện
                </el-radio>
              </el-radio-group>
            </div>
            <div class="extend2">
              <div class="collapse" @click="isShowExtend = !isShowExtend">
                <div class="color-1">
                  Đặt tên cho chiến dịch, không bắt buộc
                </div>
                <i class="el-icon-arrow-down"></i>
              </div>
              <div v-show="isShowExtend">
                <div class="title-cam">
                  <i class="el-icon-folder"></i>Chiến dịch
                </div>
                <div style="margin-left: 20px">
                  <div class="mb-8 color-2 f-12">
                    Bao gồm tùy chọn tối ưu hóa ngân sách và mục tiêu chiến
                    dịch.
                  </div>
                  <el-input
                    placeholder="Đặt tên cho chiến dịch này"
                    size="large"
                    v-model="itemCampaign.name"
                  ></el-input>
                  <div>
                    <div class="title-cam">
                      <i class="el-icon-menu"></i>Nhóm quảng cáo
                    </div>
                    <div style="margin-left: 20px">
                      <div class="mb-8 color-2 f-12">
                        Xác định đối tượng, vị trí quảng cáo, lịch chạy và mức
                        chi tiêu.
                      </div>
                      <el-row :gutter="5">
                        <el-col :span="8">
                          <el-select
                            v-model="groupAdvertisement"
                            placeholder=""
                            size="large"
                          >
                            <el-option
                              :label="`Tạo nhóm quảng cáo`"
                              :value="1"
                            ></el-option>
                            <el-option
                              :label="`Dùng nhóm quảng cáo hiện có`"
                              :value="2"
                            ></el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="16">
                          <el-input
                            placeholder="Đặt tên cho nhóm quảng cáo này"
                            v-model="itemAdGroup.name"
                            size="large"
                          ></el-input>
                        </el-col>
                      </el-row>
                      <div class="title-cam">
                        <i class="el-icon-bank-card"></i>Quảng cáo
                      </div>
                      <div style="margin-left: 20px">
                        <div class="mb-8 color-2 f-12">
                          Xác định đối tượng, vị trí quảng cáo, lịch chạy và mức
                          chi tiêu.
                        </div>
                        <el-row :gutter="5">
                          <el-col :span="8">
                            <el-select
                              v-model="advertisement"
                              placeholder=""
                              size="large"
                            >
                              <el-option
                                :label="`Tạo quảng cáo`"
                                :value="1"
                              ></el-option>
                              <el-option
                                :label="`Bỏ qua quảng cáo`"
                                :value="2"
                              ></el-option>
                            </el-select>
                          </el-col>
                          <el-col :span="16">
                            <el-input
                              placeholder="Đặt tên cho nhóm quảng cáo này"
                              v-model="itemAds.name"
                              size="large"
                            ></el-input>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="tab == 2">
          <div class="title-cam"><i class="el-icon-folder"></i>Chiến dịch</div>
          <div style="margin-left: 20px">
            <el-input
              placeholder="Đặt tên cho chiến dịch này"
              size="large"
              v-model="itemCampaign.name"
            ></el-input>
            <div>
              <div class="title-cam">
                <i class="el-icon-menu"></i>Nhóm quảng cáo
              </div>
              <div style="margin-left: 20px">
                <el-row :gutter="5">
                  <el-col :span="8">
                    <el-select
                      v-model="groupAdvertisement"
                      placeholder=""
                      size="large"
                    >
                      <el-option
                        :label="`Tạo nhóm quảng cáo`"
                        :value="1"
                      ></el-option>
                      <el-option
                        :label="`Dùng nhóm quảng cáo hiện có`"
                        :value="2"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="16">
                    <el-input
                      placeholder="Đặt tên cho nhóm quảng cáo này"
                      v-model="itemAdGroup.name"
                      size="large"
                    ></el-input>
                  </el-col>
                </el-row>
                <div class="title-cam">
                  <i class="el-icon-bank-card"></i>Quảng cáo
                </div>
                <div style="margin-left: 20px">
                  <el-row :gutter="5">
                    <el-col :span="8">
                      <el-select
                        v-model="advertisement"
                        placeholder=""
                        size="large"
                      >
                        <el-option
                          :label="`Tạo quảng cáo`"
                          :value="1"
                        ></el-option>
                        <el-option
                          :label="`Bỏ qua quảng cáo`"
                          :value="2"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="16">
                      <el-input
                        placeholder="Đặt tên cho nhóm quảng cáo này"
                        v-model="itemAds.name"
                        size="large"
                      ></el-input>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">Hủy</el-button>
        <el-button type="warning" @click="submit">Tiếp tục</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import commonApi from '@/api/commonApi'
const common = new commonApi()
export default {
  name: 'rowBtn',
  props: {},
  computed: {
    tagCam () {
      return this.$store.getters.tagCam
    },
    tagAdGroup () {
      return this.$store.getters.tagAdGroup
    },
    tagAd () {
      return this.$store.getters.tagAd
    }
  },
  data () {
    return {
      tab: 1,
      isShowExtend: false,
      sologan1: 'Nhận thức về thương hiệu',
      sologan2:
        'Hiển thị quảng cáo cho những người có nhiều khả năng nhớ đến quảng cáo nhất',
      colValue: 1,
      dataSplit1: 1,
      dataSplit2: 1,
      dataSplit3: 1,
      interactive: 'POST_ENGAGEMENT',
      listCol: [
        {
          value: 1,
          label: 'Hiệu quả (Mặc định)',
          title: 'Hiệu quả (Mặc định)'
        },
        {
          value: 2,
          label: 'Thiết lập',
          title: 'Thiết lập'
        },
        {
          value: 3,
          label: 'Phân phối',
          title: 'Phân phối'
        },
        {
          value: 4,
          label: 'Tương tác',
          title: 'Tương tác'
        },
        {
          value: 5,
          label: 'Tương tác với video',
          title: 'Tương tác với video'
        },
        {
          value: 6,
          label: 'Tương tác với ứng dụng',
          title: 'Tương tác với ứng dụng'
        },
        {
          value: 7,
          label: 'Tương tác với quảng<br>cáo quay vòng',
          title: 'Tương tác với quảng cáo quay vòng'
        },
        {
          value: 8,
          label: 'Hiệu quả và số lần nhấp',
          title: 'Hiệu quả và số lần nhấp'
        },
        {
          value: 9,
          label: 'Trên nhiều thiết bị',
          title: 'Trên nhiều thiết bị'
        },
        {
          value: 10,
          label: 'Chuyển đổi office',
          title: 'Chuyển đổi office'
        },
        {
          value: 11,
          label: 'Nhắm mục tiêu và nội dung',
          title: 'Nhắm mục tiêu và nội dung'
        },
        {
          value: 12,
          label: 'Giá thầu và tối ưu hóa',
          title: 'Giá thầu và tối ưu hóa'
        },
        {
          value: 13,
          label: 'Tương tác qua tin nhắn',
          title: 'Tương tác qua tin nhắn'
        }
      ],
      listByTime: [
        {
          value: 1,
          label: 'Không có'
        },
        {
          value: 2,
          label: 'Ngày'
        },
        {
          value: 3,
          label: 'Tuần'
        },
        {
          value: 4,
          label: '2 tuần'
        },
        {
          value: 5,
          label: 'Tháng'
        }
      ],
      listByDistribution: [
        {
          value: 1,
          label: 'Không có'
        },
        {
          value: 2,
          label: 'Tuổi'
        },
        {
          value: 3,
          label: 'Giới tính'
        },
        {
          value: 4,
          label: 'Độ tuổi và giới tính'
        },
        {
          value: 5,
          label: 'Vị trí kinh doanh'
        },
        {
          value: 6,
          label: 'Quốc gia'
        },
        {
          value: 7,
          label: 'Vùng'
        },
        {
          value: 8,
          label: 'Khu vực DMA'
        },
        {
          value: 9,
          label: 'Thiết bị hiển thị'
        },
        {
          value: 10,
          label: 'Loại file phương tiện'
        },
        {
          value: 11,
          label: 'Nền tảng'
        },
        {
          value: 12,
          label: 'Nền tảng và thiết bị'
        },
        {
          value: 13,
          label: 'Vị trí quảng cáo'
        },
        {
          value: 14,
          label: 'Vị trí quảng cáo và thiết bị'
        },
        {
          value: 15,
          label: 'ID sản phẩm'
        },
        {
          value: 16,
          label: 'Thời gian trong ngày (Múi giờ của tài khoản quảng cáo)'
        },
        {
          value: 17,
          label: 'Thời gian trong ngày (Múi giờ của người xem)'
        }
      ],
      listByAction: [
        {
          value: 1,
          label: 'Không có'
        },
        {
          value: 2,
          label: 'Thiết bị Chuyển đổi'
        },
        {
          value: 3,
          label: 'Loại cảm xúc về bài viết'
        },
        {
          value: 4,
          label: 'Trang đích'
        },
        {
          value: 5,
          label: 'Loại xem video'
        },
        {
          value: 6,
          label: 'Âm thanh video'
        },
        {
          value: 7,
          label: 'Thẻ quay vòng'
        }
      ],
      checkStatus: false,
      dataValue: '',
      dialogCam: false,
      groupAdvertisement: 1,
      advertisement: 1,
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
      ],
      itemCampaign: {
        name: '',
        objective: ''
      },
      itemAdGroup: {},
      itemAds: {}
    }
  },
  methods: {
    getAllItem () {
      this.itemCampaign = JSON.parse(JSON.stringify({...this.$store.getters.itemCampaign}))
      this.itemAdGroup = {...this.$store.getters.itemAdGroup}
      this.itemAds = {...this.$store.getters.itemAd}
    },
    setAllItem () {
      this.$store.dispatch('setItemCampaign', this.itemCampaign)
      this.$store.dispatch('setItemAdGroup', this.itemAdGroup)
      this.$store.dispatch('setItemAd', this.itemAds)
    },
    showDialogCam () {
      this.dialogCam = true
      this.getAllItem()
    },
    close () {
      this.dialogCam = false
      this.interactive = this.$store.getters.interactive
      // this.$store.dispatch('setItemCampaign', tempCampaign)
      // this.$store.dispatch('setItemAdGroup', tempAdGroup)
      // this.$store.dispatch('setItemAd', tempAd)
    },
    submit () {
      this.dialogCam = false
      if(this.itemCampaign.objective == 'INTERACTIVE') {
        this.$store.dispatch('setInteractive', this.interactive)
      }
      this.$store.dispatch('setShowDraw', true)
      this.setAllItem()
    },
    editCommand (command) {
      switch (command) {
        case 'delete':
          this.$emit('deleteItem')
          break;
      
        default:
          break;
      }
    },
    edit() {
      this.$emit('showEdit')
    }
  },
  mounted() {
    // this.getAllItem()
  }
}
</script>

<style></style>
