import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import AllAlbums from './AllAlbums';

export default class AllAlbums extends Component {

  constructor () {
    super();
    this.state = {
      albums: []
    };
  }

  componentDidMount () {
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(albums => {
        this.setState({ albums })
      });
  }

  render () {
    const albums = this.state.albums;
    const selectAlbum = this.props.selectAlbum;
    console.log(this.props);
    return (
      <AllAlbums />
    );
  }
}