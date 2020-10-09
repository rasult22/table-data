<template>
  <div class="tableRow" 
       v-if="node.children">
      <transition name="fade">
        <div class="tableRow__cell" 
            v-if="showChildren"
            :style="{paddingLeft: getPadding, 
                    backgroundColor:getColor.color, 
                    color: getColor.isDark ?  '#F2F2F2': '#2C3E50'}">
            {{ node.label }}
            <button class="btn" 
                    @click="handleShow">
                    <img :class="showChild ? 'btn__arrow btn__arrow--opened': 'btn__arrow '" src="../assets/arrow.svg" />
            </button>
        </div>
      </transition>
      <transition name="fade">
        <div class="tableRow__cell" 
             v-if="showChildren"
            :style="{backgroundColor:getColor.color, 
                    color: getColor.isDark ?  '#F2F2F2': '#2C3E50'}" >  
            {{getCount }}
        </div>
      </transition>
      <transition name="fade">
        <div class="tableRow__cell"
            v-if="showChildren"  
            :style="{backgroundColor:getColor.color, 
                    color: getColor.isDark ?  '#F2F2F2': '#2C3E50'}">
            <button class="btn" 
                    @click="handleDelete">
                    <img class="btn__delete" src="../assets/delete.svg">
            </button> 
            <button class="btn" @click="handeEdit">
              <img class="btn__edit" src="../assets/edit.svg">
            </button>
        </div>
      </transition>
      <locationNodeRecursive v-for="nodeItem in node.children" 
                            :key="nodeItem.id" 
                            :level="level + 1" 
                            :node="nodeItem"/>
      <transition name="fade">
        <ModalForm :node="node" 
                   :startModify="modify"
                   @closed="handeEdit" />
      </transition>
  </div>
  <div class="tableRow" 
       v-else>
      <transition name="fade">
        <div class="tableRow__cell"
             v-if="showChildren" 
            :style="{paddingLeft: getPadding,
                    backgroundColor:getColor.color, 
                    color: getColor.isDark ?  '#F2F2F2': '#2C3E50' }">
            {{ node.label }}
            <button class="btn" 
                    @click="handleShow">
                      <img :class="showChild ? 'btn__arrow btn__arrow--opened': 'btn__arrow '" src="../assets/arrow.svg" />
            </button>
        </div>
      </transition>
      <transition name="fade">
        <div class="tableRow__cell" 
             v-if="showChildren"
            :style="{backgroundColor:getColor.color, 
                    color: getColor.isDark ?  '#F2F2F2': '#2C3E50'}" >
            {{ getCount }}
        </div>
      </transition>
      <transition name="fade">
        <div class="tableRow__cell" 
             v-if="showChildren"
            :style="{backgroundColor:getColor.color, 
                    color: getColor.isDark ?  '#F2F2F2': '#2C3E50'}" >
            <button class="btn" 
                    @click="handleDelete"> 
                    <img class="btn__delete" src="../assets/delete.svg">
            </button> 
            <button class="btn" 
                    @click="handeEdit">
                    <img class="btn__edit" src="../assets/edit.svg">
            </button>
        </div>
      </transition>
      <transition name="fade">
        <ModalForm :node="node" 
                   :startModify="modify" 
                   @closed="handeEdit"/>
      </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import ModalForm from './ModalForm'

export default {
  name: "locationNodeRecursive",
  data: function () {
    return {
      showChild: true,
      startModify: false
    }
  },
  methods:{
    ...mapMutations(['toggleShow','deleteRow']),
    handleShow(){
      this.showChild = !this.showChild;
      let payload = {
        id: this.node.id,
        show: this.showChild
      }
      this.toggleShow(payload)
    },
    handleDelete(){
      let id = this.node.id;
      this.deleteRow(id)
    },
    handeEdit(){
      this.startModify = !this.startModify;
    }
  },
  computed:{
    ...mapGetters(['getCountByID']),
      showChildren(){
        return this.node.show
      },
      getCount(){
        return this.getCountByID(this.node.id)
      },
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
      },
      modify(){
        return this.startModify;
      }
  },
  props: {
    node: Object,
    level: Number,
  },
  components: {ModalForm},
}
</script>

<style>

.fade-enter-active, .fade-leave-active{
  transition: all 0.5s ease-out;
}
.fade-enter, .fade-leave-active{
  opacity: 0;
  transform: translateY(-30px);
}
.locationNode__label {
  display: block;
  text-align: left;
}
.tableRow {
  grid-column-start: 1;
  grid-column-end: 4;
  display: grid;
  grid-template-columns: 5fr 2fr .6fr;
}
.tableRow__cell {
  border: 1px solid #f2f4f7;
  text-align: left;
  padding: 10px;
  display: flex;
  justify-content: start;
}
.btn{
    margin-left: auto;
    background: transparent;
    border:none;
    outline: none;
}
.btn:active{
    border:none;
    outline: none;
}
.btn__arrow{
  width:10px;
}
 .btn__delete, .btn__edit{
   width: 20px;
 }
.btn__arrow--opened{
  transform: rotate(90deg);
  width:10px;
}
</style>