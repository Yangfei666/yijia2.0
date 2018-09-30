<template>
    <div>
      <!--跟进记录-->
   <div class="taste-wapper">
      <el-row>
        <div class="taste-list">
          <el-col :span="24" class="taste-buttom">
            <span>跟进记录:</span>
          </el-col>
          <el-col :span="24" class="taste-center">
            <span @click="dialogFormVisible = true"><i class="el-icon-plus"></i>添加跟进记录</span>
            <template>
              <el-dialog title="添加跟进记录" :append-to-body="true" :visible.sync="dialogFormVisible">
              <Addrecord></Addrecord>
              </el-dialog>
              </template>
          </el-col>
          <template v-for="item in taste" >
            <el-col :span="24" class="taste-top" :key="item.packetId">
              <div class="round"></div>
              <div class="data">{{item.data}}</div>
              <div class="record">{{item.record}}</div>
            </el-col>
          </template>
        </div>
      </el-row>
    </div>
    </div>
</template>
<script>
import Addrecord from "../components/addrecord";
export default {
  name:'memberup',
    components: {
    Addrecord,
  },
  data() {
    return {
      dialogFormVisible:false,
   taste:[{
        data:'2018-07-23',
        record:'这是跟进内容，这是跟进内容这是跟进内容容容这是跟进内容容这进内容容'
      },{
        data:'2018-07-23',
        record:'这是一条记录这是跟进内容，这是跟进内容这是跟进内容容容这这进内容容'
      },{
        data:'2018-07-23',
        record:'这是跟进内容，这是跟进内容这是跟进内容这是跟进内容'
      },{
        data:'2018-07-23',
        record:'这是一条记录'
      },{
        data:'2018-07-23',
        record:'这是跟进内容，这是跟进内容这是跟进内容'
      },{
        data:'2018-07-23',
        record:'这是跟进内容，这是跟进内容这是跟进内容'
      },{
        data:'2018-07-23',
        record:'这是跟进内容，这是跟进内容这是跟进内容'
      }]
    };
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
.taste-wapper{
    width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .taste-list{
    width: 97%;
    height: 100%;
    margin: 20px auto; 
    .taste-buttom{
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      text-align:left;
    }
    .taste-center{
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      height: 32px;
      line-height: 32px;
      color: #00bc71;
      border: 1px dashed #d0f2e5;
      border-radius: 16px;
      margin-top: 15px;
      color: #00bc71;
    }
    .taste-center:hover{
      border: 1px dashed #00bc71;
    }
    .taste-top{
     margin: 15px auto;
      border-radius: 16px;
      background: #f2faf7;
      display: flex;
      height: 32px;
      line-height: 32px;
      .round{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 1px solid #00bc71;
            margin: 10px;
      }
      .data{
            font-family: PingFang-SC-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
      }
      .record{
            margin-left: 30px;
            font-family: PingFang-SC-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
      }
    }
  }
}
@media screen and (min-width: 768px)and (max-width: 992px){
.taste-wapper{
    width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .taste-list{
    width: 97%;
    height: 100%;
    margin: 20px auto; 
    .taste-buttom{
      font-family: PingFang-SC-Regular;
      font-size: 14px!important;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      text-align:left;
    }
    .taste-center{
      font-family: PingFang-SC-Regular;
      font-size: 14px!important;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      height: 32px;
      line-height: 32px;
      color: #00bc71;
      border: 1px dashed #d0f2e5;
      border-radius: 16px;
      margin-top: 15px;
      color: #00bc71;
    }
    .taste-center:hover{
      border: 1px dashed #00bc71;
    }
    .taste-top{
     margin: 15px auto!important;
      border-radius: 16px;
      background: #f2faf7;
      display: flex;
      height: 100%!important;
      line-height: 32px;
      .round{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 1px solid #00bc71;
            margin: 11px!important;
      }
      .data{
            font-family: PingFang-SC-Regular;
            font-size: 12px!important;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
            width: 18%!important;
      }
      .record{
            margin-left: 13px!important;
            font-family: PingFang-SC-Regular;
            font-size: 12px!important;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
            text-align: left!important;
      }
    }
  }
}
}
@media screen and (min-width: 992px)and (max-width: 1280px){
.taste-wapper{
    width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .taste-list{
    width: 97%;
    height: 100%;
    margin: 20px auto; 
    .taste-buttom{
      font-family: PingFang-SC-Regular;
      font-size: 14px!important;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      text-align:left;
    }
    .taste-center{
      font-family: PingFang-SC-Regular;
      font-size: 14px!important;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      height: 32px;
      line-height: 32px;
      color: #00bc71;
      border: 1px dashed #d0f2e5;
      border-radius: 16px;
      margin-top: 15px;
      color: #00bc71;
    }
    .taste-center:hover{
      border: 1px dashed #00bc71;
    }
    .taste-top{
     margin: 15px auto!important;
      border-radius: 16px;
      background: #f2faf7;
      display: flex;
      height: 100%!important;
      line-height: 32px;
      .round{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 1px solid #00bc71;
            margin: 11px!important;
      }
      .data{
            font-family: PingFang-SC-Regular;
            font-size: 14px!important;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
            width: 12%!important;
      }
      .record{
            margin-left: 13px!important;
            font-family: PingFang-SC-Regular;
            font-size: 14px!important;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
            text-align: left!important;
      }
    }
  }
}
}
@media screen and (min-width: 1280px)and (max-width: 1440px){
.taste-wapper{
    width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .taste-list{
    width: 97%;
    height: 100%;
    margin: 20px auto; 
    .taste-buttom{
      font-family: PingFang-SC-Regular;
      font-size: 16px!important;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      text-align:left;
    }
    .taste-center{
      font-family: PingFang-SC-Regular;
      font-size: 16px!important;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      height: 32px;
      line-height: 32px;
      color: #00bc71;
      border: 1px dashed #d0f2e5;
      border-radius: 16px;
      margin-top: 15px;
      color: #00bc71;
    }
    .taste-center:hover{
      border: 1px dashed #00bc71;
    }
    .taste-top{
     margin: 15px auto!important;
      border-radius: 16px;
      background: #f2faf7;
      display: flex;
      height: 100%!important;
      line-height: 32px;
      .round{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 1px solid #00bc71;
            margin: 11px!important;
      }
      .data{
            font-family: PingFang-SC-Regular;
            font-size: 14px!important;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
            width: 10%!important;
      }
      .record{
            margin-left: 13px!important;
            font-family: PingFang-SC-Regular;
            font-size: 14px!important;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
            text-align: left!important;
      }
    }
  }
}
}
@media screen and (min-width: 1440px)and (max-width: 1920px){
.taste-wapper{
    width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .taste-list{
    width: 97%;
    height: 100%;
    margin: 20px auto; 
    .taste-buttom{
      font-family: PingFang-SC-Regular;
      font-size: 16px!important;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      text-align:left;
    }
    .taste-center{
      font-family: PingFang-SC-Regular;
      font-size: 16px!important;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      height: 32px;
      line-height: 32px;
      color: #00bc71;
      border: 1px dashed #d0f2e5;
      border-radius: 16px;
      margin-top: 15px;
      color: #00bc71;
    }
    .taste-center:hover{
      border: 1px dashed #00bc71;
    }
    .taste-top{
     margin: 15px auto!important;
      border-radius: 16px;
      background: #f2faf7;
      display: flex;
      height: 100%!important;
      line-height: 32px;
      .round{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 1px solid #00bc71;
            margin: 11px!important;
      }
      .data{
            font-family: PingFang-SC-Regular;
            font-size: 14px!important;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
            width: 10%!important;
      }
      .record{
            margin-left: 13px!important;
            font-family: PingFang-SC-Regular;
            font-size: 14px!important;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
            text-align: left!important;
      }
    }
  }
}
}
</style>
