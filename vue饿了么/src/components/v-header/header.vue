<!--<link rel="stylesheet" href="../../common/css/style.css">-->
<template>
    <div class="header">
         <div class="content-wraper">
            <img :src='seller.avatar' />
            <div class="content">
              <div class="title">
                <span class="brand"></span>
                <h1 >{{seller.name}}</h1>
              </div>
              <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
              <ul v-if="seller.supports" class="supports">
                  <li class="support-item">
                      <span :class = "classmap[seller.supports[0].type]"></span>
                      <span class="sale">{{seller.supports[0].description}}</span>
                  </li>
              </ul>
              <div v-if="seller.supports" class="supports-count">
                  <span class="count">{{seller.supports.length}}个</span>
                  <i class="icon-keyboard_arrow_right"></i>
              </div>
            </div>
        </div>
        <div class="notice">
          <div class="noticeIcon"></div>
          <p>{{seller.bulletin}}</p>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    data(){
      return{
        classmap:[]
      }
    },
    props:{
      seller: {
        type: Object
      }
    },
    created:function(){
      this.classmap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods:{

    }
  }
</script>
<style scoped>
.header{
  color: rgb(255,255,255);
  font-weight: 100;
}
.content-wraper{
  position:relative;
  display: flex;
  background: rgba(7,17,27,0.5);
}
.content-wraper>img{
  width:64px;
  height: 64px;
  padding:24px 16px 18px 24px;
}
.title{
  display: flex;
  padding:24px 0 8px 0;
}
.brand{
  display: block;
  width:30px;
  height:16px;
  background: url("brand@2x.png") no-repeat;
  background-size:100% 100%;
  margin-right: 6px;
}
.title h1 {
  font-size: 16px;
  font-weight: bold;
  line-height: 18px;
}
.description{
  font-size: 12px;
  line-height: 12px;
  padding-bottom: 10px;
}
.support-item {
  font-size: 10px;
  line-height: 12px;
  display:flex;
  vertical-align: middle;
}
.support-item :first-child{
  width: 12px;
  height:12px;
  background-size:100% 100%;
  margin-right: 4px;
}
.supports-count{
  position: absolute;
  right: 12px;
  bottom:18px;
  height: 24px;
  background:rgba(0,0,0,0.2) ;
  border-radius:7px;
  font-size:10px;
  line-height: 24px;
}
.count{
  padding:0 2px 0 8px;
}
.supports-count i{
  padding-right: 8px;
}
.notice{
  height: 28px;
  background: rgba(7,17,27,0.2);
  font-size: 10px;
  line-height: 28px;
  padding: 0 12px;
  display: flex;
}
.notice i{
  line-height: 28px;
}
.noticeIcon{
  width: 33px;
  height:18px;
  background: url(bulletin@3x.png);
  background-size: 100% 100%;
  flex:none;
  margin: 5px 4px 0 0;
}
.notice p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 4px;
}
.decrease{
  background: url("decrease_1@2x.png");
}
.discount{
  background: url("discount_1@2x.png");
}
.special{
  background: url("special_1@2x.png");
}
.invoice{
  background: url("invoice_1@2x.png");
}
.guarantee{
  background: url("guarantee_1@2x.png");
}
</style>

