import React, { Component } from 'react';
import axios from 'axios';
import Songs from '../components/Songs';

export default class SingleAlbum extends Component {

  constructor () {
    super();
    this.state = {
      selectedAlbum: {}
    };


  }

  componentDidMount () {
    const albumId = this.props.match.params.albumId

    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: album
      }));
  }

  render () {
    //console.log(this.props.match.params)

    const album = this.state.selectedAlbum;

    return (
      <div className="album">
        <div>
          <h3>{ album.name }
            <span>&nbsp;</span>
            <a href={"mailto:allTheCoolKids@example.com?subject=Cool%20New%20Tunes&amp;&body=Check%20out%20this%20album!%20" + album.name}>
            <button className="btn btn-default btn-xs">
              <span className="glyphicon glyphicon-share"></span>
            </button>
            </a>
          </h3>

          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs songs={album.songs} />
      </div>
    );
  }
}
