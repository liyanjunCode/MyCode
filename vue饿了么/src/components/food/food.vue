<template>
    <div>
        <transition name="food">
            <div class="food" v-show="showState" ref="fooded">
                <div class="food-wapper">
                    <div class="foodHead">
                        <img :src="foodChild.icon" />
                        <div class="back" @click="hide">
                            <i class="icon-arrow_lift"></i>
                        </div>
                    </div>
                    <div class="foodDetail">
                        <h3>{{foodChild.name}}</h3>
                        <div class="saleRating">
                            <span class="firstSale">月售{{foodChild.sellCount}}份</span>
                            <span>好评率{{foodChild.rating}}</span>
                        </div>
                        <div class="prices">
                            <span class="nowPrice">￥{{foodChild.price}}</span>
                            <span class="oldPrice" v-show="foodChild.oldPrice">￥{{foodChild.oldPrice}}</span>
                        </div>
                        <div class="cart_wraper">
                              <cartCount :items="foodChild"></cartCount>
                        </div>
                        <transition name="transShow">
                             <div class="putCart" @click.stop.prevent="addFirst" v-show="!foodChild.count">加入购物车</div>
                        </transition>
                    </div>
                    <split v-show="foodChild.info"></split>
                    <div class="proudctIntro" v-show="foodChild.info">
                        <h3>商品介绍</h3>
                        <p>{{foodChild.info}} </p>
                    </div>
                    <split></split>
                    <div class="slection">
                        <h3>商品评价</h3>
                        <ratingslect :des="des" :ratings="foodChild.ratings" :onlyContent="onlyContent" :selectType="selectType"></ratingslect>
                    </div>
                    <div class="rating-wrapper">
                        <ul>
                          <!--needShow(ratingList.rateType,ratingList.text)-->
                          <li v-for="ratingList in foodChild.ratings" class="rating-item" v-show="needShow(ratingList.rateType,ratingList.text)">
                              <div class="user">
                                  <span class="name">{{ratingList.username}}</span>
                                  <img class="avatar" width="12" height="12" :src="ratingList.avatar">
                              </div>
                              <div class="time">{{ratingList.rateTime}}</div>
                              <p class="text">
                                  <span :class="{'icon-thumb_up':ratingList.rateType===0,'icon-thumb_down':ratingList.rateType===1}"></span>{{ratingList.text}}
                              </p>
                          </li>
                        </ul>
                    </div>
                </div>
          </div>
        </transition>
    </div>
</template>
<script>
    import Vue from 'vue'
    import Bscroll from 'better-scroll'
    import cartCount from '../cartCount/cartCount.vue'
    import split from '../splite/splite.vue'
    import ratingslect from '../ratingslect/ratingslect.vue'
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default {
        data() {
            return{
                showState:false,
                des:{
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                },
                onlyContent:false,
                selectType: ALL
            }
        },
        props:["foodChild"],
        methods:{
            changeState(){
              this.showState =true;
              this.selectType= ALL;
              this.onlyContent= false;
              this.$nextTick(() => {
                  if (!this.foodedscroll) {
                    this.foodedscroll = new Bscroll(this.$refs.fooded, {
                      click: true
                    })
                  }else {
                    this.foodedscroll.refresh();
                  }
              })
            },
             hide(){
                this.showState =false;
             },
            addFirst(){
                if (!event._constructed) {
                  return;
                }
                this.$root.eventHub.$emit("card.add",event.target);
                 Vue.set(this.foodChild, 'count', 1);
            },
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
        },
        components:{
          'cartCount':cartCount,
          'split':split,
          'ratingslect':ratingslect
        },
        mounted(){
            this.$root.eventHub.$on("slects",(type)=>{
                this.selectType = type;
            })
            this.$root.eventHub.$on("Content",(msg)=>{
                this.onlyContent = msg;
            });

        }
    }
</script>
<style>
.food{
    width: 100%;
    position: fixed;
    top: 0;
    left:0;
    bottom: 48px;
    transition:all 0.2s;
    background: #fff;
    overflow: hidden;
}
.food-enter, .food-leave{
    opacity: 0;
    transform:translate3d(0,0,0)
 }
.food-enter-active, .food-leave-active{
    opacity: 1;
    transform:translate3d(100%,0,0)
}
.transShow-enter, .transShow-leave{
    opacity: 0;
}
.transShow-enter-active, .transShow-leave-active{
     opacity: 1;
}
.foodHead{
    width: 100%;
    padding-top: 100%;
    position: relative;
}
.foodHead>img{
    border: none;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left:0;
}
.back{
    position: absolute;
    top: 10px;
    left: 0;
}
.icon-arrow_lift{
    display: block;
    padding: 10px;
    font-size: 20px;
    color: #fff;
}
.foodDetail{
    width:100%;
    padding:18px 18px;
    box-sizing:border-box;
    box-shadow: 0 1px 0 rgba(7,17,27,0.1);
    position: relative;
}
.foodDetail>h3{
    font-size: 14px;
    font-weight:700;
    color:rgb(7,17,27);
    line-height: 14px;
    padding-bottom: 8px;
}
.saleRating{
    font-size: 10px;
    color:rgb(147,153,159);
    line-height:10px;
    padding-bottom: 18px;
}
.firstSale{
    padding-right:12px;
}
.prices{
    font-weight: 700;
    line-height:24px;
}
.nowPrice{
    font-size: 14px;
    color: rgb(240,20,20);

}
.oldPrice{
    font-size: 10px;
    color: rgb(147,153,159);
}
.cart_wraper{
  position: absolute;
  right: 12px;
  bottom: 12px;
}
.putCart{
    position: absolute;
    right: 18px;
    bottom: 18px;
    width: 74px;
    height: 24px;
    border-radius: 12px;
    background-color: rgb(0,160,220);
    color: rgb(255,255,255);
    line-height: 24px;
    font-size: 10px;
    text-align: center;
    transition:all 0.01s;
}
.proudctIntro{
    padding: 18px;
    box-shadow: 0px 1px 0 rgba(7,17,27,0.1);
}
.proudctIntro>h3, .slection>h3{
    font-size: 14px;
    font-weight: 700;
    color: rgb(7,17,27);
    line-height: 28px;
}
.proudctIntro>p{
    font-size: 12px;
    font-weight:200;
    color: rgb(77,85,93);
    line-height: 24px;
    padding:0 8px;
}
.slection{
    padding:18px 18px 0;
    box-shadow:0 1px 0 rgba(7,17,27,0.1);
}
.rating-wrapper{
  padding: 0 18px;
}
.rating-item{
  position: relative;
  padding: 16px 0;
  box-shadow:0 1px 0 rgba(7, 17, 27, 0.1);
}

.user{
  position: absolute;
  right: 0;
  top: 16px;
  line-height: 12px;
  font-size: 0;
}
.name{
  display: inline-block;
  margin-right: 6px;
  vertical-align: top;
  font-size: 10px;
  color: rgb(147, 153, 159);
}

.avatar{
  border-radius: 50%;
}
.time{
  margin-bottom: 6px;
  line-height: 12px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.text{
  line-height: 16px;
  font-size: 12px;
  color: rgb(7, 17, 27);
}

.icon-thumb_up, .icon-thumb_down{
  margin-right: 4px;
  line-height: 16px;
  font-size: 12px;
}
.icon-thumb_up{
  color: rgb(0, 160, 220);
}
.icon-thumb_down{
  color: rgb(147, 153, 159)
}

</style>
