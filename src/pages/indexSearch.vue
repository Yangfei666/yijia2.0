<template>
  <div class="conteinr">
    <el-autocomplete class="input-clubName" v-model.lazy="searchClubValue" :trigger-on-focus="false"
                     :fetch-suggestions="querySearchAsync" clearable="clearable" placeholder="请输入会所名称"
                     @select="handleSelect">
      <el-button slot="append" @click="handleSelectBtn" icon="el-icon-search" :loading="isSearch"></el-button>
    </el-autocomplete>
    <div class="search-wrapper">
      <el-card class="search-card" v-if="showSearch">
        <div slot="header"><span>选择会籍顾问</span></div>
        <el-table :data="staffTableData" style="width: 100%;" height="40vh" @row-click="handleSelectStaffRow">
          <el-table-column prop="" label="头像">
            <template slot-scope="scope">
              <div class="staff-photo-wrapper"><img :src="scope.row.Photo" :alt="scope.row.YGXX_NAME"/></div>
            </template>
          </el-table-column>
          <el-table-column prop="YGXX_NAME" label="姓名"></el-table-column>
          <el-table-column prop="YGXX_SEX" label="性别"></el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button size="mini">选择TA</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-select class="m_search_select" v-model="mCoachName" @change="handleSelectStaffRow" filterable="filterable"
                   placeholder="请选择">
          <el-option v-for="item in staffTableData" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME"
                     :value="item"></el-option>
        </el-select>
      </el-card>
    </div>
  </div>
</template>
<script>
  import {requestLogin} from "@/api/api";
  export default {
    data() {
      return {
        clubLists: [],
        searchClubValue: '',
        timeout: null,
        isSearch: false,
        showSearch: false,
        coachName: '',
        mCoachName: '',
        staffTableData: [],
        clubInfo: {},
      };
    },
    beforeMount() {
      if (sessionStorage.getItem('selected-club')) {
        sessionStorage.removeItem('selected-club')
      }
    },
    mounted() {
    },
    methods: {
      async getStaffListByClubId(id) {
        this.staffTableData = await requestLogin(`/searchStaffListByClubId/${id}`, undefined, 'get')
        this.showSearch = true
      },
      async searchClub(name) {
        this.clubLists = await requestLogin(`/searchClubByName/`, {name: name}, 'post')
        return this.clubLists
      },
      async handleSelectBtn() {
        this.isSearch = true
        let clubLists = await this.searchClub(this.searchClubValue);
        let results = clubLists.filter(this.createStateFilter());

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.isSearch = false
          this.showSearch = true
        }, 0);

        if (results.length === 0) {
          this.$message({
            message: "暂无该会所信息",
            type: "warning"
          })
          this.staffTableData = []
          this.showSearch = false
          return;
        }
        if (results.length !== 1) {
          this.$message({
            message: "请选择一家会所",
            type: "warning"
          })
          return;
        }
        this.getStaffListByClubId(results[0]['Hsxx_Hsid'])
      },

      handleSelectStaffRow(staff) {
        let {YGXX_NAME: staffName, YGXX_YGID_NEI: staffID} = staff,
          {Hsxx_Name_jch: clubName, Hsxx_Hsid: clubID,} = this.clubInfo || this.clubLists[0];
        sessionStorage.setItem("selected-club", JSON.stringify({staffName, staffID, clubName, clubID}))
        this.$router.push('/health')
      },

      async querySearchAsync(queryString, cb) {
        var clubLists = await this.searchClub(this.searchClubValue);
        var results = queryString ? clubLists.filter(this.createStateFilter(queryString)) : clubLists;
        results = results.map(item => ({...item, value: item.Hsxx_Name_jch}))

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
          this.isSearch = false
        }, 0);
      },

      createStateFilter(queryString) {
        return (state) => {
          return state.Hsxx_Name
        };
      },

      handleSelect(item) {
        this.clubInfo = item
        this.getStaffListByClubId(item.Hsxx_Hsid)
      },
    },
  };

</script>

<style lang="scss" scoped>
  .conteinr{
  }

  @media (max-width:440px){
    .input-clubName{
      min-width:90vw;
      max-width:90vw;
    }

    .search-wrapper{
      font-size:12px;
      .search-card{
        max-width:90vw;
        min-width:90vw;
        .el-table{
          display:none;
          font-size:12px;
        }
        .el-pagination{
          display:none;
        }

        .m_search_select{
          display:block;
        }
      }
      .search-input-coach{
        display:none;
      }

    }
  }

  @media (min-width:441px) and (max-width:1024px){
    .input-clubName{
      min-width:60vw;
      max-width:60vw;
    }

    .search-wrapper{
      .search-card{
        max-width:90vw;
        min-width:90vw;
      }
    }
  }

  @media (min-width:1025px){
    .input-clubName{
      min-width:30vw;
      max-width:50vw;
    }
    .search-wrapper{
      .search-card{
        max-width:90vw;
        min-width:90vw;
      }
    }

  }

  .input-clubName{
    position:fixed;
    top:20%;
    left:50%;
    right:50%;
    transform:translate(-50%, -50%);
  }

  .search-wrapper{
    width:100vw;
    position:fixed;
    top:30%;
    display:flex;
    justify-content:center;
    .search-input-coach{
      height:100%;
    }

    .m_search_select{
      display:none;
    }
    .staff-photo-wrapper{
      height:100px;
      width:100px;
      img{
        border-radius:50%;
        height:100%;
        width:100%;
      }
    }
  }
</style>
