<template>
  <div>
      <Vheader :seller = "seller"></Vheader>
      <Navs></Navs>
      <keep-alive>
          <router-view  :seller="seller"></router-view>
      </keep-alive>
  </div>
</template>

<script>
  import header from './components/v-header/header.vue'
  import Navs from './components/Nav/nav.vue'
  export default {
    name: 'app',
    data(){
      return{
        seller:{
        }
      }
    },
    components: {
      'Vheader': header,
      'Navs': Navs
    },
    created: function () {
      this.$http("api/seller").then((response) => {
        this.seller = response.data;
      }).catch(error => {
        console.log(error)
      })
    },
    methods:{
    }
  }
</script>

<style scoped>
</style>
