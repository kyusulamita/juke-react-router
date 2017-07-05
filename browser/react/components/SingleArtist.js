import React, { Component } from 'react';
import axios from 'axios';
import Songs from '../components/Songs';

export default class SingleArtist extends Component {

  constructor () {
    super();
    this.state = {
      selectedArtist: {}
      artistSongs : [],
      artistAlbums : []
    };
  }

  componentDidMount () {
    const artistId = this.props.match.params.artistId
    //

    axios.get(`/api/artists/${albumId}`)
      .then(res => res.data)
      .then(artist=> this.setState({
        selectedArtist : artist
      }));
  }

  render () {
    //console.log(this.props.match.params)

    const artist = this.state.selectedArtist
    return (
      <div>
        <h3>{artist.name}</h3>
        <h4>ALBUMS</h4>
        <h4>SONGS</h4>
      </div>
    );
  }
}
