
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   
    state:{
        tree:[
            {
                label:'Almaty',
                count:0,
                id:548484,
                show:true,
                parent_id: null,
                children:[
                  {
                    label:'Center 1',
                    id:21515,
                    show:true,
                    parent_id: 548484,
                    count:0,
                    children:[
                      { label: 'Management 1', count:20,show:true, id:84835, parent_id: 21515, children: null},
                      { 
                        label: 'Management 2',
                        count:0,
                        show:true,
                        parent_id: 21515,
                        id:84892,
                        children: [
                            { label: 'Management 1', show:true, count:20, id:455646, parent_id: 84892, children: null},
                            { label: 'Management 2', show:true, count:10, id:844848, parent_id: 84892, children: null }
                          ]
                      }
                    ]
                  },
                  {
                    label:'Center 2',
                    id:454548,
                    show:true,
                    parent_id: 548484,
                    count:0,
                    children:[
                      { label: 'Management 1',show:true, count:20, id:12321, parent_id:454548, children: null },
                      { label: 'Management 2',show:true, count:10, id:12353, parent_id:454548, children: null }
                    ]
                  }
                ]
            }
        ]
    },
    getters:{
      // get tree
      getTree: state =>  state.tree,

      getTreePaths: (state) =>{
        // returns an array of objects with full path and element full data
        let sorted = clearNesting(state.tree);
        let result = []

        sorted.forEach(element => {
          result.push({
            path: ' / > ' + createPath(element, sorted),
            id: element.id,
            parent_id: element.parent_id,
            label: element.label
          })
        });

        return result
      },
      getCountByID(state){
        return (id)=>{
          return getCount(state.tree,id)
        }
      }
      

    },
    mutations:{

      createRow(state, payload){
        const row = new TableRow(payload.label, payload.id, payload.parent_id, payload.count, null)

        // if new element doesn't have a parent_id, then it will be considired as one of most higher in hierarhy elements.
        if(row.parent_id === null){
          state.tree.push(row);
        }
        else{
          // here we need to find that element by id in the tree, then push the new element to a "children" property
          modifyElementById(state.tree, row)
        }
      },
      toggleShow({tree}, payload){
        recursiveToggleShow(tree, payload)
      },
      deleteRow(state,id){
        // delete row by ID
        deleteElementById(state.tree, id)

      },
      updateRow(state, payload){
        // update row by ID
        // payload.id - id of the element that needs to be updated
        // payload.label - new label of the existing element,
        // payload.count - new count of the existing element
        updateElementById(state.tree, payload)
      }

    },
    actions:{

    }

})


// returns an array that doesn't have nesting tree
function clearNesting(tree){
  // Creating array with objects of element id and hierarhy path
  let basePath = []

  for (let i = 0; i < tree.length; i++) {
    // if the current element has children
    if(tree[i].children){
      // then we call it recursivly til the last element.
      // we return the basePath array of the last element
      let tempArr = clearNesting(tree[i].children);
        // push current data
        basePath.push({
          id: tree[i].id,
          label:tree[i].label,
          count: tree[i].count,
          parent_id: tree[i].parent_id,
          children: tree[i].children
      })
      // fetch data from the lastest elements
      for(let j = 0; j < tempArr.length; j++){
        basePath.push({
          id: tempArr[j].id,
          label:tempArr[j].label,
          count: tempArr[j].count,
          parent_id: tempArr[j].parent_id,
          children: tempArr[j].children
        })
      }
      
    }
    else{
        // pushing elements that doesn't have childrens
        basePath.push({
        id: tree[i].id,
        label:tree[i].label,
        count: tree[i].count,
        parent_id: tree[i].parent_id,
        children: tree[i].children
      })
    }
  }
  return basePath
}
// deletes elements inside a tree
function deleteElementById(arr, id){
  arr.forEach(element => {
      if(element.id === id){
          let index = arr.findIndex((elem)=> elem.id === id)
          arr.splice(index,1)
      } 
      else{
          if(element.children){
              deleteElementById(element.children, id)
          }
      }
  });
}
// adding a new row
function modifyElementById(tree, row){
  tree.forEach(item=>{
    if(item.id === row.parent_id){
      if(item.children === null){
        item.children = [];
      }
      item.children.push(row)
    }
    else{
      if(item.children){
        modifyElementById(item.children, row)
      }
    }
  })
}
// Обновить существующий элемент в дереве с новыми данными
function updateElementById(tree, payload){
    tree.forEach(elem=>{
      // Если нашли элемент, то обновляем данные
      if(elem.id === payload.id){
        elem.label = payload.label;
        elem.count = payload.count
      }
      else{
        // Иначе ищем элемент рекурсивно среди детей
        if(elem.children){
          updateElementById(elem.children, payload)
        }
      }
    })
}
// return a full path of an element of sorted data
function createPath(elem, data){
    let basePath = elem.label;

    // Если элемент иммет родителя
    if(elem.parent_id !== null){
        // Мы находим родителя
        data.forEach((item)=>{
            if(item.id === elem.parent_id){
                // Рекурсивно конкатенируем с локальной переменной
                basePath = createPath(item,data) + ' > ' + basePath;        
            }
        })
        return basePath;
    }
    // Иначе если элемент не иммет родителя
    else{
        // Возвращаем путь текущего элемента 
        return basePath; 
    }
}

// Рекурсивно найти нужный элемент и запустить рекурсивное установление нового значения
function recursiveToggleShow (array, payload){

  // Проходимся по массиву дерева
  array.forEach(element=>{
      // Если элемент является тем, на котором была нажата кнопка
      if(element.id === payload.id){
        // Проверяем есть ли у него дети
        if(element.children){
          // По каждому ребенку мы проходимся и меняем значение
          recursiveSetValue(element.children, payload)
        }
        else{
          // Иначе если у элемента нет детей, то все ок
          return
        }
        
      }
      // Иначе если элемент не является целевым, то заглянем в его детей
      else{
        if(element.children){
          // Здесь нам нужно проверить детей на совпадение ID
          recursiveToggleShow(element.children,payload )
        }
      }
    })
}
// Рекурсивно установить значения всем элементам
function recursiveSetValue(array, payload){
  array.forEach(elem =>{
    // Меняем поле каждому элементу
    elem.show = payload.show
    
    // И их детям, если они есть.
    if(elem.children){
      recursiveSetValue(elem.children, payload)
    }
  })
}
// Рекурсивный поиск элемента с нужным ID и запуск подсчета его детей.
function getCount(array,id){
  let count = 0;
  array.forEach(element => {
      // Если элемент найден
      if(element.id === id){
          // Если у элемента есть дети
          if(element.children){
              // запускаем рекурсию вытаскивания данных с детей
              let innerCount = countIt(element.children);
              count = parseInt(count) + parseInt(innerCount)
          }
           // добавляем число к базовому
           count = parseInt(count) + parseInt(element.count)
         
      }
      // Если элемента нет на этом уровне ищем у детей
      else{
          //Смотрим детей
          if(element.children){
              // Запускаем эту функцию снова, с новыми данными
              let returned = getCount(element.children, id);
              count = parseInt(count) + parseInt(returned)
          }
      }
  });
  return count;
}

// Рекурсивный подсчет
function countIt(array){
  let count = 0;
  //Рекурсивно вытаскиваем данные о количестве из детей
  array.forEach(elem =>{
      if(elem.children){
          // добавляем число к базовому
          let returned = countIt(elem.children);
          count =  parseInt(count) + parseInt(returned)
      }
      count = parseInt(count) + parseInt(elem.count)
  })
  return count;
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



