
import goods from './components/goods/goods.vue'
import review from './components/review/review.vue'
import seller from './components/seller/seller.vue'
export default [
  {
    path:'/goods',
    component:goods
  },
  {
    path:'/review',
    component:review
  },
  {
    path:'/seller',
    component:seller
  },
  {
    path:'*',
    redirect:'/goods'
  },
  {
    path: '/',
    redirect: '/goods'
  }
]
