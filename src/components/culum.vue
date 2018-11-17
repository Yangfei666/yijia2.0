<template>
    <div>
        <div class="practice-center">
            <el-row>
                <el-col :span="24">
                    <div class="purple">
                        <div style="height: 35px; line-height: 0px;margin-top: 12px; margin-left: 20px;">
                          <el-button type="text">{{classroom}} {{startTime}} {{endTime}}</el-button>
                        </div>
                        <div class="add">
                            <el-button type="text" class="add-p el-icon-plus" @click="reservationPage()">预约私教</el-button>
                            <template>
                                <el-dialog title="预约私教" :append-to-body="true" :visible.sync="dialogFormVisible">
                                    <Personal :startTime="startTime" :endTime="endTime" :classroom="classroom"
                                      :whichDay="whichDay" :coachList="coachList" @success="success"></Personal>
                                </el-dialog>
                            </template>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="practice-table">
            <template>
              <el-table :data="privateList" :header-cell-style="{background:'#fafafa'}" border highlight-current-row style="width: 100%">
                <el-table-column fixed label="教室" width="150" align="center">
                  <template slot-scope="scope">
                    <el-col class="wer-col">
                        <h4>{{scope.row.name}}</h4>
                    </el-col>
                  </template>
                </el-table-column>
                <el-table-column label="时间" :width="timeDivLength" >
                  <template slot-scope="scope">
                      <div v-for="(value,index) in scope.row.time" :key="index" style="width:80px;display:inline-block;">
                        <div :class="classStyle(value.staff, value.time)" @click="clickTimeButtom(value.time, scope.row.name, $event)">
                          {{value.time.substring(0,5)}}
                        </div>
                        <span style="font-size:12px;">{{value.staff}}·{{value.name}}</span>
                      </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
        </div>
    </div>
