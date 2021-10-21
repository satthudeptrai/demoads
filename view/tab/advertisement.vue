<template>
  <div v-loading="isLoading">
    <div v-show="edit">
      <el-card class="box-card">
        <div style="display: flex; justify-content: space-between;">
          <div class="title-campaign"><b>Tên quảng cáo</b></div>
          <el-link type="warning">Tạo mẫu tên</el-link>
        </div>
        <el-input
          class="mt-12"
          placeholder="Tên quảng cáo"
          v-model="itemAds.name"
          size="medium"
        ></el-input>
      </el-card>
      <el-card class="box-card" style="overflow: visible;">
        <div class="title-campaign"><b>Nhận diện</b></div>
        <div class="mt-12 mb-2"><b>Trang Facebook</b></div>
        <div class="parent">
          <button style="width: 100%;" class="flex-between" @click="isShowIdentifiedFb = !isShowIdentifiedFb">
            <div class="ver-align">
              <div class="mt-9 ml-8 mb-8" style="width: 20px; height: 20px; border-radius: 50%">
                <!-- sửa thành facebook.img -->
                <img v-show="facebook.name" slot="prefix" src="../../assets/avatar.jpg" alt="" style="width: 20px; height: 20px; border-radius: 50%" />
              </div>
              <div class="ml-4">{{ facebook.name }}</div>
            </div>
            <i class="el-icon-caret-bottom f-20"></i>
          </button>
          <div v-show="isShowIdentifiedFb" class="child box-style1" style="overflow-y: auto">
            <div style="margin: 0 16px 16px 16px">
              <el-input size="medium" style="padding: 16px 0 18px 0; z-index: 2" class="bg-1" placeholder="Tìm kiếm theo trang hoặc ID trang" v-model="searchIdentifiedFb">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-collapse v-model="activeNamesIdentifiedFb">
                <el-collapse-item name="1">
                  <template slot="title" style="">
                    <div style="line-height: 150%;">
                      <b>Cá nhân</b>
                      <div class="f-12 color-2">7 trang</div>
                    </div>
                  </template>
                  <div>
                    <div
                      v-for="(item, index) in listFacebookFilter"
                      :key="index"
                      :class="{ 'ver-align': true, 'item-type1': true, 'bg-1': facebook.id == item.id }"
                      style="cursor: pointer;"
                      @click="chooseItemFb(item)">
                      <div style="width: 28px">
                        <i v-show="facebook.id == item.id" class="el-icon-check f-20"></i>
                      </div>
                      <div class="ver-align">
                        <img src="../../assets/avatar.jpg" alt="" class="mr-8" style="padding-top: 8px; padding-bottom: 14px; width: 32px; height: 32px; border-radius: 50%">
                        <div>
                          <div style="line-height: 100%;">
                            {{ item.name}}
                          </div>
                          <div class="f-12 color-2" style="line-height: 100%;">
                            ID: {{ item.id }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-collapse-item>
                <el-collapse-item name="2">
                  <template slot="title" style="">
                    <div style="line-height: 150%;">
                      <b>Botbanhang</b>
                      <div class="f-12 color-2">7 trang</div>
                    </div>
                  </template>
                  <div></div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </div>
        <div class="mt-12 mb-2"><b>Tài khoản Instargram</b></div>
        <div class="parent">
          <button style="width: 100%;" class="flex-between" @click="isShowIdentifiedIg = !isShowIdentifiedIg">
            <div class="ver-align">
              <div class="mt-9 ml-8 mb-8" style="width: 20px; height: 20px; border-radius: 50%">
                <!-- sửa thành instargram.img -->
                <img v-show="instargram.label" slot="prefix" src="../../assets/avatar.jpg" alt="" style="width: 20px; height: 20px; border-radius: 50%" />
              </div>
              <div class="ml-4">{{ instargram.label }}</div>
            </div>
            <i class="el-icon-caret-bottom f-20"></i>
          </button>
          <div v-show="isShowIdentifiedIg" class="child box-style1" style="overflow-y: auto">
            <div style="margin: 16px">
              <el-input size="medium" class="mb-18" placeholder="Tìm kiếm theo trang hoặc ID trang" v-model="searchIdentifiedIg">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-collapse v-model="activeNamesIdentifiedIg">
                <el-collapse-item name="1">
                  <template slot="title" style="">
                    <div style="line-height: 150%;">
                      <b>Cá nhân</b>
                      <div class="f-12 color-2">7 trang</div>
                    </div>
                  </template>
                  <div>
                    <div
                      v-for="(item, index) in instargramListFilter"
                      :key="index"
                      :class="{ 'ver-align': true, 'item-type1': true, 'bg-1': instargram.id == item.id }"
                      style="cursor: pointer;"
                      @click="chooseItemIg(item)">
                      <div style="width: 28px">
                        <i v-show="instargram.id == item.id" class="el-icon-check f-20"></i>
                      </div>
                      <div class="ver-align">
                        <img src="../../assets/avatar.jpg" alt="" class="mr-8" style="padding-top: 8px; padding-bottom: 14px; width: 32px; height: 32px; border-radius: 50%">
                        <div>
                          <div style="line-height: 100%;">
                            {{ item.label}}
                          </div>
                          <div class="f-12 color-2" style="line-height: 100%;">
                            ID: {{ item.id }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-collapse-item>
                <el-collapse-item name="2">
                  <template slot="title" style="">
                    <div style="line-height: 150%;">
                      <b>Botbanhang</b>
                      <div class="f-12 color-2">7 trang</div>
                    </div>
                  </template>
                  <div></div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </div>
        <el-checkbox v-model="branded" style="margin-top: 13px">Nội dung có thương hiệu</el-checkbox>
        <div class="mt-6 mb-2"><b>Trang Facebook của đối tác</b></div>
        <el-input placeholder="Trang Facebook của đối tác" v-model="partnerFacebook" size="medium"></el-input>
        <div class="mt-6 mb-2"><b>Tài khoản Instargram của đối tác</b></div>
        <el-input placeholder="Tài khoản Instargram của đối tác" v-model="partnerFacebook" size="medium"></el-input>
      </el-card>
      <el-card class="box-card">
        <div class="title-campaign mb-12"><b>Thiết lập quảng cáo</b></div>
        <el-select v-model="settingAds" placeholder="Select">
          <el-option label="Tạo quảng cáo" :value="1"></el-option>
          <el-option label="Sử dụng bài viết có sẵn" :value="2"></el-option>
        </el-select>
        <div v-show="settingAds == 1">
          <div class="mt-12 mb-6"><b>Định dạng</b></div>
          <el-radio-group class="radio-group" v-model="format">
            <el-radio :label="1" class="mt-12">
              <div class="color-1">Một hình ảnh/ video</div>
              <div class="f-12 color-2 mt-2">Một hình ảnh/video hoặc một bản trình chiếu có nhiều hình ảnh</div>
            </el-radio>
            <el-radio :label="2" class="mt-12">
              <div class="color-1">Quay vòng</div>
              <div class="f-12 color-2 mt-2">Từ 2 hình ảnh/ video có thể cuộn trở lên</div>
            </el-radio>
          </el-radio-group>
          <div class="mt-32"><b>Trải nghiệm toàn màn hình trên di động</b></div>
          <el-checkbox-group v-model="experience" style="display: flex;flex-direction: column;">
            <el-checkbox :label="1" class="mt-11">Thêm trải nghiệm tức thì</el-checkbox>
            <el-checkbox :label="2" class="mt-16">Thêm file nguồn của bản dùng thử</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="title-campaign"><b>Nội dung quảng cáo</b></div>
        <div class="f-12 mt-8 mb-16">Chọn file phương tiện, văn bản và trang đích cho quảng cáo. Bạn còn có thể tùy chỉnh file phương tiện và văn bản cho từng vị trí quảng cáo. <el-link type="warning">Tìm hiểu thêm</el-link></div>
        <div v-show="settingAds == 2">
          <div style="display: flex">
            <div><img :src="image" alt="" style="width: 110px;"></div>
            <div class="ml-16">
              <div class="ver-align">
                <i class="fab fa-facebook f-20"></i>
                <div class="color-2 ml-8">Facebook Post</div>
              </div>
              <div class="f-16 mt-10"><b>Bài viết Title</b></div>
              <div class="ver-align mt-4 color-2">
                <div class="mr-12">3927435234</div>
                <div>14 Tháng 7, 2020</div>
              </div>
            </div>
          </div>
          <div class="mt-8">
            <el-button @click="openChoosePost()" class="mr-2" size="medium"><i class="fas fa-comment-alt mr-6"></i>Chọn bài viết</el-button>
            <el-button size="medium"><i class="fas fa-plus mr-6"></i>Tạo bài viết</el-button>
          </div>
          <div class="mt-22">
            <el-input
              class="input-type1"
              v-model="itemAds.creative.creative_id">
              <div slot="suffix" style="color: #FF5F0B;cursor: pointer;" @click="send()">Gửi</div>
            </el-input>
          </div>
        </div>
        <div v-show="settingAds == 1">
          <div v-show="format == 1">
            <div><b>Phương tiện truyền thông</b></div>
            <div class="parent">
              <div @click="isShowAdd = !isShowAdd" class="bg-1 btn-type3" style="width: 202px;">
                <div><i class="el-icon-plus mr-9"></i></div>
                <div>Thêm file phương tiện</div>
                <div><i class="el-icon-caret-bottom ml-15"></i></div>
              </div>
              <div v-show="isShowAdd" class="child bg-2" style="width: 228px;top:37px;left:0;z-index:2">
                <div @click="chooseTypeAdd(1)" style="padding: 8px 12px;display:flex;cursor: pointer;">
                  <div>
                    <i class="fas fa-image mr-8"></i>
                  </div>
                  <div>Thêm hình ảnh</div>
                </div>
                <div @click="chooseTypeAdd(2)" style="padding: 8px 12px;display:flex;cursor: pointer;">
                  <div>
                    <i class="fab fa-youtube mr-8"></i>
                  </div>
                  <div>Thêm video</div>
                </div>
              </div>
            </div>
            <div class="mt-10">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
                <b>Tiêu đề</b>
                <span class="f-14" style="color: #828282">
                  {{ listTitle.length }}/5
                </span>
              </div>
              <div class="mt-12 flex-between" v-for="(i, index) in listTitle" :key="index">
                <el-input
                  placeholder="Tiêu đề"
                  v-model="listTitle[index]">
                </el-input>
                <i v-show="listTitle.length > 1" class="el-icon-close" style="font-weight: bold;font-size: 20px;" @click="removeTitle(index)"></i>
              </div>
              <el-button :disabled="true" icon="el-icon-plus" size="medium" class="mt-12" @click="addTitle()">Thêm thông số</el-button>
            </div>
            <div class="mt-10">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
                <b>Mô tả<span class="color-2">∙ Không bắt buộc</span></b>
                <span class="f-14" style="color: #828282">
                  {{ listDescription.length }}/5
                </span>
              </div>
              <div class="mt-12 flex-between" v-for="(i, index) in listDescription" :key="index">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2}"
                  placeholder="Hãy giới thiệu nội dung quảng cáo của bạn"
                  v-model="listDescription[index]">
                </el-input>
                <i v-show="listDescription.length > 1" class="el-icon-close" style="font-weight: bold;font-size: 20px;" @click="removeDescription(index)"></i>
              </div>
              <el-button :disabled="true" icon="el-icon-plus" size="medium" class="mt-12" @click="addDescription()">Thêm thông số</el-button>
            </div>
          </div>
          <div v-show="format == 2">
            <div class="mb-19"><b>Thẻ quay vòng</b></div>
            <div>
                <el-collapse accordion @change="openCollapse" class="collapse1">
                  <el-collapse-item v-for="(item, index) in listCard" :key="index" :name="index">
                    <template slot="title" class="header-collapse1">
                      <img src="../../icon/svg/extend.svg" alt="">
                      <div :style="{ backgroundColor: index == indexCard ? '#FFDDCB' : '#F2F2F2', padding: '0 18px' }">
                        <i class="el-icon-plus" style="font-weight: 900;"></i>
                      </div>
                      <div class="color-2 ml-12 f-12">Nhập tiêu đề , mô tả và URL</div>
                    </template>
                    <div class="f-14">
                      <el-button @click="openFolderImage(item)" size="medium">Chọn hình ảnh</el-button>
                      <div class="mt-12"><b>Tiêu đề</b></div>
                      <el-input class="mt-8" size="medium" placeholder="www/abc.vn" v-model="item.title"></el-input>
                      <div class="mt-12"><b>Mô tả</b></div>
                      <el-input class="mt-8" size="medium" placeholder="www/abc.vn" v-model="item.description"></el-input>
                      <div class="mt-12"><b>URL trang web</b></div>
                      <el-input class="mt-8" size="medium" placeholder="www/abc.vn" v-model="item.url"></el-input>
                      <div class="mt-12 ver-align" style="justify-content: space-between;">
                        <el-link type="warning" @click="openUrl(index)">Tạo thông số URL</el-link>
                        <el-button type="info" icon="el-icon-delete" plain @click="removeCard(index)" size="medium">Gỡ</el-button>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
                <el-dropdown class="mt-16" trigger="click" placement="bottom-end" @command="createNewCard">
                  <el-button icon="el-icon-plus" size="medium">
                    Thêm file phương tiện<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="img">Thêm hình ảnh</el-dropdown-item>
                    <el-dropdown-item command="video">Thêm video</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="mt-16 mb-8"><b>Chỉnh sửa vị trí quảng cáo</b></div>
            <el-select v-model="adPosition" size="medium" placeholder="Chọn vị trí quảng cáo để chính sửa">
              <el-option
              v-for="item in listAdPosition"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
            <el-checkbox-group class="mt-16" v-model="experience" style="display: flex;flex-direction: column;">
              <el-checkbox :label="1" class="mt-11">Tự động hiển thị thẻ hiệu quả nhất trước tiên</el-checkbox>
              <el-checkbox :label="2" class="mt-16">Thêm thẻ vào cuối ảnh đại diện của Trang</el-checkbox>
            </el-checkbox-group>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
              <b>Văn bản chính</b>
              <span class="f-14" style="color: #828282">
                {{ listMainText.length }}/5
              </span>
            </div>
            <div class="mt-12 flex-between" v-for="(i, index) in listMainText" :key="index">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2}"
                placeholder="Hãy giới thiệu nội dung quảng cáo của bạn"
                v-model="listMainText[index]">
              </el-input>
              <i v-show="listMainText.length > 1" class="el-icon-close" style="font-weight: bold;font-size: 20px;" @click="removeMainText(index)"></i>
            </div>
            <el-button :disabled="true" icon="el-icon-plus" size="medium" class="mt-12" @click="addMainText()">Thêm thông số</el-button>
            <div class="mt-16 mb-8"><b>URL xem thêm</b></div>
            <el-input placeholder="www/abc.vn" v-model="itemPost.object_story_spec.link_data.link" size="medium"></el-input>
            <div class="mt-16 mb-8"><b>Xem thêm liên kết hiển thị - <span class="color-2">Không bắt buộc</span></b></div>
            <el-input placeholder="www/abc.vn" v-model="link" size="medium"></el-input>
            <div class="mt-16 mb-8"><b>Nút kêu gọi hành động</b></div>
            <el-select v-model="buttonActive" size="medium" placeholder="Select">
              <el-option
                v-for="item in listButtonActive"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-card>
      <!-- MESSAGES -->
      <el-card v-if="itemCampaign.objective == 'MESSAGES'" class="box-card">
        <div class="f-16"><b>Mẫu tin nhắn</b></div>
        <div>Chọn mẫu để bắt đầu chat sau khi mọi người nhấn vào quảng cáo của bạn.<el-link type="warning"> Tìm hiểu thêm</el-link></div>
        <div class="ver-align">
          <div @click="messengerFormTab = 0" :class="['btn-type3', 'bg-1', 'mr-15', {'is-active': messengerFormTab == 0}]">
            <div>Tạo mới</div>
          </div>
          <div @click="messengerFormTab = 1" :class="['btn-type3', 'bg-1', {'is-active': messengerFormTab == 1}]">
            <div>Sử dụng mẫu có sẵn</div>
          </div>
        </div>
        <div v-show="messengerFormTab == 0">
          <el-radio-group v-model="messengerForm">
            <div class="radio-group1">
              <el-radio :label="0">
                <div class="f-14">Bắt chuyện</div>
                <div class="mt-4 color-5 f-12">
                  Đưa ra gợi ý để mọi người nhấn vào và bắt đầu trò chuyện với
                  <br>doanh nghiệp bạn.
                </div>
                <div class="mt-10 color-4" v-show="messengerForm == 0">
                  <div class="ver-align">
                    <div @click="dialogMessengerForm = true" style="padding: 10px 13px;" class="btn-type3 bg-1 mr-15">
                      <i class="fas fa-pen mr-6"></i>
                      <div>Chỉnh sửa</div>
                    </div>
                    <div style="padding: 10px 13px;" class="btn-type3 bg-1">
                      <i class="fab fa-facebook-messenger mr-6"></i>
                      <div>Xem trước trong messenger</div>
                    </div>
                  </div>
                </div>
              </el-radio>
              <el-radio :label="1">
                <div class="f-14">Tìm kiếm khách hàng tiềm năng</div>
                <div class="mt-4 color-5 f-12">
                  Thu thập thông tin từ những người quan tâm đến doanh nghiệp
                  <br>của bạn và tiếp tục trò chuyện với các khách hàng tiềm năng đủ
                  <br>điều kiện ngay trên Messenger.<el-link class="f-12" type="warning"> Tìm hiểu thêm</el-link>
                </div>
                <div class="mt-10 color-4" v-show="messengerForm == 1">
                  <div class="ver-align">
                    <div style="padding: 10px 13px;" class="btn-type3 bg-1 mr-15">
                      <i class="fas fa-plus mr-6"></i>
                      <div>Tạo đoạn chat</div>
                    </div>
                  </div>
                </div>
              </el-radio>
              <el-radio :label="2">
                <div class="f-14">Thiết lập nâng cao</div>
                <div class="mt-4 color-5 f-12">
                  Tùy chỉnh trải nghiệm mà mọi người nhìn thấy trong Messenger
                  <br>sau khi nhấp vào quảng cáo của bạn.
                </div>
                <div class="mt-10 color-4" v-show="messengerForm == 2">
                  <div class="ver-align">
                    <div style="padding: 10px 13px;" class="btn-type3 bg-1 mr-15">
                      <i class="fas fa-pen mr-6"></i>
                      <div>Chỉnh sửa</div>
                    </div>
                    <div style="padding: 10px 13px;" class="btn-type3 bg-1">
                      <i class="fab fa-facebook-messenger mr-6"></i>
                      <div>Xem trước trong messenger</div>
                    </div>
                  </div>
                </div>
              </el-radio>
            </div>
          </el-radio-group>
        </div>
        <div v-show="messengerFormTab == 1">
          <div>Sử dụng, chỉnh sửa hoặc sao chép mẫu có sẵn bạn đã tạo.<el-link type="warning"> Tìm hiểu thêm</el-link></div>
          <div>Bạn chưa lưu mẫu nào. Mẫu mà bạn lưu sẽ hiển thị ở đây để dùng cho các chiến dịch trong tương lai.</div>
          <div><b>Chọn mẫu</b></div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="mb-8"><b>Theo dõi</b></div>
        <div class="color-2">Theo dõi tập dữ liệu sự kiện chứa lượt chuyển đổi mà quảng cáo có thể thúc đẩy. Theo mặc định, hệ thống sẽ theo dõi tập dữ liệu chứa chuyển đổi chọn cho tài khoản quảng cáo.</div>
        <el-checkbox class="mt-6" v-model="isEvent">Sự kiện trên trang web</el-checkbox>
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;" class="mt-5">
          <b>Sự kiện trong ứng dụng</b>
          <span class="f-14">
            <el-button size="medium">Thiết lập</el-button>
          </span>
        </div>
        <div class="mt-14"><b>Sự kiện offline</b></div>
        <div class="mt-8 mb-8"><b>Thông số URL</b></div>
        <el-input placeholder="www/abc.vn" v-model="specifications" size="medium"></el-input>
        <el-link type="warning" class="mt-14">Tạo thông số URL</el-link>
      </el-card>
    </div>
    <div v-show="!edit">
      <el-card class="box-card">
        <div class="title-campaign">
          <b>Tên quảng cáo</b>
          <span class="f-14" style="color: #828282;cursor: pointer;">
            <i class="el-icon-edit"></i>
            Chỉnh sửa
          </span>
        </div>
        <div class="content">
          Quảng cáo 1 <br>
          ID: 348259375493
        </div>
        <div class="title-campaign">
          <b>Trang Facebook</b>
          <span class="f-14" style="color: #828282;cursor: pointer;">
            <i class="el-icon-edit"></i>
            Chỉnh sửa
          </span>
        </div>
        <div class="content">
          Bán hàng Trung Quốc
        </div>
        <div class="title-campaign">
          <b>Tài khoản Instagram</b>
          <span class="f-14" style="color: #828282;cursor: pointer;">
            <i class="el-icon-edit"></i>
            Chỉnh sửa
          </span>
        </div>
        <div class="content">
          Sử dụng trang đã chọn
        </div>
        <div class="title-campaign">
          <b>Bài viết</b>
          <span class="f-14" style="color: #828282;cursor: pointer;">
            <i class="el-icon-edit"></i>
            Chỉnh sửa
          </span>
        </div>
        <div class="content">
          ABCFSFERABCFSFER <br>
          32543589593
        </div>
        <div class="title-campaign">
          <b>Facebook Pixel</b>
          <span class="f-14" style="color: #828282;cursor: pointer;">
            <i class="el-icon-edit"></i>
            Chỉnh sửa
          </span>
        </div>
        <div class="content">
          Pixel của Trang Vũ <br>
          ID: 32543589593
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="title-campaign">
          <b class="f-16">Xem trước Quảng cáo</b>
          <div class="f-12 color-2 ver-align">
            <div class="mr-17">
              1/1 Quảng cáo
            </div>
            <div style="cursor: pointer;" class="mr-23">
              <i class="el-icon-arrow-left"></i>
            </div>
            <div style="cursor: pointer;">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
        <div class="flex-between mt-8">
          <el-button size="medium">
            Facebook stories
            <i class="el-icon-caret-bottom ml-28"></i>
          </el-button>
          <div class="ver-align">
            <div class="mr-16">{{ numberPage }}/25</div>
            <button class="mr-8 btn1" @click="downPage()">
              <i class="el-icon-caret-left"></i>
            </button>
            <button class="btn1" @click="upPage()">
              <i class="el-icon-caret-right"></i>
            </button>
          </div>
        </div>
        <hr style="margin: 16 0px 11px 0px; border-color: #E0E0E0">
        <div>
          <div class="title-campaign">
            <div>Đây là ví dụ</div>
            <el-button size="medium" @click="openMoreVer()">
              Xem thêm phiên bản
            </el-button>
          </div>
          <div style="width: 400px; height: 400px; margin: auto; border: solid 1px gray; margin-top: 7px"></div>
        </div>
      </el-card>
    </div>
    <el-dialog
      title="Tạo thông số URL"
      :visible.sync="dialogVisible"
      width="640px"
      append-to-body
      :before-close="handleClose">
      <div>
        <div>Hãy điền vào các trường trong mẫu bên dưới để thêm thông số vào URL trang web của bạn. Để tự động nhận thông tin từ chiến dịch, nhóm quảng cáo hoặc quảng cáo, hãy nhấp vào mỗi trường và chọn thông số động như id={ { ad.id } }. <el-link type="warning">Tìm hiểu thêm</el-link></div>
        <el-row :gutter="12" class="mt-23">
          <el-form :model="tempExtension">
            <el-col :md="6">
              <b>Nguồn chiến dịch</b>
            </el-col>
            <el-col :md="18">
              <el-form-item>
                <el-input v-model="tempExtension.source" size="medium"></el-input>
                <div style="line-height: 150%;word-break: break-word;" class="f-12 color-2">
                  Để xác định nguồn lưu lượng truy cập. Ví dụ: Facebook, Instagram, công cụ tìm kiếm hoặc các nguồn khác.
                </div>
              </el-form-item>
            </el-col>
            <el-col :md="6">
              <b>Phương tiện chiến dịch</b>
            </el-col>
            <el-col :md="18">
              <el-form-item>
                <el-input v-model="tempExtension.parameter" size="medium"></el-input>
                <div style="line-height: 150%;word-break: break-word;" class="f-12 color-2">
                  Để xác định phương tiện quảng cáo. Ví dụ: banner, email, Facebook_Feed hoặc Instagram_Story.
                </div>
              </el-form-item>
            </el-col>
            <el-col :md="6">
              <b>Tên chiến dịch</b>
            </el-col>
            <el-col :md="18">
              <el-form-item>
                <el-input v-model="tempExtension.name" size="medium"></el-input>
                <div style="line-height: 150%;word-break: break-word;" class="f-12 color-2">
                  Để xác định một chiến dịch chiến lược hoặc quảng cáo cụ thể. Ví dụ: summer_sale.
                </div>
              </el-form-item>
            </el-col>
            <el-col :md="6">
              <b>Nội dung chiến dịch</b>
            </el-col>
            <el-col :md="18">
              <el-form-item>
                <el-input v-model="tempExtension.contend" size="medium"></el-input>
                <div style="line-height: 150%;word-break: break-word;" class="f-12 color-2">
                  Để phân biệt quảng cáo hoặc liên kết trỏ đến cùng một URL. Ví dụ: white_logo, black_logo.
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24" class="color-4 mt-16">
              <b>Thông số tùy chỉnh</b>
            </el-col>
            <div class="color-4" v-for="(item, index) in tempExtension.extension" :key="index">
              <el-col :span="11">
                <div class="mt-12 mb-6"><b>Tên thông số</b></div>
                <div><el-input v-model="item.name" size="medium" placeholder="VD: ngôn ngữ"></el-input></div>
              </el-col>
              <el-col :span="13">
                <div class="mt-12 mb-6"><b>Giá trị</b></div>
                <div class="flex-between">
                  <el-input v-model="item.value" size="medium" placeholder="VD: ngôn ngữ" style="width: 268px;"></el-input>
                  <i class="el-icon-close" style="font-weight: bold;font-size: 20px;" @click="removeItem(index)"></i>
                </div>
              </el-col>
            </div>
            <el-col :span="24">
              <el-button icon="el-icon-plus" size="medium" class="mt-12" @click="addItem()">Thêm thông số</el-button>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()" size="medium">Hủy</el-button>
        <el-button type="warning" @click="save()" size="medium">Áp dụng</el-button>
      </span>
    </el-dialog>
    <showMoreVersion :dialog-more-ver="dialogMoreVer" @closeMoreVer="closeMoreVer" />
    <choosePost :dialog="dialogChoosePost" :id-page="facebook.id" @closeChoosePost="closeChoosePost" />
    <chooseImg :dialog="dialogChooseImg" @closeChooseImg="closeChooseImg" />
    <chooseVideo :dialog="dialogChooseVideo" @closeChooseVideo="closeChooseVideo" />
    <messengerForm :dialog="dialogMessengerForm" @closeMessengerForm="closeMessengerForm" />
    <input id="chooseImage" @change="chooseImage()" ref="chooseImage" type="file" style="display: none;" />
  </div>
