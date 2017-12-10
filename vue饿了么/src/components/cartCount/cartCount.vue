<template>
  <div>
      <transition name="fade">
          <div class="cart-decrease" @click.stop="decrease($event)" v-show="this.items.count > 0">
             <span class="inner icon-remove_circle_outline"></span>
          </div>
      </transition>
      <transition name="cross">
        <div class="cart-count" v-show="this.items.count > 0">{{this.items.count}}</div>
      </transition>
      <div class="cart-add icon-add_circle" @click.stop="add($event)"></div>
  </div>
</template>
<script>
  import Vue from 'vue';
  export default {
    data() {
      return {}
    },
    props:{
      items:{
        type:Object
      }
    },
    methods:{
      decrease(event){
          if (!event._constructed) {
            return;
          }
        this.items.count--;
      },
      add(event){
          if (!event._constructed) {
            return;
          }
          if(!this.items.count){
            Vue.set(this.items,'count',1)
          }else{
            this.items.count++;
          }
          this.$store.addCartEl = event.target;
          this.$root.eventHub.$emit("card.add",event.target);
      }
    }
  }
</script>
<style>
.fade-enter, .fade-leave{
  opacity:0;
  transform: translate3d(0, 0, 0) rotate(180deg);
}
.fade-enter-active, .fade-leave-active{
  opacity:1;
  transform: translate3d(30px, 0, 0) rotate(180deg);
}
.cross-enter, .cross-leave{
  opacity:0;
  transform: translate3d(0, 0, 0);
}
.cross-enter-active, .cross-leave-active{
  opacity:1;
  transform: translate3d(23px, 0, 0);
}
.cart-decrease{
display: inline-block;
padding: 6px;
transition: all 0.1s ease;
}
.inner{
display: inline-block;
line-height: 24px;
font-size: 24px;
color: rgb(0, 160, 220);
z-index: 1;
}
.cart-count{
display: inline-block;
vertical-align: top;
width: 12px;
padding-top: 6px;
line-height: 24px;
text-align: center;
font-size: 10px;
color: rgb(147, 153, 159);
transition: all 0.1s ease;
}
.cart-add{
  display: inline-block;
  padding: 6px;
  line-height: 24px;
  font-size: 24px;
  color: rgb(0, 160, 220);
}
</style>

