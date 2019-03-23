import Vue from 'vue'

const $getOffsetTop = () => ((window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0))

Vue.use({
  install: (Vue) => {
    Object.assign(Vue.prototype, {
      $getOffsetTop
    })
  }
})
