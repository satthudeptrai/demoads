<template>
  <div v-loading="isLoadingPage">
    <el-row :gutter='20' style="width: 100vw; height: 100vh; color: #1A202C;">
      <el-col :span='1'>
        <!-- <el-menu default-active='5' class='el-menu-vertical' :collapse='true'>
          <el-menu-item index='1'>
            <img src="../../icon/svg/home.svg" alt="" style="width: 20px">
            <span slot='title'>Trang chủ Facebook</span>
          </el-menu-item>

          <el-menu-item index='2'>
            <img src="../../icon/svg/menu.svg" alt="" style="width: 18px">
            <span slot='title'>Công cụ kinh doanh</span>
          </el-menu-item>

          <el-menu-item index='3'>
            <img src="../../assets/avatar.jpg" alt="" id="avatar">
            <span slot='title'>Ánh</span>
          </el-menu-item>

          <el-menu-item index='4'>
            <img src="../../icon/svg/all.svg" alt="" style="width: 20px">
            <span slot='title'>Tổng quan về tài khoản</span>
          </el-menu-item>
          <el-menu-item index='5'>
            <img src="../../icon/svg/camCol.svg" alt="" style="width: 20px">
            <span slot='title'>Chiến dịch</span>
          </el-menu-item>

            <el-menu-item index='6'>
              <div class="posi-bt">
                <div>
                  <img src="../../icon/svg/setting.svg" alt="">
                  <span slot='title'>Cài đặt</span>
                </div>
                <div>
                  <img src="../../icon/svg/notification.svg" alt="">
                  <span slot='title'>Thông báo</span>
                </div>
                <div>
                  <img src="../../icon/svg/search.svg" alt="">
                  <span slot='title'>Tìm kiếm</span>
                </div>
                <div>
                  <img src="../../icon/svg/question.svg" alt="">
                  <span slot='title'>Trung tâm trợ giúp</span>
                </div>
                <div>
                  <img src="../../icon/svg/link.svg" alt="">
                  <span slot='title'>Mở rộng</span>
                </div>
              </div>
            </el-menu-item>
        </el-menu> -->
        <div style="opacity: 0">a</div>
      </el-col>
      <el-col id='dashboad' :span='22'>
        <!-- row1 -->
        <el-row :gutter='20'>
          <el-col :span='12'>
            <div class="row1">
              <b style="font-size: 18px; white-space: nowrap;">{{ title }}</b>
              <el-row :gutter='20' style="width: 80%">
                <el-col :span='18'>
                  <el-select
                    v-model='userId'
                    filterable
                    placeholder=''
                    size='small'
                    @change="changeUser"
                  >
                    <el-option v-for="item in listUser" :key="item.id" :value="item.id" :label="item.name">
                      {{ item.name }}
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span='12'>
            <div class="row1" id="row12">
              <div style="font-size: 14px;color: #333333;">Thời gian cập nhật: {{ time == 0 ? 'vừa xong' : time + 'phút' }}</div>
              <div>
                <el-button @click="getAll()" size='small' class="btn-type1">
                  <img src="../../icon/svg/reset.svg" alt="">
                </el-button>
              </div>
              <div>
                <el-button size='small' class="btn-type1" @click="deleteTemp()">
                  Bỏ bản nháp
                </el-button>
              </div>
              <div>
                <el-button size='small' class="btn-type1">
                  Đăng bản nháp
                </el-button>
              </div>
              <div>
                <el-button size='small' class="btn-type1">
                  <i class='el-icon-more'></i>
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- row2 -->
        <el-row :gutter='20' id="row2">
          <el-col :span='16'>
            <el-card class="box-card" style="overflow: initial;">
              <div id='search'>
                <img src="../../icon/svg/search.svg" alt="">
                <div class="parent">
                  <el-input
                    placeholder='Tìm kiếm và lọc'
                    size='small'
                    v-model='searchValue'
                    @focus="openSearch"
                    @blur="closeSearch"
                  ></el-input>
                  <div class="child box-style2">
                    <div><b>Tìm kiếm gần đây</b></div>
                    <el-divider style="margin: 8px 0"></el-divider>
                    <div><b>Bộ lọc</b></div>
                    <div style="cursor: pointer;" @click="selectItemSearch()">Lọc theo lựa chọn</div>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span='8'>
            <el-date-picker
              size="small"
              unlink-panels
              class="date-time-range"
              popper-class="pop-time-range"
              v-model='dateTime'
              type='daterange'
              :picker-options='pickerOptions'
              range-separator='To'
              start-placeholder='Start date'
              end-placeholder='End date'
            >
            </el-date-picker>
          </el-col>
        </el-row>
        <!-- row3 -->
        <el-row :gutter="20" id="row3">
          <el-col :span="24">
            <el-tabs type="border-card" @tab-click="handleClick" stretch id="main-tab">
              <el-tab-pane label="Chiến dịch">
                <span slot="label">
                  <div class="tab-label">
                    <img src="../../icon/svg/campaign.svg" alt="">
                    Chiến dịch
                  </div>
                  <el-tag
                    v-show="campaignCount != 0"
                    type="warning"
                    closable
                    :disable-transitions="false"
                    @close="handleClose('cam')">
                    Đã chọn {{ campaignCount }} mục
                  </el-tag>
                </span>
                <row-btn @deleteItem="deleteItem" @showEdit="showEdit" />
                <campaign
                v-if="dataFilter1.length > 0"
                :data="dataFilter1"
                @changeNameCam="changeNameCam"
                @openTabIndex="openTabIndex" />
                <div v-if="dataFilter1.length == 0" class="empty">
                  <img src="../../icon/svg/plus.svg" alt="">
                  <div><b>Không tìm thấy kết quả</b></div>
                  <div>Bạn chưa tạo quảng cáo nào</div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="Nhóm quảng cáo">
                <span slot="label">
                  <div class="tab-label">
                    <img src="../../icon/svg/adGroup.svg" alt="">
                    Nhóm quảng cáo
                  </div>
                  <el-tag
                    v-show="adGroupCount != 0"
                    type="warning"
                    closable
                    :disable-transitions="false"
                    @close="handleClose('adGroup')">
                    Đã chọn {{ adGroupCount }} mục
                  </el-tag>
                </span>
                <row-btn @deleteItem="deleteItem" @showEdit="showEdit" />
                <adGroup
                v-if="dataFilter2.length > 0"
                :data="dataFilter2"
                @changeNameAdGroup="changeNameAdGroup"
                @openTabIndex="openTabIndex" />
                <div v-if="dataFilter2.length == 0" class="empty">
                  <img src="../../icon/svg/plus.svg" alt="">
                  <div><b>Không tìm thấy kết quả</b></div>
                  <div>Bạn chưa tạo quảng cáo nào</div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="Quảng cáo">
                <span slot="label">
                  <div class="tab-label">
                    <img src="../../icon/svg/ads.svg" alt="">
                    Quảng cáo
                  </div>
                  <el-tag
                    v-show="adCount != 0"
                    type="warning"
                    closable
                    :disable-transitions="false"
                    @close="handleClose('ad')">
                    Đã chọn {{ adCount }} mục
                  </el-tag>
                </span>
                <row-btn @deleteItem="deleteItem" @showEdit="showEdit" />
                <advertisement
                v-if="dataFilter3.length > 0"
                :data="dataFilter3"
                @changeNameAd="changeNameAd"
                @openTabIndex="openTabIndex" />
                <div v-if="dataFilter3.length == 0" class="empty">
                  <img src="../../icon/svg/plus.svg" alt="">
                  <div><b>Không tìm thấy kết quả</b></div>
                  <div>Bạn chưa tạo quảng cáo nào</div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span='1' class="col-end">
        <div><i class="el-icon-close"></i></div>
        <div @click="showEdit()"><i class="el-icon-edit"></i></div>
        <div><i class="el-icon-time"></i></div>
      </el-col>
    </el-row>
    <el-drawer
      size='97%'
      :with-header="false"
      :visible.sync="showDraw"
      :append-to-body="true"
      direction="rtl"
      :before-close="handleCloseDraw">
      <el-row :gutter="1">
        <el-col :span="1">
          <div class="col-btn">
            <el-button type="info" size="small" @click="handleCloseDraw">
              <i class="el-icon-close"></i>
            </el-button>
            <el-button type="info" size="small">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button type="info" size="small">
              <i class="el-icon-time"></i>
            </el-button>
          </div>
        </el-col>
        <el-col :span="5" style="height: 100vh; border-right: solid 0.1px #000;">
          <div class="col-menu">
            <div :class="{ 'title-col': true, active: isActive == 1 }" style="padding-left: 18px" @click="switchTab(idCampaign, -1, -1, 1)">
              <div>
                <i class="el-icon-folder"></i><span>Chiến dịch mới</span>
              </div>
              <div class="mr-16 parent">
                <el-dropdown trigger="click" @command="campaignCommand">
                  <i class="el-icon-more color-1"></i>
                   <el-dropdown-menu slot="dropdown">
                     <el-dropdown-item>Sao chép</el-dropdown-item>
                     <el-dropdown-item>Dán</el-dropdown-item>
                     <el-dropdown-item :disabled="idCampaign ==''" command="delete">Xóa</el-dropdown-item>
                     <el-dropdown-item :disabled="isAddAdSet()" command="add">Tạo nhóm quảng cáo</el-dropdown-item>
                     <el-dropdown-item>Tạo quy tắc</el-dropdown-item>
                     <el-dropdown-item>ID: {{ idCampaign }}</el-dropdown-item>
                   </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div v-for="(level2, index2) in listAdGroup" :key="level2.id">
              <div :class="{ 'is-diable': idCampaign == '', 'title-col': true, active: isActive == 2 && index2 == indexAdGroup }" style="padding-left: 28px" @click="switchTab(level2.id, index2, -1, 2)">
                <div>
                  <i class="el-icon-menu"></i><span>Nhóm quảng cáo mới</span>
                </div>
                <div class="mr-16">
                  <el-dropdown trigger="click" @command="adGroupCommand">
                    <i class="el-icon-more color-1"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>Sao chép</el-dropdown-item>
                      <el-dropdown-item>Dán</el-dropdown-item>
                      <el-dropdown-item :disabled="level2.id == '' || listAdGroup.length <= 1" command="delete">Xóa</el-dropdown-item>
                      <el-dropdown-item :disabled="isAddAd()" command="add">Tạo quảng cáo</el-dropdown-item>
                      <el-dropdown-item>Tạo quy tắc</el-dropdown-item>
                      <el-dropdown-item>ID: 3239583052</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
              <div v-for="(level3, index3) in level2.listAds" :key="level3.id">
                <div :class="{ 'is-diable': level2.id == '', 'title-col': true, active: isActive == 3 && index2 == indexAdGroup && index3 == indexAd }" style="padding-left: 35px" @click="switchTab(level3.id, index2, index3, 3)">
                  <div>
                    <i class="el-icon-bank-card"></i><span>Quảng cáo mới</span>
                  </div>
                  <div class="mr-16">
                    <el-dropdown trigger="click" @command="adsCommand">
                      <i class="el-icon-more color-1"></i>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>Sao chép</el-dropdown-item>
                        <el-dropdown-item>Dán</el-dropdown-item>
                        <el-dropdown-item :disabled="level3.id == '' || level2.listAds.length <= 1" command="delete">Xóa</el-dropdown-item>
                        <el-dropdown-item>Tạo quy tắc</el-dropdown-item>
                        <el-dropdown-item>ID: 3239583052</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="18" class="mt-8" v-loading="isLoading">
          <div class="flex-between">
            <div class="bread-crumb ml-26">
              <span :class="{ 'bread-crumb-item': true, active: isActive == 1 }"><i class="el-icon-folder mr-7"></i>Chiến dịch mới</span><i class="el-icon-arrow-right ml-28 mr-26"></i>
              <span :class="{ 'bread-crumb-item': true, active: isActive == 2 }"><i class="el-icon-menu mr-7"></i>Nhóm quảng cáo mới</span><i class="el-icon-arrow-right ml-28 mr-26"></i>
              <span :class="{ 'bread-crumb-item': true, active: isActive == 3 }"><i class="el-icon-bank-card mr-7"></i>Quảng cáo mới</span>
            </div>
            <div class="ver-align mr-16">
              <div>
                Bản nháp
                <el-switch
                  v-model="inverseGIsTemp"
                  active-color="#FF5F0B">
                </el-switch>
              </div>
              <el-button icon="el-icon-more" size="mini" class="ml-16"></el-button>
            </div>
          </div>
          <div class="group-btn">
            <div @click="edit = true" :class="{ active: edit }">
              <i class="el-icon-edit"></i>Chỉnh sửa
            </div>
            <div @click="edit = false" :class="{ active: !edit }">
              <i class="el-icon-view"></i>Xem lại
            </div>
          </div>
          <div class="body-draw">
            <div v-show="isActive == 1">
              <el-row :gutter="5">
                <el-col :offset="5" :span="14" class="tab">
                  <tabCampaign
                  :edit="edit"
                  :flag="flagCampaign" />
                </el-col>
              </el-row>
            </div>
            <div v-show="isActive == 2">
              <el-row :gutter="8" style="margin-left: 0;margin-right: 2px;">
                <el-col :offset="edit ? 0 : 4" :span="16" class="tab">
                  <tabAdGroup
                  :edit="edit"
                  :flag="flagAdGroup"
                  :tab="isActive" />
                </el-col>
                <el-col v-show="edit" :span="8" class="tab">
                  <tabAdGroupRight />
                </el-col>
              </el-row>
            </div>
            <div v-show="isActive == 3" class="tab">
              <el-row :gutter="8" style="margin-left: 0; margin-right: 2px;">
                <el-col :offset="edit ? 0 : 4" :span="edit ? 12 : 16" class="tab">
                  <tabAd
                  :edit="edit"
                  :item-ad="itemAd"
                  :flag="flagAds" />
                </el-col>
                <el-col :span="12" class="tab" v-show="edit">
                  <tabAdRight />
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="drawer__footer">
            <div class="flex-between">
              <div class="ver-align" style="margin-left: 23px; color: #27AE60">
                <i class="el-icon-check mr-11"></i>
                <div>Đã lưu thay đổi</div>
              </div>
              <div class="mr-18">
                <el-button @click="handleCloseDraw" size="medium">Đóng</el-button>
                <!-- <el-button @click="preview" v-show="isActive !== 1" size="medium">Quay lại</el-button> -->
                <el-button type="warning" @click="next" v-show="isActive !== 3" size="medium">Tiếp</el-button>
                <el-button type="warning" @click="upload" v-show="isActive == 3" size="medium">Đăng</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import campaign from './campaign'
