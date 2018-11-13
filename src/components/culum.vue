<template>
    <div>
        <!--私教课程表-->
        <div class="practice-center">
            <el-row>
                <el-col :span="24">
                    <div class="purple">
                        <div class="add">
                            <el-button type="text" class="add-p el-icon-plus" @click="dialogFormVisible = true">预约私教</el-button>
                            <template>
                                <el-dialog title="预约私教" :append-to-body="true" :visible.sync="dialogFormVisible">
                                    <Personal></Personal>
                                </el-dialog>
                            </template>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="practice-table">
            <template>
              <el-table :data="evening" border style="width: 100%">
                <el-table-column fixed label="教室" width="150">
                  <template slot-scope="scope">
                    <el-col class="wer-col">
                        <h4><!-- {{scope.row.name}} -->教室1</h4>
                    </el-col>
                    <!-- <span style="margin-left: 10px">{{ scope.row.name }}</span> -->
                  </template>
                </el-table-column>
                <el-table-column label="时间" width="2000px;">
                  <template slot-scope="scope">
                    <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
                    <!-- <el-col :span="1" class="wer-col2" v-for="(value,index) in scope.row.time" :key="index" > -->
                      <div v-for="(value,index) in scope.row.time" :key="index" style="display:inline-block">
                        <div class="wer-div" >
                          {{value.time.substring(0,5)}}
                        </div>
                        <span style="font-size:12px;">{{value.staff}}·{{value.name}}</span>
                      </div>

                    <!-- </el-col> -->
                  </template>
                </el-table-column>
              </el-table>
            </template>
            <!-- <el-row>
                <el-col :span="24">
                    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                        <template>
                            <div class="morning-main3">
                                <el-col :span="24" v-for="item in evening" :key="item.id"  style="overflow:scroll;">
                                    <div class="mor-wer">
                                        <el-col :span="2" class="wer-col">
                                            <h4>{{item.name}}</h4>
                                        </el-col>
                                        <el-col :span="2" class="wer-col2" v-for="(value,index) in item.time" :key="index">
                                            <div class="wer-div">{{value.time}}</div>
                                            <span>{{value.staff}}·{{value.name}}</span>
                                        </el-col>
                                        <el-col :span="2" class="wer-col2">
                                            <div class="wer-div2">{{value.time}}</div>
                                        </el-col>
                                        <el-col :span="2" class="wer-col2">
                                            <div class="wer-div3">{{value.time}}</div>
                                        </el-col>
                                    </div>
                                </el-col>
                            </div>
                        </template>
                    </el-tabs>
                </el-col>
            </el-row> -->
        </div>
    </div>
</template>
<script>
import Personal from "@/components/personal";
export default {
  name: "culum",
  components: {
    Personal
  },
  props: {
    courseDaily: [Object, Array],
    SystemSetup: Object
  },
  data() {
    return {
      dialogFormVisible: false,
      activeName2: "morning",
      currentPage4: 4,
      tableData : [
        {
          date : 111,
          name :222,
          province : 333
        },
        {
          date : 111,
          name :222,
          province : 333
        },
        {
          date : 111,
          name :222,
          province : 333
        },
        {
          date : 111,
          name :222,
          province : 333
        }
      ],
      evening: [
        {
          id: 1,
          name: "教室1",
          time: [
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:30:00", staff: "Luna", name: "夏佳111" }
          ]
        },
        {
          id: 2,
          name: "教室2",
          time: [
            { time: "17:00:00", staff: "Luna", name: "夏佳111" },
            { time: "17:30:00", staff: "Luna", name: "夏佳111" }
          ]
        }
      ],
      value6: "",
      value1: "",
      value: ""
    };
  },
  computed: {
    // 课程时间分类上下午
    courseDailyClassify() {
      var courseDailyClassify = {
        morning: {},
        afternoon: {},
        evening: {}
      };
      if (JSON.stringify(this.SystemSetup) !== "{}") {
        let time1 = this.SystemSetup.openTime,
          time2 = this.SystemSetup.closeTime;
        // let starts = new Date("2018-01-01 " + time1), ends = new Date("2018-01-01 " + time2);
        // let diffTime = Math.ceil((ends - starts) / (1800 * 1000));
        let start =
          time1.substring(0, 2) +
          ":" +
          (time1.substring(3, 5) < 30 ? "30" : "00");
        let end =
          time2.substring(0, 2) +
          ":" +
          (time2.substring(3, 5) < 30 ? "00" : "30");
        let data = this.courseDaily;
        for (let i = 0; i < 48 /* diffTime.length */; i++) {
          for (let j = 0; j < 48; j++) {}
        }
      }
    }
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/privateculum.scss";
@import "@/styles/culum.scss";

            // 111
            .wer-div {
              width: 40px !important;
              height: 25px !important;
              background: #00bc71;
              border-radius: 16px;
              color: #fff;
              font-size: 12px;
              margin: 6px auto;
              text-align: center;
              line-height: 27px !important;
              border: 1px solid #e8e8e8;
            }

            .wer-div2 {
              width: 40px !important;
              height: 25px !important;
              background: #f5f5f5;
              border-radius: 16px;
              color: #8c8c8c;
              font-size: 12px;
              margin: 6px auto;
              text-align: center;
              line-height: 27px !important;
              border: 1px solid #e8e8e8;
            }

            .wer-div3 {
              width: 40px !important;
              height: 25px !important;
              background: #f5f5f5;
              border-radius: 16px;
              color: #8c8c8c;
              font-size: 12px;
              margin: 6px auto;
              text-align: center;
              line-height: 27px !important;
              border: 1px solid #e8e8e8;
            }

            span {
              color: #c7c7c7;
              font-size: 10px;
            }
</style>
