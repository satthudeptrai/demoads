<template>
  <div>
    <div v-loading="isLoading" v-show="edit">
      <el-card class="box-card">
        <div style="display: flex; justify-content: space-between;">
          <div class="title-campaign mb-12"><b>Tên nhóm quảng cáo</b></div>
          <el-link type="warning">Tạo mẫu tên</el-link>
        </div>
        <el-input placeholder="Tên nhóm quảng cáo" v-model="adGroup.name"></el-input>
      </el-card>
      <!-- CONVERSIONS -->
      <el-card v-if="itemCampaign.objective == 'CONVERSIONS'" class="box-card">
        <div class="f-16 mt-16"><b>Conversion</b></div>
        <div class="mt-16"><b>Vị trí sự kiện chuyển đổi</b></div>
        <el-radio-group v-model="conversionsType">
          <div class="radio-group1">
            <el-radio :label="0">
              <div class="f-14">Trang web</div>
            </el-radio>
            <el-radio :label="1">
              <div class="f-14">Ứng dụng</div>
            </el-radio>
            <el-radio :label="2">
              <div class="f-14">Messenger</div>
              <div class="mt-4 color-5 f-12">Chuyển mọi người từ quảng cáo đến cuộc trò chuyện trên Messenger với doanh nghiệp của bạn.
                <br>Quảng cáo của bạn sẽ hiển thị với những người có nhiều khả năng mở Messenger hơn.
              </div>
            </el-radio>
            <el-radio :label="3">
              <div class="f-14">WhatsApp</div>
              <div class="mt-4 color-5 f-12">
                Chuyển mọi người từ quảng cáo đến cuộc trò chuyện trên WhatsApp với doanh nghiệp của bạn,<br>
                sau đó theo dõi các sự kiện chuyển đổi, chẳng hạn như lượt truy cập trang web và hoạt động<br>
                trong ứng dụng.
              </div>
            </el-radio>
          </div>
        </el-radio-group>
      </el-card>
      <!-- MESSAGES -->
      <el-card v-if="itemCampaign.objective == 'MESSAGES'" class="box-card">
        <div class="f-16"><b>Đích đến của tin nhắn</b></div>
        <div>Chọn nơi bạn muốn chuyển mọi người đến để nhắn tin cho doanh nghiệp</div>
        <div>
          <el-radio-group v-model="messagesType">
            <div class="radio-group1">
              <el-radio :label="0">
                <div class="f-14">Messenger</div>
                <div class="mt-4 color-5 f-12">
                  Chuyển mọi người từ quảng cáo đến cuộc trò chuyện trên Messenger với doanh
                  <br>nghiệp của bạn. Quảng cáo của bạn sẽ hiển thị với những người có nhiều khả
                  <br>năng mở Messenger hơn.
                </div>
                <div v-show="messagesType == 0" class="mt-10">
                  <el-select v-model="adGroup.optimization_goal" placeholder="Select">
                    <el-option label="Nhấp để mở Messenger" :value="`CONVERSATIONS`"></el-option>
                    <el-option label="Tin nhắn được tài trợ" :value="`IMPRESSIONS`"></el-option>
                  </el-select>
                  <span v-show="adGroup.optimization_goal == 'IMPRESSIONS'" class="color-5">Từ</span>
                  <div v-show="adGroup.optimization_goal == 'IMPRESSIONS'">
                    <el-select v-model="adGroup.promoted_object.page_id" placeholder="Chọn trang">
                      <el-option v-for="item in listFacebook" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </div>
                </div>
              </el-radio>
              <el-radio disabled :label="1">
                <div class="color-2 f-14">WhatsApp Business</div>
                <div class="mt-4 color-2 f-12">
                  Khi một người nhấp vào quảng cáo của bạn, một chuỗi tin nhắn với doanh
                  <br>nghiệp của bạn sẽ mở ra trong WhatsApp. Quảng cáo của bạn sẽ hiển thị với
                  <br>những người có nhiều khả năng sẽ nhắn tin bằng WhatsApp.
                </div>
              </el-radio>
              <el-radio disabled :label="2">
                <div class="color-2 f-14">Instagram Direct</div>
                <div class="mt-4 color-2 f-12">
                  Chuyển người xem quảng cáo sang trò chuyện với doanh nghiệp bạn trên Direct.
                  <br>Quảng cáo của bạn sẽ chỉ chạy trên Instagram và hiển thị với những người có
                  <br>khả năng sẽ chat trong Instagram Direct.
                </div>
              </el-radio>
            </div>
          </el-radio-group>
        </div>
      </el-card>
      <el-card shadow="always">
        <div style="display: flex; justify-content: space-between">
          <b class="f-16">Tính năng phân bổ nội dung</b>
          <div class="ver-align">
            <div class="mr-10">{{ choose ? 'Bật' : 'Tắt' }}</div>
            <el-switch v-model="choose" class="switch-type1" active-color="#FF5F0B"></el-switch>
          </div>
        </div>
        <div class="mt-8 f-12">
          Ngoài việc cung cấp các thành phần nội dung, chẳng hạn như hình ảnh và tiêu đề, chúng tôi còn tự động tạo các tổ hợp tối ưu hóa cho đối tượng của bạn. Các phiên bản có thể bao gồm nhiều định dạng hoặc mẫu khác nhau, dựa trên một hoặc nhiều thành phần.
          <el-link type="warning" class="f-12">Tìm hiểu thêm</el-link>
        </div>
      </el-card>
      <el-card shadow="always">
        <div>
          <div class="title-campaign mb-12"><b>Ngân sách &amp; lịch chạy</b></div>
          <b style="font-size: 14px">Ngân sách</b>
          <el-row :gutter="1" class="under-label">
            <el-col :span="14" style="padding-left: 0px;">
              <el-select v-model="adGroup.budget_type" placeholder="Ngân sách">
                <el-option :label="`Ngân sách hàng ngày`" :value="1"></el-option>
                <el-option :label="`Ngân sách trọn đời`" :value="2"></el-option>
              </el-select>
              <div class="f-12">Số tiền chi tiêu thực tế hàng ngày có thể thay đổi</div>
            </el-col>
            <el-col :span="10">
              <NumberFormat
                v-model="adGroup.budget"
                separator="."
                :min="0"
                size="large"
                :empty-value="0"
                :placeholder="`Nhập số tiền`"
                :append="`VNĐ`" />
            </el-col>
          </el-row>
          <div class="f-14 mt-12"><b>Ngày bắt đầu</b></div>
          <el-row :gutter="2" class="under-label ver-align">
            <el-col :span="8">
              <el-date-picker
                v-model="adGroup.start_time"
                type="date"
                placeholder="Ngày bắt đầu">
              </el-date-picker>
            </el-col>
            <el-col :span="6">
              <el-time-picker
                style="width: 100%;"
                v-model="adGroup.start_time"
                placeholder="Thời gian">
              </el-time-picker>
            </el-col>
            <el-col :span="10" class="ver-align">
              <div class="f-12 ml-12" style="color: #828282;">Giờ Thái Bình Dương</div>
            </el-col>
          </el-row>
          <b class="f-14">Ngày kết thúc</b>(Không bắt buộc) <br>
          <el-checkbox v-model="isEnd" style="margin-top: 13px">Đặt ngày kết thúc</el-checkbox>
          <el-row :gutter="2" class="under-label ver-align" v-show="isEnd">
            <el-col :span="8">
              <el-date-picker
                v-model="adGroup.end_time"
                type="date"
                placeholder="Ngày bắt đầu">
              </el-date-picker>
            </el-col>
            <el-col :span="6">
              <el-time-picker
                style="width: 100%;"
                v-model="adGroup.end_time"
                placeholder="Thời gian">
              </el-time-picker>
            </el-col>
            <el-col :span="10">
              <div class="f-12" style="color: #828282;">Giờ Thái Bình Dương</div>
            </el-col>
          </el-row>
          <br>
          <el-link type="info" @click="isExtend = !isExtend">Ẩn tùy chọn</el-link>
          <div style="margin-top: 11px; padding:10px 16px; background: #F2F2F2;" v-show="isExtend">
            <p style="display: flex; justify-content: space-between;">
              <b>Lên lịch quảng cáo</b>
              <span class="f-14" style="color: #828282">
                <i class="el-icon-edit"></i>
                Chỉnh sửa
              </span>
            </p>
            <div>
              Luôn chạy quảng cáo
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card" style="overflow: visible;">
        <div class="title-campaign"><b>Đối tượng</b></div>
        <div id="tab1">
          <div :class="{ 'tab1-item': true, 'tab1-active': tab1Active == 1 }">
            Tạo đối tượng mới
          </div>
          <div class="tab1-item">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                Sử dụng đối tượng đã lưu<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div v-show="tab1Active == 1" class="mt-10" id="tab11">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px">
            <b class="f-14">Đối tượng tùy chỉnh</b>
            <span class="f-14">
              Tạo mới
              <i class="el-icon-caret-bottom"></i>
            </span>
          </div>
          <el-input
            placeholder="Tìm kiếm đối tượng có sẵn"
            v-model="search">
            <img slot="prefix" src="../../icon/svg/search.svg" alt="">
          </el-input>
          <el-button class="mt-10" type="info" plain @click="expel = true" v-if="!expel" size="medium"><div class="f-16 color-1"><b>Loại trừ</b></div></el-button>
          <div v-if="expel" style="margin-top: 16px; margin-bottom: 2px">
            <div class="mb-4 mt-12 f-14">BAO GỒM những người thỏa mãn tối thiểu MỘT tiêu chí sau</div>
            <el-input
              placeholder="Tìm kiếm đối tượng có sẵn"
              v-model="search">
              <img slot="prefix" src="../../icon/svg/search.svg" alt="">
            </el-input>

            <div class="mb-4 mt-12 f-14">BAO GỒM những người thỏa mãn tối thiểu MỘT tiêu chí sau</div>
            <el-input
              placeholder="Tìm kiếm đối tượng có sẵn"
              v-model="search">
              <img slot="prefix" src="../../icon/svg/search.svg" alt="">
            </el-input>
          </div>
          <div class="mt-16">
            <div class="tab12">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
                <b>Vị trí</b>
                <span class="f-14" style="color: #828282" @click="showLocal = true" v-show="!showLocal">
                  <i class="el-icon-edit"></i>
                  Chỉnh sửa
                </span>
              </div>
              <div v-show="!showLocal">
                Vị trí hiện tại <br>
                Việt Nam
              </div>
              <div v-show="showLocal">
                <div class="parent">
                  <div>
                    {{ adGroup.targeting.geo_locations.countries[0] }}
                  </div>
                  <el-input
                    @input="callSearch(location, 'adgeolocation', 2)"
                    size="medium"
                    placeholder="Địa điểm"
                    v-model="location"
                    clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                  <div v-show="listLocation.length > 0" class="child search-delay1">
                    <div v-for="i in listLocation" :key="i.id" @click="addLocation(i)">
                      {{ i.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab12 mt-2">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
                <b>Tuổi</b>
                <span class="f-14" style="color: #828282" @click="showAge = true" v-show="!showAge">
                  <i class="el-icon-edit"></i>
                  Chỉnh sửa
                </span>
              </div>
              <div v-show="!showAge">
                {{ adGroup.targeting.age_min }} - {{ adGroup.targeting.age_max }}
              </div>
              <div v-show="showAge">
                <el-row>
                  <el-col :span="3">
                    <el-select v-model="adGroup.targeting.age_min" placeholder="Select">
                      <el-option
                        v-for="item in ageList1"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="adGroup.targeting.age_max" placeholder="Select">
                      <el-option
                        v-for="item in ageList2"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="tab12 mt-2">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
                <b>Giới tính</b>
                <span class="f-14" style="color: #828282" v-show="!showGender" @click="showGender = true">
                  <i class="el-icon-edit"></i>
                  Chỉnh sửa
                </span>
              </div>
              <div v-show="!showGender">
                {{ adGroup.targeting.genders == 0 ? "Tất cả các giới tính" : adGroup.targeting.genders == 1 ? "Nam" : "Nữ" }}
              </div>
              <div v-show="showGender">
                <el-radio-group v-model="adGroup.targeting.genders">
                  <el-radio :label="0">Tất cả</el-radio>
                  <el-radio :label="1">Nam</el-radio>
                  <el-radio :label="2">Nữ</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div class="tab12 mt-2">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
                <b>Nhắm mục tiêu chi tiết</b>
                <span class="f-14" style="color: #828282" v-show="!showDetail" @click="showDetail = true">
                  <i class="el-icon-edit"></i>
                  Chỉnh sửa
                </span>
              </div>
              <div v-show="!showDetail">
                Tất cả thông tin nhân khẩu học, sở thích và hành vi
              </div>
              <div v-show="showDetail">
                <div class="mb-8 mt-4">Bao gồm những người khớp</div>
                <div class="parent">
                  <el-tag v-for="(i, index) in adGroup.targeting.interests" :key="i.id" closable @close="closeTag1(index)">
                    {{ i.name }}
                  </el-tag>
                  <el-input
                    @input="callSearch(detail1, 'adinterest', 1)"
                    size="medium"
                    placeholder="Thêm thông tin nhân khẩu, sở thích hoặc hành vi"
                    v-model="detail1"
                    clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                  <div v-show="listInterests.length > 0" class="child search-delay1">
                    <div v-for="i in listInterests" :key="i.id" @click="addInterests(i)">
                      {{ i.name }}
                    </div>
                  </div>
                </div>
                <div class="mb-8 mt-16">Loại trừ những người khớp</div>
                <div>
                  <el-input
                    size="medium"
                    placeholder="Thêm thông tin nhân khẩu, sở thích hoặc hành vi"
                    v-model="detail2"
                    clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>
              </div>
            </div>
            <div class="tab12 mt-2">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
                <b>Ngôn ngữ</b>
                <span class="f-14" style="color: #828282" v-show="!showLanguage" @click="showLanguage = true">
                  <i class="el-icon-edit"></i>
                  Chỉnh sửa
                </span>
              </div>
              <div v-show="!showLanguage">
                Tất cả các ngôn ngữ
              </div>
              <div v-show="showLanguage">
                <el-tag v-for="(i, index) in adGroup.targeting.locales" :key="i.key" closable @close="closeTag3(index)">
                  {{ i }}
                </el-tag>
                <div class="parent">
                  <el-input
                    @input="callSearch(language, 'adlocale', 3)"
                    class="mt-8"
                    size="medium"
                    placeholder="Ngôn ngữ tìm kiếm"
                    v-model="language"
                    clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                  <div v-show="listLanguage.length > 0" class="child search-delay1">
                    <div v-for="i in listLanguage" :key="i.key" @click="addLanguage(i)">
                      {{ i.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-link type="warning" @click="isExtend1 = !isExtend1">Ẩn tùy chọn</el-link>
          <br>
          <div class="tab12 mt-10" v-show="isExtend1">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
              <b>Kết nối</b>
              <span class="f-14" style="color: #828282" v-show="!showConnect" @click="showConnect = true">
                <i class="el-icon-edit"></i>
                Chỉnh sửa
              </span>
            </div>
            <div v-show="!showConnect">
              Tất cả mọi người
            </div>
            <div v-show="showConnect">
              <el-select size="medium" v-model="connect" placeholder="Thêm loại kết nối">
                <el-option
                  v-for="item in connectList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <el-button class="mt-10" type="info" plain @click="open()">Lưu đối tượng này</el-button>
        </div>
      </el-card>
      <el-card class="box-card" style="overflow: initial;">
        <div class="title-campaign"><b>Vị trí quảng cáo</b></div>
        <el-radio-group v-model="ad" class="mt-14">
          <el-radio :label="1" class="f-16 mb-14">Vị trí quảng cáo tự động (Được khuyên dùng)</el-radio> <br>
          <el-radio :label="2" class="f-16">Vị trí quảng cáo thủ công</el-radio>
        </el-radio-group>
        <div v-show="ad == 2">
          <div class="mt-24 mb-4">
            <b>Thiết bị</b>
            <div class="mt-4">Tất cả các thiết bị</div>
          </div>
          <div class="mt-24">
            <b>Nền tảng</b>
            <div class="system">
              <el-checkbox v-model="isFacebook" class="mb-26" @change="changeFacebook">Facebook</el-checkbox>
              <el-checkbox v-model="isInstargram" class="mb-26" @change="changeInstagram">Instargram</el-checkbox>
              <el-checkbox disabled v-model="isAN">Audience Network</el-checkbox>
              <el-checkbox v-model="isMessenger" @change="changeMessenger">Messenger</el-checkbox>
            </div>
          </div>
          <div>
            <b>Tùy chỉnh tài sản</b>
            <div class="mt-4 color-2">12/12 vị trí quảng cáo hỗ trợ tùy chỉnh tài sản</div>
          </div>
          <div class="mt-18">
            <b>Vị trí quảng cáo</b>
            <el-row :gutter="10" class="mt-4 mb-28" style="display:flex">
              <el-col :span="14" id="ad--left">
                <!-- 1 -->
                <el-row :gutter="5" class="ad-group-position">
                  <el-col :span="3">
                    <button @click="fadeAction('isExtend3')">
                      <i class="el-icon-caret-bottom"></i>
                    </button>
                  </el-col>
                  <el-col :span="21">
                    <el-checkbox :indeterminate="isNew" v-model="newValue" @change="newChange">
                      <b style="color: #000">Bảng tin</b>
                    </el-checkbox>
                    <div class="f-12 ad--note">Quảng cáo trong bảng tin để tăng mức độ hiện diện</div>
                  </el-col>
                  <el-col :span="21" :offset="3" v-show="isExtend3">
                    <el-checkbox-group v-model="newChoose" @change="newChooseChange">
                      <div v-for="item in newList" :key="item.value">
                        <el-checkbox :label="item.value">{{ item.title }}</el-checkbox>
                      </div>
                    </el-checkbox-group>
                  </el-col>
                </el-row>
                <!-- 2 -->
                <el-row :gutter="5" class="ad-group-position">
                  <el-col :span="3">
                    <button @click="fadeAction('isExtend4')">
                      <i class="el-icon-caret-bottom"></i>
                    </button>
                  </el-col>
                  <el-col :span="21">
                    <el-checkbox :indeterminate="isNew1" v-model="newValue1" @change="newChange1">
                      <b style="color: #000">Tin</b>
                    </el-checkbox>
                    <div class="f-12 ad--note">Kể câu chuyện phong phú, sống động với quảng cáo chân thực, hiển thị toàn màn hình ở định dạng dọc</div>
                  </el-col>
                  <el-col :span="21" :offset="3" v-show="isExtend4">
                    <el-checkbox-group v-model="newChoose1" @change="newChooseChange1">
                      <div v-for="item in newList1" :key="item.value">
                        <el-checkbox :label="item.value">{{ item.title }}</el-checkbox>
                      </div>
                    </el-checkbox-group>
                  </el-col>
                </el-row>
                <!-- 3 -->
                <el-row :gutter="5" class="ad-group-position">
                  <el-col :span="3">
                    <button @click="fadeAction('isExtend5')">
                      <i class="el-icon-caret-bottom"></i>
                    </button>
                  </el-col>
                  <el-col :span="21">
                    <el-checkbox :indeterminate="isNew2" v-model="newValue2" @change="newChange2">
                      <b style="color: #000">Trong luồng</b>
                    </el-checkbox>
                    <div class="f-12 ad--note">Nhanh chóng thu hút sự chú ý của mọi người khi họ xem video</div>
                  </el-col>
                  <el-col :span="21" :offset="3" v-show="isExtend5">
                    <el-checkbox-group v-model="newChoose2" @change="newChooseChange2">
                      <div v-for="item in newList2" :key="item.value">
                        <el-checkbox :label="item.value">{{ item.title }}</el-checkbox>
                      </div>
                    </el-checkbox-group>
                  </el-col>
                </el-row>
                <el-row :gutter="5" class="ad-group-position">
                  <el-col :span="3">
                    <button @click="fadeAction('isExtend6')">
                      <i class="el-icon-caret-bottom"></i>
                    </button>
                  </el-col>
                  <el-col :span="21">
                    <el-checkbox :indeterminate="isNew3" v-model="newValue3" @change="newChange3">
                      <b style="color: #000">Tìm kiếm</b>
                    </el-checkbox>
                    <div class="f-12 ad--note">Doanh nghiệp sẽ hiển thị khi mọi người tìm kiếm trên Facebook</div>
                  </el-col>
                  <el-col :span="21" :offset="3" v-show="isExtend6">
                    <el-checkbox-group v-model="newChoose3" @change="newChooseChange3">
                      <div v-for="item in newList3" :key="item.value">
                        <el-checkbox :label="item.value">{{ item.title }}</el-checkbox>
                      </div>
                    </el-checkbox-group>
                  </el-col>
                </el-row>
                <el-row :gutter="5" class="ad-group-position">
                  <el-col :span="3">
                    <button @click="fadeAction('isExtend7')">
                      <i class="el-icon-caret-bottom"></i>
                    </button>
                  </el-col>
                  <el-col :span="21">
                    <el-checkbox :indeterminate="isNew4" v-model="newValue4" @change="newChange4">
                      <b style="color: #000">Tin nhắn</b>
                    </el-checkbox>
                    <div class="f-12 ad--note">Gửi ưu đãi hoặc thông tin cập nhật cho những người đã kết nối với doanh nghiệp của bạn</div>
                  </el-col>
                  <el-col :span="21" :offset="3" v-show="isExtend7">
                    <el-checkbox-group v-model="newChoose4" @change="newChooseChange4">
                      <div v-for="item in newList4" :key="item.value">
                        <el-checkbox :label="item.value">{{ item.title }}</el-checkbox>
                      </div>
                    </el-checkbox-group>
                  </el-col>
                </el-row>
                <el-row :gutter="5" class="ad-group-position">
                  <el-col :span="3">
                    <button @click="fadeAction('isExtend8')">
                      <i class="el-icon-caret-bottom"></i>
                    </button>
                  </el-col>
                  <el-col :span="21">
                    <el-checkbox :indeterminate="isNew5" v-model="newValue5" @change="newChange5">
                      <b style="color: #000">Trong bài viết</b>
                    </el-checkbox>
                    <div class="f-12 ad--note">Tương tác với những người đọc nội dung của nhà phát hành</div>
                  </el-col>
                  <el-col :span="21" :offset="3" v-show="isExtend8">
                    <el-checkbox-group v-model="newChoose5" @change="newChooseChange5">
                      <div v-for="item in newList5" :key="item.value">
                        <el-checkbox :label="item.value">{{ item.title }}</el-checkbox>
                      </div>
                    </el-checkbox-group>
                  </el-col>
                </el-row>
                <el-row :gutter="5" class="ad-group-position">
                  <el-col :span="3">
                    <button @click="fadeAction('isExtend9')">
                      <i class="el-icon-caret-bottom"></i>
                    </button>
                  </el-col>
                  <el-col :span="21">
                    <el-checkbox :indeterminate="isNew6" v-model="newValue6" @change="newChange6">
                      <b style="color: #000">Ứng dụng và trang web</b>
                    </el-checkbox>
                    <div class="f-12 ad--note">Tăng số người tiếp cận thông qua quảng cáo trên các ứng dụng và trang web bên ngoài</div>
                  </el-col>
                  <el-col :span="21" :offset="3" v-show="isExtend9">
                    <el-checkbox-group v-model="newChoose6" @change="newChooseChange6">
                      <div v-for="item in newList6" :key="item.value">
                        <el-checkbox :label="item.value"><span v-html="item.title"></span></el-checkbox>
                      </div>
                    </el-checkbox-group>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="10" id="ad--right">
                <div style="position: sticky; top: 0px">
                  <div class="screen-phone-item">
                    <img src="../../assets/screen-phone.jpg" alt="">
                  </div>
                  <div class="mt-24 f-16" style="text-align: center"><b>Bảng tin Facebook</b></div>
                  <div class="mt-8 color-2" style="text-align: center">Bạn nên dùng hình ảnh vuông (1:1)<br>và video dọc (4:5).</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-link type="warning" @click="isExtend10 = !isExtend10">Ẩn tùy chọn</el-link>
          <br>
          <div class="tab12 mt-11" v-show="isExtend10">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
              <b>Thiết bị di động &amp; hệ điều hành cụ thể</b>
              <span class="f-14" style="color: #828282;cursor: pointer;" v-show="!showDevice" @click="showDevice = true">
                <i class="el-icon-edit"></i>
                Chỉnh sửa
              </span>
            </div>
            <div v-show="!showDevice">
              Tất cả các thiết bị di động
            </div>
            <div v-show="showDevice">
              <el-select class="mb-11" v-model="device" placeholder="Tât cả thiết bị di động">
                <el-option
                  v-for="item in deviceList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-checkbox v-model="onlyWifi">Chỉ khi được kết nối Wi- fi</el-checkbox>
            </div>
          </div>
          <div class="tab12 mt-8" v-show="isExtend7">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
              <b>Loại trừ quảng cáo bỏ qua được</b>
              <span class="f-14" style="color: #828282;cursor: pointer;" v-show="!showAntiSkipAd" @click="showAntiSkipAd = true">
                <i class="el-icon-edit"></i>
                Chỉnh sửa
              </span>
            </div>
            <div v-show="!showAntiSkipAd">
              Áp dụng cho Video trong luồng.
            </div>
            <div v-show="showAntiSkipAd" class="mt-11">
              <el-checkbox v-model="antiSkipAd">Không đưa quảng cáo bỏ qua được vào nhóm quảng cáo này</el-checkbox>
            </div>
          </div>
          <div class="dialog-type1"><el-divider></el-divider></div>
          <div class="title-campaign"><b>Sự an toàn của thương hiệu</b></div>
          <div class="f-14 mt-8 mb-18 color-2">Ngăn quảng cáo hiển thị trong hoặc cùng với những nội dung không có lợi cho thương hiệu của bạn. Bạn có thể quản lý trong phần Biện pháp kiểm soát an toàn thương hiệu</div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
            <b>Bộ lọc danh mục</b>
            <span class="f-14" style="color: #828282;cursor: pointer;" v-show="!showFilterFolder" @click="showFilterFolder = true">
              <i class="el-icon-edit"></i>
              Chỉnh sửa
            </span>
          </div>
          <div class="mt-4 mb-22" v-show="!showFilterFolder">Bài viết tức thì và video trong luồng trên Facebook : Danh mục tiêu chuẩn</div>
          <div v-show="showFilterFolder">
            <div class="color-3">Chúng tôi sẽ tự động áp dụng bộ lọc danh mục tiêu chuẩn này cho tất cả quảng cáo, trừ khi bạn thay đổi</div>
            <div class="mt-24" style="background-color: #FFF7F3;padding: 16px 16px 15px 16px;">
              <div class="mb-8">Bài viết tức thì và video trong luồng trên Facebook</div>
              <el-row :gutter="16" style="background-color: #FFFFFF;">
                <el-radio-group v-model="filterFolderValue" id="chooseFilter">
                  <el-col :lg="8">
                    <el-radio :label="1" border>
                      <b class="color-1">Danh mục đầy đủ</b>
                      <div class="color-2 mt-8 mb-18 ml-3">Loại trừ nội dung không phù hợp cho việc kiếm tiền và tiếp cận nhiều người nhất</div>
                    </el-radio>
                  </el-col>
                  <el-col :lg="8">
                    <el-radio :label="2" border>
                      <b class="color-1">Danh mục đầy đủ</b>
                      <div class="color-2 mt-8 mb-18 ml-3">Loại trừ nội dung không phù hợp cho việc kiếm tiền và tiếp cận nhiều người nhất</div>
                    </el-radio>
                  </el-col>
                  <el-col :lg="8">
                    <el-radio :label="3" border>
                      <b class="color-1">Danh mục đầy đủ</b>
                      <div class="color-2 mt-8 mb-18 ml-3">Loại trừ nội dung không phù hợp cho việc kiếm tiền và tiếp cận nhiều người nhất</div>
                    </el-radio>
                  </el-col>
                </el-radio-group>
              </el-row>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
            <b>Danh sách chặn</b>
            <span class="f-14" style="color: #828282;cursor: pointer;" v-show="!showBlockList" @click="showBlockList = true">
              <i class="el-icon-edit"></i>
              Chỉnh sửa
            </span>
          </div>
          <div class="mt-4 mb-22" v-show="!showBlockList">Chưa chọn</div>
          <div v-show="showBlockList">
            Bạn không có bất kỳ danh sách chặn nào. <b><el-link type="warning">Tạo danh sách chặn</el-link></b>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px; margin-top: 21px">
            <b>Loại trừ buổi phát trực tiếp</b>
            <span class="f-14" style="color: #828282;cursor: pointer;" v-show="!showBlockLiveStream" @click="showBlockLiveStream = true">
              <i class="el-icon-edit"></i>
              Chỉnh sửa
            </span>
          </div>
          <div v-show="!showBlockLiveStream">Chưa chọn</div>
          <div v-show="showBlockLiveStream">
            <el-checkbox v-model="isLiveStream">Không đưa quảng cáo bỏ qua được vào nhóm quảng cáo này</el-checkbox>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="title-campaign mb-22"><b>Tối ưu hóa &amp; phân phối</b></div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
          <b>Tối ưu hóa cho phân phối quảng cáo</b>
          <span class="f-14" style="color: #828282" v-show="!showOptimization" @click="showOptimization = true">
            <i class="el-icon-edit"></i>
            Chỉnh sửa
          </span>
        </div>
        <div v-show="!showOptimization" class="mt-4 mb-22">Độ cải thiện khả năng nhớ đến quảng cáo</div>
        <div v-show="showOptimization">
          <el-select v-model="optimization" placeholder="Select">
            <el-option label="Chuyển đổi" :value="1"></el-option>
          </el-select>
        </div>
        <div class="color-5 mt-10"><b>Kiểm soát chi phí (không bắt buộc)</b></div>
        <div class="mt-4 mb-42">
          <el-col :span="10">
            <NumberFormat
              v-model="adGroup.bid_amount"
              separator="."
              :min="1"
              size="medium"
              :empty-value="1"
              :placeholder="`Nhập số tiền`"
              :append="`VNĐ`" />
          </el-col>
        </div>
        <el-link type="warning" @click="isExtend11 = !isExtend11">Ẩn tùy chọn</el-link>
        <div class="tab12 mt-8" v-show="isExtend11">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
            <b>Thời điểm tính phí</b>
            <span class="f-14" style="color: #828282">
              <i class="el-icon-edit"></i>
              Chỉnh sửa
            </span>
          </div>
          <div>
            Lượt hiển thị
          </div>
        </div>
        <div class="tab12 mt-8" v-show="isExtend8">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
            <b>Loại phân phối</b>
            <span class="f-14" style="color: #828282">
              <i class="el-icon-edit"></i>
              Chỉnh sửa
            </span>
          </div>
          <div>
            Tiêu chuẩn
          </div>
        </div>
      </el-card>
    </div>
    <div v-show="!edit">
      <el-card class="box-card">
        <div class="title-campaign">
          <b>Tên nhóm quảng cáo</b>
          <span class="f-14" style="color: #828282;cursor: pointer;">
            <i class="el-icon-edit"></i>
            Chỉnh sửa
          </span>
        </div>
        <div class="content">
          Nhóm 1<br>
          ID: 348259375493
        </div>
        <div class="title-campaign">
          <b>Ngân sách</b>
          <span class="f-14" style="color: #828282;cursor: pointer;">
            <i class="el-icon-edit"></i>
            Chỉnh sửa
          </span>
        </div>
        <div class="content">
          Ngân sách hàng ngày 100.000đ
        </div>
        <div class="title-campaign">
          <b>Ngày bắt đầu</b>
          <span class="f-14" style="color: #828282;cursor: pointer;">
            <i class="el-icon-edit"></i>
            Chỉnh sửa
          </span>
        </div>
        <div class="content">
          02:10 Thứ Tư, 6 tháng 1, 2021 <br>
          Giờ Thái Bình Dương
        </div>
        <div class="title-campaign">
          <b>Ngày kết thúc</b>
          <span class="f-14" style="color: #828282;cursor: pointer;">
            <i class="el-icon-edit"></i>
            Chỉnh sửa
          </span>
        </div>
        <div class="content">
          Chạy liên tục
        </div>
        <div class="title-campaign">
          <b>Lên lịch quảng cáo</b>
          <span class="f-14" style="color: #828282;cursor: pointer;">
            <i class="el-icon-edit"></i>
            Chỉnh sửa
          </span>
        </div>
        <div class="content">
          Luôn chạy quảng cáp
        </div>
        <div class="title-campaign">
          <b>Tuổi</b>
          <span class="f-14" style="color: #828282;cursor: pointer;">
            <i class="el-icon-edit"></i>
            Chỉnh sửa
          </span>
        </div>
        <div class="content">
          16 - 54+
        </div>
        <div class="title-campaign">
          <b>Giới tính</b>
          <span class="f-14" style="color: #828282;cursor: pointer;">
            <i class="el-icon-edit"></i>
            Chỉnh sửa
          </span>
        </div>
        <div class="content">
          Tất cả
        </div>
      </el-card>
    </div>
    <el-dialog
      title="Lưu đối tượng"
      :visible.sync="dialogVisible"
      width="640px"
      append-to-body
      :before-close="handleClose">
      <div>
        <el-row>
          <el-col :lg="6">
            <b>Tên đối tượng</b>
          </el-col>
          <el-col :lg="18">
            <div>
              <el-input placeholder="Tên đối tượng" v-model="nameObject" size="medium"></el-input>
              <div class="f-12 color-1 mt-16">
                <span class="color-2">Vị trí - Sống tại</span>: Việt Nam: Vĩ độ 13,94 Kinh độ 107,98 Pleiku (+16 km), Vĩ độ 13,95 Kinh độ 107,79 Pleikù Tông, Gia Lai-Cong Tum, Vietnam (+16 km) Gia Lai Province
                <br><span class="color-2">Tuổi</span>: 18 - 65+
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()" size="medium">Hủy</el-button>
        <el-button type="warning" @click="save()" size="medium">Lưu</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NumberFormat from '@/components/NumberFormat'
import commonApi from '@/api/commonApi'
import { listPosition } from '@/utils/common'
const common = new commonApi()
export default {
  name: 'tabAdGroup',
  components: { NumberFormat },
  props: {
    edit: {
      required: true,
      type: Boolean
    },
    flag: {
      required: true,
      type: Boolean
    },
    tab: {
      required: true,
      type: Number
    },
  },
  computed: {
    idCampaign () {
      return this.$store.getters.idCampaign
    },
    itemCampaign () {
      return this.$store.getters.itemCampaign
    },
    idAdGroup () {
      return this.$store.getters.idAdGroup
    },
    showDraw () {
      return this.$store.getters.showDraw
    },
    listFacebook() {
      return this.$store.getters.listFacebook
    },
    listAllPosition() {
      return [...this.newChoose, ...this.newChoose1, ...this.newChoose2, ...this.newChoose3, ...this.newChoose4, ...this.newChoose5, ...this.newChoose6]
    }
  },
  watch: {
    showDraw(val) {
      if (val) {
        this.adGroup.campaign_id = this.idCampaign
        if(this.itemCampaign.objective == "CONVERSIONS") {
          this.adGroup.optimization_goal = "CONVERSATIONS"
        }
      } else {
        this.adGroup = {...this.$store.getters.itemAdGroup}
        this.isFacebook = false
        this.isInstargram = false
        this.isAN = false
        this.isMessenger = false
        this.newChoose = []
        this.newChoose1 = []
        this.newChoose2 = []
        this.newChoose3 = []
        this.newChoose4 = []
        this.newChoose5 = []
        this.newChoose6 = []
      }
    },
    flag(val) {
      let tempItem = JSON.parse(JSON.stringify({...this.adGroup}))
      if(!this.isEnd) {
        delete tempItem.end_time
      }
      if(tempItem.optimization_goal != "IMPRESSIONS ") {
        delete tempItem.promoted_object
      }
      if(this.ad == 1) {
        tempItem.targeting.publisher_platforms = []
        tempItem.targeting.facebook_positions = []
        tempItem.targeting.instagram_positions = []
        tempItem.targeting.messenger_positions = []
      }
      if(this.ad == 2) {
        let listTemp = []
        if(this.isFacebook) {
          listTemp.push('facebook')
        }
        if(this.isInstargram) {
          listTemp.push('instagram')
        }
        if(this.isMessenger) {
          listTemp.push('messenger')
        }
        if(this.isAN) {
          listTemp.push('audience_network')
        }
        tempItem.targeting.publisher_platforms = [...listTemp]
        let listFacebookPositionTemp = []
        let listInstargramPositionTemp = []
        let listMessengerPositionTemp = []
        let listANPositionTemp = []
        this.listAllPosition.forEach(item => {
          if(item == 0 || item == 2 || item == 3 || item == 8 || item == 11 || item == 13) {
            listFacebookPositionTemp.push(this.listPosition[item])
          }
          if(item == 1 || item == 5 || item == 7) {
            listInstargramPositionTemp.push(this.listPosition[item])
          }
          if(item == 9) {
            listMessengerPositionTemp.push(this.listPosition[item])
          }
        })
        tempItem.targeting.facebook_positions = [...listFacebookPositionTemp]
        tempItem.targeting.instagram_positions = [...listInstargramPositionTemp]
        tempItem.targeting.messenger_positions = [...listMessengerPositionTemp]
      }
      setTimeout(() => {
        this.$store.dispatch('setItemAdGroup', tempItem)
      }, 50)
    },
    idCampaign(val) {
      this.adGroup.campaign_id = val
      this.$store.dispatch('setItemAdGroup', this.adGroup)
    },
    idAdGroup(val) {
      setTimeout(() => {
        if(this.showDraw) {
          if (val) {
            this.isLoading = true
            common.callApi({
              type: "GET",
              _id: val
            }).then(reps => {
              if (reps.code == 200) {
                if(reps.data._id) {
                  let temp = reps.data.data
                  temp.targeting.genders = temp.targeting.genders[0]
                  if(temp.daily_budget != 0) {
                    temp.budget = temp.daily_budget
                    temp.budget_type = 1
                  }
                  if(temp.lifetime_budget != 0) {
                    temp.budget = temp.lifetime_budget
                    temp.budget_type = 2
                  }
                  if(!temp.targeting.interests) {
                    temp.targeting.interests = []
                  }
                  if(!temp.targeting.locales) {
                    temp.targeting.locales = []
                  }
                  if(!temp.promoted_object) {
                    temp.promoted_object = { page_id: '' }
                  }
                  if(!temp.targeting.publisher_platforms) {
                    temp.targeting.publisher_platforms = []
                  }
                  if(temp.targeting.publisher_platforms) {
                    if (temp.targeting.publisher_platforms.includes('facebook')) {
                      this.isFacebook = true
                    }
                    if (temp.targeting.publisher_platforms.includes('instagram')) {
                      this.isInstargram = true
                    }
                    if (temp.targeting.publisher_platforms.includes('messenger')) {
                      this.isMessenger = true
                    }
                    if (temp.targeting.publisher_platforms.includes('audience_network')) {
                      this.isAN = true
                    }
                  }
                  if(!temp.targeting.facebook_positions) {
                    temp.targeting.facebook_positions = []
                  }
                  if(temp.targeting.facebook_positions) {
                    temp.targeting.facebook_positions.forEach(i => {
                      const indexTemp = this.listPosition.indexOf(i)
                      if(indexTemp <= 6) {
                        this.newChoose.push(indexTemp)
                      }
                      if(indexTemp == 7) {
                        this.newChoose1.push(8)
                      }
                      if(indexTemp == 11) {
                        this.newChoose3.push(11)
                      }
                      if(indexTemp == 13) {
                        this.newChoose4.push(13)
                      }
                    })
                  }
                  if(temp.targeting.instagram_positions) {
                    temp.targeting.instagram_positions.forEach(i => {
                      const indexTemp = this.listPosition.indexOf(i)
                      if(indexTemp <= 6) {
                        this.newChoose.push(indexTemp)
                      }
                      if(indexTemp == 7) {
                        this.newChoose1.push(7)
                      }
                    })
                  }
                  if(temp.targeting.messenger_positions) {
                    if(temp.targeting.messenger_positions.includes('story')) {
                      this.newChoose1.push(9)
                    }
                    if(temp.targeting.messenger_positions.includes('messenger_home')) {
                      this.newChoose.push(6)
                    }
                  }
                  if(!temp.promoted_object) {
                    temp.promoted_object = { page_id: '' }
                  }
                  this.newChooseChange(this.newChoose)
                  this.newChooseChange1(this.newChoose1)
                  this.newChooseChange2(this.newChoose2)
                  this.newChooseChange3(this.newChoose3)
                  this.newChooseChange4(this.newChoose4)
                  this.newChooseChange5(this.newChoose5)
                  this.newChooseChange6(this.newChoose6)
                  this.adGroup = {...temp}
                  if(reps.data.data.status == 'PAUSED') {
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
            setTimeout(() => {
              let temp = {...this.$store.getters.itemAdGroup}
              if(this.itemCampaign.objective == "CONVERSIONS") {
                temp.optimization_goal = "CONVERSATIONS"
              }
              if(!temp.targeting.publisher_platforms) {
                temp.targeting.publisher_platforms = []
              }
              if(temp.targeting.publisher_platforms) {
                if (temp.targeting.publisher_platforms.includes('facebook')) {
                  this.isFacebook = true
                }
                if (temp.targeting.publisher_platforms.includes('instagram')) {
                  this.isInstargram = true
                }
                if (temp.targeting.publisher_platforms.includes('messenger')) {
                  this.isMessenger = true
                }
                if (temp.targeting.publisher_platforms.includes('audience_network')) {
                  this.isAN = true
                }
              }
              this.adGroup = temp
              this.adGroup.campaign_id = this.idCampaign
            }, 10)
          }
        }
      }, 5)
    }
  },
  data () {
    return {
      listPosition: listPosition,
      optimization: 1,
      showOptimization: false,
      messagesType: 0,
      conversionsType: 0,
      page: '',
      isLoading: false,
      adGroup: {
        targeting: {
          geo_locations: {
            countries: []
          }
        },
        promoted_object: {
          page_id: ''
        }
      },
      dialogVisible: false,
      listLocation: [],
      listInterests: [],
      listLanguage: [],
      ageList1: [],
      ageList2: [],
      location: '',
      gender: 1,
      detail1: '',
      detail2: '',
      isLoadDetail1: false,
      language: '',
      connect: '',
      connectList: [
        {
          id: 1,
          label: 'kết nối 1'
        }
      ],
      device: '',
      deviceList: [
        {
          id: 1,
          label: 'Thiết bị 1'
        }
      ],
      filterFolderValue: 0,
      isLiveStream: false,
      onlyWifi: false,
      antiSkipAd: false,
      showLocal: false,
      showAge: false,
      showGender: false,
      showDetail: false,
      showLanguage: false,
      showConnect: false,
      showDevice: false,
      showAntiSkipAd: false,
      showFilterFolder: false,
      showBlockList: false,
      showBlockLiveStream: false,
      isNew: false,
      newValue: false,
      newList: [
        {
          title: 'Bảng tin Facebook',
          value: 0
        },
        {
          title: 'Bảng tin Instagram',
          value: 1
        },
        {
          title: 'Facebook Marketplace',
          value: 2
        },
        {
          title: 'Bảng tin video trên Facebook',
          value: 3
        },
        {
          title: 'Cột bên phải trên Facebook',
          value: 4
        },
        {
          title: 'Khám phá Instagram',
          value: 5
        },
        {
          title: 'Hộp thư Messenger',
          value: 6
        }
      ],
      newChoose: [],
      isNew1: false,
      newValue1: false,
      newList1: [
        {
          title: 'Instagram Stories',
          value: 7
        },
        {
          title: 'Facebook Stories',
          value: 8
        },
        {
          title: 'Messenger Stories',
          value: 9
        }
      ],
      newChoose1: [],
      isNew2: false,
      newValue2: false,
      newList2: [
        {
          title: 'Video trong luồng trên Facebook',
          value: 10
        }
      ],
      newChoose2: [],
      isNew3: false,
      newValue3: false,
      newList3: [
        {
          title: 'Kết quả tìm kiếm trên Facebook',
          value: 11
        }
      ],
      newChoose3: [],
      isNew4: false,
      newValue4: false,
      newList4: [
        {
          title: 'Tin nhắn được tài trợ trên Messenger',
          value: 12
        }
      ],
      newChoose4: [],
      isNew5: false,
      newValue5: false,
      newList5: [
        {
          title: 'Bài viết tức thì trên Facebook',
          value: 13
        }
      ],
      newChoose5: [],
      isNew6: false,
      newValue6: false,
      newList6: [
        {
          title: 'Quảng cáo tự nhiên, biểu ngữ và chèn<br>giữa trên Audience Network',
          value: 14
        },
        {
          title: 'Video kèm phần thưởng trên<br>Audience Network',
          value: 15
        },
        {
          title: 'Video trong luồng trên Audience<br>Network',
          value: 16
        }
      ],
      newChoose6: [],
      platformsFacebook: [0,2,3,8,11,13],
      platformsInstagram: [1,5,7],
      platformsAudienceNetwork: [],
      platformsMessenger: [6,9],
      isFacebook: false,
      isInstargram: false,
      isAN: false,
      isMessenger: false,
      isPlatformsFacebook: false,
      isPlatformsInstargram: false,
      isPlatformsAN: false,
      isPlatformsMessenger: false,
      ad: 1,
      groupName: '',
      choose: false,
      dateStart: '',
      dateEnd: '',
      timeStart: '',
      timeEnd: '',
      isEnd: false,
      tab1Active: 1,
      search: '',
      expel: false,
      nameObject: '',
      isExtend: false,
      isExtend1: false,
      isExtend3: false,
      isExtend4: false,
      isExtend5: false,
      isExtend6: false,
      isExtend7: false,
      isExtend8: false,
      isExtend9: false,
      isExtend10: false,
      isExtend11: false,
      delayTimer: ''
    }
  },
  mounted () {
    let temp = {...this.$store.getters.itemAdGroup}
    if(this.$store.getters.idAdGroup) {
      temp.targeting.genders = temp.targeting.genders[0]
      if(temp.daily_budget != 0) {
        temp.budget = temp.daily_budget
        temp.budget_type = 1
      }
      if(temp.lifetime_budget != 0) {
        temp.budget = temp.lifetime_budget
        temp.budget_type = 2
      }
      if(!temp.targeting.interests) {
        temp.targeting.interests = []
      }
      if(!temp.targeting.locales) {
        temp.targeting.locales = []
      }
      if(!temp.promoted_object) {
        temp.promoted_object = { page_id: '' }
      }
      if(!temp.targeting.publisher_platforms) {
        temp.targeting.publisher_platforms = []
      }
      if(temp.targeting.publisher_platforms) {
        if (temp.targeting.publisher_platforms.includes('facebook')) {
          this.isFacebook = true
        }
        if (temp.targeting.publisher_platforms.includes('instagram')) {
          this.isInstargram = true
        }
        if (temp.targeting.publisher_platforms.includes('messenger')) {
          this.isMessenger = true
        }
        if (temp.targeting.publisher_platforms.includes('audience_network')) {
          this.isAN = true
        }
      }
      if(!temp.targeting.facebook_positions) {
        temp.targeting.facebook_positions = []
      }
      if(temp.targeting.facebook_positions) {
        temp.targeting.facebook_positions.forEach(i => {
          const indexTemp = this.listPosition.indexOf(i)
          if(indexTemp <= 6) {
            this.newChoose.push(indexTemp)
          }
          if(indexTemp == 7) {
            this.newChoose1.push(8)
          }
          if(indexTemp == 11) {
            this.newChoose3.push(11)
          }
          if(indexTemp == 13) {
            this.newChoose4.push(13)
          }
        })
      }
      if(temp.targeting.instagram_positions) {
        temp.targeting.instagram_positions.forEach(i => {
          const indexTemp = this.listPosition.indexOf(i)
          if(indexTemp <= 6) {
            this.newChoose.push(indexTemp)
          }
          if(indexTemp == 7) {
            this.newChoose1.push(7)
          }
        })
      }
      if(temp.targeting.messenger_positions) {
        if(temp.targeting.messenger_positions.includes('story')) {
          this.newChoose1.push(9)
        }
        if(temp.targeting.messenger_positions.includes('messenger_home')) {
          this.newChoose.push(6)
        }
      }
      this.newChooseChange(this.newChoose)
      this.newChooseChange1(this.newChoose1)
      this.newChooseChange2(this.newChoose2)
      this.newChooseChange3(this.newChoose3)
      this.newChooseChange4(this.newChoose4)
      this.newChooseChange5(this.newChoose5)
      this.newChooseChange6(this.newChoose6)
      if(this.adGroup.status == 'PAUSED') {
        this.$store.dispatch('setIsTemp', true)
      } else {
        this.$store.dispatch('setIsTemp', false)
      }
    }
    this.adGroup = {...temp}
    this.adGroup.campaign_id = this.idCampaign

    for (let index = 13; index < 66; index++) {
      this.ageList1.push(index)
    }
    for (let index = 13; index < 66; index++) {
      this.ageList2.push(index)
    }
    // this.ageList2[this.ageList2.length - 1] = this.ageList2[this.ageList2.length - 1] + '+'
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
    closeTag1 (index) {
      this.adGroup.targeting.interests.splice(index, 1)
    },
    closeTag3 (index) {
      this.adGroup.targeting.locales.splice(index, 1)
    },
    convertName (key, list) {
      const itemTemp = list.find(item => item.key == key)
      if(itemTemp) {
        return itemTemp.name
      }
      return ''
    },
    addLocation (item) {
      const temp = item.key
      this.adGroup.targeting.geo_locations.countries = [temp]
    },
    addInterests (item) {
      const temp = {
        id: item.id,
        name: item.name
      }
      this.adGroup.targeting.interests.unshift(temp)
    },
    addLanguage (item) {
      const key = item.key
      this.adGroup.targeting.locales.unshift(key)
    },
    callSearch (key, fields, type) {
      this.isLoadDetail1 = true
      clearTimeout(this.delayTimer)
      if(this.detail1 == '' && type == 1) {
        this.listInterests = []
      }
      else if (this.language == '' && type == 3) {
        this.listLanguage = []
      }
      else if (this.location == '' && type == 2) {
        this.listLocation = []
      } else {
        this.delayTimer = setTimeout(() => {
          common.search({
            param: 'search',
            data: {
              type: fields,
              q: key
            },
            method: 'GET',
            version: 'v10.0'
          }).then(reps => {
            if(reps.code == 200) {
              if(reps.data.data) {
                if(type == 1) {
                  this.listInterests = reps.data.data
                }
                if(type == 2) {
                  this.listLocation = reps.data.data
                }
                if(type == 3) {
                  this.listLanguage = reps.data.data
                }
              }
            }
          }).catch(() => {

          }).finally(() => {
            this.isLoadDetail1 = false
          })
        },1000)
      }
    },
    handleClose () {},
    open () {
      this.dialogVisible = true
    },
    close () {
      this.dialogVisible = false
    },
    save () {
      this.dialogVisible = false
    },
    fadeAction (val) {
      switch (val) {
        case 'isExtend3':
          this.isExtend3 = !this.isExtend3
          break
        case 'isExtend4':
          this.isExtend4 = !this.isExtend4
          break
        case 'isExtend5':
          this.isExtend5 = !this.isExtend5
          break
        case 'isExtend6':
          this.isExtend6 = !this.isExtend6
          break
        case 'isExtend7':
          this.isExtend7 = !this.isExtend7
          break
        case 'isExtend8':
          this.isExtend8 = !this.isExtend8
          break
        case 'isExtend9':
          this.isExtend9 = !this.isExtend9
          break
        default:
          // code block
      }
    },
    changeFacebook(val) {
      let listTemp = [...this.newChoose]
      let listTemp1 = [...this.newChoose1]
      if(val) {
        if(listTemp.length == 0) {
          listTemp = [0,2,3]
        } else {
          this.platformsFacebook.forEach(i => {
            if(listTemp.some(item => item != i && this.newList.some(j => j.value == i))) {
              listTemp.unshift(i)
            }
          });
        }
        if(listTemp1.length == 0) {
          listTemp1 = [8]
        } else {
          this.platformsFacebook.forEach(i => {
            if(listTemp1.some(item => item != i && this.newList1.some(j => j.value == i))) {
              listTemp1.unshift(i)
            }
          });
        }
      } else {
        listTemp.splice(listTemp.findIndex(i => i == 0), 1)
        listTemp.splice(listTemp.findIndex(i => i == 1), 1)
        listTemp.splice(listTemp.findIndex(i => i == 3), 1)
        listTemp1.splice(listTemp1.findIndex(i => i == 8), 1)
      }
      this.newChoose = listTemp
      this.newChoose1 = listTemp1
      this.newChoose3 = val ? this.newList3.map(item => item.value) : []
      this.newChoose5 = val ? this.newList5.map(item => item.value) : []

      const checkedCount = listTemp.length
      this.newValue = (checkedCount == this.newList.length)
      this.isNew = (checkedCount > 0 && checkedCount < this.newList.length)

      const checkedCount1 = listTemp1.length
      this.newValue1 = (checkedCount1 == this.newList1.length)
      this.isNew1 = (checkedCount1 > 0 && checkedCount1 < this.newList1.length)

      const checkedCount2 = this.newChoose3.length
      this.newValue3 = (checkedCount2 == this.newList3.length)
      this.isNew3 = (checkedCount2 > 0 && checkedCount2 < this.newList3.length)

      const checkedCount4 = this.newChoose5.length
      this.newValue5 = (checkedCount4 == this.newList5.length)
      this.isNew5 = (checkedCount4 > 0 && checkedCount4 < this.newList5.length)
    },
    changeInstagram (val) {
      let listTemp = [...this.newChoose]
      let listTemp1 = [...this.newChoose1]
      if(val) {
        if(listTemp.length == 0) {
          listTemp = [1,5]
        } else {
          this.platformsInstagram.forEach(i => {
            if(listTemp.some(item => item != i && this.newList.some(j => j.value == i))) {
              listTemp.unshift(i)
            }
          });
        }
        if(listTemp1.length == 0) {
          listTemp1 = [7]
        } else {
          this.platformsInstagram.forEach(i => {
            if(listTemp1.some(item => item != i && this.newList1.some(j => j.value == i))) {
              listTemp1.unshift(i)
            }
          });
        }
      } else {
        listTemp.splice(listTemp.findIndex(i => i == 1), 1)
        listTemp.splice(listTemp.findIndex(i => i == 5), 1)
        listTemp1.splice(listTemp1.findIndex(i => i == 7), 1)
      }
      this.newChoose = listTemp
      this.newChoose1 = listTemp1

      const checkedCount = listTemp.length
      this.newValue = (checkedCount == this.newList.length)
      this.isNew = (checkedCount > 0 && checkedCount < this.newList.length)

      const checkedCount1 = listTemp1.length
      this.newValue1 = (checkedCount1 == this.newList1.length)
      this.isNew1 = (checkedCount1 > 0 && checkedCount1 < this.newList1.length)
    },
    changeMessenger (val) {
      let listTemp = [...this.newChoose]
      let listTemp1 = [...this.newChoose1]
      if(val) {
        if(listTemp.length == 0) {
          listTemp = [6]
        } else {
          this.platformsMessenger.forEach(i => {
            if(listTemp.some(item => item != i && this.newList1.some(j => j.value == i))) {
              listTemp.unshift(i)
            }
          });
        }
        if(listTemp1.length == 0) {
          listTemp1 = [9]
        } else {
          this.platformsMessenger.forEach(i => {
            if(listTemp1.some(item => item != i && this.newList1.some(j => j.value == i))) {
              listTemp1.unshift(i)
            }
          });
        }
      } else {
        listTemp.splice(listTemp1.findIndex(i => i == 6), 1)
        listTemp1.splice(listTemp1.findIndex(i => i == 9), 1)
      }
      this.newChoose = listTemp
      this.newChoose1 = listTemp1

      const checkedCount = listTemp.length
      this.newValue = (checkedCount == this.newList.length)
      this.isNew = (checkedCount > 0 && checkedCount < this.newList.length)
      
      const checkedCount1 = listTemp1.length
      this.newValue1 = (checkedCount1 == this.newList1.length)
      this.isNew1 = (checkedCount1 > 0 && checkedCount1 < this.newList1.length)
    },
    newChange (val) {
      this.newChoose = val ? this.newList.map(item => item.value) : []
      this.isNew = false
      let array = [...this.newChoose, ...this.newChoose1, ...this.newChoose3, ...this.newChoose5]
      this.isFacebook = array.filter(i => i == 0 || i == 2 || i == 3 || i == 8 || i == 11 || i == 13).length >= 1
      this.isInstargram = array.filter(i => i == 1 || i == 5 || i == 7).length >= 1
      this.isMessenger = array.filter(i => i == 6 || i == 9).length == 1
    },
    newChooseChange (value) {
      const checkedCount = value.length
      this.newValue = (checkedCount == this.newList.length)
      this.isNew = (checkedCount > 0 && checkedCount < this.newList.length)
      let array = [...this.newChoose, ...this.newChoose1, ...this.newChoose3, ...this.newChoose5]
      this.isFacebook = array.filter(i => i == 0 || i == 2 || i == 3 || i == 8 || i == 11 || i == 13).length >= 1
      this.isInstargram = array.filter(i => i == 1 || i == 5 || i == 7).length >= 1
      this.isMessenger = array.filter(i => i == 6 || i == 9).length == 1
    },
    newChange1 (val) {
      this.newChoose1 = val ? this.newList1.map(item => item.value) : []
      this.isNew1 = false
      let array = [...this.newChoose, ...this.newChoose1, ...this.newChoose3, ...this.newChoose5]
      this.isFacebook = array.filter(i => i == 0 || i == 2 || i == 3 || i == 8 || i == 11 || i == 13).length >= 1
      this.isInstargram = array.filter(i => i == 1 || i == 5 || i == 7).length >= 1
      this.isMessenger = array.filter(i => i == 6 || i == 9).length == 1
    },
    newChooseChange1 (value) {
      const checkedCount = value.length
      this.newValue1 = (checkedCount == this.newList1.length)
      this.isNew1 = (checkedCount > 0 && checkedCount < this.newList1.length)
      let array = [...this.newChoose, ...this.newChoose1, ...this.newChoose3, ...this.newChoose5]
      this.isFacebook = array.filter(i => i == 0 || i == 2 || i == 3 || i == 8 || i == 11 || i == 13).length >= 1
      this.isInstargram = array.filter(i => i == 1 || i == 5 || i == 7).length >= 1
      this.isMessenger = array.filter(i => i == 6 || i == 9).length == 1
    },
    newChange2 (val) {
      this.newChoose2 = val ? this.newList2.map(item => item.value) : []
      this.isNew2 = false
    },
    newChooseChange2 (value) {
      const checkedCount = value.length
      this.newValue2 = (checkedCount == this.newList2.length)
      this.isNew2 = (checkedCount > 0 && checkedCount < this.newList2.length)
    },
    newChange3 (val) {
      this.newChoose3 = val ? this.newList3.map(item => item.value) : []
      this.isNew3 = false
      let array = [...this.newChoose, ...this.newChoose1, ...this.newChoose3, ...this.newChoose5]
      this.isFacebook = array.filter(i => i == 0 || i == 2 || i == 3 || i == 8 || i == 11 || i == 13).length >= 1
    },
    newChooseChange3 (value) {
      const checkedCount = value.length
      this.newValue3 = (checkedCount == this.newList3.length)
      this.isNew3 = (checkedCount > 0 && checkedCount < this.newList3.length)
      let array = [...this.newChoose, ...this.newChoose1, ...this.newChoose3, ...this.newChoose5]
      this.isFacebook = array.filter(i => i == 0 || i == 2 || i == 3 || i == 8 || i == 11 || i == 13).length >= 1
    },
    newChange4 (val) {
      this.newChoose4 = val ? this.newList4.map(item => item.value) : []
      this.isNew4 = false
    },
    newChooseChange4 (value) {
      const checkedCount = value.length
      this.newValue4 = (checkedCount == this.newList4.length)
      this.isNew4 = (checkedCount > 0 && checkedCount < this.newList4.length)
    },
    newChange5 (val) {
      this.newChoose5 = val ? this.newList5.map(item => item.value) : []
      this.isNew5 = false
      let array = [...this.newChoose, ...this.newChoose1, ...this.newChoose3, ...this.newChoose5]
      this.isFacebook = array.filter(i => i == 0 || i == 2 || i == 3 || i == 8 || i == 11 || i == 13).length >= 1
    },
    newChooseChange5 (value) {
      const checkedCount = value.length
      this.newValue5 = (checkedCount == this.newList5.length)
      this.isNew5 = (checkedCount > 0 && checkedCount < this.newList5.length)
      let array = [...this.newChoose, ...this.newChoose1, ...this.newChoose3, ...this.newChoose5]
      this.isFacebook = array.filter(i => i == 0 || i == 2 || i == 3 || i == 8 || i == 11 || i == 13).length >= 1
    },
    newChange6 (val) {
      this.newChoose6 = val ? this.newList6.map(item => item.value) : []
      this.isNew6 = false
    },
    newChooseChange6 (value) {
      const checkedCount = value.length
      this.newValue6 = (checkedCount == this.newList6.length)
      this.isNew6 = (checkedCount > 0 && checkedCount < this.newList6.length)
    }
  }
}
</script>

<style></style>
