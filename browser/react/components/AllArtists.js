import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class AllArtists extends Component {
  constructor () {
    super();
    this.state = {
      artists: []
    };
  }
  componentDidMount(){
    axios.get('/api/artists')
    .then(result => result.data)
    .then((artists) => this.setState({artists}));
  }

  render(){
    return <div>
              <h3>Artists</h3>
                <div className="list-group">
                {
                  this.state.artists.map(artist => {
                    return (
                      <div className="list-group-item" key={artist.id}>
                        <Link to={`/artists/${artist.id}`}>{ artist.name }</Link>
                      </div>
                    )
                  })
                }
              </div>
            </div>
  }
}
