<template>
    <div class="ratingslect">
        <div class="slect">
          <span class="block positive" @click="slects(2,$event)" :class="{'active1':Stype === 2}">{{des.all}}<span class="count">{{ratings.length}}</span></span>
          <span class="block positive" @click="slects(0,$event)" :class="{'active1':Stype === 0}">{{des.positive}}<span class="count">{{positives.length}}</span></span>
          <span class="block negative" @click="slects(1,$event)" :class="{'active2':Stype === 1}">{{des.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div class="only">
          <span class="icon-check_circle" @click="onlyContents" :class="{'active':Content}"></span>
          <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>
<style>
.slect{
    padding:12px 0 18px 0;
    box-shadow:0 1px 0 rgba(7,17,27,0.1);
}
.block{
    display: inline-block;
    padding: 8px 12px;
    margin-right: 8px;
    line-height: 16px;
    border-radius: 1px;
    font-size: 12px;
    color: rgb(77, 85, 93);
}
.positive{
   background: rgba(0, 160, 220, 0.2)
 }
.negative{
   background: rgba(77, 85, 93, 0.2)
 }
.active1{
  color:#fff;
  background: rgb(0, 160, 220)
}
.active2{
  background: rgba(77, 85, 93,0.7)
}
.count{
    margin-left: 2px;
    font-size: 8px;
}
.only{
    padding:12px 0;
    line-height: 24px;
    color: rgb(147,153,159);
}
span.icon-check_circle{
    font-size: 24px;
    margin-right: 4px;
}
.only> .text {
    font-size: 12px;
}
.active{
  color: #00c850
}
</style>
<script>
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default {
        data() {
            return {
              Stype:this.selectType,
              Content:this.onlyContent
            }
        },
        props:{
            ratings: {
                type: Array,
                default() {
                  return [];
                }
            },
            des: {
                type: Object,
                default() {
                    return {
                        ALL: '全部',
                        positive: '满意',
                        negative: '不满意'
                    };
                }
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            selectType: {
                type: Number,
                default: ALL
            }
        },
        computed:{
            positives(){
                return this.ratings.filter((rating) =>{
                      return rating.rateType == POSITIVE
                })
            },
            negatives(){
                return this.ratings.filter((rating) =>{
                    return rating.rateType == NEGATIVE
                })
            }
        },
        methods:{
            slects(type,event){
                if (!event._constructed) {
                  return;
                }
                this.Stype = type
                this.$root.eventHub.$emit("slects",type);
            },
            onlyContents(){
                this.Content = !this.Content;
                this.$root.eventHub.$emit("Content", this.Content);
            }
        }
    }
</script>
