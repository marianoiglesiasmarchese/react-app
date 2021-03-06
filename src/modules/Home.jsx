import React, { Component } from 'react';
import '../App.css';
import Api from '../utils/Api';
import Search from './Search';
import Grid from './Grid';

const api = new Api();

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      favorites: [],
    }
  }

  handleSearchChange = (query) => {
    api.get('s=' + query).then((result) => {
      this.setState({
        data: result.Search || [],
      });
    });
  }

  handleAddFavorite = movie => {
    const includes = this.state.favorites.find( each =>  movie.title !== each.title );
    console.log(includes);
    if(includes === undefined){
      this.setState({
        favorites: [...this.state.favorites, movie]
      });
    }
  }

  clearState = () => {
    this.setState({
      favorites: []
    });
  }

  render() {
    return (
      <div className="container">
        <Search onSearch={this.handleSearchChange} />
        <span className="text">FAVORITES: {`${this.state.favorites.length}`}</span>
        <button onClick={this.clearState}>CLEAR</button>
        <Grid data={this.state.data} addFavorite={this.handleAddFavorite} />
      </div>
    );
  }
}

export default Home;
