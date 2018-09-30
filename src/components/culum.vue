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
            <el-row>
                <el-col :span="24">
                    <el-tabs :data="morning" v-model="activeName2" type="card" @tab-click="handleClick">
                        <el-tab-pane label="上午" name="morning">
                            <template>
                                <div class="morning-main">
                                    <el-col :span="24" v-for="item in morning" :key="item.id">
                                    <div class="mor-wer">
                                        <el-col :span="2" class="wer-col">
                                            <h4>{{item.name}}</h4>
                                            <span>{{item.text}}</span>
                                        </el-col>
                                        <el-col :span="2" class="wer-col2">
                                            <div class="wer-div">{{item.time}}</div>
                                            <span>{{item.hjgw}}</span>
                                        </el-col>
                                            <el-col :span="2" class="wer-col2">
                                            <div class="wer-div">{{item.time}}</div>
                                            <span>{{item.hjgw}}</span>
                                        </el-col>
                                            <el-col :span="2" class="wer-col2">
                                            <div class="wer-div">{{item.time}}</div>
                                            <span>{{item.hjgw}}</span>
                                        </el-col>
                                            <el-col :span="2" class="wer-col2">
                                            <div class="wer-div2">{{item.time2}}</div>
                                        </el-col>
                                            <el-col :span="2" class="wer-col2">
                                            <div class="wer-div2">{{item.time2}}</div>
                                        </el-col>
                                            <el-col :span="2" class="wer-col2">
                                            <div class="wer-div2">{{item.time2}}</div>
                                        </el-col>
                                            <el-col :span="2" class="wer-col2">
                                            <div class="wer-div">{{item.time}}</div>
                                            <span>{{item.hjgw}}</span>
                                        </el-col>
                                            <el-col :span="2" class="wer-col2">
                                            <div class="wer-div">{{item.time}}</div>
                                            <span>{{item.hjgw}}</span>
                                        </el-col>
                                            <el-col :span="2" class="wer-col2">
                                            <div class="wer-div3">{{item.time2}}</div>
                                        </el-col>
                                        <el-col :span="2" class="wer-col2">
                                            <div class="wer-div3">{{item.time2}}</div>
                                        </el-col>
                                        <el-col :span="2" class="wer-col2">
                                            <div class="wer-div3">{{item.time2}}</div>
                                        </el-col>
                                        <el-col :span="2" class="wer-col2">
                                            <div class="wer-div3">{{item.time2}}</div>
                                        </el-col>
                                    </div>
                                </el-col>
                                </div>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="下午" name="afternoon">
                            <template>
                                <div class="morning-main2">
                                    <el-col :span="24" v-for="item in afternoon" :key="item.id">
                                        <div class="mor-wer">
                                            <el-col :span="2" class="wer-col">
                                                <h4>{{item.name}}</h4>
                                                <span>{{item.text}}</span>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div">{{item.time}}</div>
                                                <span>{{item.hjgw}}</span>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div">{{item.time}}</div>
                                                <span>{{item.hjgw}}</span>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div">{{item.time}}</div>
                                                <span>{{item.hjgw}}</span>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div2">{{item.time2}}</div>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div2">{{item.time2}}</div>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div2">{{item.time2}}</div>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div">{{item.time}}</div>
                                                <span>{{item.hjgw}}</span>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div">{{item.time}}</div>
                                                <span>{{item.hjgw}}</span>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div3">{{item.time2}}</div>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div3">{{item.time2}}</div>
                                            </el-col>
                                        </div>
                                    </el-col>
                                </div>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="晚上" name="evening">
                            <template>
                                <div class="morning-main3">
                                    <el-col :span="24" v-for="item in evening" :key="item.id">
                                        <div class="mor-wer">
                                            <el-col :span="2" class="wer-col">
                                                <h4>{{item.name}}</h4>
                                                <span>{{item.text}}</span>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div">{{item.time}}</div>
                                                <span>{{item.hjgw}}</span>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div">{{item.time}}</div>
                                                <span>{{item.hjgw}}</span>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div">{{item.time}}</div>
                                                <span>{{item.hjgw}}</span>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div2">{{item.time2}}</div>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div2">{{item.time2}}</div>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div">{{item.time}}</div>
                                                <span>{{item.hjgw}}</span>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div">{{item.time}}</div>
                                                <span>{{item.hjgw}}</span>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div3">{{item.time2}}</div>
                                            </el-col>
                                            <el-col :span="2" class="wer-col2">
                                                <div class="wer-div3">{{item.time2}}</div>
                                            </el-col>
                                        </div>
                                    </el-col>
                                </div>
                            </template>
                        </el-tab-pane>
                    </el-tabs>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" background :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="10">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import Personal from "@/components/personal";
