<template>
  <div class="tableRow" v-if="node.children">
    <div class="tableRowCell" 
        :style="{paddingLeft: getPadding, 
                backgroundColor:getColor.color, 
                color: getColor.isDark ?  '#F2F2F2': '#2C3E50'}">
        {{ node.label }}
        <button class="btn">show</button>
    </div>
    <div class="tableRowCell" 
        :style="{backgroundColor:getColor.color, 
                 color: getColor.isDark ?  '#F2F2F2': '#2C3E50'}" >  
        {{node.count }}
    </div>
    <div class="tableRowCell"  
        :style="{backgroundColor:getColor.color, 
                 color: getColor.isDark ?  '#F2F2F2': '#2C3E50'}">
        <button class="btn">delete</button> 
        <button>edit</button>
    </div>
    <locationNodeRecursive v-for="nodeItem in node.children" :key="nodeItem.id" :level="level + 1" :node="nodeItem"/>
   
  </div>
  <div class="tableRow" v-else>
    <div class="tableRowCell" 
        :style="{paddingLeft: getPadding,
                 backgroundColor:getColor.color, 
                 color: getColor.isDark ?  '#F2F2F2': '#2C3E50' }">
        {{ node.label }}
        <button class="btn">show</button>
    </div>
    <div class="tableRowCell" 
        :style="{backgroundColor:getColor.color, 
                 color: getColor.isDark ?  '#F2F2F2': '#2C3E50'}" >
        {{ node.count }}
    </div>
    <div class="tableRowCell" 
        :style="{backgroundColor:getColor.color, 
                color: getColor.isDark ?  '#F2F2F2': '#2C3E50'}" >
        <button class="btn">delete</button> 
        <button class="">edit</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "locationNodeRecursive",
  data: function () {
    return {}
  },
  computed:{
      getPadding(){
          return this.level !== 0 ? (20 * this.level + 1) + 'px' : 10 + 'px'
      },
      getColor(){
          let color1 = 1;
          let color2 = 95;
          if(this.level !== 0){
              color1 = 10 + ((this.level + 0.5) * 5)
              color2 = 100 - ((this.level - 0.5) * 15)
          }
          return {
              color:`hsl(217, ${color1}%, ${color2}%)`,
              isDark: color2 < 65
          };
      }
  },
  props: {
    node: Object,
    level: Number
  },
  components: {},
}
</script>

<style>
.locationNode__label {
  display: block;
  text-align: left;
}

.tableRow {
  grid-column-start: 1;
  grid-column-end: 4;
  display: grid;
  grid-template-columns: 5fr 2fr 1fr;
}
.tableRowCell {
  border: 1px solid #f2f4f7;
  text-align: left;
  padding: 10px;
  display: flex;
  justify-content: start;
}
.btn{
    margin-left: auto;
}
</style>