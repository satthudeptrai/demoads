<template>
  <div>
    <el-dialog
      top="10"
      class="dialog2"
      :visible.sync="dialogMoreVer"
      width="1024px"
      append-to-body
      :before-close="handleClose"
    >
      <div slot="title" class="f-16 ver-align">
        <div class="mr-15"><b>Đang xem các vị trí quảng cáo hiện có</b></div>
        <div><b>2/12</b></div>
      </div>
      <div>
        <el-row class="mt-10">
          <el-col :md="18" class="bg-1">
            <el-row>
              <el-col :md="8">
                <div class="title-campaign" style="width: 229px;">
                  <div style="display: flex" class="ml-20 mt-25">
                    <i class="fab fa-facebook f-24 color-4"></i>
                    <div class="ml-8">
                      <b class="color-2">Facebook</b>
                      <div class="f-16">Nguồn cấp</div>
                    </div>
                  </div>
                  <span class="f-14" style="color: #828282;cursor: pointer;">
                    <i class="el-icon-more"></i>
                  </span>
                </div>
                <div
                  class="ml-20 mt-12"
                  style="width: 209px;height: 383px;background: #FFFFFF;border-radius: 4px;"
                ></div>
              </el-col>
              <el-col :md="8">
                <div class="title-campaign" style="width: 229px;">
                  <div style="display: flex" class="ml-20 mt-25">
                    <i class="fab fa-facebook f-24 color-4"></i>
                    <div class="ml-8">
                      <b class="color-2">Facebook</b>
                      <div class="f-16">Bài viết tức thì</div>
                    </div>
                  </div>
                  <span class="f-14" style="color: #828282;cursor: pointer;">
                    <i class="el-icon-more"></i>
                  </span>
                </div>
                <div
                  class="ml-20 mt-12"
                  style="width: 209px;height: 383px;background: #FFFFFF;border-radius: 4px;"
                ></div>
              </el-col>
              <el-col :md="8">
                <div class="title-campaign" style="width: 229px;">
                  <div style="display: flex" class="ml-20 mt-25">
                    <i class="fab fa-facebook f-24 color-4"></i>
                    <div class="ml-8">
                      <b class="color-2">Facebook</b>
                      <div class="f-16">Bài viết tức thì</div>
                    </div>
                  </div>
                  <span class="f-14" style="color: #828282;cursor: pointer;">
                    <i class="el-icon-more"></i>
                  </span>
                </div>
                <div
                  class="ml-20 mt-12"
                  style="width: 209px;height: 383px;background: #FFFFFF;border-radius: 4px;"
                ></div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :md="6">
            <div class="ml-20 mr-22">
              <div class="f-16 color-1 mt-16"><b>Bộ lọc</b></div>
              <div class="color-2 mt-4">Khám phá nhiều kiểu kết hợp để xem một số giao diện quảng cáo.</div>
              <el-select v-model="sample" placeholder="Định dạng mẫu" size="medium" class="mt-8 mb-23">
                <el-option
                v-for="item in sampleList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
                </el-option>
              </el-select>
              <el-radio-group v-model="sampleRadio" style="display: flex;flex-direction: column;">
                <el-radio
                  class="mb-16"
                  v-for="item in sampleRadioList"
                  :key="item.id"
                  :label="item.id">
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="close()" size="medium">Hủy</el-button>
        <el-button type="warning" @click="save()" size="medium">Áp dụng</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'showMoreVersion',
  props: {
    dialogMoreVer: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      sample: 1,
      sampleRadio: 1,
      sampleList: [
        {
          id: 1,
          label: 'Định dạng tin (Mẫu 1)'
        },
        {
          id: 2,
          label: 'Định dạng tin (Mẫu 2)'
        },
        {
          id: 3,
          label: 'Định dạng tin (Mẫu 3)'
        }
      ],
      sampleRadioList: [
        {
          id: 1,
          label: 'Mẫu 2'
        },
        {
          id: 2,
          label: 'Mẫu 3'
        },
        {
          id: 3,
          label: 'Mẫu 4'
        },
        {
          id: 4,
          label: 'Mẫu 5'
        },
        {
          id: 5,
          label: 'Mẫu 6'
        },
        {
          id: 6,
          label: 'Mẫu 7'
        },
        {
          id: 7,
          label: 'Mẫu 8'
        },
        {
          id: 8,
          label: 'Mẫu 9'
        },
        {
          id: 9,
          label: 'Mẫu 10'
        }
      ]
    }
  },
  methods: {
    handleClose () {
      this.$emit('closeMoreVer', { type: 1 })
    },
    close () {},
    save () {}
  }
}
</script>

<style></style>
