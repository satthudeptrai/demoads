<template>
  <div>
    <div v-loading="isLoading" v-show="edit">
      <el-card shadow="always">
        <div class="title-campaign mb-12"><b>Tên chiến dịch</b></div>
        <el-input placeholder="Tên chiến dịch" v-model="item.name" size="medium"></el-input>
      </el-card>
      <el-card shadow="always">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
          <b class="f-16">Hạng mục quảng cáo đặc biệt</b>
          <div class="ver-align">
            <div class="mr-10">{{ choose ? 'Bật' : 'Tắt' }}</div>
            <el-switch disabled v-model="choose" class="switch-type1" active-color="#FF5F0B"></el-switch>
          </div>
        </div>
        <div class="mt-8 f-12">
          Theo yêu cầu, bạn phải tuyên bố xem quảng cáo của mình có liên quan đến
          vấn đề xã hội, bầu cử hoặc chính trị hay không.
          <el-link type="warning" class="f-12">Tìm hiểu thêm</el-link>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="title-campaign"><b>Chi tiết chiến dịch</b></div>
        <div class="label-draw"><b>Cách mua</b></div>
        <el-select v-model="item.buying_type" placeholder="Cách mua" size="medium">
          <el-option :label="`Đấu giá`" :value="`AUCTION`"> </el-option>
          <el-option :label="`Đặt trước`" :value="`RESERVED`"> </el-option>
        </el-select>
        <div class="label-draw"><b>Mục tiêu chiến dịch</b></div>
        <el-radio-group v-model="item.objective" style="width: 100%;" @change="changeObjective()">
          <el-row :gutter="5" class="groupCam mt-8">
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
              <el-radio disabled :label="`LEAD_GENERATION`">Tìm hiểu khách<br />hàng tiềm năng</el-radio>
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
        <div v-show="item.objective == 'INTERACTIVE'">
          <div>Loại tương tác<i class="el-icon-info"></i></div>
          <el-radio-group class="radio-group" v-model="interactive">
            <el-radio :label="`POST_ENGAGEMENT`" class="mt-12">
              <div class="color-1">Tương tác với bài viết</div>
            </el-radio>
            <el-radio :label="`PAGE_LIKES`" class="mt-12">
              <div class="color-1">Lượt thích Trang</div>
            </el-radio>
            <el-radio :label="`EVENT_RESPONSES`" class="mt-12">
              <div class="color-1">Phản hồi sự kiện</div>
            </el-radio>
          </el-radio-group>
        </div>
        <el-link class="mt-10" type="warning" @click="isSpendCap = !isSpendCap">Hiển thị thêm tùy chọn</el-link>
        <div v-show="isSpendCap">
          <div class="f-14 color-4 mt-10">Giới hạn chi tiêu của chiến dịch<span class="color-2">∙Không bắt buộc</span><i class="el-icon-info"></i></div>
          <div class="mt-5">
            <el-checkbox @change="setBudgetType(1)" v-model="isLimit">Thêm giới hạn chi tiêu của chiến dịch</el-checkbox>
            <div v-show="isLimit">
              <NumberFormat
                class="mt-5"
                v-model="item.spend_cap"
                separator=","
                :min="0"
                :empty-value="0"
                :placeholder="`Chưa đặt giới hạn`"
                :append="`VNĐ`"
                size="mini" />
                <div class="f-12 color-2">Tổng chi tiêu 0 ₫</div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="title-campaign"><b>Thử nghiệm A/B</b></div>
        <div class="f-12 mt-8">
          Thử nghiệm các chiến dịch, nhóm quảng cáo và quảng cáo với nhau để xem
          chiến lược nào mang lại kết quả tốt nhất. Số người tiếp cận tiềm năng sẽ
          được chia cho các biến để có kết quả chính xác hơn.
          <el-link type="warning" class="f-12">Tìm hiểu thêm</el-link>
        </div>
        <div class="card-sp">
          <div style="padding: 10px 30px;">
            <p><b>Cách tạo thử nghiệm A/B đã thay đổi</b></p>
            <p>
              Giờ đây, bạn có thể tạo biến thể của thử nghiệm sau khi đăng chiến
              dịch. Khi bạn đăng xong, hãy chọn một biến và tạo phiên bản mới để
              so sánh với phiên bản gốc.
            </p>
            <!-- <el-button size="medium" style="margin-top: 10px">Bắt đầu</el-button> -->
          </div>
        </div>
      </el-card>
      <el-card shadow="always">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
          <b class="f-16">Tối ưu hóa ngân sách chiến dịch</b>
          <div class="ver-align">
            <div class="mr-10">{{ isOptimal ? 'Bật' : 'Tắt' }}</div>
            <el-switch v-model="isOptimal" class="switch-type1" active-color="#FF5F0B"></el-switch>
          </div>
        </div>
        <div class="mt-8">
          <span class="fs-12">Tính năng tối ưu hóa ngân sách chiến dịch sẽ phân bổ ngân sách của
            bạn cho các nhóm quảng cáo để thu về nhiều kết quả hơn, tùy theo lựa
            chọn tối ưu hóa phân phối và chiến lược giá thầu của bạn. Bạn có thể
            kiểm soát mức chi tiêu cho mỗi nhóm quảng cáo.</span
          >
          <el-link type="warning" class="f-12">Tìm hiểu thêm</el-link>
        </div>
        <div v-show="isOptimal">
          <b>Ngân sách chiến dịch</b>
          <el-row :gutter="10" style="margin: 5px 0;">
            <el-col :span="10">
              <el-select v-model="item.budget_type" placeholder="Ngân sách">
                <el-option :label="`Ngân sách hàng ngày`" :value="1"></el-option>
                <el-option :disabled="isLimit" :label="`Ngân sách trọn đời`" :value="2"></el-option>
              </el-select>
            </el-col>
            <el-col :span="10">
              <NumberFormat
                v-model="item.budget"
                separator=","
                :min="0"
                size="large"
                :empty-value="0"
                :placeholder="`Nhập số tiền`"
                :append="`VNĐ`" />
            </el-col>
          </el-row>
          <div>
            <span class="fs-12"
              >Số tiền chi tiêu thực tế hàng ngày có thể thay đổi.</span
            >
            <i class="el-icon-info"></i>
          </div>
          <b>Chiến lược giá thầu chiến dịch</b>
          <el-select
            v-model="item.bid_strategy"
            placeholder="Ngân sách"
            style="margin: 5px 0;"
          >
            <el-option :label="`Chi phí thấp nhất`" :value="`LOWEST_COST_WITHOUT_CAP`"></el-option>
            <el-option :disabled="item.objective == 'BRAND_AWARENESS'" :label="`Giới hàn giá thầu`" :value="`LOWEST_COST_WITH_BID_CAP`"></el-option>
            <el-option :disabled="item.objective == 'BRAND_AWARENESS' || item.objective == 'REACH' || item.objective == 'LOCAL_AWARENESS' || item.objective == 'MESSAGES'" :label="`Giới hạn chi phí`" :value="`COST_CAP`"></el-option>
          </el-select>
          <el-link type="warning">Hiển thị thêm tùy chọn</el-link>
        </div>
      </el-card>
    </div>
    <div v-show="!edit">
      <el-card class="box-card">
        <div class="title-campaign"><b>Tên chiến dịch</b></div>
        <div class="content">
          {{ item.name }}<br>
          ID: {{ item.id }}
        </div>
        <div class="title-campaign"><b>Hạng mục quảng cáo đặc biệt</b></div>
        <div class="content">
          Chưa chọn hạng mục
        </div>
        <div class="title-campaign"><b>Cách mua</b></div>
        <div class="content">
          {{ item.buying_type == 'AUCTION' ? 'Đấu giá' : 'Kín đáo' }}
        </div>
        <div class="title-campaign"><b>Mục tiêu</b></div>
        <div class="content">
          {{ convertTaget(item.objective) }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import NumberFormat from '@/components/NumberFormat'
import commonApi from '@/api/commonApi'
const common = new commonApi()
export default {
  name: 'tabCampaign',
  components: { NumberFormat },
  props: {
    edit: {
      required: true,
      type: Boolean
    },
    flag: {
      required: true,
      type: Boolean
    }
  },
  computed: {
    itemCampaign () {
      return this.$store.getters.itemCampaign
    },
    idCampaign () {
      return this.$store.getters.idCampaign
    },
    showDraw() {
      return this.$store.getters.showDraw
    }
  },
  watch: {
    flag(val) {
      if(!this.isOptimal) {
        this.item.budget_type = ''
      }
      if(!this.isLimit) {
        delete this.item.spend_cap
      }
      if(this.item.objective == 'INTERACTIVE') {
        this.$store.dispatch('setInteractive', this.interactive)
      }
      this.$store.dispatch('setItemCampaign', this.item)
    },
    showDraw(val) {
      if(!val) {
        this.isOptimal = false
        this.isLoading = false
        this.isSpendCap = false
        this.isLimit = false
      }
    },
    itemCampaign(val) {
      if(val.status == 'PAUSED') {
        this.$store.dispatch('setIsTemp', true)
      } else {
        this.$store.dispatch('setIsTemp', false)
      }
      this.item = val
      if(this.item.objective == 'POST_ENGAGEMENT' || this.item.objective == 'EVENT_RESPONSES' || this.item.objective == 'PAGE_LIKES') {
        this.interactive = this.item.objective
        this.item.objective = 'INTERACTIVE'
      } else {
        this.interactive = this.$store.getters.interactive
      }
      
    },
    idCampaign (val) {
      if(val) {
        this.isLoading = true
        common.callApi({
          type: "GET",
          _id: val
        }).then(reps => {
          if (reps.code == 200) {
            if(reps.data._id) {
              let temp = reps.data.data
              if(temp.daily_budget) {
                temp.budget = temp.daily_budget
                temp.budget_type = 1
              } 
              if(temp.lifetime_budget) {
                temp.budget = temp.lifetime_budget
                temp.budget_type = 2
              }
              if(!temp.spend_cap) {
                temp.spend_cap = 0
              }
              if(temp.spend_cap) {
                this.isSpendCap = true
                this.isLimit = true
              }
              if(temp.objective == 'POST_ENGAGEMENT' || temp.objective == 'EVENT_RESPONSES' || temp.objective == 'PAGE_LIKES') {
                this.interactive = temp.objective
                temp.objective = 'INTERACTIVE'
              }
              this.item = temp
              this.$store.dispatch('setItemCampaign', temp)
              if(reps.data.status == 'PAUSED') {
                this.$store.dispatch('setIsTemp', true)
              } else {
                this.$store.dispatch('setIsTemp', false)
              }
            }
          }
        }).catch((error) => {
            this.catchError(error)
        }).finally(() => {
          this.isLoading = false
        });
      } else {
        this.item = this.$store.getters.itemCampaign
      }
      this.interactive = this.$store.getters.interactive
    }
  },
  data () {
    return {
      item: {},
      interactive: 'POST_ENGAGEMENT',
      choose: false,
      isOptimal: false,
      isLoading: false,
      isSpendCap: false,
      isLimit: false
    }
  },
  methods: {
    catchError(error) {
      if(error.response.data.code == 403) {
        if (error.response.data.message.error_user_msg) {
          this.$message.error(error.response.data.message.error_user_msg);
        }
        else if(!error.response.data.message.error_user_msg && error.response.data.message.message) {
          this.$message.error(error.response.data.message.message);
        }
        else if(error.response.data.message == "REQUIRE_AUTHORIZATION") {
          this.$router.push({ name: 'login' })
        }
      }
    },
    convertTaget(value) {
      switch (value) {
        case 'BRAND_AWARENESS':
          return 'Nhận thức về thương hiệu'
          break;
        case 'REACH':
          return 'Số người tiếp nhận'
          break;
        case 'LINK_CLICKS':
          return 'Lưu lượng truy cập'
          break;
        case 'INTERACTIVE':
          if(this.interactive == 'POST_ENGAGEMENT') {
            return 'Tương tác với bài viết'
          }
          if(this.interactive == 'PAGE_LIKES') {
            return 'Lượt thích Trang'
          }
          if(this.interactive == 'EVENT_RESPONSES') {
            return 'Phản hồi sự kiện'
          }
          break;
        case 'APP_INSTALLS':
          return 'Số lượng cài đặt ứng dụng'
          break;
        case 'VIDEO_VIEWS':
          return 'Số lượt xem video'
          break;
        case 'LEAD_GENERATION':
          return 'Tìm hiểu khách hàng tiềm năng'
          break;
        case 'MESSAGES':
          return 'Tin nhắn'
          break;
        case 'CONVERSIONS':
          return 'Chuyển đổi'
          break;
        case 'PRODUCT_CATALOG_SALES':
          return 'Doanh số theo doanh mục'
          break;
        case 'LOCAL_AWARENESS':
          return 'Lượt ghé thăm cửa hàng'
          break;
        default:
          break;
      }
    },
    setBudgetType(type) {
      this.item.budget_type = type
    },
    changeObjective() {
      if(this.item.objective == 'BRAND_AWARENESS' ||
        ((this.item.objective == 'REACH' ||
          this.item.objective == 'LOCAL_AWARENESS' ||
          this.item.objective == 'MESSAGES')
        && this.item.bid_strategy == 'COST_CAP')) {
        this.item.bid_strategy = 'LOWEST_COST_WITHOUT_CAP'
      }
    }
  },
  mounted () {
    this.item = this.$store.getters.itemCampaign
    if(this.item.objective == 'POST_ENGAGEMENT' || this.item.objective == 'EVENT_RESPONSES' || this.item.objective == 'PAGE_LIKES') {
      this.interactive = this.item.objective
      this.item.objective = 'INTERACTIVE'
    } else {
      this.interactive = this.$store.getters.interactive
    }
    if(this.item.status == 'PAUSED') {
      this.$store.dispatch('setIsTemp', true)
    } else {
      this.$store.dispatch('setIsTemp', false)
    }
  }
}
</script>

<style></style>
