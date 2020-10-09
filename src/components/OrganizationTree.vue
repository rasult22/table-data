<template>
  <div class="locationTree">
    <h1 class="locationTreeTitle">Организационная структура</h1>
    <div class="addElement">
        <form @submit.prevent="handleSubmit" class="addElement__Form">
              <input type="text" class="addElement__input" v-model="label" placeholder="Location name">
              <input type="number" class="addElement__input" v-model="count" placeholder="Count">
              <select name="locations" class="addElement__select" id="select_id" v-model="selected">
                <option value="/">
                    / 
                </option>
                <option v-for="element in this.getPath" :value="element.path" :key="element.id">
                    {{element.path}}
                </option>     
              </select>
              <button class="pageButton" :disabled="disableButton">Add</button>        
        </form>
        
    </div>
    <div class="locationTable">
      <div class="locationTable__headTitle ">Name</div>
      <div class="locationTable__headTitle">Count</div>
      <div class="locationTable__headTitle">Actions</div>
      
      <location-node :node="data" :level="0" v-for="data in treeData" :key="data.id"  />
    </div>
    
  </div>
</template>

<script>
import LocationNode from './LocationNode'
import {mapMutations} from 'vuex'


export default {
  components:{
    LocationNode,
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
    },
    getPath(){
      return this.$store.getters.getTreePaths;
    },
    getParentID(){
      let s = this.selected;
      let id = null;
      this.getPath.forEach(element => {
        if(element.path === s){
          console.log(element.id)
          id = element.id
        }
      });

      return id;
    }
  },
  methods:{
    ...mapMutations(['createRow']),
    handleSubmit(){
      let parent_id = this.getParentID;
      let id = Math.floor(Math.random() * Date.now())
      let row = new TableRow(this.label, id, parent_id, this.count);

      this.createRow(row)
    }
  },
  props: {
    treeData:Array
  }
}
class TableRow{
  constructor(label, id, parent_id, count, children = null, show = true){
    this.label = label;
    this.id = id;
    this.count = count;
    this.parent_id = parent_id;
    this.children = children;
    this.show = show;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.locationTreeTitle{
  background: #05214a;
  color: #f2f4f7;
  text-align: left;
  font-size: 25px;
  padding: 20px;
  text-transform: uppercase;
}
.locationTable{
  border: 1px solid #f2f4f7;
  border-collapse: collapse;
  background: #05214a;
  color: #f2f4f7;
  display: grid;
  grid-template-columns: 5fr 2fr .6fr;
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

.addElement{
  padding: 20px;
}

.addElement__input, .addElement__select{
  padding: 5px;
  margin-right: 10px;
}

.pageButton{
  padding: 8px 14px;
  text-align: center;
}


</style>
