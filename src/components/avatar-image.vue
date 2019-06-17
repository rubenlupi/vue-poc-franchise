<template>
  <div>
    <vue-load-image>
      <img slot="image" src="./image.png"/>
      <img slot="preloader" src="./image-loader.gif"/>
      <div slot="error">error message</div>
    </vue-load-image>
  </div>
</template>

<script>
// es6
import VueLoadImage from 'vue-load-image'
// es5
var VueLoadImage = require('vue-load-image').default

export default {
  components: {
    'vue-load-image': VueLoadImage
  }
}
</script>