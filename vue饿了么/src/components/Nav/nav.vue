<template>
    <div class="nav">
      <ul>
        <router-link to="/goods" tag="li" active-class="active">商品</router-link>
        <router-link to="/review" tag="li" active-class="active" >评价</router-link>
        <router-link to="/seller" tag="li" active-class="active">商家</router-link>
      </ul>
    </div>
</template>
<style scoped>
ul{
  display:flex;
  box-shadow:  0 1px 0 rgba(7,17,27,0.1);
}
ul li{
  font-size: 14px;
  line-height: 40px;
  color: rgb(77,85,93);
  flex-grow: 1;
  text-align: center;
}
ul li.active{
  color: rgb(240,20,20);
}
</style>
<script>
    export default {
        data() {
          return{

          }
        }
    }
</script>
