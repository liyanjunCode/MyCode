<template>
    <div class="shopcarts">
        <div class="upzindex" @click="changeFold">
            <div class="shopleft">
              <div class="cartWraper">
                  <div class="cartInner":class="{actives : totalcount > 0 }">
                      <span class="icon-shopping_cart"></span>
                     <div class="num" v-if="totalcount > 0">{{totalcount}}</div>
                  </div>
              </div>
              <div class="totalPrice" :class="{priceColor : totalcount > 0}">￥{{totalPrices}}</div>
              <div class="shipfee">另需配送费{{deliveryPrice}}元</div>
            </div>
            <div class="shopright">
              <div class="pay" :class="{enough : totalPrices - minPrice >= 0 }" @click.stop="payAll">
                {{pay}}
              </div>
            </div>
            <div class="ball-container">
              <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter" v-for="ball in balls">
                  <div class="drop" v-show="ball.show">
                    <div class="innerhock">
                    </div>
                  </div>
              </transition>
            </div>
        </div>
      <transition name="fold">
          <div class="chossedList" v-show="fold">
              <div class="chooseHead">
                <h3>购物车</h3>
                <span @click="emputy">清空</span>
              </div>
              <div class="chooseContent" ref="scrollContent">
                <ul>
                  <li v-for="showFood in slected_food">
                      <h3 class="showFoodH3">{{showFood.name}}</h3>
                      <span>{{showFood.price * showFood.count }}</span>
                      <div class="cartControl">
                          <cartCount :items="showFood"></cartCount>
                      </div>
                  </li>
                </ul>
              </div>
          </div>
      </transition>
      <div class="mask" v-show="fold" @click="changeFold"></div>
    </div>