</template>

<script>
import showMoreVersion from './dialog/showMoreVersion'
import choosePost from './dialog/choosePost'
import chooseImg from './dialog/chooseImg'
import chooseVideo from './dialog/chooseVideo'
import messengerForm from './dialog/messengerForm'
import commonApi from '@/api/commonApi'
const common = new commonApi()
export default {
  name: 'tabAd',
  props: {
    edit: {
      required: true,
      type: Boolean
    },
    flag: {
      required: true,
      type: Boolean
    },
  },
  components: { showMoreVersion, choosePost, chooseImg, chooseVideo, messengerForm },
  watch: {
    idAdGroup(val) {
      this.itemAds.adset_id = val
      // this.$store.dispatch('setItemAd', this.itemAds)
    },
    showDraw(val) {
      if(val) {
        this.itemAds = this.$store.getters.itemAd
        this.itemAds.adset_id = this.idAdGroup
        this.itemPost = JSON.parse(JSON.stringify({...this.$store.getters.itemPost}))
      } else {
        this.facebook = {
          id: ''
        }
        this.listMainText = ['']
        this.listTitle = ['']
        this.listDescription = ['']
      }
    },
    flag(val) {
      if(this.settingAds == 1) {
        this.itemAds.creative.creative_id = ''
        this.itemPost.object_story_spec.page_id = this.facebook.id
      }
      if(this.listMainText.length > 1 || this.listDescription.length > 1 || this.listTitle.length > 1) {
        this.itemPost.asset_feed_spec.bodies = this.listMainText.map(i => {
          return {
            text: i
          }
        })
        this.itemPost.asset_feed_spec.descriptions = this.listDescription.map(i => {
          return {
            text: i
          }
        })
        this.itemPost.asset_feed_spec.titles = this.listTitle.map(i => {
          return {
            text: i
          }
        })
      }
      if(this.listMainText.length == 1 || this.listDescription.length == 1 || this.listTitle.length == 1) {
        this.itemPost.object_story_spec.name = this.listTitle[0]
        this.itemPost.object_story_spec.message = this.listMainText[0]
        this.itemPost.object_story_spec.description = this.listDescription[0]
        delete this.itemPost.asset_feed_spec
      }
      this.$store.dispatch('setItemAd', {...this.itemAds})
      this.$store.dispatch('setItemPost', {...this.itemPost})
    },
    idAds(val) {
      if(val) {
        this.isLoading = true
        common.callApi({
          type: "GET",
          _id: val
        }).then(reps => {
          if (reps.code == 200) {
            if(reps.data._id) {
              this.itemAds = reps.data.data
              this.$store.dispatch('setIdAdGroup', reps.data.data.adset_id)
              if(reps.data.data.status == 'PAUSED') {
                this.$store.dispatch('setIsTemp', true)
              } else {
                this.$store.dispatch('setIsTemp', false)
              }
              common.callApi({
                type: "GET",
                _id: this.itemAds.creative.creative_id
              }).then(reps1 => {
                if(reps1.code && reps1.data) {
                  let adcreativesTemp = reps1.data.data
                  // this.itemPost = adcreativesTemp
                  this.facebook = this.listFacebook.find(i => i.id == adcreativesTemp.object_story_spec.page_id)
                }
              }).catch((error) => {
                  this.catchError(error)
              }).finally(() => {
                this.isLoading = false
              })
            }
          }
        }).catch((error) => {
            this.catchError(error)
        })
      } else {
        this.itemAds = this.$store.getters.itemAd
        this.itemAds.adset_id = this.idAdGroup
      }
    }
  },
  data () {
    return {
      messengerFormTab: 0,
      messengerForm: 0,  
      isShowAdd: false,
      isLoading: false,
      itemAds: {
        creative: {
          creative_id: ''
        }
      },
      itemPost: {
        object_story_spec: {
          link_data: {
            link: ''
          },
          page_id: '',
          name: "",
          message: "",
          description: ""
        },
      },
      isShowIdentifiedFb: false,
      isShowIdentifiedIg: false,
      activeNamesIdentifiedFb: '1',
      activeNamesIdentifiedIg: '1',
      searchIdentifiedFb: '',
      searchIdentifiedIg: '',
      dialogMoreVer: false,
      dialogChoosePost: false,
      dialogChooseImg: false,
      dialogChooseVideo: false,
      dialogMessengerForm: false,
      numberPage: 1,
      idPosts: '',
      image: require('@/assets/image/image1.jpg'),
      isEvent: false,
      dialogVisible: false,
      indexCard: -1,
      adName: '',
      facebook: {
        id: '',
        name: ''
      },
      instargram: '',
      branded: false,
      partnerFacebook: '',
      partnerInstargram: '',
      settingAds: 1,
      format: 1,
      adPosition: '',
      listMainText: [''],
      listTitle: [''],
      listDescription: [''],
      url: '',
      link: '',
      buttonActive: 1,
      specifications: '',
      listButtonActive: [
        {
          value: 0,
          label: 'Đăng ký'
        },
        {
          value: 1,
          label: 'Đăng ký ngay'
        },
        {
          value: 2,
          label: 'Đặt ngay'
        },
        {
          value: 3,
          label: 'Liên hệ với chúng tôi'
        },
        {
          value: 4,
          label: 'Nhận báo giá'
        },
        {
          value: 5,
          label: 'Tìm hiểu thêm'
        },
        {
          value: 6,
          label: 'Gửi tin nhắn'
        },
        {
          value: 7,
          label: 'Mua ngay'
        },
        {
          value: 8,
          label: 'Đăng kí'
        }
      ],
      listAdPosition: [
        {
          id: 1,
          label: 'Vị trí 1'
        }
      ],
      experience: [],
      instargramList: [
        {
          id: 1,
          label: 'Bot bán hàng'
        },
        {
          id: 2,
          label: 'ánh'
        },
        {
          id: 3,
          label: 'đẹp'
        },
        {
          id: 4,
          label: 'trai'
        }
      ],
      listCard: [
        {
          id: 1,
          img: '',
          title: '',
          description: '',
          url: '',
          extension: {
            source: '',
            name: '',
            contend: '',
            parameter: '',
            extension: [
              {
                name: '',
                value: ''
              }
            ]
          }
        },
        {
          id: 2,
          img: '',
          title: '',
          description: '',
          url: '',
          extension: {
            source: '',
            name: '',
            contend: '',
            parameter: '',
            extension: [
              {
                name: '',
                value: ''
              }
            ]
          }
        },
        {
          id: 4,
          img: '',
          title: '',
          description: '',
          url: '',
          extension: {
            source: '',
            name: '',
            contend: '',
            parameter: '',
            extension: [
              {
                name: '',
                value: ''
              }
            ]
          }
        }
      ],
      newCard: {
        id: null,
        img: '',
        title: '',
        description: '',
        url: '',
        extension: {
          source: '',
          name: '',
          contend: '',
          parameter: '',
          extension: [
            {
              name: '',
              value: ''
            }
          ]
        }
      },
      newItem: {
        name: '',
        value: ''
      },
      tempExtension: {
        source: '',
        name: '',
        contend: '',
        parameter: '',
        extension: [
          {
            name: '',
            value: ''
          }
        ]
      }
    }
  },
  computed: {
    listFacebookFilter () {
      if (!this.searchIdentifiedFb) {
        return this.listFacebook
      }
      return this.listFacebook.filter(i => i.name.toLowerCase().includes(this.searchIdentifiedFb.toLowerCase()))
    },
    listFacebook() {
      return this.$store.getters.listFacebook
    },
    instargramListFilter () {
      if (!this.searchIdentifiedIg) {
        return this.instargramList
      }
      return this.instargramList.filter(i => i.label.toLowerCase().includes(this.searchIdentifiedIg.toLowerCase()))
    },
    itemCampaign() {
      return this.$store.getters.itemCampaign
    },
    idAdGroup() {
      return this.$store.getters.idAdGroup
    },
    idAds() {
      return this.$store.getters.idAds
    },
    showDraw () {
      return this.$store.getters.showDraw
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
    chooseTypeAdd(type) {
      this.isShowAdd = false
      if(type == 1) {
        this.dialogChooseImg = true
      } else {
        this.dialogChooseVideo = true
      }
    },
    chooseItemFb (item) {
      this.facebook = item
      this.itemPost.object_story_spec.page_id = item.id
      this.isShowIdentifiedFb = false
      this.searchIdentifiedFb = ''
    },
    chooseItemIg (item) {
      this.instargram = item
      this.isShowIdentifiedIg = false
      this.searchIdentifiedIg = ''
    },
    openMoreVer () {
      this.dialogMoreVer = true
    },
    closeMoreVer (data) {
      this.dialogMoreVer = false
    },
    openChoosePost () {
      this.dialogChoosePost = true
    },
    closeChoosePost(data) {
      this.dialogChoosePost = false
      if(data.type == 2) {
        this.itemAds.creative.creative_id = data.data
      }
    },
    closeChooseImg(data) {
      this.dialogChooseImg = false
    },
    closeChooseVideo(data) {
      this.dialogChooseVideo = false
    },
    closeMessengerForm() {
      this.dialogMessengerForm = false
    },
    upPage () {
      if (this.numberPage < 25) {
        this.numberPage++
      }
    },
    downPage () {
      if (this.numberPage > 1) {
        this.numberPage--
      }
    },
    send () {
      console.log('ok')
    },
    removeMainText (index) {
      this.listMainText.splice(index, 1)
    },
    addMainText () {
      if (this.listMainText.length < 5) {
        this.listMainText.push('')
      }
    },
    removeTitle (index) {
      this.listTitle.splice(index, 1)
    },
    addTitle () {
      if (this.listTitle.length < 5) {
        this.listTitle.push('')
      }
    },
    removeDescription (index) {
      this.listDescription.splice(index, 1)
    },
    addDescription () {
      if (this.listDescription.length < 5) {
        this.listDescription.push('')
      }
    },
    removeItem (index) {
      this.tempExtension.extension.splice(index, 1)
    },
    addItem () {
      const tempItem = { ...this.newItem }
      this.tempExtension.extension.push(tempItem)
    },
    openUrl (index) {
      this.dialogVisible = true
      this.tempExtension = JSON.parse(JSON.stringify({ ...this.listCard[index].extension }))
    },
    handleClose () {},
    close () {
      this.dialogVisible = false
    },
    save () {
      this.dialogVisible = false
      if (this.indexCard >= 0) {
        this.listCard[this.indexCard].extension = JSON.parse(JSON.stringify({ ...this.tempExtension }))
      }
    },
    removeCard (index) {
      this.listCard.splice(index, 1)
    },
    createNewCard (command) {
      const tempCard = JSON.parse(JSON.stringify({ ...this.newCard }))
      this.listCard.push(tempCard)
    },
    openCollapse (index) {
      this.indexCard = index
    },
    openFolderImage () {
      const fileImg = document.getElementById('chooseImage')
      fileImg.click()
    },
    chooseImage () {
      console.log('chooseImage')
    }
    // deleteFile () {
    //   window.$(document).ready(function () {
    //     window.$('#chooseImage').val('')
    //     return false
    //   })
    // }
  },
  mounted () {
    this.itemAds = this.$store.getters.itemAd
    this.itemAds.adset_id = this.$store.getters.idAdGroup
    this.itemPost = JSON.parse(JSON.stringify({...this.$store.getters.itemPost}))
    common.search({
      param: "me/accounts",
      data: {},
      method: "GET",
      version: 'v10.0'
    }).then(reps => {
      if(reps.code == 200 && reps.data) {
        this.$store.dispatch('setListFacebook', reps.data.data)
        if(this.itemAds.creative.creative_id) {
          common.callApi({
            _id: this.itemAds.creative.creative_id,
            type: 'GET'
          }).then(reps1 => {
            if(reps1.code && reps1.data) {
              let adcreativesTemp = reps1.data
              this.facebook = this.listFacebook.find(i => i.id == adcreativesTemp.data.object_story_spec.page_id)
              console.log(this.facebook)
            }
          }).catch((error) => {
            this.catchError(error)
          }).finally(() => {
            this.isLoading = false
          })
        } else {
          this.isLoading = false
        }
      }
    })
  }
}
</script>

<style></style>
