import React from 'react';
import InfoModal from '../Components/Modal';
import Treeview from '../Components/Treeview';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      dataSource: [],
      filter: "",
      showInfoModal: false,
      modalData: {}
    };
    this.filterList = ['Company', 'Sales', 'Marketing', 'Finance', 'People', 'Product Management', 'Engineering', 'Administration', 'Customer Success', 'Design'];
  }

  listToTree = (list) => {
    const {filter} = this.state;
    let map = {}, node, roots = [], i;
    
    for (i = 0; i < list.length; i += 1) {
      if(filter === '' || list[i].category === filter)
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }
    
    for (i = 0; i < list.length; i += 1) {
      if (filter === '' || list[i].category === filter) {
        node = list[i];
        if (node.parent_objective_id !== "" || list[map[node.parent_objective_id]]) {
          // if you have dangling branches check that map[node.parent_objective_id] exists
          if (list[map[node.parent_objective_id]])
            list[map[node.parent_objective_id]].children.push(node);
        } else {
          roots.push(node);
        }
      }
    }
    console.log(roots);
    return roots;
  }

  componentDidMount() {
    fetch("https://okrcentral.github.io/sample-okrs/db.json")
    .then((response) => response.json())
    .then((okrDataFromApi) => {
      const dataSource = okrDataFromApi.data;
      this.setState({
        dataSource: dataSource
      });
    });
  }
  
  filterSelected = (e) => {
    this.setState({filter: e.target.value === "All" ? "" : e.target.value});
  }

  closeModal = () => {
    this.setState({
      showInfoModal: false,
      modalData: {}
    });
  }

  showModal = (data) => {
    this.setState({
      showInfoModal: true,
      modalData: data
    });
  }
  
  render() {
    const { dataSource, showInfoModal, modalData } = this.state;
    const treeFormatedData = this.listToTree(dataSource);
    
    return (
      <div className="App">
        <select onChange={this.filterSelected}>
          <option selected>All</option>
          {this.filterList.map((item) => <option key={item}>{item}</option>)}
        </select>
        {treeFormatedData.map((node) => {
            return <Treeview node={node} key={node.id} showInfoModal={this.showModal} />
          })
        }
        {showInfoModal && <InfoModal data={modalData} closeModal={this.closeModal}/>}
      </div>
    );
  }
}

export default App;