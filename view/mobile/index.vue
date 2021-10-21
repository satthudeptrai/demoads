<template>
  <div>
    <div class="parent">
      <div class="flex-between" style="height: 42px; box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);">
        <div class="ver-align ml-20">
          <div v-show="!isShowChooseAccount1" class="mr-20" @click="openDraw()"><i class="fas fa-bars"></i></div>
          <div @click="isShowChooseAccount1 = !isShowChooseAccount1" class="f-16">{{ account.name }} <i class="el-icon-caret-bottom"></i></div>
        </div>
        <div style="margin-right: 19.6px">
          <i class="el-icon-message-solid f-19"></i>
        </div>
      </div>
      <div v-show="isShowChooseAccount1" class="child bg-2" style="width: 100vw; height: calc(100vh - 42px); z-index:1">
        <div class="flex-center" style="height: 52px; box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);">
          <el-input
            style="width: 343px"
            size="small"
            placeholder="Tìm kiếm và lọc"
            v-model="searchAccount"
            class="input-type1">
          <i style="margin-left: 8px; margin-top: 9px;" slot="prefix" class="fas fa-search"></i>
          </el-input>
        </div>
        <div class="radio-type3">
          <el-radio-group v-model="account" value-key="id" @change="closeAccount1()">
            <el-radio v-for="item in accountListSearch" :key="item.id" :label="item" class="flex-between mt-16">
              <div>
                <div class="ver-align" style="line-height: 100%;">
                  <div class="mr-8">{{ item.name }}</div>
                  <div class="f-12 color-5">{{ item.id }}</div>
                </div>
                <div class="mt-4 color-5 f-12">
                  <span style="color:#27AE60">{{ item.status }}</span> . {{ item.unit }}
                </div>
              </div>
            </el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div v-show="!showSearch" class="flex-between" style="height: 52px; box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);">
      <div class="ver-align ml-16">
        <el-button @click="showDraw1 = true" class="mr-12 bg-1 color-4" size="small" round>Thời gian <i class="el-icon-caret-bottom"></i></el-button>
        <el-button @click="showDraw2 = true" class="bg-1 color-4" size="small" round>Tất cả các trang <i class="el-icon-caret-bottom"></i></el-button>
      </div>
      <div @click="showSearch = true"><i class="fas fa-search f-18 mr-19"></i></div>
    </div>
    <div v-show="showSearch" style="height: 87px; box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);">
      <div class="flex-between mt-10">
        <div class="ml-16">
          <el-button @click="showSearch = false" icon="el-icon-arrow-left bold" circle size="small"></el-button>
        </div>
        <div >
          <el-input
            style="width: 295px"
            size="small"
            placeholder="Tìm kiếm chiến dịch"
            v-model="searchItem"
            class="input-type1 mr-16">
          <i style="margin-left: 8px; margin-top: 9px;" slot="prefix" class="fas fa-search"></i>
          <i slot="suffix" class="el-icon-close f-20"></i>
          </el-input>
        </div>
      </div>
      <div class="flex-between mt-12">
        <div class="ml-16">
          <el-button @click="showDraw3 = true" class="bg-1 color-4" size="small" round>
            <div class="flex-between">
              <div class="mr-6">{{ filterValue.value }}</div>
              <div><i class="el-icon-caret-bottom"></i></div>
            </div>
          </el-button>
        </div>
        <div class="mr-16">
          <el-button @click="deleteFilter()" style="width: 112px" class="bg-1 color-4" size="small" round>
            <div class="flex-between">
              <div>Xóa bộ lọc</div>
              <div><i class="el-icon-close"></i></div>
            </div>
          </el-button>
        </div>
      </div>
    </div>
    <div v-show="!showSearch">
      <div class="mt-16 ml-16">
        <div class="f-18 mb-2">Chiến dịch</div>
        <div class="ver-align list-style1">
          <div class="ver-align f-12 mr-15">
            <div class="dot1"></div>
            4 Thành công
          </div>
          <div class="ver-align f-12">
            <div class="dot1"></div>
            10 chưa hoạt động
          </div>
        </div>
      </div>
      <el-row class="mt-15">
        <el-col :span="12" class="posi-bt">
          <img @click="openCreateCampaign()" src="../../icon/svg/plus2.svg" alt="">
          <div class="mt-12">Tạo quảng cáo</div>
        </el-col>
        <el-col :span="12" class="posi-bt">
          <img src="../../icon/svg/draft.svg" alt="">
          <div class="mt-12">Bản nháp(1)</div>
        </el-col>
      </el-row>
      <div v-if="data && data.length > 0">
        <div v-for="item in data" :key="item.id" class="mt-24 mb-24 ml-16 mr-18">
          <div class="flex-between" style="align-items: start;">
            <div class="ver-align">
              <img :src="item.linkImg" alt="" style="width: 58px; height: 58px; border-radius: 4px;">
              <div style="width: 231px" class="ml-16">
                <div>{{ item.name }}</div>
                <div :class="{ 'bg-3': !item.status, 'bg-4': item.status, 'tag-style1': true }">{{ item.status ? 'Active' : 'Inactive' }}</div>
              </div>
            </div>
            <div @click="openBlank(item)"><i class="el-icon-more"></i></div>
          </div>
          <el-row :gutter="20" class="mt-14">
            <el-col :span="8">
              <div>{{ item.title1 }}</div>
              <div class="f-16"><b>{{ item.number1 }}</b></div>
            </el-col>
            <el-col :span="8">
              <div>{{ item.title2 }}</div>
              <div class="f-16"><b>{{ item.number2 }}</b></div>
            </el-col>
            <el-col :span="8">
              <div>{{ item.title3 }}</div>
              <div class="f-16"><b>{{ item.number3 | toThousandFilter }}</b></div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-if="data.length == 0" class="posi-bt mt-72">
        <img src="../../icon/svg/plus.svg" alt="">
        <div class="mt-12 f-16"><b>Không tìm thấy kết quả</b></div>
        <div class="f-16">Bạn chưa tạo quảng cáo nào</div>
        <button @click="openCreateCampaign()" class="btn-create-ad f-16">Tạo quảng cáo</button>
      </div>
    </div>
    <div v-show="showSearch">
      <div v-if="dataFilter && dataFilter.length > 0">
        <div v-for="item in dataFilter" :key="item.id" class="mt-24 mb-24 ml-16 mr-18">
          <div class="flex-between" style="align-items: start;">
            <div class="ver-align">
              <img :src="item.linkImg" alt="" style="width: 58px; height: 58px; border-radius: 4px;">
              <div style="width: 231px" class="ml-16">
                <div>{{ item.name }}</div>
                <div :class="{ 'bg-3': !item.status, 'bg-4': item.status, 'tag-style1': true }">{{ item.status ? 'Active' : 'Inactive' }}</div>
              </div>
            </div>
            <div @click="openBlank(item)"><i class="el-icon-more"></i></div>
          </div>
          <el-row :gutter="20" class="mt-14">
            <el-col :span="8">
              <div>{{ item.title1 }}</div>
              <div class="f-16"><b>{{ item.number1 }}</b></div>
            </el-col>
            <el-col :span="8">
              <div>{{ item.title2 }}</div>
              <div class="f-16"><b>{{ item.number2 }}</b></div>
            </el-col>
            <el-col :span="8">
              <div>{{ item.title3 }}</div>
              <div class="f-16"><b>{{ item.number3 | toThousandFilter }}</b></div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-if="dataFilter.length == 0" class="posi-bt1" style="margin-top: 170px">
        <img src="../../icon/svg/plus.svg" alt="">
        <div class="mt-12 f-16" style="text-align: center;"><b>Không có chiến dịch nào khớp<br>với bộ lọc của bạn</b></div>
        <button @click="deleteFilter()" class="btn-create-ad f-16 mt-16">Xóa bộ lọc</button>
      </div>
    </div>
    <el-drawer
      size='282px'
      :with-header="false"
      :visible.sync="showDraw"
      :append-to-body="true"
      direction="ltr"
      :before-close="handleCloseDraw">
      <div class="ml-16 mt-20 mr-21 parent">
        <div class="flex-between mb-16" @click="openAccount()">
          <div>
            <div class="ver-align" style="line-height: 100%;">
              <div class="mr-8">{{ account.name }}</div>
              <div class="f-12 color-5">{{ account.id }}</div>
            </div>
            <div class="mt-4 color-5 f-12">
              <span style="color:#27AE60">{{ account.status }}</span> . {{ account.unit }}
            </div>
          </div>
          <div class="color-5"><i class="el-icon-caret-bottom"></i></div>
        </div>
        <div class="card-1">
          <i class="fas fa-home"></i>
          Tài khoản
        </div>
        <div class="card-1" style="box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);">
          <i class="fas fa-plus"></i>
          Tạo chiến dịch
        </div>
        <div class="card-1">
          <i class="far fa-credit-card"></i>
          Thanh toán
        </div>
        <div class="card-1">
          <i class="fas fa-cog"></i>
          Cài đặt
        </div>
        <div v-show="isShowChooseAccount" class="bg-2 child radio-type2">
          <el-radio-group v-model="account" value-key="id" @change="closeAccount()">
            <el-radio v-for="item in accountList" :key="item.id" :label="item" class="flex-between mt-16">
              <div>
                <div class="ver-align" style="line-height: 100%;">
                  <div class="mr-8">{{ item.name }}</div>
                  <div class="f-12 color-5">{{ item.id }}</div>
                </div>
                <div class="mt-4 color-5 f-12">
                  <span style="color:#27AE60">{{ item.status }}</span> . {{ item.unit }}
                </div>
              </div>
            </el-radio>
          </el-radio-group>
        </div>
      </div>
    </el-drawer>
    <chooseDate :show-draw="showDraw1" :value="dateValue" @closeDrawDate="closeDrawDate" />
    <choosePage :show-draw="showDraw2" :value="pageValue" :list-page="listPage" @closeDrawPage="closeDrawPage" />
    <filterCampaign :show-draw="showDraw3" :value="filterValue" @closeDrawFilter="closeDrawFilter" />
    <blanks :is-show-blank="isShowBlank" :item-campaign="itemCampaign" @closeBlank="closeBlank" />
    <createCampaign
      :is-show-dialog="isShowCreateCampaign"
      :page-value="pageValue"
      :list-page="listPage"
      @closeCreateCampaign="closeCreateCampaign"
      @openChoosePage="openChoosePage"
      @goNameCampaign="goNameCampaign" />
    <nameCampaign
      :is-show-dialog="isShowNameCampaign"
      @closeNameCampaign="closeNameCampaign" />
    <create
      :is-show-dialog="isShowCreate"
      @closeCreate="closeCreate" />
  </div>
