import React, {Component} from 'react';
import axios from 'axios';

//format for api call: https://www.reddit.com/r/space.json

class Apicall extends Component {

  constructor(props){
    super(props);

    this.state = {
      posts:[],
      subr:''
    };
    this.getReddit = this.getReddit.bind(this);
    this.searchReddit = this.searchReddit.bind(this);
  }

  // componentWillMount() {
  //   this.getReddit();
  // }

  getReddit() {
    axios.get(`https://www.reddit.com/r/${this.state.subr}.json`)
    .then(res => {
      const posts = res.data.data.children.map(obj => obj.data); // main object is res.data which is the whole json api
      this.setState({posts});

    })

    .catch(err => {
      this.setState({posts: [], subr: 'Not found!..'});
      console.log(err.message);
    })
  }

  searchReddit(event) {
    event.preventDefault();
    var subr = this.refs.input.value;
    this.setState({subr}, () => {
      this.getReddit();
    });

  }

  render(){
    return(
      <div>
        <h1 className="search"><i className="fab fa-reddit-alien animated flip"></i> Reddit Search App</h1>
        <input type="text" className="form-control" placeholder="Enter Reddit category to search" ref="input" id="input"/> <br />
        <button className="btn btn-danger btn-lg" onClick={this.searchReddit}>Search</button>
        <h1>{`${this.state.subr}`}</h1>
        <ul className="list">
          {this.state.posts.map(post =>
            <li key={post.id}><a href={post.url}>{post.title}</a> ({post.num_comments})</li>
          )}

        </ul>
      </div>
    );
  }
}

export default Apicall;