</template>
<script>
import Personal from "@/components/personal";
export default {
  name: "culum",
  inject: ["reload"],
  components: {
    Personal
  },
  props: {
    courseDaily: [Object, Array],
    SystemSetup: Object,
    whichDay:String,
    coachList:Array
  },
  watch:{
    whichDay (newValue, oldValue) {
        this.startTime = '';
        this.endTime = '';
        this.classroom = '';
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      startTime : '',
      endTime : '',
      classroom : ''
    };
  },
  computed: {
    privateList() {
      return Object.values(this.courseDaily);
    },
    timeDivLength() {
      if (JSON.stringify(this.SystemSetup) !== "{}") {
        return this.privateList[0].time.length * 81+'px;';
      }
      return '3000px;'
    },
  },
  beforeDestroy(){
    this.middleButtonStyle('');
  },
  methods: {
    // 预约成功
    success() {
      this.dialogFormVisible = false;
      this.reload();
    },
    // 预约界面
    reservationPage () {
      if (this.startTime != '' && this.endTime != '' && this.classroom != '') {
        this.dialogFormVisible = true;
      } else {
        this.$message({
          message: '请先选择上课教室和时间',
          type: "error"
        });
      }
    },
    // 点击时间按钮
    clickTimeButtom(time, classroom, event) {
      if (event.currentTarget.getAttribute('class') == 'wer-div3') {
        return false;
      }
      let classStyle = event.currentTarget.getAttribute('class');// 获取属性,判断是否被选中
      if (this.classroom != '' && this.classroom != classroom) {//说明是选择的第二个时间,但是教室不同,不许这么干
        this.$message({message: "请选择同一个教室的时间", type: "error"});
        return false;
      } else if (classStyle == 'wer-div2') { //说明是添加选择
        if (this.startTime == '' && this.endTime == '') { //默认先给开始时间
          this.startTime = time;
          this.classroom = classroom;
        } else if (this.endTime == '' && this.startTime != '' || this.endTime != '' && this.startTime == '' ) {//第二个时间按钮
          let noNullTime = this.endTime == '' ? this.startTime : this.endTime;
          if (this.CompareDate(time, noNullTime)) { // 比有值的时间大
            let minTime = (time.substring(0,2) - 2) + time.substring(2);
            let maxTime = (time.substring(0,2) - 1) + time.substring(2);
            if (this.CompareDate(noNullTime, minTime) && this.CompareDate(maxTime, noNullTime)) { //1-2小时
              if (this.endTime == '') {
                this.endTime = time;
              } else {
                this.startTime = this.endTime;
                this.endTime = time;
              }
              this.middleButtonStyle(null);
            } else {
              this.$message({message: "时间跨度在1-2小时之间", type: "error"});
              return false;
            }
          } else {// 比有值的时间小
            let minTime = (parseInt(time.substring(0,2)) + 1) + time.substring(2);
            let maxTime = (parseInt(time.substring(0,2)) + 2) + time.substring(2);
            if (this.CompareDate(noNullTime, minTime) && this.CompareDate(maxTime, noNullTime)) { //1-2小时
              if (this.endTime == '') {
                this.endTime = this.startTime;
                this.startTime = time;
              } else {
                this.startTime = time;
              }
              this.middleButtonStyle(null);
            } else {
              this.$message({message: "时间跨度在1-2小时之间", type: "error"});
              return false;
            }
          }
        } else { // 第三个时间按钮
          if (this.CompareDate(time, this.endTime)) {// 比结束时间大
            let minTime = (time.substring(0,2) - 2) + time.substring(2);
            let maxTime = (time.substring(0,2) - 1) + time.substring(2);
            if (this.CompareDate(this.startTime, minTime) && this.CompareDate(maxTime, this.startTime)) { //默认增加时长
              this.endTime = time;
              this.middleButtonStyle(null);
            } else {
              this.$message({message: "最多延长到2小时", type: "error"});
              return false;
            }
          } else if (this.CompareDate(this.startTime, time)) {// 比开始时间小
            let minTime = (parseInt(time.substring(0,2)) + 1) + time.substring(2);
            let maxTime = (parseInt(time.substring(0,2)) + 2) + time.substring(2);
            if (this.CompareDate(this.endTime, minTime) && this.CompareDate(maxTime, this.endTime)) { //默认增加时长
              this.startTime = time;
              this.middleButtonStyle(null);
            } else {
              this.$message({message: "最多延长到2小时", type: "error"});
              return false;
            }
          }
        }
      } else { //取消选择
        if (this.startTime == time) { //取消的是开始时间
          this.middleButtonStyle('');
          this.startTime = '';
        } else if (this.endTime == time) { //取消的是结束时间
          this.middleButtonStyle('');
          this.endTime = '';
        } else { // 取消了中间的时间
          this.$message({message: "请从两头的时间取消", type: "error"});
            return false;
        }
      }
      event.currentTarget.setAttribute('class', classStyle == 'wer-div2' ? 'wer-div' :'wer-div2');//样式改变放最后
    },
    // 时间比大小
    CompareDate(t1,t2,bool) {
      bool = bool ? true : false;
      var date = new Date();
      var a = t1.split(":");
      var b = t2.split(":");
      if (bool) {
        return date.setHours(a[0],a[1]) > date.setHours(b[0],b[1]);
      } else {
        return date.setHours(a[0],a[1]) >= date.setHours(b[0],b[1]);
      }
    },
    // 选中的时间中间的时间按钮样式
    middleButtonStyle (param, status, num) {
      status = status ? false : true;
      num = num ? num : 1;
      for (let i = 0; i < this.privateList.length; i++) {
        const element = this.privateList[i];
        if (element.name == this.classroom) {
          for (let index = 0; index < element.time.length; index++) {
            const value = element.time[index];
            if (num == 1) {
              if (this.CompareDate(value.time, this.startTime, status) && this.CompareDate(this.endTime, value.time, status)) {
                value.staff = param;
              }
            }
          }
          break;
        }
      }
    },
    // 时间按钮样式
    classStyle(str, time) {
      let date = new Date();
      let y = date.getFullYear();
      let m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
      let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      let today =  y + "-" + m + "-" + d;
      let h = date.getHours() > 9 ? date.getHours() : '0'+date.getHours();
      let i = date.getMinutes() > 9 ? date.getMinutes() : '0'+date.getMinutes();
      let now = h+':'+i;
      if (this.whichDay < today) {
        return 'wer-div3';
      } else if(this.whichDay == today) {
        if (time > now) {
          return str === '' ? 'wer-div2' : (str === null ? 'wer-div' : 'wer-div3');
        } else {
          return 'wer-div3';
        }
      } else {
          return str === '' ? 'wer-div2' : (str == null ? 'wer-div' : 'wer-div3');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/privateculum.scss";
@import "@/styles/culum.scss";
  .wer-div {
    width: 50px !important;
    height: 30px !important;
    background: #00bc71;
    border-radius: 16px;
    color: #fff;
    font-size: 12px;
    margin: 6px auto;
    text-align: center;
    line-height: 27px !important;
    border: 1px solid #e8e8e8;
    cursor:pointer;
  }
  .wer-div2 {
    width: 50px !important;
    height: 30px !important;
    background: #ffff;
    border-radius: 16px;
    color: #595959;
    font-size: 12px;
    margin: 6px auto;
    text-align: center;
    line-height: 30px !important;
    border: 1px solid #e8e8e8;
    cursor:pointer;
  }

  // .wer-div2:hover{
  //   background: #00bc71;
  //   color: #fff;
  // }

  .wer-div3 {
    width: 50px !important;
    height: 30px !important;
    background: #f5f5f5;
    border-radius: 16px;
    color: #8c8c8c;
    font-size: 12px;
    margin: 6px auto;
    text-align: center;
    line-height: 27px !important;
    cursor:default;
  }

  span {
    color: #c7c7c7;
    font-size: 10px !important;
  }
</style>