import adGroup from './adGroup'
import advertisement from './advertisement'
import rowBtn from './share/rowBtnTemp.vue'
import tabCampaign from '../tab/campaign'
import tabAdGroup from '../tab/adGroup'
import tabAdGroupRight from '../tab/adGroupRight'
import tabAd from '../tab/advertisement'
import tabAdRight from '../tab/adRight'
import billInfo from '../billing/billInfo'
import cal from '../billing/currencyAndLocation'
import adCode from '../billing/adCode'
import company from '../billing/company'
import cad from '../billing/creditAndDebit'
import commonApi from '@/api/commonApi'
const common = new commonApi()
const tempCampaign = {
  name: 'Chiến dịch mới',
  status: 'PAUSED',
  bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
  budget: 30000,
  spend_cap: 0,
  budget_type: 1,
  buying_type: 'AUCTION',
  objective: 'MESSAGES',
  special_ad_categories: []
}
const tempAdGroup = {
  name: 'Nhóm quảng cáo',
  optimization_goal: 'CONVERSATIONS',
  billing_event: 'IMPRESSIONS',
  bid_amount: 100000,
  budget: 30000,
  budget_type: 1,
  campaign_id: null,
  targeting: {
      geo_locations: {
      countries: ['VN']
    },
    age_min: 13,
    age_max: 13,
    interests: [],
    locales: [],
    genders: 0,
    publisher_platforms: [],
  },
  promoted_object: {
    page_id: ''
  },
  start_time: new Date(),
  end_time: '',
  status: 'PAUSED'
}
const tempAd = {
  name: 'Quảng cáo mới',
  adset_id: null,
  creative: {
    creative_id: ""
  },
  status: 'PAUSED'
}
const tempPost = {
  name: "",
  object_story_spec: {
    page_id: "",
    link_data: {
      link: ''
    }
  },
}
const tempListAdGroup = [
  {
    id: "",
    listAds: [
      {
        id: ""
      }
    ]
  }
]
export default {
  name: 'desktop',
  components: { campaign, adGroup, advertisement, rowBtn, tabCampaign, tabAdGroupRight, tabAdGroup, tabAd, tabAdRight, billInfo, cal, adCode, company, cad },
  computed: {
    showDraw () {
      return this.$store.getters.showDraw
    },
    itemCampaign () {
      return this.$store.getters.itemCampaign
    },
    itemAdGroup () {
      return this.$store.getters.itemAdGroup
    },
    itemAd () {
      return this.$store.getters.itemAd
    },
    idCampaign () {
      return this.$store.getters.idCampaign
    },
    idAdGroup () {
      return this.$store.getters.idAdGroup
    },
    idAds () {
      return this.$store.getters.idAds
    },
    listAdGroup() {
      return this.$store.getters.listAdGroup
    },
    gUserId() {
      return this.$store.getters.userId
    },
    gIsTemp: {
      get: function () {
        return this.$store.getters.isTemp
      },
      set: function (value) {
        this.$store.dispatch('setIsTemp', value)
      }
    },
    inverseGIsTemp() {
      return !this.gIsTemp
    },
    campaignCount () {
      return this.$store.getters.tagCam.length
    },
    adGroupCount () {
      return this.$store.getters.tagAdGroup.length
    },
    adCount () {
      return this.$store.getters.tagAd.length
    },
    tagCam () {
      return this.$store.getters.tagCam
    },
    tagAdGroup () {
      return this.$store.getters.tagAdGroup
    },
    tagAd () {
      return this.$store.getters.tagAd
    },
    dataFilter1 () {
      if(this.dateTime) {
        return this.data1.filter(i => new Date(i.created_time) >= new Date(this.dateTime[0]) && new Date(i.created_time) <= new Date(this.dateTime[1]))
      } else {
        return this.data1
      }
    },
    dataFilter2 () {
      let listFilterTemp = this.data2
      if(this.dateTime) {
        listFilterTemp = this.data2.filter(i => new Date(i.created_time) >= new Date(this.dateTime[0]) && new Date(i.created_time) <= new Date(this.dateTime[1]))
      } 
      if(this.campaignCount > 0) {
        listFilterTemp = this.data2.filter(i => {
          let checkTemp = false
          this.tagCam.forEach(j => {
            if(j._id == i.data.campaign_id) {
              checkTemp = true
            }
          })
          return checkTemp
        })
      }
      return listFilterTemp
    },
    dataFilter3 () {
      let listFilterTemp = this.data3
      if(this.dateTime) {
        listFilterTemp = this.data3.filter(i => new Date(i.created_time) >= new Date(this.dateTime[0]) && new Date(i.created_time) <= new Date(this.dateTime[1]))
      }
      if(this.campaignCount > 0) {
        listFilterTemp = this.data3.filter(i => {
          let checkTemp = false
          this.tagCam.forEach(j => {
            if(j._id == i.data.campaign_id) {
              checkTemp = true
            }
          })
          return checkTemp
        })
      }
      if(this.adGroupCount > 0) {
        listFilterTemp = this.data3.filter(i => {
          let checkTemp = false
          this.tagAdGroup.forEach(j => {
            if(j._id == i.adset_id) {
              checkTemp = true
            }
          })
          return checkTemp
        })
      }
      return listFilterTemp
    }
  },
  watch: {},
  data () {
    return {
      flagAds: true,
      flagAdGroup: true,
      flagCampaign: true,
      indexAdGroup: 0,
      indexAd: 0,
      isLoading: false,
      isLoadingPage: true,
      edit: true,
      isActive: 1,
      title: 'Chiến dịch',
      tab: 1,
      time: 0,
      searchValue: '',
      dateTime: '',
      pickerOptions: {
        shortcuts: [
          {
            text: 'Trọn đời',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Hôm nay',
            onClick (picker) {
              const start = new Date()
              picker.$emit('pick', [start, start])
            }
          },
          {
            text: 'Hôm qua',
            onClick (picker) {
              const start = new Date()
              start.setDate(start.getDate() - 1)
              picker.$emit('pick', [start, start])
            }
          },
          {
            text: '7 ngày qua',
            onClick (picker) {
              const start = new Date()
              const end = new Date()
              start.setDate(start.getDate() - 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '14 ngày qua',
            onClick (picker) {
              const start = new Date()
              const end = new Date()
              start.setDate(start.getDate() - 14)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '30 ngày qua',
            onClick (picker) {
              const start = new Date()
              const end = new Date()
              start.setDate(start.getDate() - 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Tuần này',
            onClick (picker) {
              const start = new Date()
              const end = new Date()
              start.setDate(start.getDate() - start.getDay())
              end.setDate(start.getDate() + 6)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Tuần trước',
            onClick (picker) {
              const start = new Date()
              const end = new Date()
              end.setDate(end.getDate() - end.getDay() - 1)
              start.setDate(end.getDate() - 6)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Tháng này',
            onClick (picker) {
              const start = new Date()
              const end = new Date()
              start.setMonth(start.getMonth())
              start.setDate(1)
              end.setMonth(end.getMonth() + 1)
              end.setDate(0)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Tháng trước',
            onClick (picker) {
              const start = new Date()
              const end = new Date()
              start.setMonth(start.getMonth() - 1)
              start.setDate(1)
              end.setMonth(end.getMonth())
              end.setDate(0)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      data1: [],
      data2: [],
      data3: [],
      userId: '',
      listUser: [],
    }
  },
  mounted () {
    this.getListUser()
    this.setTime5Minutes()
  },
  methods: {
    setTime5Minutes() {
      setTimeout(() => {
        this.time = this.time + 5
        this.setTime5Minutes()
      },300000)
    },
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
    deleteI(id) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 0,
        common.callApi(
          {
            type: "DELETE",
            _id: id
          }
        ).then(reps => {
          if(reps.code == 200) {
            return reps.code
          }
        }).catch((error) => {
          this.catchError(error)
        }));
      });
    },
    deleteItem() {
      this.isLoadingPage = true
      const promiseList = []
      this.tagCam.forEach(item => {
        promiseList.push(this.deleteI(item._id))
      })
      this.tagAdGroup.forEach(item => {
        promiseList.push(this.deleteI(item._id))
      })
      this.tagAd.forEach(item => {
        promiseList.push(this.deleteI(item._id))
      })
      Promise.all(promiseList).then(() => {
        this.$message({
          message: 'Xóa thành công',
          type: 'success'
        });
      }).catch(() => {}
      ).finally(() => {
        this.getAll()
        this.$store.dispatch('setTagCam', [])
        this.$store.dispatch('setTagAdGroup', [])
        this.$store.dispatch('setTagAd', [])
      });
    },
    deleteTemp() {
      this.$confirm('Bạn muốn xóa tất cả quảng cáo là bản nháp', 'Bỏ bản nháp', {
        confirmButtonText: 'Bỏ',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        this.isLoadingPage = true
        const promiseList = []
        this.data1.forEach(item => {
          if(item.status == 'PAUSED') {
            promiseList.push(this.deleteI(item.id))
          }
        })
        this.data2.forEach(item => {
          if(item.status == 'PAUSED') {
            promiseList.push(this.deleteI(item.id))
          }
        })
        this.data3.forEach(item => {
          if(item.status == 'PAUSED') {
            promiseList.push(this.deleteI(item.id))
          }
        })
        Promise.all(promiseList).then(() => {
          this.$message({
            message: 'Xóa thành công',
            type: 'success'
          });
        }).catch(() => {}
        ).finally(() => {
          this.getAll()
          this.$store.dispatch('setTagCam', [])
          this.$store.dispatch('setTagAdGroup', [])
          this.$store.dispatch('setTagAd', [])
        });
      });
    },
    changeUser() {
      this.$store.dispatch('setUserId', this.userId)
    },
    isAddAdSet() {
      if(!this.idCampaign) {
        return true
      }
      for(let i = 0; i < this.listAdGroup.length; i++) {
        if(this.listAdGroup[i].id == '') {
          return true
        }
      }
      return false
    },
    isAddAd() {
      if(!this.idAdGroup) {
        return true
      }
      if(this.listAdGroup.length >= 1) {
        for(let i = 0; i < this.listAdGroup[this.indexAdGroup].listAds.length; i++) {
          if(this.listAdGroup[this.indexAdGroup].listAds[i].id == '') {
            return true
          }
        }
      } else {
        return true
      }
      return false
    },
    campaignCommand(command) {
      switch (command) {
        case 'delete':
          this.isLoading = true
          common.callApi(
            {
              type: "DELETE",
              _id: this.idCampaign
            }
          ).then(reps => {
            if(reps.code == 200) {
              if(reps.data) {
                this.handleCloseDraw()
                this.$message({
                  message: 'Xóa chiến dịch thành công',
                  type: 'success'
                });
              }
            }
          }).catch((error) => {
              this.catchError(error)
          }).finally(() => {
              this.isLoading = false
            });
          break;
        case 'add':
          let temp = this.listAdGroup
          temp.unshift(
            {
              id: '',
              listAds: [
                {
                  id: ''
                }
              ]
            }
          )
          this.$store.dispatch('setListAdGroup', temp)
          break;
        default:
          break;
      }
    },
    adGroupCommand(command) {
      switch (command) {
        case 'delete':
          this.isLoading = true
          common.callApi(
            {
              type: "DELETE",
              _id: this.idAdGroup
            }
          ).then(reps => {
            if(reps.code == 200) {
              if(reps.data) {
                this.$message({
                  message: 'Xóa nhóm quảng cáo thành công',
                  type: 'success'
                });
                let temp = this.listAdGroup
                temp.splice(this.indexAdGroup, 1)
                this.$store.dispatch('setListAdGroup', temp)
                this.isActive = 1
                this.indexAdGroup = 0
              }
            }
          }).catch((error) => {
              this.catchError(error)
          }).finally(() => {
              this.isLoading = false
            });
          break;
        case 'add':
          let temp = this.listAdGroup
          temp[this.indexAdGroup].listAds.unshift(
            {
              id: ''
            }
          )
          this.$store.dispatch('setListAdGroup', temp)
          break;
        default:
          break;
      }
    },
    adsCommand(command) {
      switch (command) {
        case 'delete':
          this.isLoading = true
          common.callApi(
            {
              type: "DELETE",
              _id: this.idAds
            }
          ).then(reps => {
            if(reps.code == 200) {
              if(reps.data) {
                this.$message({
                  message: 'Xóa quảng cáo thành công',
                  type: 'success'
                });
                let temp = this.listAdGroup
                temp[this.indexAdGroup].listAds.splice(this.indexAd, 1)
                this.$store.dispatch('setListAdGroup', temp)
                this.isActive = 1
                this.indexAdGroup = 0
                this.indexAd = 0
              }
            }
          }).catch((error) => {
              this.catchError(error)
          }).finally(() => {
              this.isLoading = false
            });
          break;
        default:
          break;
      }
    },
    showEdit() {
      let listAdGroup = [
        {
          id: "",
          listAds: [
            {
              id: ""
            }
          ]
        }
      ];
      if(this.tab == 1) {
        let item = this.tagCam[0]
        common.callApi({
          type: "GET",
          "data.campaign_id": item._id
        }).then(reps => {
          if(reps.code == 200) {
            if(reps.data.length > 0) {
              listAdGroup = reps.data.map(i => {
                return {
                  id: i._id,
                  listAds: [
                    {
                      id: "",
                    }
                  ]
                }
              })
              listAdGroup.forEach((i, index) => {
                common.callApi({
                  type: "GET",
                  "data.adset_id": i.id
                }).then(reps1 => {
                  if(reps1.code == 200) {
                    if(reps1.data.length > 0) {
                      listAdGroup[index].listAds = reps1.data.map(j => {
                        return {
                          id: j._id
                        }
                      })
                    }
                    this.$store.dispatch('setListAdGroup', listAdGroup)
                  }
                }).catch((error) => {
                    this.catchError(error)
                })
              })
            }
          }
        }).catch((error) => {
          this.catchError(error)
        }).finally(() => {
          this.$store.dispatch('setListAdGroup', listAdGroup) 
          this.$store.dispatch('setShowDraw', true)
        });
        this.$store.dispatch('setIdCampaign', item._id)
        this.$store.dispatch('setItemCampaign', item.data)
        this.openTabIndex({index: 1})
        const query = {
          type: 'campaign',
          id: item._id
        }
        this.$router.push({
          name: 'home',
          query
        })
      }
      if(this.tab == 2) {
        let item = this.tagAdGroup[0]
        common.callApi({
          type: "GET",
          "data.campaign_id": item.data.campaign_id
        }).then(reps => {
          if(reps.code == 200) {
            this.$store.dispatch('setIdCampaign', item.data.campaign_id)
            if(reps.data.length > 0) {
              listAdGroup = reps.data.map(i => {
                return {
                  id: i._id,
                  listAds: [
                    {
                      id: "",
                    }
                  ]
                }
              })
              listAdGroup.forEach((i, index) => {
                common.callApi({
                  type: "GET",
                  "data.adset_id": i.id
                }).then(reps1 => {
                  if(reps1.code == 200) {
                    if(reps1.data.length > 0) {
                      listAdGroup[index].listAds = reps1.data.map(j => {
                        return {
                          id: j._id
                        }
                      })
                    }
                    this.$store.dispatch('setListAdGroup', listAdGroup)
                  }
                }).catch((error) => {
                  this.catchError(error)
                })
              })
            }
          }
        }).catch((error) => {
          this.catchError(error)
        }).finally(() => {
          this.$store.dispatch('setListAdGroup', listAdGroup) 
          this.$store.dispatch('setShowDraw', true)
          this.$store.dispatch('setIdAdGroup', item._id)
          this.$store.dispatch('setItemAdGroup', item.data)
          this.openTabIndex({index: 2})
          const query = {
            type: 'adSet',
            id: item._id
          }
          this.$router.push({
            name: 'home',
            query
          })
        })
      }
      if(this.tab == 3) {
        let item = this.tagAd[0]
        common.callApi({
          _id: item.data.adset_id,
          type: "GET"
        }).then(reps => {
          if(reps.code == 200) {
            if(reps.data) {
              this.$store.dispatch('setIdCampaign', reps.data.data.campaign_id)
              this.$store.dispatch('setIdAdGroup', reps.data._id)
              common.callApi({
                "data.campaign_id": reps.data.data.campaign_id,
                type: "GET"
              }).then(reps1 => {
                if(reps1.code == 200) {
                  if(reps1.data.length > 0) {
                    listAdGroup = reps1.data.map(i => {
                      return {
                        id: i._id,
                        listAds: [
                          {
                            id: "",
                          }
                        ]
                      }
                    })
                    listAdGroup.forEach((i, index) => {
                      common.callApi({
                        type: "GET",
                        "data.adset_id": i.id
                      }).then(reps2 => {
                        if(reps2.code == 200) {
                          if(reps2.data.length > 0) {
                            listAdGroup[index].listAds = reps2.data.map(j => {
                              return {
                                id: j._id
                              }
                            })
                          }
                          this.$store.dispatch('setListAdGroup', listAdGroup)
                        }
                      }).catch((error) => {
                          this.catchError(error)
                      }).finally(() => {
                        if(index == listAdGroup.length - 1) {
                          this.$store.dispatch('setListAdGroup', listAdGroup)
                          this.$store.dispatch('setShowDraw', true)
                          setTimeout(this.openTabIndex({index: 3}),50)
                        }
                      });
                    })
                  }
                }
              }).catch((error) => {
                  this.catchError(error)
              })
            }
          }
        }).catch((error) => {
          this.catchError(error)
        })
        let itemTemp = JSON.parse(JSON.stringify({...item.data}))
        this.$store.dispatch('setShowDraw', true)
        this.$store.dispatch('setIdAds', item._id)
        this.$store.dispatch('setItemAd', itemTemp)
        const query = {
          type: 'ads',
          id: item.id
        }
        this.$router.push({
          name: 'home',
          query
        })
      }
    },
    openTabIndex (data) {
      this.isActive = data.index
      this.indexAdGroup = this.listAdGroup.findIndex(item => item.id == this.idAdGroup)
      if(data.index == 3) {
        setTimeout(() => {
          this.indexAd = this.listAdGroup[this.indexAdGroup].listAds.findIndex(item => item.id == this.idAds)
        }, 50)
      }
    },
    switchTab (id, index2, index3, tab) {
      const queryTemp = this.$route.query
      if(tab == 1) {
        this.isActive = tab
        if(queryTemp.id != id) {
          const query = {
            type: 'campaign',
            id: id
          }
          this.$router.push({
            name: 'home',
            query
          })
        }
      }
      if(tab == 2) {
        if(this.idCampaign != '') {
          this.isActive = tab;
          this.$store.dispatch('setIdAdGroup', id)
          this.$store.dispatch('setItemAdGroup', {...tempAdGroup})
          this.indexAdGroup = index2
          if(queryTemp.id != id) {
            const query = {
              type: 'adSet',
              id: id
            }
            this.$router.push({
              name: 'home',
              query
            })
          }
        }
      }
      if(tab == 3) {
        if(this.listAdGroup[index2].id != '') {
          this.isActive = tab;
          this.$store.dispatch('setIdAds', id)
          this.$store.dispatch('setIdAdGroup', this.listAdGroup[index2].id)
          this.$store.dispatch('setItemAd', {...tempAd})
          this.$store.dispatch('setItemPost', {...tempPost})
          this.indexAdGroup = index2
          this.indexAd = index3
          if(queryTemp.id != id) {
            const query = {
              type: 'ads',
              id: id
            }
            this.$router.push({
              name: 'home',
              query
            })
          }
        }
      }
    },
    getListCampaign () {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 0,
          common.callApi(
            {
              type: "GET",
              data_type: "campaign",
              skip: 0,
              limit: 20
            }
          ).then(reps => {
            if(reps.code == 200) {
              if(reps.data) {
                let tempList = reps.data
                tempList.forEach((i, index) => {
                  tempList[index].isTrue = false
                  tempList[index].data.budget = ''
                  if(i.data.daily_budget) {
                    tempList[index].data.budget = i.data.daily_budget
                    tempList[index].data.budget_type = 1
                  }
                  if(i.data.lifetime_budget) {
                    tempList[index].data.budget = i.data.lifetime_budget
                    tempList[index].data.budget_type = 2
                  }
                });
                this.data1 = tempList
                return tempList
              }
            }
          }).catch((error) => {
              this.catchError(error)
            }).finally(() => {})
        )
      })
    },
    getListAdGroup () {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 0,
          common.callApi(
            {
              type: "GET",
              data_type: "adset",
              skip: 0,
              limit: 20
            }
          ).then(reps => {
            if(reps.code == 200) {
              if(reps.data) {
                let tempList = reps.data
                tempList.forEach((i, index) => {
                  tempList[index].isTrue = false
                  tempList[index].data.budget = ''
                  if(i.data.daily_budget && i.data.daily_budget != 0) {
                    tempList[index].data.budget = i.data.daily_budget
                    tempList[index].data.budget_type = 1
                  }
                  if(i.data.lifetime_budget && i.data.lifetime_budget != 0) {
                    tempList[index].data.budget = i.data.lifetime_budget
                    tempList[index].data.budget_type = 2
                  }
                });
                this.data2 = tempList
                return tempList
              }
            }
          }).catch((error) => {
              this.catchError(error)
            }).finally(() => {})
        )
      })
    },
    getListAd () {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 0,
          common.callApi(
            {
              type: "GET",
              data_type: "ads",
              skip: 0,
              limit: 20
            }
          ).then(reps => {
            if(reps.code ==200) {
              if(reps.data) {
                let tempList = reps.data
                tempList.forEach((i, index) => {
                  tempList[index].isTrue = false
                });
                this.data3 = tempList
                return tempList
              }
            }
          }).catch((error) => {
              this.catchError(error)
            }).finally(() => {})
        )
      })
    },
    getListUser() {
      common.search(
        {
          param: 'me/adaccounts',
          data: {
            fields: "name,id"
          },
          method: 'GET',
          version: 'v10.0'
        }
      ).then(reps5 => {
        if(reps5.code == 200) {
          if(reps5.data && reps5.data.data) {
            this.listUser = reps5.data.data
            this.$store.dispatch('setUserId', this.listUser[0].id)
            this.userId = this.gUserId
            this.getAll()
            let listAdGroup = [
              {
                id: "",
                listAds: [
                  {
                    id: ""
                  }
                ]
              }
            ];
            const query = this.$route.query
            if(query.type == 'campaign') {
              let item = {}
              common.callApi({
                _id: query.id,
                type: "GET"
              }).then(reps => {
                if(reps.code == 200) {
                  item = reps.data
                  common.callApi({
                    type: "GET",
                    "data.campaign_id": item._id
                  }).then(reps2 => {
                    if(reps2.code == 200) {
                      if(reps2.data.length > 0) {
                        listAdGroup = reps2.data.map(i => {
                          return {
                            id: i._id,
                            listAds: [
                              {
                                id: "",
                              }
                            ]
                          }
                        })
                        listAdGroup.forEach((i, index) => {
                          common.callApi({
                            type: "GET",
                            "data.adset_id": i.id
                          }).then(reps1 => {
                            if(reps1.code == 200) {
                              if(reps1.data.length > 0) {
                                listAdGroup[index].listAds = reps1.data.map(j => {
                                  return {
                                    id: j._id
                                  }
                                })
                              }
                              this.$store.dispatch('setListAdGroup', listAdGroup)
                            }
                          }).catch((error) => {
                              this.catchError(error)
                          })
                        })
                      }
                    }
                  }).catch((error) => {
                    this.catchError(error)
                  }).finally(() => {
                    this.$store.dispatch('setListAdGroup', listAdGroup) 
                    this.$store.dispatch('setShowDraw', true)
                    this.$store.dispatch('setIdCampaign', item._id)
                    this.$store.dispatch('setItemCampaign', item.data)
                    this.openTabIndex({index: 1})
                  });
                }
              }).catch((error) => {
                this.catchError(error)
              })
            }
            if(query.type == 'adSet') {
              let item1 = {}
              common.callApi({
                _id: query.id,
                type: "GET"
              }).then(reps => {
                if(reps.code == 200) {
                  item1 = reps.data
                  this.$store.dispatch('setItemAdGroup', item1.data)
                  this.$store.dispatch('setIdCampaign', reps.data.data.campaign_id)
                  common.callApi({
                    _id: reps.data.data.campaign_id,
                    type: "GET"
                  }).then(reps1 => {
                    if(reps1.code == 200) {
                      this.$store.dispatch('setItemCampaign', reps1.data.data)
                      common.callApi({
                        type: "GET",
                        "data.campaign_id": reps.data.data.campaign_id
                      }).then(reps2 => {
                        if(reps2.code == 200) {
                          if(reps2.data.length > 0) {
                            listAdGroup = reps2.data.map(i => {
                              return {
                                id: i._id,
                                listAds: [
                                  {
                                    id: "",
                                  }
                                ]
                              }
                            })
                            listAdGroup.forEach((i, index) => {
                              common.callApi({
                                type: "GET",
                                "data.adset_id": i.id
                              }).then(reps3 => {
                                if(reps3.code == 200) {
                                  if(reps3.data.length > 0) {
                                    listAdGroup[index].listAds = reps3.data.map(j => {
                                      return {
                                        id: j._id
                                      }
                                    })
                                  }
                                  this.$store.dispatch('setListAdGroup', listAdGroup)
                                }
                              }).catch((error) => {
                                  this.catchError(error)
                              })
                            })
                          }
                        }
                      }).catch((error) => {
                        this.catchError(error)
                      }).finally(() => {
                        this.$store.dispatch('setListAdGroup', listAdGroup) 
                        this.$store.dispatch('setShowDraw', true)
                        this.$store.dispatch('setIdAdGroup', item1._id)
                        this.openTabIndex({index: 2})
                      });
                    }
                  }).catch((error) => {
                    this.catchError(error)
                  })
                }
              }).catch((error) => {
                  this.catchError(error)
                })
            }
            if(query.type == 'ads') {
              let item2 = {}
              common.callApi({
                _id: query.id,
                type: "GET"
              }).then(reps => {
                if(reps.code == 200) {
                  if(reps.data) {
                    item2 = reps.data
                    const itemTemp = JSON.parse(JSON.stringify({...item2.data}))
                    this.$store.dispatch('setShowDraw', true)
                    this.$store.dispatch('setIdAds', item2._id)
                    this.$store.dispatch('setItemAd', itemTemp)
                    this.$store.dispatch('setIdAdGroup', itemTemp.adset_id)
                    common.callApi({
                      _id: itemTemp.adset_id,
                      type: "GET"
                    }).then(reps1 => {
                      if(reps1.code == 200) {
                        this.$store.dispatch('setIdCampaign', reps1.data.data.campaign_id)
                        common.callApi({
                          "data.campaign_id": reps1.data.data.campaign_id,
                          type: "GET"
                        }).then(reps2 => {
                          if(reps2.code == 200) {
                            if(reps2.data.length > 0) {
                              listAdGroup = reps2.data.map(i => {
                                return {
                                  id: i._id,
                                  listAds: [
                                    {
                                      id: "",
                                    }
                                  ]
                                }
                              })
                              listAdGroup.forEach((i, index) => {
                                common.callApi({
                                  type: "GET",
                                  "data.adset_id": i.id
                                }).then(reps3 => {
                                  if(reps3.code == 200) {
                                    if(reps3.data.length > 0) {
                                      listAdGroup[index].listAds = reps3.data.map(j => {
                                        return {
                                          id: j._id
                                        }
                                      })
                                    }
                                    this.$store.dispatch('setListAdGroup', listAdGroup)
                                  }
                                }).catch((error) => {
                                    this.catchError(error)
                                }).finally(() => {
                                  if(index == listAdGroup.length - 1) {
                                    this.$store.dispatch('setListAdGroup', listAdGroup)
                                    this.$store.dispatch('setShowDraw', true)
                                    setTimeout(() => { this.openTabIndex({index: 3}) }, 10)
                                  }
                                });
                              })
                            }
                          }
                        }).catch((error) => {
                          this.catchError(error)
                        })
                      }
                    }).catch((error) => {
                        this.catchError(error)
                    })
                  }
                }
              }).catch((error) => {
                this.catchError(error)
              })
            }
          }
        }
      }).catch((error) => {
        if(error.response.data.code == 403) {
          this.$router.push({ name: 'login' })
          if (error.response.data.message.code) {
            this.$message.error('Tài khoản đăng nhập không hỗ trợ dịch vụ này');
          }
        }
      })
        .finally(() => {});
    },
    getAll () {
      this.isLoadingPage = true
      Promise.all([this.getListCampaign(), this.getListAdGroup(), this.getListAd()]
      ).then(() => {}
      ).catch(() => {}
      ).finally(() => {
        this.isLoadingPage = false
      });
    },
    openSearch () {
      document.getElementsByClassName('box-style2')[0].style.display = 'block'
    },
    closeSearch () {
      setTimeout(() => {
        document.getElementsByClassName('box-style2')[0].style.display = 'none'
      }, 300)
    },
    selectItemSearch () {
      console.log('selectItemSearch')
    },
    openDraw () {
      this.$store.dispatch('setShowDraw', true)
    },
    handleClick (tab, e) {
      this.title = tab.label
      if(this.title == "Chiến dịch"){
        this.tab = 1
      } else if (this.title == "Nhóm quảng cáo") {
        this.tab = 2
      } else if (this.title == "Quảng cáo") {
        this.tab = 3
      }
    },
    handleClose (tag) {
      if (tag == 'cam') {
        this.$store.dispatch('setTagCam', [])
      }
      if (tag == 'adGroup') {
        this.$store.dispatch('setTagAdGroup', [])
      }
      if (tag == 'ad') {
        this.$store.dispatch('setTagAd', [])
      }
    },
    handleCloseDraw () {
      this.$store.dispatch('setShowDraw', false)
      this.$router.push({
        name: 'home'
      })
      this.getAll()
      this.$store.dispatch('setInteractive', 'POST_ENGAGEMENT')
      this.$store.dispatch('setIdCampaign', '')
      this.$store.dispatch('setIdAdGroup', '')
      this.$store.dispatch('setIdAds', '')
      this.$store.dispatch('setItemCampaign', {...tempCampaign})
      this.$store.dispatch('setItemAdGroup', {...tempAdGroup})
      this.$store.dispatch('setItemPost', JSON.parse(JSON.stringify({...tempPost})))
      this.$store.dispatch('setItemAd', {...tempAd})
      this.$store.dispatch('setListAdGroup', tempListAdGroup)
      this.isActive = 1
      this.indexAdGroup = 0
      this.indexAd = 0
      this.gIsTemp = true
    },
    upload () {
      const _sefl = this
      this.flagAds = !this.flagAds
      setTimeout(() => {
        let itemTemp = JSON.parse(JSON.stringify({..._sefl.itemAd}))
        if(itemTemp.creative.creative_id == '') {
          this.isLoading = true
          common.callApi({
            type: "UPSERT",
            data_type: "adcreatives",
            data: this.$store.getters.itemPost,
          }).then(reps => {
            itemTemp.creative.creative_id = reps.data._id
            if(this.idAds) {
              common.callApi({
                type: "UPSERT",
                data_type: "ads",
                _id: this.idAds,
                data: itemTemp
              }).then(reps1 => {
                if(reps1.data && reps1.data._id) {
                  this.handleCloseDraw()
                  this.$message({
                    message: 'Tạo quảng cáo thành công',
                    type: 'success'
                  });
                } 
              }).finally(() => {
                _sefl.isLoading = false
              });
            } else  {
              common.callApi({
                type: "UPSERT",
                data_type: "ads",
                data: itemTemp
              }).then(reps1 => {
                if(reps1.data && reps1.data._id) {
                  this.handleCloseDraw()
                  this.$message({
                    message: 'Tạo quảng cáo thành công',
                    type: 'success'
                  });
                } 
              }).finally(() => {
                _sefl.isLoading = false
              });
            }
            common.callApi({
              type: "GET",
              data_type: "adcreatives",
              skip: 0,
              limit: 20
            }).then(reps1 => {
              if(reps1.code == 200 && reps1.data) {
                this.$store.dispatch('setListPost', reps1.data)
              }
            }).catch((error) => {
              this.catchError(error)
            })
          }).catch((error) => {
            _sefl.catchError(error)
          })
        } else {
          if(this.idAds) {
            common.callApi({
              type: "UPSERT",
              data_type: "ads",
              _id: this.idAds,
              data: itemTemp
            }).then(reps1 => {
              if(reps1.data && reps1.data._id) {
                this.handleCloseDraw()
                this.$message({
                  message: 'Tạo quảng cáo thành công',
                  type: 'success'
                });
              } 
            }).finally(() => {
              _sefl.isLoading = false
            });
          } else  {
            common.callApi({
              type: "UPSERT",
              data_type: "ads",
              data: itemTemp
            }).then(reps1 => {
              if(reps1.data && reps1.data._id) {
                this.handleCloseDraw()
                this.$message({
                  message: 'Tạo quảng cáo thành công',
                  type: 'success'
                });
              } 
            }).finally(() => {
              _sefl.isLoading = false
            });
          }
        }
      }, 100)
    },
    next () {
      this.isLoading = true
      if (this.isActive == 2) {
        this.flagAdGroup = !this.flagAdGroup
        setTimeout(() => {
          let itemTemp = JSON.parse(JSON.stringify({...this.$store.getters.itemAdGroup}))
          if(itemTemp.budget_type == 1){
            itemTemp.daily_budget = itemTemp.budget
          } 
          if(itemTemp.budget_type == 2) {
            itemTemp.lifetime_budget = itemTemp.budget
          }
          itemTemp.targeting.genders = [itemTemp.targeting.genders]
          this.gIsTemp ? itemTemp.status = 'PAUSED' : itemTemp.status = 'ACTIVE'
          delete itemTemp.budget
          delete itemTemp.budget_type
          if (!this.idAdGroup) {
            common.callApi(
              {
                type: "UPSERT",
                data_type: "adset",
                data: itemTemp
              }
            ).then(reps => {
              if(reps.code == 200) {
                if (reps.data && reps.data._id) {
                  this.$store.dispatch('setIdAdGroup', reps.data._id)
                  let temp = this.listAdGroup
                  temp[this.indexAdGroup].id = reps.data._id
                  this.$message({
                    message: 'Tạo nhóm quảng cáo thành công',
                    type: 'success'
                  });
                  this.isActive++
                }
              }
            }).catch((error) => {
                this.catchError(error)
            }).finally(() => {
                this.isLoading = false
              });
          } else {
            common.callApi(
              {
                type: "UPSERT",
                data_type: "adset",
                _id: this.idAdGroup,
                data: itemTemp
              }
            ).then(reps => {
              if(reps.code == 200) {
                if(reps.data) {
                  this.$store.dispatch('setIdAdGroup', this.idAdGroup)
                  this.$message({
                    message: 'Sửa nhóm quảng cáo thành công',
                    type: 'success'
                  });
                  this.isActive++
                }
              }
            }).catch((error) => {
                this.catchError(error)
            }).finally(() => {
                this.isLoading = false
              });
            this.$store.dispatch('setIdAds', this.listAdGroup[this.indexAdGroup].listAds[0].id)
          }
        },100)
      }
      if (this.isActive == 1) {
        this.flagCampaign = !this.flagCampaign
        setTimeout(() => {
          let itemTemp = {...this.$store.getters.itemCampaign}
          if(itemTemp.budget_type == 1){
            itemTemp.daily_budget = itemTemp.budget
          } 
          if(itemTemp.budget_type == 2) {
            itemTemp.lifetime_budget = itemTemp.budget
          }
          if(itemTemp.budget_type == '') {
            delete itemTemp.bid_strategy
          }
          if(itemTemp.objective == 'INTERACTIVE') {
            itemTemp.objective = this.$store.getters.interactive
          }
          this.gIsTemp ? itemTemp.status = 'PAUSED' : itemTemp.status = 'ACTIVE'
          delete itemTemp.budget
          delete itemTemp.budget_type
          if (!this.idCampaign) {
            common.callApi(
              {
                type: "UPSERT",
                data_type: "campaign",
                data: itemTemp
              }
            ).then(reps => {
              if(reps.code == 200) {
                if(reps.data && reps.data._id) {
                  this.$store.dispatch('setIdCampaign', reps.data._id)
                  this.$message({
                    message: 'Tạo chiến dịch thành công',
                    type: 'success'
                  });
                  this.isActive++
                }
              }
            }).catch((error) => {
                this.catchError(error)
            }).finally(() => {
                this.isLoading = false
              });
          } else {
            common.callApi(
              {
                type: "UPSERT",
                data_type: "campaign",
                _id: this.idCampaign,
                data: itemTemp
              }
            ).then(reps => {
              if(reps.code == 200) {
                if(reps.data) {
                  this.$store.dispatch('setIdCampaign', this.idCampaign)
                  this.$message({
                    message: 'Sửa chiến dịch thành công',
                    type: 'success'
                  });
                  this.isActive++
                }
              }
            }).catch((error) => {
                this.catchError(error)
            }).finally(() => {
                this.isLoading = false
              });
            this.$store.dispatch('setIdAdGroup', this.listAdGroup[0].id)
          }
        }, 100)
      }
    },
    preview () {
      this.isActive--
    },
    changeNameCam (data) {
      this.dataFilter1[data.index].isTrue = false
      if (data.isChange) {
        this.dataFilter1[data.index].data.name = data.name
        data.data.name = data.name
        common.callApi({
          type: "UPSERT",
          data_type: "campaign",
          _id: data.id,
          data : data.data
        }).then(reps => {
          if(reps.code == 200) {
            if(reps.data) {
              console.log(reps.data)
            }
          }
        }).catch(error => {
          this.catchError(error)
        })
      }
    },
    changeNameAdGroup (data) {
      this.dataFilter2[data.index].isTrue = false
      if (data.isChange) {
        this.dataFilter2[data.index].data.name = data.name
        data.data.name = data.name
        common.callApi({
          type: "UPSERT",
          data_type: "adset",
          _id: data.id,
          data : data.data
        }).then(reps => {
          if(reps.code == 200) {
            if(reps.data) {
              console.log(reps.data)
            }
          }
        }).catch(error => {
          this.catchError(error)
        })
      }
    },
    changeNameAd (data) {
      this.dataFilter3[data.index].isTrue = false
      if (data.isChange) {
        this.dataFilter3[data.index].data.name = data.name
        data.data.name = data.name
        common.callApi({
          type: "UPSERT",
          data_type: "ads",
          _id: data.id,
          data : data.data
        }).then(reps => {
          if(reps.code == 200) {
            if(reps.data) {
              console.log(reps.data)
            }
          }
        }).catch(error => {
          this.catchError(error)
        })
      }
    },
  }
}
</script>

<style></style>