</template>
<script>
  import cartCount from '../cartCount/cartCount.vue'
  import Bscroll from 'better-scroll'
  export default {
    data() {
      return {
        balls:[
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          }
        ],
        dropballs:[],
        fold:false,
      }
    },
    props:{
      slected_food:{
        type:Array
      } ,
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    created(){
        this.$root.eventHub.$on("card.add",this.drop)
    },
    computed:{
      totalPrices(){
         let totalPrice = 0;
         this.slected_food.forEach((food) => {
           if(food.count){
             totalPrice += food.price *food.count;
           }
         })
        return totalPrice
      },
//      支付状态显示
      pay(){
        if(this.totalPrices == 0){
            return `${this.minPrice}元起送`
        }else if(this.totalPrices < this.minPrice){
          let dis = this.minPrice - this.totalPrices;
          return `差${dis}元起送`;
        }else{
          return '去结算';
        } if(this.totalPrices == 0){
            return `{this.minPrice}元起送`
        }else if(this.totalPrices < this.minPrice){
          let dis = this.minPrice - this.totalPrices;
          return `差{dis}元起送`;
        }else{
          return '去结算';
        }
      },
      totalcount(){
        let counts = 0;
        if(this.slected_food.length > 0){
          this.slected_food.forEach((food) => {
            if(food.count) {
              counts += food.count
            }
          })
        }
        return counts
      }
    },
    methods:{
        drop(el){
            for(var i=0;i<this.balls.length;i++){
                if(!this.balls[i].show){
                    let ball = this.balls[i];
                    ball.show = true;
                    ball.el =el;
                    this.dropballs.push(ball)
                    return
                }

            }
        },
       beforeEnter(el){
          let count = this.balls.length;
          while(count--){
            let ball = this.balls[count];
            if(ball.show){
                let ball = this.balls[count];
                let rect = ball.el.getBoundingClientRect();
                let x = rect.left - 32;
                let y = -(window.innerHeight - rect.top -22);
                el.style.WebkitTransform = `translate3D(0,${y}px,0)`;
                el.style.transform = `translate3D(0,${y}px,0)`;
                let inner = el.getElementsByClassName("innerhock")[0];
                inner.style.WebkitTransform = `translate3D(${x}px,0,0)`;
                inner.style.transform = `translate3D(${x}px,0,0)`;
            }

          }
        },
        enter(el){
//        重新获取小球高度
            el.offsetHeight
            this.$nextTick(()=>{
                el.style.WebkitTransform = 'translate3D(0,0,0)';
                el.style.transform = 'translate3D(0,0,0)';
                let inner = el.getElementsByClassName("innerhock")[0];
                inner.style.WebkitTransform = 'translate3D(0,0,0)';
                inner.style.transform = 'translate3D(0,0,0)';
            })
        },
        afterEnter(el){
            let ball = this.dropballs.shift();
            if(ball){
               ball.show = false;
               el.style.display = 'none'
            }
        },
      changeFold(){
          if(!this.fold){
            if(this.slected_food.length > 0){
              this.fold = ! this.fold
            }
          }else{
            this.fold = ! this.fold
          }
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new Bscroll(this.$refs.scrollContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      emputy(){
          this.slected_food.forEach((food) => {
              food.count = 0;
          });
          this.fold = ! this.fold
      },
      payAll(){
          if (this.totalPrices < this.minPrice) {
            return;
          }
          window.alert(`支付${this.totalPrices}元`);
      }
    },
    components:{
       'cartCount':cartCount
    }

  }
</script>
<style>
.upzindex{
  width: 100%;
  height: 48px;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #141d27;
  display:flex;
  z-index: 50;
}
.shopleft{
  flex: 1;
 }
.shopright{
  flex:0 0 105px;
  width:105px;
}
.pay{
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  background: #2b333b;
  color: rgba(255,255,255,0.4);
}
.cartWraper{
  display: inline-block;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin: 0 12px;
  position: relative;
  top:-10px;
  padding:6px 6px;
  background: #141d27;
  box-sizing: border-box;
}
.cartInner{
  width: 100%;
  height: 100%;
  font-size: 24px;
  text-align: center;
  color: rgba(255,255,255,0.4);
  border-radius: 50%;
  background:#2b343c;
}
.cartInner>span {
  line-height: 44px !important;
  vertical-align: middle;
}
.totalPrice, .shipfee{
  display:inline-block;
  font-size: 16px;
  color: rgba(255,255,255,0.4);
  font-weight: 700;
  line-height:48px;
  position: relative;
  top: -4px;
}
.totalPrice{
  min-width: 46px;
  padding-right: 12px;
  box-shadow: 1px 0 0 rgba(255,255,255,0.1);
}
.shipfee{
  font-size: 12px;
  margin: 0 12px;
}
.num{
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 16px;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: rgb(240, 20, 20);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
}
.enough{
  background:#00b43c;
  color:white;
}
.actives{
  background: rgb(0,160,220);
  color: white;
}
.priceColor{
  color: white;
}
.ball-container{
  position: fixed;
  left: 32px;
  bottom: 22px;
  z-index: 200;
}
.innerhock{
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgb(0, 160, 220);
  transition :all .4s linear;
}
.drop{
  transition :all .4s cubic-bezier(0.45,-0.74,0.82,1.33);
}
.chossedList{
  width: 100%;
  position: fixed;
  bottom:48px;
  left:0;
  z-index: 5;
  background: #f3f5f7;
  color: rgb(7,17,27);
  padding-bottom: 10px;
  transition:all 0.1s;
}
.chooseHead{
  width: 100%;
  height: 40px;
  line-height: 40px;
  box-shadow: 0 1px 0 rgba(7,17,27,0.1);
  padding:0 18px;
  box-sizing:border-box;
}
.chooseHead>h3{
  font-size: 14px;
  font-weight: 200;
  float:left;
  color: rgb(7,17,27);
}
.chooseHead>span{
  font-size: 12px;
  color: rgb(0,160,220);
  float:right;
}
.chooseContent{
  max-height: 217px;
  padding:0 18px 10px;
  box-sizing:border-box;
  overflow: hidden;
}
.chooseContent li {
  width: 100%;
  height: 48px;
  font-size: 14px;
  position: relative;
  box-shadow: 0 1px 0 rgba(7,17,27,0.1);
}
.chooseContent li>h3,.chooseContent li>span{
  line-height: 48px;
}
.chooseContent li>span{
  position:absolute;
  right: 100px;
  bottom:0;
  color: rgb(240,20,20);
}
.cartControl{
  position:absolute;
  right: -8px;
  bottom:6px;
}
.mask{
  width: 100%;
  height: 668px;
  position: fixed;
  left: 0;
  top:0;
  background: rgba(7,17,27,0.6);
  z-index: 3;
}
.fold-enter, .fold-leave{
  transform: translate3d(0, 0, 0)
}
.fold-enter-active, .fold-leave-active{
  transform: translate3d(0,100%, 0)
}
</style>