</template>

<script>
import blanks from './campaignBlanks'
import chooseDate from './chooseDate'
import choosePage from './choosePage'
import filterCampaign from './filterCampaign'
import createCampaign from './campaign/createCampaign'
import nameCampaign from './campaign/nameCampaign'
import create from './create/index'
export default {
  name: 'mobile',
  computed: {
    accountListSearch () {
      return this.accountList.filter(i => i.name.toLowerCase().includes(this.searchAccount.toLowerCase()))
    }
  },
  components: { blanks, chooseDate, choosePage, filterCampaign, createCampaign, nameCampaign, create },
  data () {
    return {
      targetId: 1,
      filterValue: {
        id: null,
        value: 'Bộ lọc'
      },
      showSearch: false,
      dateValue: {
        id: null,
        label: '',
        value: ''
      },
      pageValue: {
        id: null,
        name: '',
        linkImg: ''
      },
      searchAccount: '',
      searchItem: '',
      isShowChooseAccount: false,
      isShowChooseAccount1: false,
      isShowBlank: false,
      isShowCreateCampaign: false,
      isShowNameCampaign: false,
      isShowCreate: false,
      showDraw: false,
      showDraw1: false,
      showDraw2: false,
      showDraw3: false,
      itemCampaign: {
        isTrue: false,
        name: '',
        status: true,
        title1: '',
        number1: null,
        title2: '',
        number2: null,
        title3: '',
        number3: null,
        linkImg: ''
      },
      data: [
        {
          id: 1,
          isTrue: false,
          name: 'Xây dựng hệ thống marketing khép kín cho nhà hàng',
          status: true,
          title1: 'Estimated Ad Recall Lift (P...',
          number1: 678,
          title2: 'Estimated Ad Recall Lift (P...',
          number2: 678,
          title3: 'Spent',
          number3: 6784443,
          linkImg: 'https://1.bp.blogspot.com/-rt6mn1dJJ7M/XqZl2p-TboI/AAAAAAAAjO8/SzKdmwQAFhUH2CXgUH6kluj_G8Gig2-xgCLcBGAsYHQ/s1600/Anh-avatar-dep-cho-con-trai%2B%25281%2529.jpg'
        },
        {
          id: 2,
          isTrue: false,
          name: 'Xây dựng hệ thống marketing khép kín cho nhà hàng',
          status: false,
          title1: 'Estimated Ad Recall Lift (P...',
          number1: 678,
          title2: 'Estimated Ad Recall Lift (P...',
          number2: 678,
          title3: 'Spent',
          number3: 6784443,
          linkImg: 'https://1.bp.blogspot.com/-rt6mn1dJJ7M/XqZl2p-TboI/AAAAAAAAjO8/SzKdmwQAFhUH2CXgUH6kluj_G8Gig2-xgCLcBGAsYHQ/s1600/Anh-avatar-dep-cho-con-trai%2B%25281%2529.jpg'
        },
        {
          id: 3,
          isTrue: false,
          name: 'Xây dựng hệ thống marketing khép kín cho nhà hàng',
          status: false,
          title1: 'Estimated Ad Recall Lift (P...',
          number1: 678,
          title2: 'Estimated Ad Recall Lift (P...',
          number2: 678,
          title3: 'Spent',
          number3: 6784443,
          linkImg: 'https://1.bp.blogspot.com/-rt6mn1dJJ7M/XqZl2p-TboI/AAAAAAAAjO8/SzKdmwQAFhUH2CXgUH6kluj_G8Gig2-xgCLcBGAsYHQ/s1600/Anh-avatar-dep-cho-con-trai%2B%25281%2529.jpg'
        },
        {
          id: 4,
          isTrue: true,
          name: 'Xây dựng hệ thống marketing khép kín cho nhà hàng',
          status: true,
          title1: 'Estimated Ad Recall Lift (P...',
          number1: 678,
          title2: 'Estimated Ad Recall Lift (P...',
          number2: 678,
          title3: 'Spent',
          number3: 6784443,
          linkImg: 'https://1.bp.blogspot.com/-rt6mn1dJJ7M/XqZl2p-TboI/AAAAAAAAjO8/SzKdmwQAFhUH2CXgUH6kluj_G8Gig2-xgCLcBGAsYHQ/s1600/Anh-avatar-dep-cho-con-trai%2B%25281%2529.jpg'
        },
        {
          id: 5,
          isTrue: false,
          name: 'Xây dựng hệ thống marketing khép kín cho nhà hàng',
          status: true,
          title1: 'Estimated Ad Recall Lift (P...',
          number1: 678,
          title2: 'Estimated Ad Recall Lift (P...',
          number2: 678,
          title3: 'Spent',
          number3: 6784443,
          linkImg: 'https://1.bp.blogspot.com/-rt6mn1dJJ7M/XqZl2p-TboI/AAAAAAAAjO8/SzKdmwQAFhUH2CXgUH6kluj_G8Gig2-xgCLcBGAsYHQ/s1600/Anh-avatar-dep-cho-con-trai%2B%25281%2529.jpg'
        }
      ],
      dataFilter: [
        {
          id: 1,
          isTrue: false,
          name: 'Xây dựng hệ thống marketing khép kín cho nhà hàng',
          status: true,
          title1: 'Estimated Ad Recall Lift (P...',
          number1: 678,
          title2: 'Estimated Ad Recall Lift (P...',
          number2: 678,
          title3: 'Spent',
          number3: 6784443,
          linkImg: 'https://1.bp.blogspot.com/-rt6mn1dJJ7M/XqZl2p-TboI/AAAAAAAAjO8/SzKdmwQAFhUH2CXgUH6kluj_G8Gig2-xgCLcBGAsYHQ/s1600/Anh-avatar-dep-cho-con-trai%2B%25281%2529.jpg'
        }
      ],
      account: {
        id: null,
        name: '',
        status: '',
        unit: ''
      },
      accountList: [
        {
          id: 1,
          name: 'Trang Vũ1',
          status: 'Có hiệu lực',
          unit: 'VND'
        },
        {
          id: 2,
          name: 'Trang Vũ2',
          status: 'Có hiệu lực',
          unit: 'VND'
        },
        {
          id: 3,
          name: 'Trang Vũ3',
          status: 'Có hiệu lực',
          unit: 'VND'
        }
      ],
      listPage: [
        {
          id: 1,
          name: 'Botbanhang1',
          linkImg: 'https://steamuserimages-a.akamaihd.net/ugc/494645911112110978/500C438C26A56C80264B2EE19DA038977B1F33D0/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        },
        {
          id: 2,
          name: 'Botbanhang2',
          linkImg: 'https://steamuserimages-a.akamaihd.net/ugc/494645911112110978/500C438C26A56C80264B2EE19DA038977B1F33D0/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        },
        {
          id: 3,
          name: 'Botbanhang3',
          linkImg: 'https://steamuserimages-a.akamaihd.net/ugc/494645911112110978/500C438C26A56C80264B2EE19DA038977B1F33D0/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        },
        {
          id: 4,
          name: 'Botbanhang4',
          linkImg: 'https://steamuserimages-a.akamaihd.net/ugc/494645911112110978/500C438C26A56C80264B2EE19DA038977B1F33D0/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        },
        {
          id: 5,
          name: 'Botbanhang5',
          linkImg: 'https://steamuserimages-a.akamaihd.net/ugc/494645911112110978/500C438C26A56C80264B2EE19DA038977B1F33D0/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        },
        {
          id: 6,
          name: 'Botbanhang6',
          linkImg: 'https://steamuserimages-a.akamaihd.net/ugc/494645911112110978/500C438C26A56C80264B2EE19DA038977B1F33D0/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        },
        {
          id: 7,
          name: 'Botbanhang7',
          linkImg: 'https://steamuserimages-a.akamaihd.net/ugc/494645911112110978/500C438C26A56C80264B2EE19DA038977B1F33D0/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        },
        {
          id: 8,
          name: 'Botbanhang8',
          linkImg: 'https://steamuserimages-a.akamaihd.net/ugc/494645911112110978/500C438C26A56C80264B2EE19DA038977B1F33D0/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        },
        {
          id: 9,
          name: 'Botbanhang9',
          linkImg: 'https://steamuserimages-a.akamaihd.net/ugc/494645911112110978/500C438C26A56C80264B2EE19DA038977B1F33D0/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        },
        {
          id: 10,
          name: 'Botbanhang10',
          linkImg: 'https://steamuserimages-a.akamaihd.net/ugc/494645911112110978/500C438C26A56C80264B2EE19DA038977B1F33D0/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        },
        {
          id: 11,
          name: 'Botbanhang11',
          linkImg: 'https://steamuserimages-a.akamaihd.net/ugc/494645911112110978/500C438C26A56C80264B2EE19DA038977B1F33D0/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        },
        {
          id: 12,
          name: 'Botbanhang12',
          linkImg: 'https://steamuserimages-a.akamaihd.net/ugc/494645911112110978/500C438C26A56C80264B2EE19DA038977B1F33D0/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        },
        {
          id: 13,
          name: 'Botbanhang13',
          linkImg: 'https://steamuserimages-a.akamaihd.net/ugc/494645911112110978/500C438C26A56C80264B2EE19DA038977B1F33D0/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        }
      ]
    }
  },
  mounted () {
    this.account = this.accountList[0]
  },
  methods: {
    goNameCampaign () {
      this.closeCreateCampaign()
      this.isShowNameCampaign = true
    },
    closeDrawDate (data) {
      this.showDraw1 = false
      if (data.type == 2) {
        this.dateValue = data.value
      }
    },
    closeDrawPage (data) {
      this.showDraw2 = false
      if (data.type == 2) {
        this.pageValue = data.value
      }
    },
    closeDrawFilter (data) {
      this.showDraw3 = false
      if (data.type == 2) {
        this.filterValue = data.value
      }
    },
    handleCloseDraw () {
      this.showDraw = false
    },
    openDraw () {
      this.showDraw = true
    },
    closeBlank (data) {
      this.isShowBlank = false
      if (data && data.data) {
        const indexItem = this.data.findIndex(i => i.id == data.data.id)
        this.data[indexItem] = data.data
      }
    },
    openBlank (item) {
      this.itemCampaign = { ...item }
      this.isShowBlank = true
    },
    closeCreateCampaign () {
      this.isShowCreateCampaign = false
    },
    closeNameCampaign (data) {
      this.isShowNameCampaign = false
      if (data.type == 1) {
        this.isShowCreateCampaign = true
      } else {
        this.isShowCreate = true
      }
    },
    closeCreate (data) {
      this.isShowCreate = false
      this.isShowNameCampaign = true
    },
    openChoosePage () {
      this.showDraw2 = true
    },
    openCreateCampaign () {
      // this.itemCampaign = {...item}
      this.isShowCreateCampaign = true
    },
    openAccount () {
      this.isShowChooseAccount = true
    },
    closeAccount () {
      setTimeout(() => {
        this.isShowChooseAccount = false
      }, 10)
    },
    openAccount1 () {
      this.isShowChooseAccount1 = true
    },
    closeAccount1 () {
      setTimeout(() => {
        this.isShowChooseAccount1 = false
      }, 10)
    },
    deleteFilter () {
      this.filterValue = {
        id: null,
        value: 'Bộ lọc'
      }
    }
  }
}
</script>

<style>

</style>
