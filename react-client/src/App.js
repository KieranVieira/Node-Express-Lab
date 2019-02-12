import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import './App.css';

const Post = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  padding: 15px;
  margin: 10px;
  border: 1px solid black;
  h3{
    margin: unset;
  }
  h4{
    margin: 5px;
  }
  p{
    margin: 5px;;
  }
`;

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

class App extends Component {
  state = {
    posts: [],
    error: ''
  }

  componentDidMount(){
    axios.get('http://localhost:4000/api/posts')
      .then(res => {
        this.setState({
          ...this.state,
          posts: res.data,
          error: '',
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({
          ...this.state,
          error
        })
      })
  }
  
  render() {
    return (
      <div className="App">
        <h1>posts</h1>
        <PostContainer>
          {this.state.posts.length > 0 ? 
            this.state.posts.map(post => {
              return (
                <Post>
                  <h3>{post.title}</h3>
                  <h4>{post.created_at}</h4>
                  <p>{post.contents}</p>
                </Post>
              )
            })
            : <h1>no posts were loaded</h1>}
        </PostContainer>
      </div>
    );
  }
}

export default App;
