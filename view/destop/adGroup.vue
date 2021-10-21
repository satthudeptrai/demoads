<template>
  <div>
      <el-table
        class="table-type1"
        ref="AdGroup"
        :data="data"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        height="calc(100vh - 255px)"
        border
        stripe
        show-summary
        :summary-method="getSummaries">

        <el-table-column type="selection" width="54"> </el-table-column>

        <el-table-column align="center" label="" width="54">
            <template slot-scope="scope">
                <el-switch @change="changeStatus(scope.row)" active-color="#FF5F0B" active-value="ACTIVE" inactive-value="PAUSED" v-model="scope.row.data.status" />
            </template>
        </el-table-column>
        <el-table-column label="Tên nhóm quảng cáo" prop="name" min-width="231" class-name="colName2">
            <template slot-scope="scope">
              <el-popover
                @show="showPop(scope.$index)"
                @hide="hidePop(scope.$index)"
                placement="bottom-end"
                v-model="scope.row.isTrue"
                width="318"
                trigger="click">
                <el-form :inline="true">
                  <el-form-item label="Tên">
                    <el-input v-model="name" size="small"></el-input>
                  </el-form-item>
                </el-form>
                <div class="f12" style="display: flex; justify-content: space-between;">
                  <div style="cursor: pointer;" @click="closePop(scope.$index)">Hủy</div>
                  <div style="color: #F55600; cursor: pointer;" @click="savePop(scope.$index, scope.row)">Lưu làm bản nháp</div>
                </div>
              </el-popover>
              <div @click="scope.row.isTrue = true" class="ver-align">
                <el-link type="warning">{{ scope.row.data.name }}</el-link>
                <i class="el-icon-edit is-hover" style="marginLeft: 8px"></i>
              </div>
              <div class="ver-align f-12 is-hover">
                <div style="cursor: pointer;" @click="openDraw(scope.row)">
                  <i class="el-icon-edit" style="margin-left: 8px;"></i>
                  Chỉnh sửa
                </div>
                <div style="cursor: pointer;">
                  <i class="el-icon-copy-document" style="margin-left: 8px;"></i>
                  Sao chép
                </div>
              </div>
            </template>
        </el-table-column>
        <el-table-column label="Phân phối" min-width="232">
            <template slot-scope="scope">
                {{ scope.row.data.status }}
            </template>
        </el-table-column>
        <el-table-column label="Chiến lược giá thầu" min-width="120">
            <template slot-scope="scope">
                {{ scope.row.data.strategy }}
            </template>
        </el-table-column>
        <el-table-column label="Ngân sách" prop="budget" min-width="119">
            <template slot-scope="scope">
                {{ scope.row.data.budget | toThousandFilter }}
            </template>
        </el-table-column>
        <el-table-column label="Kết quả" min-width="153" sortable>
            <template slot-scope="scope">
                {{ scope.row.data.result }}
            </template>
        </el-table-column>
        <el-table-column label="Chỉnh sửa quan trọng gần đây nhất" min-width="138">
            <template slot-scope="scope">
                {{ scope.row.data.NOP }}
            </template>
        </el-table-column>
        <el-table-column label="Kết thúc" min-width="101">
            <template slot-scope="scope">
                {{ scope.row.data.end }}
            </template>
        </el-table-column>
        <el-table-column align="center" label="" width="49">
            <template slot="header">
              <img src="../../icon/svg/plus1.svg" alt="">
            </template>
            <!-- <template slot-scope="scope">
              {{ scope.row.end }}
            </template> -->
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import commonApi from '@/api/commonApi'
const common = new commonApi()
export default {
  name: 'AdGroup',
  props: {
    data: {
      required: true,
      type: Array
    }
  },
  computed: {
    tag () {
      return this.$store.getters.tagAdGroup
    }
  },
  watch: {
    tag (val) {
      this.itemSelect = val
      if (this.itemSelect.length == 0) {
        this.$refs.AdGroup.clearSelection()
      }
    }
  },
  data () {
    return {
      itemSelect: [],
      isHover: true,
      name: ''
    }
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = []
      columns.forEach((column, index) => {
        if(column.property == 'name') {
          sums[index] = 'Kết quả từ ' + data.length + ' nhóm quảng cáo'
        }
        else if(column.property == 'budget') {
          let sum = 0
          data.forEach(item => {
            sum = sum + Number(item.data.budget)
          })
          sums[index] = Intl.NumberFormat('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(sum)
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    changeStatus(item) {
      common.callApi({
        type: "UPSERT",
        data_type: "adset",
        _id: item._id,
        data : item.data
      }).then(reps => {
        if(reps.code == 200) {
          if(reps.data) {
            console.log(reps.data)
          }
        }
      }).catch(error => {
        this.catchError(error)
      })
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
    handleSelectionChange (val) {
      this.itemSelect = val
      this.$store.dispatch('setTagAdGroup', this.itemSelect)
    },
    closePop (index) {
      this.$emit('changeNameAdGroup', { index: index, isChange: false })
    },
    savePop (index, item) {
      this.$emit('changeNameAdGroup', { id: item._id, name: this.name, data: item.data, index: index, isChange: true })
    },
    showPop (index) {
      this.name = ''
      document.getElementsByClassName('colName2')[index + 1].style.zIndex = 10
      this.isHover = false
    },
    hidePop (index) {
      document.getElementsByClassName('colName2')[index + 1].style.zIndex = 1
      // this.isHover = true
    },
    openDraw (item) {
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
      this.$store.dispatch('setIdCampaign', item.data.campaign_id)
      common.callApi({
        type: "GET",
        "data.campaign_id": item.data.campaign_id
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
        this.$store.dispatch('setItemAdGroup', item.data)
        this.$store.dispatch('setIdAdGroup', item._id)
        this.$store.dispatch('setShowDraw', true)
        this.$store.dispatch('setListAdGroup', listAdGroup)
        setTimeout(() => {this.$emit('openTabIndex', { index: 2 })},100)
        const query = {
          type: 'adSet',
          id: item._id
        }
        this.$router.push({
          name: 'home',
          query
        })
      });
    }
  }
}
</script>

<style></style>
