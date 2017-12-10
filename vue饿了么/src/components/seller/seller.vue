<template>
    <div class="seller" ref="sellerscroll">
        <div class="sellerContent">
            <div class="descript">
                  <h3>{{seller.name}}</h3>
                  <div class="descriptDetail">
                      <div class="starWraper"><star :size="36" :scores="seller.score"></star></div>
                      <div class="text">
                          <span>({{seller.ratingCount}})</span>
                          <span>月售{{seller.sellCount}}单</span>
                      </div>
                  </div>
                  <ul class="mark">
                      <li>
                          <div class="block">
                              <h3>起送价</h3>
                              <div class="content"><span>{{seller.minPrice}}</span>元</div>
                          </div>
                      </li>
                      <li>
                          <div class="block">
                              <h3>商家配送</h3>
                              <div class="content"><span>{{seller.deliveryPrice}}</span>元</div>
                          </div>
                      </li>
                      <li>
                          <div class="block">
                              <h3>平均配送时间</h3>
                              <div class="content"><span>{{seller.sellCount}}</span>分钟</div>
                          </div>
                      </li>
                  </ul>
                  <div class="favorate" @click="changeFavour">
                      <span class="icon-favorite" :class="{'active':this.favorate}"></span>
                      <span class="texts">{{favText}}</span>
                  </div>
            </div>
            <splite></splite>
            <div class="notices">
                <h3>公告与活动</h3>
                <p>{{seller.bulletin}}</p>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-items border-1px" v-for="(item,index) in seller.supports">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="text">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
            </div>
            <splite></splite>
            <div class="sellerLive">
                <h3>商家实景</h3>
                <div class="waper" ref="sellerLive">
                    <ul class="picList" ref="picList">
                      <li v-for="pic in seller.pics">
                          <img :src="pic"/>
                      </li>
                    </ul>
                </div>
            </div>
            <splite></splite>
        </div>
    </div>
</template>
<style >
.seller{
  width: 100%;
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  overflow: hidden;
}
.descript{
  position: relative;
  padding: 18px;
  box-shadow: 0 1px 0 rgba(7,17,27,0.1);
}
.descript>h3{
  margin-bottom: 8px;
  line-height: 14px;
  color: rgb(7, 17, 27);
  font-size: 14px;
}
.descriptDetail{
  padding-bottom: 18px;
  box-shadow:0 1px 0 rgba(7,17,27,0.1);
  font-size: 0;
}
.starWraper{
  display: inline-block;
  margin-right: 8px;
  vertical-align: top
}
.text{
  display: inline-block;
  margin-right: 12px;
  line-height: 18px;
  vertical-align: top;
  font-size: 10px;
  color: rgb(77, 85, 93);
}
.mark{
  display: flex;
  padding-top:18px;
}
.mark>li{
  flex: 1;
  text-align: center;
  box-shadow:1px 0 0 rgba(7, 17, 27, 0.1);
}
li:last-child{
  box-shadow:none;
}
.block>h3, .notice>h3{
  margin-bottom: 4px;
  line-height: 10px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.content{
  line-height: 24px;
  font-size: 10px;
  color: rgb(7, 17, 27);
}
.content>span{
  font-size: 24px;
}
.favorate{
  position: absolute;
  width: 50px;
  right: 11px;
  top: 18px;
  text-align: center;
}
.favorate> .icon-favorite{
  display: block;
  margin-bottom: 4px;
  line-height: 24px;
  font-size: 24px;
  color: #d4d6d9;
}
.favorate>.active{
  color: rgb(240, 20, 20);
}
.favorate>.texts{
  line-height: 10px;
  font-size: 10px;
  color: rgb(77, 85, 93);
}
.notices{
  padding:18px 18px 16px;
  box-shadow:0 1px 0 rgba(7, 17, 27, 0.1);
  margin-bottom:1px;
}
.notices>p{
  padding:8px 12px 16px;
  font-size: 12px;
  font-weight: 200;
  color:rgb(240,20,20);
  line-height:24px;
}
.support-items{
  padding: 16px 12px;
  box-shadow:0 1px 0 rgba(7, 17, 27, 0.1);
  font-size: 0;
}
.support-items:last-child{
  box-shadow:none;
}
.support-items>.icon{
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: top;
  margin-right: 6px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
}

.support-items>.decrease{
  background: url(decrease_4@2x.png);
  background-size: 100% 100%;
}

.support-items>.discount{
  background: url(discount_4@2x.png);
  background-size: 100% 100%;
}
.support-items>.guarantee{
  background: url(guarantee_4@2x.png);
  background-size: 100% 100%;
}
.support-items>.invoice{
  background: url(invoice_4@2x.png);
  background-size: 100% 100%;
}
.support-items>.special{
   background: url(special_4@2x.png);
  background-size: 100% 100%;
 }
.support-items>.text{
  line-height: 16px;
  font-size: 12px;
  color: rgb(7, 17, 27);
}
.sellerLive{
  padding: 18px
}

.sellerLive>  h3{
  margin-bottom: 12px;
  line-height: 14px;
  color: rgb(7, 17, 27);
  font-size: 14px;
}
.sellerLive>.waper{
  width: 100%;
}
.picList{
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}
.picList>li{
  display: inline-block;
  margin-right: 6px;
  width: 120px;
  height: 90px;
}
.picList>li>img{
  width: 100%;
}
.waper{
   width:100%;
    overflow: hidden;
}
</style>
<script>
    import star from '../star/star.vue'
    import splite from '../splite/splite.vue'
    import Bscroll from 'better-scroll'
    export default {
        data() {
            return {
              favorate:false
            }
        },
        props:["seller"],
        components:{
            'star':star,
            'splite':splite
        },
        computed:{
            favText(){
              return this.favorate ? '已收藏' : '未收藏'
            }
        },
        watch: {
            'seller'() {
                this.initscroll();
                this.initscroll_x();
            }
        },
        mounted() {
            this.initscroll();
            this.initscroll_x();
        },
        created() {
           this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        methods:{
            initscroll(){
                this.$nextTick(()=> {
                    if (!this.sscroll) {
                      this.sscroll = new Bscroll(this.$refs.sellerscroll, {
                        click: true
                      })
                    } else {
                      this.sscroll.refresh()
                    }
                })
            },
            initscroll_x(){
              let picWidth = 120;
              let margin = 6;
              let width = (picWidth + margin) * this.seller.pics.length - margin;
              this.$refs.picList.style.width = width + 'px';
              this.$nextTick(()=> {
                  if (!this.sellerLivescroll) {
                    this.sellerLivescroll = new Bscroll(this.$refs.sellerLive, {
                      scrollX: true,
                      eventPassthrough: 'vertical'
                    })
                  } else {
                    this.sellerLivescroll.refresh()
                  }
              })
            },
            changeFavour(){
                this.favorate = !this.favorate
            }
        }
    }
</script>