export default {
    name:'culum',
  components: {
    Personal
  },
  data() {
    return {
      dialogFormVisible: false,
      activeName2: "morning",
      currentPage4: 4,
      value6: "",
      value1: "",
      value: "",
      morning: [
        {
          name: "教室A",
          text: "教练·客户",
          time: "07:00",
          hjgw: "Angle·李木子",
          time2: "07:00"
        },
        {
          name: "教室B",
          text: "教练·客户",
          time: "07:00",
          hjgw: "Angle·李木子",
          time2: "07:00"
        },
        {
          name: "教室C",
          text: "教练·客户",
          time: "07:00",
          hjgw: "Angle·李木子",
          time2: "07:00"
        },
        {
          name: "教室D",
          text: "教练·客户",
          time: "07:00",
          hjgw: "Angle·李木子",
          time2: "07:00"
        },
        {
          name: "教室E",
          text: "教练·客户",
          time: "07:00",
          hjgw: "Angle·李木子",
          time2: "07:00"
        },
        {
          name: "教室F",
          text: "教练·客户",
          time: "07:00",
          hjgw: "Angle·李木子",
          time2: "07:00"
        }
      ],
      afternoon: [
        {
          name: "教室A",
          text: "教练·客户",
          time: "13:00",
          hjgw: "Angle·李木子",
          time2: "13:00"
        },
        {
          name: "教室B",
          text: "教练·客户",
          time: "13:00",
          hjgw: "Angle·李木子",
          time2: "13:00"
        },
        {
          name: "教室C",
          text: "教练·客户",
          time: "13:00",
          hjgw: "Angle·李木子",
          time2: "13:00"
        },
        {
          name: "教室D",
          text: "教练·客户",
          time: "13:00",
          hjgw: "Angle·李木子",
          time2: "13:00"
        },
        {
          name: "教室E",
          text: "教练·客户",
          time: "13:00",
          hjgw: "Angle·李木子",
          time2: "13:00"
        },
        {
          name: "教室F",
          text: "教练·客户",
          time: "13:00",
          hjgw: "Angle·李木子",
          time2: "13:00"
        }
      ],
      evening: [
        {
          name: "教室A",
          text: "教练·客户",
          time: "18:00",
          hjgw: "Angle·李木子",
          time2: "18:00"
        },
        {
          name: "教室B",
          text: "教练·客户",
          time: "18:00",
          hjgw: "Angle·李木子",
          time2: "18:00"
        },
        {
          name: "教室C",
          text: "教练·客户",
          time: "18:00",
          hjgw: "Angle·李木子",
          time2: "18:00"
        },
        {
          name: "教室D",
          text: "教练·客户",
          time: "18:00",
          hjgw: "Angle·李木子",
          time2: "18:00"
        },
        {
          name: "教室E",
          text: "教练·客户",
          time: "18:00",
          hjgw: "Angle·李木子",
          time2: "18:00"
        },
        {
          name: "教室F",
          text: "教练·客户",
          time: "18:00",
          hjgw: "Angle·李木子",
          time2: "18:00"
        }
      ]
    };
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
</style>