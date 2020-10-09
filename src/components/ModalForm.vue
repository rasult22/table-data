<template>
  <div class="modal" v-if="isModifying">
    <div class="modifyForm" >
      <a href="#" class="btn" @click.prevent="handleClose">close</a>
      <header>
          <h2>Modify {{node.label}}</h2>
          <p class="path">{{path}}</p>
      </header>
      <section>
          <form action="" @submit.prevent="handeUpdate" class="modifyElement">
            <div>
              <label for="label" class="modifyElement__label">New label</label>
              <input type="text" class="modifyElement__input" id="label" v-model="label">
            </div>
            <div>
              <label for="label" class="modifyElement__label">New count</label>
              <input type="number" class="modifyElement__input" id="label" v-model="count">
            </div>
            <div>
              <button class="modifyButton" @click="handleUpdate">Update</button>
            </div>
          </form>
      </section>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
data: ()=>{
  return {
    label: 'Hello',
    path:'/',
    count: 20
  } 
},
methods:{
  ...mapMutations(['updateRow']),
  handleClose(){
    this.$emit('closed')
  },
  handleUpdate(){
    this.updateRow({
      label: this.label,
      count: this.count,
      id: this.node.id
    })
    this.handleClose();
  }
},
computed:{
  getPath(){
      return this.$store.getters.getTreePaths;
    },
  isModifying(){
    return this.startModify;
  }
},
props:{
    header: String,
    node: Object,
    startModify: Boolean
},
created(){
  this.$data.count = this.node.count;
  this.$data.label = this.node.label;
  let node = this.node;
  console.log(this.getPath)
  let path = '';
  this.getPath.forEach(element => {
      if(element.id === node.id){
        path = element.path;
      }
  });
  this.$data.path = path;
}
}
</script>

<style>
.path{
  padding: 10px;
  background:white;
}
.modal{
  display: block; 
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4);
}
.modifyForm{
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  max-width: 400px;
  background: #f2f2f2;
  color:darkslategrey;
  padding: 20px;
  display: grid;
  grid-template-columns: 4fr;
}
.modifyElement{
  grid-column-start: 1;
  grid-column-end: 4;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.modifyElement__label{
  display: block;
}
.modifyElement__input{
  padding: 10px;
}
.modifyButton{
  text-align: center;
  padding: 5px 5px;
  display: flex;
  margin: 0 auto;
  margin-top: 25px;
}

</style>