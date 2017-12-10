<template>
    <div class="review-wrapper" ref="reviewper">
          <div class="reviewContent">
              <div class="scoreWraper">
                  <div class="leftWaper">
                        <h3>{{seller.score}}</h3>
                        <div class="title">综合评分</div>
                        <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                  </div>
                  <div class="rightWaper">
                        <div class="serverManner">
                              <span class="Stitle">服务态度</span>
                              <star :size="36" :scores="seller.serviceScore"></star>
                              <span class="score">{{seller.serviceScore}}</span>
                        </div>
                        <div class="serverManner">
                              <span class="Stitle">商品评分</span>
                              <star :size="36" :scores="seller.foodScore"></star>
                              <span class="score">{{seller.foodScore}}</span>
                        </div>
                        <div class="delivery-wrapper">
                              <span class="titles">送达时间</span>
                              <span class="delivery">{{seller.deliveryTime}}分钟</span>
                        </div>
                  </div>
              </div>
              <div class="spliteWraper"><splite></splite></div>
              <div class="wraperRating">
                  <ratingslect :des="des" :ratings="ratings" :onlyContent="onlyContent" :selectType="selectType"></ratingslect>
              </div>
              <div class="rating-wrapper">
                  <ul>
                      <li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
                          <div class="avatar">
                              <img width="28" height="28" :src="rating.avatar">
                          </div>
                          <div class="content">
                              <h1 class="name">{{rating.username}}</h1>
                              <div class="star-wrapper">
                                  <star :size="24" :scores="rating.score"></star>
                                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                              </div>
                              <p class="text">{{rating.text}}</p>
                              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                  <span class="icon-thumb_up"></span>
                                  <span class="item" v-for="item in ratings.recommend">{{item}}</span>
                              </div>
                              <div class="time">
                                {{rating.rateTime}}
                              </div>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
    </div>
</template>
<style>
.review-wrapper{
    width: 100%;
    position: absolute;
    left:0;
    top: 174px;
    bottom:0;
    overflow: hidden;
}
.scoreWraper{
    display:flex;
    padding:18px 0;
    box-shadow:0 1px 0 rgba(7,17,27,0.1);
    margin-bottom: 1px;
}
.leftWaper{
    flex:0 0 137px;
    width:137px;
    box-shadow: 1px 0 0 rgba(7,17,27,0.1);
    padding-bottom:6px;
    text-align: center;
    color: rgb(7,17,27);
}
.leftWaper>h3{
    font-size:24px;
    color:rgb(255,153,0);
    line-height:28px;
    padding-bottom: 6px;
}
.title{
    font-size: 12px;
    line-height:12px;
    padding-bottom: 8px;
    font-weight:bold;
}
.rank{
    font-size: 10px;
    line-height:10px;
    padding-bottom: 6px;
}
.rightWaper{
    flex:1;
    padding:0 24px;
}
.serverManner{
  padding-bottom: 8px;
}
.Stitle{
    margin-bottom: 8px;
    line-height: 12px;
    font-size: 12px;
    color: rgb(7, 17, 27);
}
.delivery-wrapper{
  font-size: 0
}
.titles{
  line-height: 18px;
  font-size: 12px;
  color: rgb(7, 17, 27);
}
.delivery{
  margin-left: 12px;
  font-size: 12px;
  color: rgb(147, 153, 159);
}
.wraperRating{
  padding-left: 18px;
  box-shadow: 0 1px 0 rgba(7,17,27,0.1);
}
.rating-wrapper{
  padding: 0 18px;
}
.rating-item{
  display: flex;
  padding: 18px 0;
  box-shadow: 0 1px 0 rgba(7, 17, 27, 0.1);
}
.avatar{
  flex: 0 0 28px;
  width: 28px;
  margin-right: 12px;
}
.avatar>img{
  border-radius: 50%
}
.content{
  position: relative;
  flex: 1;
}
.name{
  margin-bottom: 4px;
  line-height: 12px;
  font-size: 10px;
  color: rgb(7, 17, 27);
}
.star-wrapper{
  margin-bottom: 6px;
  font-size: 0;
}
.star{
  display: inline-block;
  margin-right: 6px;
  vertical-align: top;
}
.delivery{
   display: inline-block;
   vertical-align: top;
   line-height: 12px;
   font-size: 10px;
   color: rgb(147, 153, 159);
}
.text{
  margin-bottom: 8px;
  line-height: 18px;
  color: rgb(7, 17, 27);
  font-size: 12px;
}
.recommend{
 line-height: 16px;
 font-size: 0;
}
.icon-thumb_up, .item{
  display: inline-block;
  margin: 0 8px 4px 0;
  font-size: 9px;
}
.icon-thumb_up{
  color: rgb(0, 160, 220)
}
.item{
  padding: 0 6px;
  border: 1px solid rgba(7, 17, 27, 0.1);
  border-radius: 1px;
  color: rgb(147, 153, 159);
  background: #fff;
}
.time{
  position: absolute;
  top: 0;
  right: 0;
  line-height: 12px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
@media only screen and (max-width:320px ){
  .leftWaper{
    flex: 0 0 120px;
    width: 120px;
  }
  .rightWaper{
    padding:0 10px;
  }
}
</style>
<script>
    import bscroll from 'better-scroll'
    import star from '../star/star.vue'
    import splite from '../splite/splite.vue'
    import ratingslect from '../ratingslect/ratingslect.vue'
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default {
        data() {
            return {
              ratings:[],
              des:{
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
              },
              onlyContent:false,
              selectType: ALL
            }
        },
        props:{
            seller: {
              type: Object
            }
        },
        mounted(){
            this.$http.get('/api/ratings').then((response) => {
                this.ratings = response.data;
                this.$nextTick(() => {
                  if(!this.reviewscroll){
                      this.reviewscroll = new bscroll(this.$refs.reviewper, {
                          click: true
                      });
                  }else{
                      this.reviewscroll.refresh()
                  }
                });
            });
            this.$root.eventHub.$on("slects",(type)=>{
               this.selectType = type;
                this.$nextTick(() => {
                    this.reviewscroll.refresh()
                })
            })
            this.$root.eventHub.$on("Content",(msg)=>{
                this.onlyContent = msg;
                this.$nextTick(() => {
                    this.reviewscroll.refresh()
                })
            });
        },
        components:{
            'star':star,
            'splite':splite,
            'ratingslect':ratingslect
        },
        methods:{
          needShow(type,text){
            if(this.onlyContent && !text){
              return false
            }
            if(this.selectType == ALL){
              return true
            }else{
              return type === this.selectType
            }
          }
        }
    }
</script>
