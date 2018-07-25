<template>
  <div class="home">
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to GraphQL DEMO"/>
  </div>
</template>

<script>
import Axios from 'axios'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  created() {
    Axios.post('http://localhost:5000/graphql', {
      query: `{
        books {
          id
          name
          genre
        }
        authors {
          id
          name
          age
        }
      }`
    }).then(data => {
      console.log(data)
      console.log(data.data.data)
    })
  },
  components: {
    HelloWorld
  }
}
</script>
