import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import fishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
    // number: 0,
    // string: '',
    // list: [],
    // disctionary: {},
  };

  // life cicles methods: https://reactjs.org/docs/react-component.html
  componentDidMount() {
    const { params } = this.props.match;

    // restoring our state based on local storage info.
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // all the functions that update states should live in the same component that the state that is changing
  addFish = fish => {
    // 1. take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. add out new fish
    fishes[`fish_${Date.now()}`] = fish;
    // 3. set the new feshes object to state
    // set state react function let us to update the state partially, is not necessary to update all the stuff that we have there
    this.setState({
      fishes: fishes
    });
    // with ES6 if we are setting a property with same name than the value that we want to pass, it could be written like the following avoiding boilerplate words
    // this.setState({ fishes });
  };

  updateFish = (key, updateFish) => {
    // 1. take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. edit an existing fish
    fishes[key] = updateFish;
    // 3. set the update fish to state
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    // 1. take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. removing an existing fish
    // In Firebase, to remove an object you should assign null value
    fishes[key] = null;
    // 3. set the updated state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: fishes
    });
  };

  addToOrder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. either add the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. call setStatus to update our state object
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    // 1. take a copy of the existing state
    const order = { ...this.state.order };
    // 2. removing an existing fish
    // In localStorage, to remove an object you should user delefe method
    delete order[key];
    // 3. set the updated state
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="fresh seafood market" bol={true} count="400" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;