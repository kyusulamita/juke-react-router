import React, { Component } from 'react';
import axios from 'axios';
import Albums from '../components/AllAlbums';
import Songs from '../components/Songs';
import Bluebird from 'bluebird';

export default class SingleArtist extends Component {

  constructor () {
    super();
    this.state = {
      selectedArtist: {},
      artistSongs: [],
      artistAlbums: []
    };
  }

  componentDidMount () {
    const artistId = this.props.match.params.artistId

    const artistsPromise = axios.get(`/api/artists/${artistId}`);
    const albumsPromise = axios.get(`/api/artists/${artistId}/albums`);
    const songsPromise = axios.get(`/api/artists/${artistId}/songs`);

    Bluebird.all([
      artistsPromise,
      albumsPromise,
      songsPromise
    ])
    .spread((artist, albums, songs) => {
      this.setState({
        selectedArtist: artist.data,
        artistAlbums: albums.data,
        artistSongs: songs.data
      })
    })
  }

  render () {
    //console.log(this.props.match.params)

    const artist = this.state.selectedArtist
    return (
      <div>
        <h3>{artist.name}</h3>
        <Albums albums={this.state.artistAlbums} />
        <Songs songs={this.state.artistSongs} />
      </div>
    );
  }
}
