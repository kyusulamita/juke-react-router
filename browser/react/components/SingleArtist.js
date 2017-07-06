import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import axios from 'axios';
import Albums from '../components/AllAlbums';
import Songs from '../components/Songs';
import Bluebird from 'bluebird';
import AllAlbums from './AllAlbums'


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
    const artist = this.state.selectedArtist;
    const artistAlbums = this.state.artistAlbums;
    const artistSongs = this.state.artistSongs;


    return (
      <div>
        <h3>{artist.name}</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artists/${artist.id}/albums`}>ALBUMS</Link></li>
          <li><Link to={`/artists/${artist.id}/songs`}>SONGS</Link></li>
        </ul>
      <Route path="/artists/:artistId/albums" render={
        (routeProps) =>{
          console.log(routeProps);
          return <AllAlbums match={routeProps.match} albums={this.state.artistAlbums}/> }} />
      <Route path='/artists/:artistId/songs' render ={
        (routeProps) => {
          return <Songs match={routeProps.match} songs={this.state.artistSongs} />
        }
      } />
      </div>
    );
  }
}
