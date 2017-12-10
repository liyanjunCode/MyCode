<template>
      <div class="starType" :class="starttypes">
          <span class="star-item" v-for="item in getStars" :class="item"></span>
      </div>
</template>
<style>
.starType{
   display: inline-block;
   font-size: 0
}
.star-item{
  display: inline-block;
  background-repeat: no-repeat;
}
.star-48 .star-item{
  width: 20px;
  height: 20px;
  margin-right: 22px;
  background-size: 20px 20px;
}

.star_48 .on{
  background-image:url(star48_on@2x.png)
}
.star_48 .half{
  background-image:url(star48_half@2x.png)
}
.star_48 .off{
  background-image:url(star48_off@2x.png)
}

.star_36 .star-item{
  width: 15px;
  height: 15px;
  margin-right: 6px;
  background-size: 15px 15px;
}
.star_36 .on{
  background-image:url(star36_on@2x.png)
}
.star_36 .half{
  background-image:url(star36_half@2x.png)
}
.star_36 .off{
  background-image:url(star36_off@2x.png)
}

.star_24 .star-item{
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-size: 10px 10px;
}
.star_24 .on{
  background-image:url(star24_on@2x.png)
}
.star_24 .half{
  background-image:url(star24_half@2x.png)
}
.star_24 .off{
  background-image:url(star24_off@2x.png)
}
.star-item:last-child{
  margin-right: 0
}
.score{
  display: inline-block;
  line-height: 18px;
  vertical-align: top;
  font-size: 12px;
  color: rgb(255, 153, 0);
}

</style>
<script>
    export default {
        data() {
            return {

            }
        },
        props:['scores','size'],
        computed:{
            starttypes(){
                return 'star_' + this.size
            },
            getStars(){
                let stars = []
                let scores = Math.floor(this.scores*2)/2;
                let halfitem = scores % 1 ;
                let scoresLen = Math.floor(scores)
                 for(let i = 0; i < scoresLen; i++){
                    stars.push('on')
                 }
                if(halfitem){
                    stars.push('half')
                }
                while(stars.length<5){
                    stars.push('off')
                }
                return stars
            }
        }
    }
</script>
