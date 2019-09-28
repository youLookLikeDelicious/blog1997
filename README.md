# Nuxt的初始化设置

> 初始化nuxt项目，无需每次手动配置

## 配置的内容
assets  
> style  
>>base.scss     --全局属性  
>>_mixin.scss   --sass的函数  
>>_placeholder  --sass的占位符  
  
plugins  
>filter.js         --管道操作  
>registComponent   --注册全局组件  
>vueprototype      --为vue的原型添加axios属性，在使用的时候无需import axios 

nuxt.config.js
>layout的命名视图--navigate和foot  
>设置axios的baseURL
  
>使用dotenv配置全局变量  
>配有esline  

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
