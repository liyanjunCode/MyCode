<template>
    <div>
        <div class="goods">
          <div class="left" ref="leftList">
            <ul>
              <li v-for="(value,index) in goods" class="item-list" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
                <span class="text">
                  <span v-if="value.type > 0" :class="classmap[value.type]"></span>
                  {{value.name}}
                </span>
              </li>
            </ul>
          </div>
          <div class="right" ref="rightList">
            <ul>
              <li v-for="value in goods" ref="ls">
                  <ul>
                    <h1>{{value.name}}</h1>
                     <li v-for="items in value.foods" class="food-list"  @click="foodView(items,$event)">
                       <div class="food-content">
                          <div class="foodIcon">
                            <img :src="items.image"/>
                          </div>
                         <div class="food-lists">
                            <h3 class="name">{{items.name}}</h3>
                           <p class="desc">{{items.description}}</p>
                           <div class="ext">
                             <span class="sellCount">月售{{items.sellCount}}份</span>
                             <span class="sellCount">好评率{{items.rating}}%</span>
                           </div>
                           <div class="prices">
                              <span class="nowprice">￥{{items.price}}</span>
                             <span class="oldprice" v-if="items.oldPrice">￥{{items.oldPrice}}</span>
                           </div>
                         </div>
                         <div class="cartcontrol-wrapper">
                             <cartCount :items ="items"></cartCount>
                         </div>
                       </div>
                     </li>
                  </ul>
              </li>
            </ul>
          </div>
        </div>
        <shopcarts :slected_food="selectFoods"  :delivery-price="seller.deliveryPrice"
                   :min-price="seller.minPrice"></shopcarts>
        <food ref="foodStates" :foodChild="foodChild"></food>
    </div>
</template>
<script>
  import Bscroll from 'better-scroll'
  import shopcarts from '../shopcarts/shopcarts.vue'
  import cartCount from '../cartCount/cartCount.vue'
  import food from '../food/food.vue'
  export default {
    props:{
      seller: {
        type: Object
      }
    },
    data() {
      return{
        goods:[],
        heightList:[],
        scrollY:0,
        foodChild:{}
      }
    },
    computed: {
      currentIndex() {
          for (let i = 0; i < this.heightList.length; i++) {
            let height1 = this.heightList[i];
            let height2 = this.heightList[i + 1];
            if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
              return i;
            }
          }
          return 0;
      },
      selectFoods(){
          let food = [];
          this.goods.forEach((good) => {
              good.foods.forEach((foods) => {
                if(foods.count){
                  food.push(foods);
                }
              })
          })
          return food
      }
    },
    components:{
      'shopcarts':shopcarts,
      'cartCount':cartCount,
      'food':food
    },
    created:function(){
      this.classmap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http("api/goods").then((response) =>{
        this.goods = response.data;
        this.$nextTick(() => {
          this.initScroll();
          this.totalHeight();
        })
      }).catch(error => {
        console.log(error)
      })
    },
    methods:{
      initScroll:function(){
        this.leftscroll = new Bscroll(this.$refs.leftList,{
            click:true
        })
        this.rightscroll = new Bscroll(this.$refs.rightList,{
            click:true,
            probeType:3
        })
        this.rightscroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      totalHeight:function(){
        let heights = 0;
        let foodLists = this.$refs.ls;
        this.heightList.push(0);
        for(let i=0;i<this.goods.length;i++){
          heights += foodLists[i].clientHeight;
          this.heightList.push(heights);
        }
      },
      selectMenu:function(index,event){
        if (!event._constructed) {
          return;
        }
        let foodLists = this.$refs.ls;
        let el = foodLists[index];
        this.rightscroll.scrollToElement(el, 300)
      },
      foodView:function(food,event){
          if (!event._constructed) {
              return;
          }
          this.foodChild = food
          this.$refs.foodStates.changeState()
      }
    }
  }
</script>
<style scoped>
.goods{
  display:flex;
  position: absolute;
  top:174px;
  bottom:47px;
  overflow:hidden;
  margin-top: 1px;
}
.left{
  flex:0 0 80px;
  font-size:12px;
  color:#000;
  line-height: 14px;
  font-weight: 400;
}
.item-list{
  width:56px;
  height: 54px;
  padding:0 12px;
  display: table;
  line-height: 14px;
}
.text{
  display: table-cell;
  vertical-align: middle;
  width: 56px;
  height: 54px;
  box-shadow: 0 1px 0 rgba(7,17,27,0.1);
}
.text>span {
  display:inline-block;
  width: 12px;
  height: 12px;
  margin-right: 2px;
  background-size: 100% 100%;
}
.right{
  flex:1;
  padding-left: 18px;
}

.food-content{
  display:flex;
  padding-top:18px;
  position: relative;
}
.food-list{
  margin:0 18px 0 10px;
  box-shadow: 0 1px 0 rgba(7,17,27,0.1);
}
.food-lists{
  flex:1;
  padding:0 18px 18px 10px;
}
h1{
  font-size: 12px;
  color:rgb(147,153,159);
  line-height: 26px;
  padding: 18px 0 0 10px;
}
.foodIcon{
  flex:0 0 57px;
  height: 57px;
}
.foodIcon img{
  width:57px;
  height: 57px;
}
.name{
  font-size: 14px;
  color: rgb(7,17,27);
  line-height: 14px;
  padding:2px 0 8px 0;
}
.desc, .ext{
  font-size:10px;
  color:rgb(147,153,159);
  line-height: 10px;
}
.desc{
  line-height: 18px;
}
.ext{
  line-height: 18px;
  padding-top:8px;
}
.sellCount{
  margin-right: 12px;
}
.prices{
  font-weight: 700;
  line-height: 24px;
  color: rgb(147,153,159);
  padding-top: 8px;
}
.nowprice{
  font-size:14px;
  color: rgb(240,20,20);
}
.oldprice{
  font-size:10px;
}
.current{
  position: relative;
  z-index: 10;
  margin-top: -1px;
  background: #fff;
  font-weight: 700;
  color: rgb(240,20,20);
}
.cartcontrol-wrapper{
  position: absolute;
  right: 0;
  bottom: 14px;
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
  background: url("guarantee_2@2x.png");
}
</style>

