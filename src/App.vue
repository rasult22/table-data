<template>
  <div id="app">
    <organization-tree :treeData="getTree" />  
  </div>
</template>

<script>
import OrganizationTree from './components/OrganizationTree.vue'

export default {
  name: 'App',
  components: {
    OrganizationTree
  },
  data: ()=> {
    return {}
  },
  computed:{
    getTree(){
      return this.$store.getters.getTree
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
