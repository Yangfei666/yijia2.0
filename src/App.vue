<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
};
</script>

<style>
@import "/assets/fonts/iconfont.css";
</style>
<style src="./styles/public.scss">
</style>
<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
.el-checkbox__inner:hover{
  border-color:#00bc71;
}
.el-transfer-panel__item:hover{
  color:#00bc71;
}
.el-loading-spinner .el-loading-text{
  color:#00bc71;
}
.el-loading-spinner .path{-webkit-animation:loading-dash 1.5s ease-in-out infinite;animation:loading-dash 1.5s ease-in-out infinite;stroke-dasharray:90,150;stroke-dashoffset:0;stroke-width:2;stroke:#00bc71;stroke-linecap:round}
.el-loading-spinner i{color:#00bc71}
.el-table .descending .sort-caret.descending{
  border-top-color:#00bc71;
}
.el-table .ascending .sort-caret.ascending{
  border-bottom-color:#00bc71;
}
.el-tabs__nav {
  margin-left: 50px;
}
.el-tabs__item {
  line-height: 35px;
}
.el-textarea__inner {
  height: 110px;
  min-height: 110px;
}
.el-upload-dragger {
  width: 270px;
  height: 150px;
}
.el-tabs__nav-scroll {
  height: 45px;
  line-height: 47px;
}
.el-radio__input.is-checked+.el-radio__label {
    color: #00bc71;
}
.el-radio__inner:hover {
    border-color: #00bc71;
}
.el-radio__input.is-checked .el-radio__inner{
  border-color: #00bc71;
    background: #00bc71;
}
.el-table--striped 
.el-table__body tr
.el-table__row--striped.current-row td, 
.el-table__body tr.current-row>td, 
.el-table__body tr.hover-row.current-row>td, 
.el-table__body tr.hover-row.el-table__row--striped.current-row>td, 
.el-table__body tr.hover-row.el-table__row--striped>td, 
.el-table__body tr.hover-row>td{
  background-color: #EDFAF5;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
  color: #00bc71;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #00bc71;
    border-color: #00bc71;
}
.el-upload-dragger.el-upload__text {
  color: #262626;
}
.el-upload-dragger.el-upload__tip:hover {
  color: #00bc71;
}
.el-card__body {
  padding: 10px;
}
.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link:hover{
  color:#00bc71;
}
.el-button--text{
  color:#00bc71;
}
.el-input{
  height:35px;
}
.el-date-editor{
   height:35px;
}
.el-input--prefix .el-input__inner{
  height:35px;
  line-height:35px;
}
.el-input--suffix .el-input__inner{
  height:35px;
  line-height:35px;
}
.el-input__icon{
  line-height:35px;
}
.el-button{
  height:35px;
}
.el-range-editor{
  height:35px;
}
.el-select{
  height:35px;
}
.el-tag .el-icon-close:hover {
    background-color: #00bc71;
    color: #fff;
}
.el-tag .el-icon-close{
  color: #00bc71;
}
.el-tag{
  background-color:#EDFAF5;
  border-color:#EDFAF9;
}
 .el-button:hover {
    color: #00bc71;
}
.el-date-table td.today span {
    color: #00bc71;
    font-weight: 700;
}
.el-date-table td.end-date span, .el-date-table td.start-date span {
    background-color: #00bc71;
}
.el-date-table td.available:hover{
  color: #00bc71;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover{
  color:#00bc71;
}
.el-tabs__item.is-active{
  color: #00bc71;
}
.el-tabs__active-bar{
  background-color: #00bc71;
}
.el-select .el-input.is-focus .el-input__inner{
  border-color: #00bc71;
}
.el-button--primary{
    color: #fff;
    background-color: #00bc71;
    border-color: #EDFAF5;
}
.el-button--primary:hover{
    color: #fff;
    background-color: #00bc71;
    border-color: #00bc71;
}
.el-radio-button__inner:hover{
  color:#00bc71;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #fff;
    color: #00bc71;
    border: 1px solid #00bc71;
}
.el-select-dropdown__item.selected{
  color:#00bc71;
}
.el-radio-button__orig-radio:checked+.el-radio-button__inner{
    color: #fff;
    background-color: #00bc71;
    border-color: #00bc71;
    -webkit-box-shadow: -1px 0 0 0 #00bc71;
    box-shadow: -1px 0 0 0 #00bc71;
}
.el-pagination__sizes .el-input .el-input__inner:hover{
    border-color: #00bc71;
}
.el-pagination button:hover{color:#00bc71}
.el-select .el-input__inner:focus{border-color:#00bc71}
.el-input .el-input__inner{
  height:35px;
  line-height:35px;
}
.el-input .el-input__inner:hover{
  color:#00bc71;
}
.el-dropdown-menu__item:not(.is-disabled):hover{
  background-color:#EDFAF5;
  color:#00bc71
  }
  .el-upload-dragger:hover {
    border-color: #00bc71;
}
.el-dialog__headerbtn:focus .el-dialog__close,.el-dialog__headerbtn:hover .el-dialog__close{color:#00bc71}
.el-tabs__item:focus.is-active.is-focus:not(:active){
  -webkit-box-shadow:0 0 2px 2px #00bc71 inset;
box-shadow:0 0 2px 2px #00bc71 inset;
border-radius:3px
}
.el-tabs__item:hover{color:#00bc71;cursor:pointer}
.el-input__inner:hover{
  border-color: #00bc71;
}
.el-button.is-plain:focus,.el-button.is-plain:hover{background:#fff;border-color:#00bc71;color:#00bc71}
.el-button.is-active,.el-button.is-plain:active{color:#00bc71;border-color:#00bc71}
.el-button--primary:focus,.el-button--primary:hover{background:#00bc71;border-color:#00bc71;color:#fff}
.el-button--primary.is-active,.el-button--primary:active{background:#00bc71;border-color:#00bc71;color:#fff}
.el-button--primary.is-disabled,
.el-button--primary.is-disabled:active,
.el-button--primary.is-disabled:focus,
.el-button--primary.is-disabled:hover{color:#fff;background-color:#ebebeb;border-color:#EDFAF5}
.el-button--primary.is-plain:focus,
.el-button--primary.is-plain:hover{background:#00bc71;border-color:#00bc71;color:#fff}
.el-button--primary.is-plain:active{background:#00bc71;border-color:#00bc71;color:#fff;outline:0}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
/*滚动条*/
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  /* background-color: #f1f1f1; */
  background-color: transparent;
  border-radius: 10px;
}
</style>
