<template>
  <el-dialog
    class="dialog-type2"
    :visible.sync="isShowDialog"
    :fullscreen="true"
    :show-close="false">
    <div slot="title" class="ver-align">
      <i @click="close()" class="fas fa-angle-left mr-25 f-20"></i>
      <div class="f-16">Tạo chiến dịch</div>
    </div>
    <div class="color-1">
      <div class="flex-between mt-16 mb-16 ml-16" @click="openChoosePage()">
        <div class="ver-align">
          <img :src="page.linkImg" alt="" style="width: 48px; height: 48px; border-radius: 50%">
          <div class="ml-12 f-18">{{ page.name }}</div>
        </div>
        <div style="margin-right: 21.5px"><i class="fas fa-caret-down"></i></div>
      </div>
      <div style="background: #E0E0E0; height: 4px; width: 100%"></div>
      <div style="text-align: center;" class="mt-16 mb-13 color-5">Mục tiêu Marketing của bạn là gì?</div>
      <div class="ml-17 mb-48">
        <div v-for="item in listTarget" :key="item.id" class="flex-between mt-8" @click="nextPage(item.id)">
          <div class="ver-start">
            <img :src='item.icon' alt="" class="mr-15">
            <div style="width: 245px">
              <div>{{ item.label }}</div>
              <div class="f-12 color-2" style="word-break: break-word;line-height: 14px;">{{ item.sologan }}</div>
            </div>
          </div>
          <div><i class="el-icon-arrow-right f-20" style="margin-right: 22.67px"></i></div>
        </div>
      </div>
    </div>
    <div style="background: #333333;border-radius: 100px;width: 134px;height: 5px;position: fixed; bottom:0;left: calc(50vw - 67px)"></div>
  </el-dialog>
</template>

<script>
export default {
  name: 'createCampaign',
  props: {
    isShowDialog: {
      required: true,
      type: Boolean,
      default: false
    },
    pageValue: {
      required: true,
      type: Object
    },
    listPage: {
      required: true,
      type: Array
    }
  },
  watch: {
    pageValue (val) {
      this.page = val.id ? val : this.listPage[0]
    }
  },
  data () {
    return {
      page: {
        id: null,
        name: '',
        linkImg: ''
      },
      listTarget: [
        {
          id: 1,
          label: 'Nhận thức về thương hiệu',
          sologan: 'Thu hút nhiều người xem và tương tác với bài viết hơn',
          icon: require('@/icon/svg/speakerphone.svg')
        },
        {
          id: 2,
          label: 'Số người tiếp cận',
          sologan: 'Hiển thị quảng cáo cho số người tối đa',
          icon: require('@/icon/svg/hand.svg')
        },
        {
          id: 3,
          label: 'Lưu lượng truy cập trang web',
          sologan: 'Thu hút thêm người truy cập trang web của bạn',
          icon: require('@/icon/svg/cursor.svg')
        },
        {
          id: 4,
          label: 'Tương tác với bài viết',
          sologan: 'Thu hút thêm lượt thích Trang',
          icon: require('@/icon/svg/sparkles.svg')
        },
        {
          id: 5,
          label: 'Số lượt cài đặt ứng dụng',
          sologan: 'Hiển thị quảng cáo cho những người có nhiều khả năng tải xuống và tương tác với ứng dụng của bạn nhất.',
          icon: require('@/icon/svg/globe.svg')
        },
        {
          id: 6,
          label: 'Lượt xem video',
          sologan: 'Thu hút thêm nhiều người nhắn tin cho bạn trong Messenger',
          icon: require('@/icon/svg/vcamera.svg')
        },
        {
          id: 7,
          label: 'Lượt thích trang',
          sologan: 'Thu hút nhiều người xem và tương tác với Trang của bạn',
          icon: require('@/icon/svg/like.svg')
        },
        {
          id: 8,
          label: 'Lượt phản hồi sự kiện',
          sologan: 'Thu hút thêm nhiều người xem và phản hồi sự kiện',
          icon: require('@/icon/svg/clipboard-check.svg')
        },
        {
          id: 9,
          label: 'Chuyển đổi',
          sologan: 'Hiển thị quảng cáo cho những người có nhiều khả năng sẽ thực hiện hành động có giá trị nhất, chẳng hạn như mua hàng hoặc thêm thông tin thanh toán, trên trang web, trong ứng dụng hoặc trong Messenger',
          icon: require('@/icon/svg/vcamera.svg')
        },
        {
          id: 10,
          label: 'Doanh số theo danh mục',
          sologan: 'Sử dụng đối tượng mục tiêu để hiển thị cho mọi người quảng cáo chứa các mặt hàng trong danh mục.',
          icon: require('@/icon/svg/chat-alt-2.svg')
        },
        {
          id: 11,
          label: 'Lượt ghé thăm của hàng',
          sologan: 'Hiển thị quảng cáo với những người nhiều khả năng sẽ ghé thăm cửa hàng thực của bạn nhất khi ở gần đó',
          icon: require('@/icon/svg/clipboard-check.svg')
        }
      ]
    }
  },
  methods: {
    close () {
      this.$emit('closeCreateCampaign')
    },
    openChoosePage () {
      this.$emit('openChoosePage')
    },
    nextPage (id) {
      this.$emit('goNameCampaign', { id: id })
    }
  },
  mounted () {
    this.page = this.listPage[0]
  }
}
</script>

<style>

</style>
