import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        tree:[
            {
                label:'Almaty',
                count:20,
                id:548484,
                parent_id: null,
                children:[
                  {
                    label:'Center 1',
                    id:21515,
                    parent_id: 548484,
                    count:21,
                    children:[
                      { label: 'Management 1', count:20, id:84835, parent_id: 21515},
                      { 
                        label: 'Management 2',
                        count:10,
                        parent_id: 21515,
                        id:84892,
                        children: [
                            { label: 'Management 1', count:20, id:1, parent_id: 84892},
                            { label: 'Management 2', count:10, id:2, parent_id: 84892}
                          ]
                      }
                    ]
                  },
                  {
                    label:'Center 2',
                    id:454548,
                    parent_id: 548484,
                    count:21,
                    children:[
                      { label: 'Management 1', count:20, id:1, parent_id:454548 },
                      { label: 'Management 2', count:10, id:2, parent_id:454548 }
                    ]
                  }
                ]
            }
        ]
    },
    getters:{
      // get tree
      getTree: state =>  state.tree,
      getTreePath: (state) =>{
        let arr = [];

        
      }
      // get all the labels and link to thier object

    },
    mutations:{

      createRow(state, payload){
        const row = new TableRow(payload.label, payload.id, payload.parent_id, payload.count)

        // if new element doesn't have a parent_id, then it will be considired as one of most higher in hierarhy elements.
        if(row.parent_id == null){
          state.tree.push(row);
        }
        else{
          // here we need to find that element by id in the tree, then push the new element to a "children" property
        }
      }
    },
    actions:{

    }

})

function getPath(tree){
  // Creating array with objects of element id and hierarhy path
  let basePath = []
  for (let i = 0; i < tree.length; i++) {
    // if current element has a parent
    if(tree[i].parent_id){
      
    }
    basePath.push({
      id: tree[i].id,
      path: tree[i].label,
      parent_id: tree[i].parent_id
    })
  }
}

class TableRow{
  constructor(label, id, parent_id, count, children = null){
    this.label = label;
    this.id = id;
    this.count = count;
    this.parent_id = parent_id;
    this.children = children;
  }
}

