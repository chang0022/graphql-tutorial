<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import Axios from 'axios'
export default {
  name: 'DemoAbout',
  created() {
    Axios.get('http://localhost:10086/books').then(data => {
      console.log(data)
      console.log(data.data.data)
    })
  }
}
</script>
