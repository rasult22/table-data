<template>
  <div class="locationTree">
    <h1>Организационная структура</h1>
    <div class="addElement">
        <form @submit.prevent="handleSumbit">
              <input type="text" v-model="label" placeholder="Location name">
              <input type="number" v-model="count" placeholder="Count">
              <select name="locations" id="select_id" v-model="selected">
                <option value="/">
                    /  
                </option>
                <option value="Almaty">
                    Almaty  
                </option>
                <option value="Almaty > Center 1 > Almaty > Center 1">
                    Almaty > Center 1 > Almaty > Center 1
                </option>    
              </select>
              <button :disabled="disableButton">Add</button>        
        </form>
    </div>
    <div class="locationTable">
      <div class="locationTable__headTitle ">Name</div>
      <div class="locationTable__headTitle">Count</div>
      <div class="locationTable__headTitle">Actions</div>
      
      <location-node :node="data" :level="0" v-for="data in treeData" :key="data.id" />
    </div>
  </div>
</template>

<script>
import LocationNode from './LocationNode'
export default {
  components:{
    LocationNode
  },
  data: function(){
    return {
      label: '',
      selected: '/',
      count: null

    }
  },
  computed:{
    disableButton(){
      return this.label === '' || this.count === null
    }
  },
  methods:{
    handleSubmit(){
      
    }
  },
  props: {
    treeData:Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.locationTable{
  border: 1px solid #f2f4f7;
  border-collapse: collapse;
  background: #05214a;
  color: #f2f4f7;
  display: grid;
  grid-template-columns: 5fr 2fr 1fr;
}
.locationTable__headTitle{
  text-align: left;
  border: 1px solid #f2f4f7;
  padding: 10px;
  padding-left:10px;
}
.locationTable__headItem--level_1{
  padding-left: 30px; 
}



</style>
